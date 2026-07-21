import type { Note } from "../types";
import { NOTE_SEMESTERS, NOTE_PRESET_TAGS, NOTE_COURSES } from "../constants";

export { NOTE_SEMESTERS, NOTE_PRESET_TAGS, NOTE_COURSES };

export const seedNotes: Note[] = [
  {
    id: "n1",
    title: "Carnot Cycle — Full Derivation",
    semester: "3-1",
    courseCode: "ME 301",
    courseName: "Thermodynamics",
    topic: "Carnot Cycle",
    tags: ["Theory"],
    editorMode: "latex",
    isPinned: true,
    createdAt: "Jul 1, 2025",
    updatedAt: "Jul 7, 2025",
    contributor: "Rafid Mahmud",
    references: [
      {
        label: "MIT OCW — Thermodynamics Lecture 10",
        url: "https://youtube.com/watch?v=ry3P_fJFHoQ",
      },
      {
        label: "Cengel & Boles — Chapter 6",
        url: "https://www.scribd.com/document/123456",
      },
    ],
    attachments: [
      { name: "carnot_diagram.pdf", fileType: "pdf", size: "1.2 MB" },
    ],
    content: `\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

\\section*{Carnot Cycle}

The \\textbf{Carnot cycle} is a theoretical thermodynamic cycle proposed by Nicolas Léonard Sadi Carnot in 1824. It provides an upper bound on the efficiency that any classical thermodynamic engine can achieve.

\\subsection*{Thermal Efficiency}

The efficiency of a Carnot engine operating between a hot reservoir at temperature $T_H$ and a cold reservoir at $T_L$ is:

$$\\eta_{Carnot} = 1 - \\frac{T_L}{T_H}$$

where temperatures are in Kelvin.

\\subsection*{Four Processes}

\\begin{enumerate}
  \\item \\textbf{Isothermal Expansion} ($1 \\to 2$): Heat $Q_H$ absorbed from hot reservoir at constant $T_H$.
  \\item \\textbf{Adiabatic Expansion} ($2 \\to 3$): Work done by gas; temperature drops from $T_H$ to $T_L$.
  \\item \\textbf{Isothermal Compression} ($3 \\to 4$): Heat $Q_L$ rejected to cold reservoir at constant $T_L$.
  \\item \\textbf{Adiabatic Compression} ($4 \\to 1$): Temperature restored to $T_H$.
\\end{enumerate}

\\subsection*{Work Output}

Net work output per cycle:

$$W_{net} = Q_H - Q_L = Q_H \\left(1 - \\frac{T_L}{T_H}\\right)$$

\\end{document}`,
  },
  {
    id: "n2",
    title: "Bernoulli Equation — Derivation & Applications",
    semester: "3-1",
    courseCode: "ME 303",
    courseName: "Fluid Mechanics",
    topic: "Bernoulli Equation",
    tags: ["Theory"],
    editorMode: "latex",
    isPinned: false,
    createdAt: "Jul 3, 2025",
    updatedAt: "Jul 8, 2025",
    contributor: "Rakibul Islam",
    references: [
      {
        label: "Khan Academy — Bernoulli's Principle",
        url: "https://youtube.com/watch?v=TcMgkU3pFBY",
      },
    ],
    attachments: [],
    content: `\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

\\section*{Bernoulli's Equation}

For steady, incompressible, inviscid flow along a streamline:

$$P + \\frac{1}{2}\\rho v^2 + \\rho g z = \\text{constant}$$

where $P$ is static pressure, $\\rho$ is fluid density, $v$ is flow velocity, $g$ is gravitational acceleration, and $z$ is elevation.

\\subsection*{Derivation from Euler's Equation}

Euler's equation along a streamline:

$$\\rho \\frac{Dv}{Dt} = -\\frac{\\partial P}{\\partial s} - \\rho g \\frac{\\partial z}{\\partial s}$$

Integrating along the streamline and assuming steady flow ($\\frac{\\partial v}{\\partial t} = 0$):

$$\\int v \\, dv + \\int \\frac{dP}{\\rho} + g \\int dz = 0$$

For incompressible flow ($\\rho = \\text{const}$):

$$\\frac{v^2}{2} + \\frac{P}{\\rho} + gz = C$$

\\subsection*{Application: Venturimeter}

Flow rate through a venturi:

$$Q = A_2 \\sqrt{\\frac{2(P_1 - P_2)}{\\rho(1 - (A_2/A_1)^2)}}$$

\\end{document}`,
  },
  {
    id: "n3",
    title: "Shafts Under Combined Loading",
    semester: "3-1",
    courseCode: "ME 305",
    courseName: "Machine Elements",
    topic: "Combined Bending & Torsion",
    tags: ["Formula"],
    editorMode: "latex",
    isPinned: false,
    createdAt: "Jun 28, 2025",
    updatedAt: "Jul 5, 2025",
    contributor: "Mehedi Hasan",
    references: [
      {
        label: "Shigley's — Chapter 7",
        url: "https://youtube.com/watch?v=Wb4R8PNbxes",
      },
    ],
    attachments: [
      { name: "shaft_examples.pdf", fileType: "pdf", size: "800 KB" },
    ],
    content: `\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

\\section*{Shafts Under Combined Bending and Torsion}

\\subsection*{Maximum Normal Stress}

For a solid circular shaft of diameter $d$ subjected to bending moment $M$ and torque $T$:

$$\\sigma_{max} = \\frac{16}{\\pi d^3}\\left(M + \\sqrt{M^2 + T^2}\\right)$$

\\subsection*{Maximum Shear Stress (von Mises)}

$$\\tau_{max} = \\frac{16}{\\pi d^3}\\sqrt{M^2 + T^2}$$

\\subsection*{ASME Elliptic Criterion}

$$\\left(\\frac{\\sigma_a}{S_e}\\right)^2 + \\left(\\frac{\\sigma_m}{S_{ut}}\\right)^2 = 1$$

\\subsection*{Required Shaft Diameter}

Solving for $d$ from the DE-Goodman criterion:

$$d = \\left[\\frac{16n}{\\pi}\\left(\\frac{1}{S_e}\\sqrt{4(K_f M_a)^2 + 3(K_{fs} T_a)^2} + \\frac{1}{S_{ut}}\\sqrt{4 M_m^2 + 3 T_m^2}\\right)\\right]^{1/3}$$

\\end{document}`,
  },
  {
    id: "n4",
    title: "Newton-Raphson Method",
    semester: "3-1",
    courseCode: "ME 307",
    courseName: "Numerical Methods",
    topic: "Root Finding",
    tags: ["Theory"],
    editorMode: "rich",
    isPinned: false,
    createdAt: "Jun 20, 2025",
    updatedAt: "Jun 25, 2025",
    contributor: "Rafid Mahmud",
    references: [
      {
        label: "Numerical Methods lecture by Prof Alam",
        url: "https://youtube.com/watch?v=JFi0pHGqMCk",
      },
    ],
    attachments: [],
    content: `# Newton-Raphson Method

## Overview
An iterative root-finding algorithm that uses the tangent line at the current point to estimate the root.

## Formula
Starting from an initial guess x₀:

  x_{n+1} = x_n - f(x_n) / f'(x_n)

Repeat until |x_{n+1} - x_n| < tolerance.

## Convergence
- **Order**: Quadratic convergence near the root (error squares each iteration)
- **Condition**: Requires f'(x) ≠ 0 near the root

## Pitfalls
- Can diverge if initial guess is far from root
- Fails if f'(x_n) = 0 at any iteration
- May cycle between points for certain functions

## Example: √2 via f(x) = x² - 2
- x₀ = 1.5
- x₁ = 1.5 - (1.5² - 2)/(2×1.5) = 1.4167
- x₂ = 1.4142 (converged in 2 iterations)`,
  },
  {
    id: "n5",
    title: "Orthographic Projection Rules",
    semester: "3-1",
    courseCode: "ME 309",
    courseName: "Engineering Drawing",
    topic: "First Angle Projection",
    tags: ["Summary"],
    editorMode: "rich",
    isPinned: false,
    createdAt: "Jun 15, 2025",
    updatedAt: "Jun 16, 2025",
    contributor: "Rakibul Islam",
    references: [],
    attachments: [
      { name: "projection_examples.jpg", fileType: "image", size: "2.1 MB" },
    ],
    content: `# First Angle (European) Projection

## Setup
The object is placed in the **first quadrant** — between the observer and the projection plane.

## Views & Positions
- **Front view** — straight ahead
- **Top view** — below the front view
- **Right side view** — to the LEFT of the front view
- **Left side view** — to the RIGHT of the front view

## Key Rules
1. Hidden lines shown as dashed
2. Center lines are long-short-long dash
3. Section lines (hatching) at 45°
4. Dimensions in mm, tolerance in ±

## Symbol
The first angle projection symbol is a truncated cone seen from the narrow end (the symbol appears in the title block).

## Common Mistakes
- Confusing first vs third angle (RUET uses first angle)
- Forgetting hidden edges in side views
- Incorrect hatching direction in section views`,
  },
  {
    id: "n6",
    title: "Casting Defects & Prevention",
    semester: "3-1",
    courseCode: "ME 311",
    courseName: "Production Processes",
    topic: "Metal Casting",
    tags: ["Summary"],
    editorMode: "rich",
    isPinned: false,
    createdAt: "Jun 10, 2025",
    updatedAt: "Jun 12, 2025",
    contributor: "Mehedi Hasan",
    references: [
      {
        label: "Manufacturing Engineering — Casting lecture",
        url: "https://youtube.com/watch?v=b5kj2cXGjFI",
      },
    ],
    attachments: [],
    content: `# Casting Defects

## 1. Porosity
- **Cause**: Trapped gas or shrinkage during solidification
- **Prevention**: Proper venting, controlled pouring temperature, riser design

## 2. Cold Shuts
- **Cause**: Two streams of metal that don't fuse properly
- **Prevention**: Higher pouring temperature, faster pour rate

## 3. Misrun
- **Cause**: Metal solidifies before filling the mold completely
- **Prevention**: Higher superheat, faster pouring, better gating

## 4. Hot Tears / Hot Cracking
- **Cause**: Tensile stresses during solidification
- **Prevention**: Better mold collapsibility, avoid sharp corners

## 5. Sand Inclusions
- **Cause**: Loose sand washed into the mold cavity
- **Prevention**: Proper mold compaction, filtered gating system

## Gating System Design
- Sprue → Runner → Gate
- Gate area should be smallest to control flow
- Choke at the gate (not sprue) preferred`,
  },
  {
    id: "n7",
    title: "Fluid Statics — Pressure & Manometry",
    semester: "2-2",
    courseCode: "ME 303",
    courseName: "Fluid Mechanics",
    topic: "Hydrostatics",
    tags: ["Formula"],
    editorMode: "latex",
    isPinned: false,
    createdAt: "Jan 10, 2025",
    updatedAt: "Jan 15, 2025",
    contributor: "Rafid Mahmud",
    references: [],
    attachments: [],
    content: `\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

\\section*{Fluid Statics}

\\subsection*{Hydrostatic Pressure}

Pressure variation in a static fluid:

$$\\frac{dP}{dz} = -\\rho g$$

Integrating between two points:

$$P_2 - P_1 = -\\rho g (z_2 - z_1) = \\rho g h$$

\\subsection*{Absolute vs Gauge Pressure}

$$P_{abs} = P_{gauge} + P_{atm}$$

Standard atmosphere: $P_{atm} = 101325 \\, \\text{Pa} = 101.325 \\, \\text{kPa}$

\\subsection*{Manometry}

For a U-tube manometer with fluid of density $\\rho_m$:

$$P_A - P_B = \\rho_m g h$$

\\subsection*{Force on a Submerged Plate}

Hydrostatic force on a submerged inclined plate:

$$F_R = \\rho g \\bar{h} A$$

where $\\bar{h}$ is the depth of the centroid. The centre of pressure is:

$$y_{cp} = \\bar{y} + \\frac{I_{xx,c}}{\\bar{y} A}$$

\\end{document}`,
  },
  {
    id: "n8",
    title: "Trapezoidal Rule & Simpson's 1/3 Rule",
    semester: "3-1",
    courseCode: "ME 307",
    courseName: "Numerical Methods",
    topic: "Numerical Integration",
    tags: ["Formula"],
    editorMode: "latex",
    isPinned: false,
    createdAt: "Jul 6, 2025",
    updatedAt: "Jul 6, 2025",
    contributor: "Rakibul Islam",
    references: [
      {
        label: "Numerical Integration — 3Blue1Brown style breakdown",
        url: "https://youtube.com/watch?v=yMJ9eDFxuXA",
      },
    ],
    attachments: [],
    content: `\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

\\section*{Numerical Integration}

\\subsection*{Trapezoidal Rule}

$$\\int_a^b f(x)\\,dx \\approx \\frac{h}{2}\\left[f(x_0) + 2\\sum_{i=1}^{n-1}f(x_i) + f(x_n)\\right]$$

where $h = (b-a)/n$ is the step size.

\\textbf{Error}: $E_T = -\\frac{(b-a)^3}{12n^2}f''(\\xi)$ for some $\\xi \\in [a,b]$

\\subsection*{Simpson's 1/3 Rule}

Requires even number of intervals $n$:

$$\\int_a^b f(x)\\,dx \\approx \\frac{h}{3}\\left[f(x_0) + 4\\sum_{\\text{odd}}f(x_i) + 2\\sum_{\\text{even}}f(x_i) + f(x_n)\\right]$$

\\textbf{Error}: $E_S = -\\frac{(b-a)^5}{180n^4}f^{(4)}(\\xi)$

Simpson's rule is \\textbf{fourth-order accurate} vs second-order for trapezoidal.

\\subsection*{Comparison}

\\begin{tabular}{lll}
\\hline
Method & Order & Points needed \\\\
\\hline
Trapezoidal & $O(h^2)$ & $n+1$ \\\\
Simpson 1/3 & $O(h^4)$ & $n+1$ (n even) \\\\
Simpson 3/8 & $O(h^4)$ & $n+1$ (n mult of 3) \\\\
\\hline
\\end{tabular}

\\end{document}`,
  },
  {
    id: "n9",
    title: "Fluid Mechanics Lab Report — Venturi Meter",
    semester: "3-1",
    courseCode: "ME 303",
    courseName: "Fluid Mechanics",
    topic: "Venturi Meter Experiment",
    tags: ["Lab"],
    editorMode: "rich",
    isPinned: false,
    createdAt: "Jul 2, 2025",
    updatedAt: "Jul 4, 2025",
    contributor: "Mehedi Hasan",
    references: [],
    attachments: [
      { name: "venturi_raw_data.xlsx", fileType: "doc", size: "45 KB" },
      { name: "setup_photo.jpg", fileType: "image", size: "1.8 MB" },
    ],
    content: `# Venturi Meter Experiment — Lab Notes

## Objective
Determine the coefficient of discharge (Cd) for the given venturi meter and compare with the theoretical value.

## Apparatus
- Venturi meter (throat dia: 25mm, pipe dia: 50mm)
- Differential manometer (mercury, ρ = 13600 kg/m³)
- Collecting tank with stopwatch
- Water supply with control valve

## Procedure
1. Ensure all air bubbles are purged from manometer lines
2. Set flow rate using inlet valve
3. Record manometer readings (h₁, h₂) and collect water for 60s
4. Repeat for 5 different flow rates

## Observations (Run 3)
| Manometer diff (mm Hg) | Time (s) | Volume (L) |
|---|---|---|
| 45 | 60 | 12.4 |
| 62 | 60 | 14.7 |
| 80 | 60 | 16.5 |

## Results
- Average Cd = 0.97 (theoretical = 0.98)
- Error = 1.02% — within acceptable range

## Conclusion
The venturi meter effectively measures flow rate with high accuracy. Minor discrepancy attributed to friction losses not accounted for in ideal theory.`,
  },
  {
    id: "n10",
    title: "Laws of Thermodynamics — Concise Summary",
    semester: "3-1",
    courseCode: "ME 301",
    courseName: "Thermodynamics",
    topic: "Laws of Thermodynamics",
    tags: ["Summary"],
    editorMode: "rich",
    isPinned: true,
    createdAt: "Jun 5, 2025",
    updatedAt: "Jun 5, 2025",
    contributor: "Rafid Mahmud",
    references: [
      {
        label: "Crash Course Thermodynamics",
        url: "https://youtube.com/watch?v=4i1MUWJoI0U",
      },
    ],
    attachments: [],
    content: `# Laws of Thermodynamics

## Zeroth Law
If A is in thermal equilibrium with B, and B is in equilibrium with C, then A is in equilibrium with C.
→ **Defines temperature** as a measurable property.

## First Law (Energy Conservation)
  ΔU = Q - W

- Q = heat added to the system (+ve into system)
- W = work done BY the system (+ve out of system)
- ΔU = change in internal energy

## Second Law (Entropy)
- **Kelvin-Planck**: Impossible to convert all heat to work in a cycle.
- **Clausius**: Heat cannot flow spontaneously from cold to hot.
- Entropy of an isolated system never decreases: ΔS ≥ 0

## Third Law
As T → 0 K, entropy of a perfect crystal → 0.
→ Absolute zero is unattainable.

## Key Corollary: Clausius Inequality
  ∮ δQ/T ≤ 0  (equality for reversible, < for irreversible)`,
  },
];
