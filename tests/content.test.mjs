import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { test } from "node:test";

const app = await readFile(new URL("../src/App.tsx", import.meta.url), "utf8");
const data = await readFile(new URL("../src/data.ts", import.meta.url), "utf8");
const styles = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
const assets = await readdir(new URL("../public/assets", import.meta.url));

test("course identity and core facts are present", () => {
  assert.match(app, /Activating the City/);
  assert.match(app, /PCIX-SHU 102/);
  assert.match(app, /Panlong Tiandi/);
  assert.match(app, />16</);
  assert.match(app, />6</);
});

test("all six documented projects are present", () => {
  for (const title of [
    "sizhuScape",
    "Panlong Waters",
    "Chessmate",
    "The Flowing Script",
    "Interactive Kunqu Opera",
    "JiangnanJPEG",
  ]) {
    assert.match(data, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  const projectData = data.split("export const weeks")[0];
  assert.equal((projectData.match(/number: "0[1-6]"/g) ?? []).length, 6);
});

test("curated public asset set is complete", () => {
  const expected = [
    "course-intro.webp",
    "final-review.webp",
    "panlong-map.webp",
    "project-chessmate.webp",
    "project-flowing-script.webp",
    "project-jiangnanjpeg.webp",
    "project-kunqu.webp",
    "project-sizhu.webp",
    "project-soundwalk.webp",
  ];
  assert.deepEqual(assets.sort(), expected.sort());
});

test("source does not expose student emails or local source paths", () => {
  const combined = `${app}\n${data}\n${styles}`;
  assert.doesNotMatch(combined, /@nyu\.edu/i);
  assert.doesNotMatch(combined, /\/Users\/|Dropbox\/NYUSH/i);
});

test("responsive and reduced-motion rules exist", () => {
  assert.match(styles, /@media \(max-width: 760px\)/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
});
