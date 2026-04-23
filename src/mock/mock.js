// Mock data for CNC Programmer Portfolio
// This file holds all placeholder content so backend integration is seamless later.

export const profile = {
  name: "Bima Yufianto",
  role: "CNC Programmer & Product Designer",
  location: "Indonesia",
  email: "your.email@example.com",
  whatsapp: "+62 000 0000 0000",
  whatsappRaw: "620000000000",
  fiverr: "#",
  upwork: "#",
  heroTitle: "Precision in Every Cut",
  heroSubtitle: "CNC Programming & Digital Fabrication Specialist",
  heroIntro:
    "Crafting efficient toolpaths and production-ready programs for furniture, joinery, and precision components.",
  aboutShort:
    "Experienced CNC programmer specializing in furniture production, precision cutting, and efficient toolpath strategies.",
  aboutLong:
    "I translate CAD designs into reliable, optimized CNC programs — from 3-axis routing to 5-axis complex joinery. My focus is on clean toolpaths, minimal waste, and production workflows that scale from prototype to series manufacturing.",
  yearsExperience: "8+",
  projectsDelivered: "120+",
  machinesProgrammed: "15+",
};

export const categories = [
  { id: "all", label: "All Work" },
  { id: "cnc-router", label: "CNC Router" },
  { id: "3-axis", label: "3 Axis" },
  { id: "4-axis", label: "4 Axis Rotary" },
  { id: "5-axis", label: "5 Axis" },
  { id: "furniture", label: "Furniture Design" },
];

export const projects = [
  {
    id: "p01",
    code: "CNC-01",
    title: "Furniture CNC Routing",
    description: "Optimized nested toolpaths for plywood cabinetry production.",
    category: "cnc-router",
    type: "toolpath",
    tools: ["ZW3D", "Aspire", "VCarve"],
    process:
      "Nested layout across 4×8 sheets with common-line cutting, drill cycles, and tab placement calibrated for 18mm plywood. Feeds and speeds tuned for compression spiral endmills.",
    result:
      "Reduced material waste by 12% and cycle time by 18% across a batch of 40 cabinet boxes.",
  },
  {
    id: "p02",
    code: "CNC-02",
    title: "Complex Joinery Toolpath",
    description: "Dovetail and mortise joinery programmed on a 4-axis router.",
    category: "4-axis",
    type: "wireframe",
    tools: ["ZW3D", "Fusion 360"],
    process:
      "Rotary A-axis indexing paired with conventional XYZ milling to cut through-mortises and dovetail pins on solid oak stock with ±0.05mm tolerance.",
    result: "Clean press-fit joinery achieved without secondary operations.",
  },
  {
    id: "p03",
    code: "CNC-03",
    title: "5-Axis Sculpted Chair Shell",
    description: "Continuous 5-axis surfacing for ergonomic seating form.",
    category: "5-axis",
    type: "isometric",
    tools: ["ZW3D", "PowerMill"],
    process:
      "Swarf and parallel-to-curve strategies to achieve a Class-A surface on laminated beech. Collision-free posture management with tilt and lead angles.",
    result: "Mirror-smooth surface requiring only fine sanding before finish.",
  },
  {
    id: "p04",
    code: "CNC-04",
    title: "Engraved Panel Series",
    description: "V-bit lettering and relief engraving on MDF panels.",
    category: "3-axis",
    type: "engraving",
    tools: ["Aspire", "VCarve"],
    process:
      "Vectorized typography with variable-depth V-carving, followed by profile cuts with onion-skin tabs for safe unloading.",
    result: "Consistent line weight across a run of 200 signage panels.",
  },
  {
    id: "p05",
    code: "CNC-05",
    title: "Rotary Table Leg",
    description: "Turned and fluted table leg on 4-axis rotary setup.",
    category: "4-axis",
    type: "rotary",
    tools: ["ZW3D", "Aspire"],
    process:
      "Wrapped toolpaths with indexed fluting around a 90mm diameter walnut blank. Finish pass executed with ball-nose stepover of 0.2mm.",
    result: "Matched set of 4 legs with identical profile and flute alignment.",
  },
  {
    id: "p06",
    code: "CNC-06",
    title: "Modular Shelving System",
    description: "Parametric shelving designed for flat-pack CNC production.",
    category: "furniture",
    type: "topdown",
    tools: ["ZW3D", "Fusion 360", "Aspire"],
    process:
      "Parametric part library driving nested toolpaths. Cam-lock hardware pockets and cable routing integrated into the CAM template.",
    result: "Design-to-production pipeline shortened from 5 days to under 2.",
  },
  {
    id: "p07",
    code: "CNC-07",
    title: "Aluminum Jig Plate",
    description: "Precision fixture plate milled on 3-axis aluminum setup.",
    category: "3-axis",
    type: "drill",
    tools: ["Fusion 360"],
    process:
      "Flatness-critical 6061-T6 plate with threaded locator grid. Adaptive clearing followed by finishing pass and peck drilling.",
    result: "Surface flatness held within 0.02mm across 400×300mm plate.",
  },
  {
    id: "p08",
    code: "CNC-08",
    title: "Cabinet Door Program",
    description: "Batch production program for shaker-style cabinet doors.",
    category: "cnc-router",
    type: "toolpath",
    tools: ["Aspire", "ZW3D"],
    process:
      "Two-sided machining with registration pins. Rail-and-stile profiles cut with matched shaper bits and automatic tool changer sequencing.",
    result: "Throughput of 60 doors per shift with zero scrap in first run.",
  },
  {
    id: "p09",
    code: "CNC-09",
    title: "Curved Bench Seat",
    description: "5-axis surfacing on laminated plywood bench form.",
    category: "5-axis",
    type: "isometric",
    tools: ["ZW3D", "PowerMill"],
    process:
      "Vacuum-fixtured laminated blank surfaced with 5-axis flowline toolpaths. Edge trimming handled with tilted tool-axis to clear the fixture.",
    result: "Ready-to-finish seat shell produced in a single setup.",
  },
];

export const skills = [
  { name: "CNC Programming", level: 95 },
  { name: "CAD / CAM Modeling", level: 92 },
  { name: "Toolpath Optimization", level: 90 },
  { name: "Furniture Design Engineering", level: 88 },
  { name: "3 / 4 / 5 Axis Machining", level: 90 },
  { name: "Production Workflow", level: 85 },
];

export const softwareTags = [
  "ZW3D",
  "Aspire",
  "VCarve",
  "Fusion 360",
  "PowerMill",
  "SolidWorks",
  "AutoCAD",
  "Rhino",
];
