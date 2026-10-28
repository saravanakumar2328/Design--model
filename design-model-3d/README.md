# Software Engineering Design Model: Interactive 3D Learning Website

An interactive 3D website for MCA students that teaches the **Software Engineering Design Model** using one running example: a **Restaurant Food Ordering System** (SmartDine-inspired).

## Run locally

Requires Node.js 18 or newer.

```bash
cd design-model-3d
npm install
npm run dev        # development server, opens at http://localhost:5173
```

Production build:

```bash
npm run build      # creates the dist/ folder
npm run preview    # serves dist/ at http://localhost:4173
```

## Tech stack

React 18, Vite 5, Three.js with React Three Fiber and Drei, Framer Motion, Lucide React, plain CSS3 (glassmorphism, CSS 3D tilt). Tailwind was not needed. Versions are pinned in `package.json`.

## What is inside

| Section | What you can do |
|---|---|
| Home | Click parts of the floating 3D system (customer interface, application layer, database, kitchen display) while data packets travel between them |
| 1. Introduction | Definition, importance, and a Requirement → Design transformation with clickable components |
| 2. Process and Abstraction | Click the six process stages; switch High / Medium / Low level or Zoom In / Zoom In Again with a moving 3D camera |
| 3. Ten Principles | Ten tilting 3D cards, each with its own animation; click one to open a larger explanation panel |
| 4. Five Design Elements | Five clickable 3D objects; animated class diagram, 3D architecture, working phone and kitchen-TV mockups, expandable flowchart, 3D deployment scene |
| 5. Real-Time Project | Full order flow: choose food and quantities → cart total → Place Order → database → kitchen TV → "Show Design Explanation" |
| 6. Workflow | Six clickable stages with input, activity, output, and example; iterative-design note |
| 7. Sequence Diagram | Play, Pause, Next Step, Restart with a plain explanation of each message |
| 8. Quiz | 12 multiple-choice questions with instant feedback, progress, final score, restart |
| Seminar Mode | Large-text, one-concept-per-slide presentation with Next/Previous (arrow keys), full screen, Esc to exit |

## Sidebar controls

- **Reduce motion**: stops floating, packet, and zoom animation. It is also switched on automatically if your system asks for reduced motion.
- **3D graphics**: turn off to use simple 2D diagrams on devices that struggle with WebGL. It falls back automatically if WebGL is unavailable or a 3D scene fails.
- **Explored %**: progress bar based on the sections you have scrolled through.

## Project structure

```
src/
  main.jsx, App.jsx, styles.css
  context/AppContext.jsx      shared settings (reduced motion, 3D on/off, progress)
  data/content.js             all learning content, and quiz
  components/
    SafeCanvas.jsx            WebGL check, error boundary, loading state
    Shapes.jsx                reusable 3D objects (phone, database, screen, packets...)
    Hero.jsx, Hero3D.jsx, Introduction.jsx, Dimensions.jsx, Principles.jsx,
    Elements.jsx, Demo.jsx, Workflow.jsx, Sequence.jsx, Quiz.jsx, Seminar.jsx,
    Sidebar.jsx, Section.jsx, Tilt.jsx
```

To change any wording or add questions, edit `src/data/content.js`.

## Content accuracy notes

- The High / Medium / Low abstraction levels are a **teaching aid**; textbooks do not all define exactly these three levels.
- Data/Class, Architectural, Interface, and Component-Level Design are the commonly taught core elements. **Deployment-Level Design** is included as an additional element, and textbook classifications vary.
- The sequence diagram is an **example implementation**; real communication architecture depends on the application's design.
- No textbook quotations or references are invented. Check the definitions against your own course textbook before presenting.
