import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const siteUrl = process.argv[2];
if (!siteUrl) throw new Error("Pass the local site URL as the first argument.");

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const profileDir = mkdtempSync(join(tmpdir(), "activating-city-chrome-"));
const port = 9237;

mkdirSync("qa", { recursive: true });

const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

const pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function getDebugPage() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const pages = await fetch(`http://127.0.0.1:${port}/json/list`).then((response) =>
        response.json(),
      );
      const page = pages.find((candidate) => candidate.type === "page");
      if (page) return page;
    } catch {
      // Chrome is still starting.
    }
    await pause(100);
  }
  throw new Error("Chrome did not expose a debug page.");
}

function connect(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl);
  let commandId = 0;
  const pending = new Map();
  const events = new Map();

  const open = new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  socket.addEventListener("message", ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) {
      const handler = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) handler?.reject(new Error(message.error.message));
      else handler?.resolve(message.result);
      return;
    }

    const handlers = events.get(message.method) ?? [];
    events.delete(message.method);
    handlers.forEach((handler) => handler(message.params));
  });

  return {
    open,
    close: () => socket.close(),
    send(method, params = {}) {
      commandId += 1;
      const id = commandId;
      const response = new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
      socket.send(JSON.stringify({ id, method, params }));
      return response;
    },
    once(method) {
      return new Promise((resolve) => {
        const handlers = events.get(method) ?? [];
        handlers.push(resolve);
        events.set(method, handlers);
      });
    },
  };
}

async function capture(client, fileName, captureBeyondViewport = false) {
  const { data } = await client.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport,
  });
  writeFileSync(join("qa", fileName), Buffer.from(data, "base64"));
}

async function renderViewport(client, label, width, height, mobile) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
  });

  const loaded = client.once("Page.loadEventFired");
  await client.send("Page.navigate", { url: siteUrl });
  await loaded;
  await pause(700);
  await capture(client, `${label}-top.png`);
  const imageCheck = await client.send("Runtime.evaluate", {
    expression: `(async () => {
      for (const image of document.images) {
        image.loading = "eager";
        image.scrollIntoView({ block: "center" });
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      await Promise.all(Array.from(document.images).map((image) =>
        image.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              image.addEventListener("load", resolve, { once: true });
              image.addEventListener("error", resolve, { once: true });
            })
      ));
      window.scrollTo(0, 0);
      return Array.from(document.images).map((image) => ({
        src: image.getAttribute("src"),
        loaded: image.naturalWidth > 0,
      }));
    })()`,
    awaitPromise: true,
    returnByValue: true,
  });
  const failedImages = imageCheck.result.value.filter((image) => !image.loaded);
  if (failedImages.length) {
    throw new Error(`Images failed to load: ${JSON.stringify(failedImages)}`);
  }
  await client.send("Runtime.evaluate", {
    expression:
      "document.querySelectorAll('.reveal').forEach((element) => element.dataset.visible = 'true')",
  });
  await pause(300);
  await capture(client, `${label}-full.png`, true);

  await client.send("Runtime.evaluate", {
    expression:
      "document.documentElement.style.scrollBehavior = 'auto'; document.querySelector('#projects').scrollIntoView({block: 'start'})",
  });
  await pause(800);
  await capture(client, `${label}-projects.png`);

  await client.send("Runtime.evaluate", {
    expression:
      "((button) => { button.focus(); button.click(); })(document.querySelector('.project-card button'))",
  });
  await pause(300);
  await capture(client, `${label}-dialog.png`);
}

try {
  const page = await getDebugPage();
  const client = connect(page.webSocketDebuggerUrl);
  await client.open;
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await renderViewport(client, "desktop", 1440, 1000, false);
  await client.send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Escape",
    code: "Escape",
  });
  await client.send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Escape",
    code: "Escape",
  });
  await pause(200);
  const dialogCheck = await client.send("Runtime.evaluate", {
    expression:
      "({ closed: !document.querySelector('.dialog'), focusRestored: document.activeElement.matches('.project-card button') })",
    returnByValue: true,
  });
  if (!dialogCheck.result.value.closed || !dialogCheck.result.value.focusRestored) {
    throw new Error(`Dialog keyboard check failed: ${JSON.stringify(dialogCheck.result.value)}`);
  }
  await renderViewport(client, "mobile", 390, 844, true);
  client.close();
} finally {
  chrome.kill("SIGTERM");
  await pause(200);
  rmSync(profileDir, { recursive: true, force: true });
}
