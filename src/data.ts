export type Project = {
  number: string;
  title: string;
  chinese?: string;
  team: string;
  image: string;
  alt: string;
  accent: string;
  site: string;
  heritage: string;
  medium: string;
  summary: string;
  detail: string;
  learning: string;
  link?: string;
  linkLabel?: string;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "sizhuScape",
    team: "Idris · Sienna · Jessie",
    image: "/assets/project-sizhu.webp",
    alt: "Small architectural model of a woven bamboo pavilion on a moss landscape",
    accent: "#b6ff3c",
    site: "Playground field",
    heritage: "Jiangnan sizhu music and bamboo weaving",
    medium: "Bamboo pavilion model and browser instrument",
    summary:
      "A shared pavilion makes Jiangnan sizhu music approachable through collective play.",
    detail:
      "The team paired a bamboo-woven gathering structure with a simplified pentatonic instrument interface. Visitors could enter alone or together, sit around a common table and play the sounds of a sizhu ensemble without first mastering a full instrument.",
    learning:
      "Interviews with student musicians shifted the design away from technical difficulty and toward the pleasure of playing with other people.",
  },
  {
    number: "02",
    title: "Panlong Waters",
    chinese: "盘龙水畔 · 听桥记",
    team: "Annika Wen · Helen Xu",
    image: "/assets/project-soundwalk.webp",
    alt: "Detailed model of Panlong bridges with plants and transparent soundwalk markers",
    accent: "#8ce8dd",
    site: "Waterfront bridges",
    heritage: "Water-town soundscapes and bridge life",
    medium: "NFC sound stations and an online map",
    summary:
      "A self-guided soundwalk lets bridges narrate Panlong's social, commercial and material history.",
    detail:
      "Visitors tap near-field communication tags at heritage sites to hear layered histories, natural sounds and reconstructed scenes. A digital map extends the walk online, while a community sound board invites people to contribute new recordings to Panlong's shared memory.",
    learning:
      "Testing replaced a fixed guided tour with independent discovery, reducing friction for visitors who encountered the work by chance.",
    link: "https://storymaps.arcgis.com/stories/2c8efded2c1845c4b0823bd5ead9a615",
    linkLabel: "Open the soundwalk archive",
  },
  {
    number: "03",
    title: "Chessmate",
    chinese: "棋映",
    team: "Torico · Anna · Muhammad",
    image: "/assets/project-chessmate.webp",
    alt: "Projected Chinese chess interface beside people testing a physical prototype",
    accent: "#ffd12d",
    site: "Covered corridor near the stage",
    heritage: "Chinese chess and Jiangnan social life",
    medium: "Magnetic pieces, digital board and AI opponent",
    summary:
      "A public chess table turns Jiangnan waterways and social figures into a playable learning space.",
    detail:
      "The screen board reimagines canals as grid lines and bridges as intersections. Physical pieces depict scholars, merchants and artisans. Players can face one another or an artificial-intelligence opponent while the installation offers move guidance, historic scenarios, sound and projected feedback.",
    learning:
      "Feedback collapsed two large boards into one smaller, rotatable device and expanded the audience beyond experienced older players.",
  },
  {
    number: "04",
    title: "The Flowing Script",
    team: "Katherine · Jade · Ran",
    image: "/assets/project-flowing-script.webp",
    alt: "Students demonstrating an interactive brush and projected poetry prototype",
    accent: "#ff5b36",
    site: "Covered corridor above the main waterway",
    heritage: "Qushui liushang, calligraphy and poetry",
    medium: "Sensor brush, generated poetry and water projection",
    summary:
      "Handwritten marks become poems that move across the water, then enter a community archive.",
    detail:
      "A floor screen acts as a digital canvas. A sensor-enabled brush reads each mark, an artificial-intelligence system answers with a poem in running script, and projectors place the poem on the water below. A queue in Panlong's existing mini-program manages access during busy periods.",
    learning:
      "User tests showed that people begin with neutral marks or drawings, then make the experience more personal once they understand the response.",
  },
  {
    number: "05",
    title: "Interactive Kunqu Opera",
    team: "Rebecca · Michelle",
    image: "/assets/project-kunqu.webp",
    alt: "Students presenting a stage-screen prototype for an interactive Kunqu opera rhythm game",
    accent: "#ff94c5",
    site: "Central stage and plaza",
    heritage: "Kunqu opera and its instrumental ensemble",
    medium: "Collaborative rhythm game and portable stage device",
    summary:
      "A multiplayer rhythm game activates an underused stage through the instruments of Kunqu opera.",
    detail:
      "Players perform digital versions of the dongxiao, guqin, dagu, zhongruan and guzheng toward a shared score. The installation makes the ensemble structure of Kunqu visible while keeping the equipment movable when Panlong hosts other events.",
    learning:
      "The team moved from a phone game to a physical device connected to the stage, then simplified the visuals and difficulty after testing.",
  },
  {
    number: "06",
    title: "JiangnanJPEG",
    team: "Wenze · John · Max",
    image: "/assets/project-jiangnanjpeg.webp",
    alt: "Person using a tablet inside a cloth-covered Jiangnan photo booth prototype",
    accent: "#4169ff",
    site: "Riverside stone-gate pavilion",
    heritage: "Local craft motifs and visitor memory",
    medium: "Photo booth and collectable shop-designed frames",
    summary:
      "A photo booth links the act of making a souvenir to a route through Panlong's local shops.",
    detail:
      "Visitors photograph their time at the water town, then collect frame designs inspired by a gold shop, a folk scale museum and a cake shop. The intervention uses a familiar photo-booth ritual to direct attention toward small businesses and the material culture around them.",
    learning:
      "Testing exposed a complicated capture-and-edit workflow. The team responded with a horizontal interface, clearer controls and a device fitted into the booth itself.",
  },
];

export const weeks = [
  {
    number: "01",
    title: "Observe",
    question: "How does a public space become a place?",
    detail: "Study who uses it, how people move and pause, and what feelings or memories it holds.",
  },
  {
    number: "02",
    title: "Place and memory",
    question: "What does Panlong carry forward?",
    detail: "Visit the site with Shui On Land and connect its canals, plazas and green space to Jiangnan heritage.",
  },
  {
    number: "03",
    title: "Engage",
    question: "How can an intervention foster connection?",
    detail: "Choose a site and audience, then turn cultural research into an initial public experience.",
  },
  {
    number: "04",
    title: "Prototype",
    question: "What must people see, touch or hear?",
    detail: "Use models, storyboards, mappings, video and code to make the interaction tangible.",
  },
  {
    number: "05",
    title: "Test",
    question: "Where does the experience break down?",
    detail: "Watch people try the work and revise its timing, instructions, access and relationship to the site.",
  },
  {
    number: "06",
    title: "Refine",
    question: "What belongs in the final experience?",
    detail: "Strengthen the prototype and explain how research and feedback changed the design.",
  },
  {
    number: "07",
    title: "Demonstrate",
    question: "Can the room experience the proposal?",
    detail: "Present an interactive prototype to guest reviewers and document both outcome and process.",
  },
];

export const readings = [
  "Dolores Hayden · The Power of Place",
  "Ray Oldenburg · The Great Good Place",
  "Priya Parker · Creating Temporary Alternative Worlds",
  "Lydon and Garcia · Tactical Urbanism",
  "Jan Gehl · Life Between Buildings",
  "IDEO · The Field Guide to Human-Centered Design",
  "Zhang and Zhang · Regenerating Shanghai Through Urban Spatial Design",
];
