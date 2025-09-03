## Lemaire 3D Rocket Website

A static 3D interactive website showcasing the Lemaire rocket using Three.js and React. Users can drag to rotate the rocket and scroll to reveal its full height.

⸻

### Project Core Structure
```
my-app/
├─ public/
│  └─ Lemaire.glb       # 3D rocket model
├─ src/
│  ├─ 3d.jsx            # Three.js scene & rocket setup
│  ├─ App.css            # Styles for the site
│  └─ index.js           # React entry point
├─ package.json
└─ README.md
```

⸻

### Features
	•	Fully interactive 3D rocket model.
	•	Drag rotation: Click and drag horizontally to rotate the rocket.
	•	Scroll reveal: Camera moves vertically to reveal the entire rocket as you scroll.
	•	Responsive design that adjusts to window resizing.
	•	Static website to update upcoming events, no backend required. Just awesome signature interactive 3D stuff :)

⸻

### Technology Stack
	•	React – Frontend framework
	•	Three.js – 3D rendering engine
	•	GLTFLoader – Load .glb 3D models
	•	CSS – For styling and layout

⸻

### Installation & Setup
	1.	Clone the repository

```
git clone <repo>
cd <repo-name>
```

	2.	Install Node.js dependencies

```npm install```

	3.	Install Three.js and dependencies (if not already included in package.json)

```npm install three```

	4.	Start the development server
 As always, hit it with the:

```npm start```

	5.	Open the app

Navigate to http://localhost:3000 in your browser (for now til domain name is purchased!)

⸻
### Usage
	•	Drag the rocket: Click anywhere on the canvas and move your mouse left or right.
	•	Scroll: Scroll down the page to move the camera along the rocket and reveal its full length.

⸻

### Notes
	•	The 3D model file Lemaire.glb must be present in the public folder.
	•	Designed as a static site; can be deployed to GitHub Pages or any static hosting service.

