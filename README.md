# MetroWay

> Delhi Metro shortest path finder and fare planner built with Dijkstra's algorithm, featuring a C++ algorithmic engine and a React web interface.

[![C++](https://img.shields.io/badge/C%2B%2B-17-blue.svg)](https://isocpp.org/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-4.2-646cff.svg)](https://vitejs.dev/)
[![Algorithm](https://img.shields.io/badge/Algorithm-Dijkstra's%20Shortest%20Path-orange.svg)](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## Demo

<p align="center">
  <video src="metroway.mp4" width="100%" controls></video>
</p>

If your environment does not play inline video tags, open or download [metroway.mp4](./metroway.mp4).

---

## Overview

MetroWay calculates the shortest travel path between stations on the Delhi Metro network. It models 25 key stations and 38 track connections as an undirected weighted graph, then uses Dijkstra's algorithm to determine the optimal route based on physical track distance in kilometers.

The repository contains two implementations:
1. **C++ core engine (`cpp/Path_Tracker.cpp`)**: A terminal application using an adjacency list and min-heap priority queue to demonstrate graph algorithms.
2. **React interface (`src/`)**: A client-side web application running the same graph logic in JavaScript so users can pick stations, view route chains, simulate cash ticket payments, and inspect the official transit map without needing a backend server.

---

## How it works

### Graph representation
The metro system is modeled as an undirected weighted graph:
* **Vertices (25 stations)**: Major junction points across the Red, Blue, Yellow, Violet, and Pink lines.
* **Edges (38 track segments)**: Weighted by direct track distance between neighboring stations in kilometers.

### Algorithm flow
1. The user selects an origin station and a destination station.
2. The pathfinder initializes all station distances to infinity, setting the origin station to 0.
3. A min-heap priority queue extracts the station with the smallest tentative distance.
4. For each neighboring station, the engine evaluates whether reaching it through the current station reduces its total distance.
5. When a shorter distance is found, the value is updated and the predecessor is recorded in a parent map.
6. Once the destination station is reached, the engine backtracks through the parent map to reconstruct the complete station order.
7. Total fare is calculated based on distance brackets, and transit time is estimated at average metro cruising speeds.

```
Origin Station
      │
      ▼
Min-Heap Priority Queue (std::priority_queue in C++ / Distance relaxation in JS)
      │
      ▼
Edge Relaxation (Track Distances in KM)
      │
      ▼
Predecessor Map Backtracking
      │
      ▼
Optimal Station Chain + Distance (KM) + Travel Time (min) + Fare (₹)
```

---

## Features

* **Shortest path generator**: Computes the quickest route between any two stations on the network.
* **Separated results view**: Displays the station sequence in one card and the journey metrics (distance and estimated minutes) in another.
* **Digital QR ticket and receipt slip**: Generates a scannable entry QR code along with a downloadable PNG receipt containing origin, destination, fare, and ticket status.
* **Wallet simulator**: LocalStorage-backed cash balance counter with a confirmation modal before deducting fares.
* **Vector map lightbox**: Compact preview card that opens the official Delhi Metro map (`Metro.pdf`) in a full-screen PDF viewer.

---

## Project structure

```
MetroWay/
├── cpp/
│   └── Path_Tracker.cpp       # C++ graph engine and CLI Dijkstra pathfinder
├── public/
│   ├── Metro.pdf              # Official vector Delhi Metro map
│   ├── delhi_metro_map.png    # Map preview graphic
│   └── logo.png               # App icon
├── src/
│   ├── components/
│   │   ├── Header.jsx         # App title and live wallet balance
│   │   ├── RouteForm.jsx      # Origin and destination dropdowns
│   │   ├── RouteResults.jsx   # Route chain and metric breakdown
│   │   ├── TicketView.jsx     # QR code ticket and receipt generator
│   │   ├── InteractiveMap.jsx # Map card and PDF viewer modal
│   │   └── PaymentModal.jsx   # Cash payment confirmation modal
│   ├── utils/
│   │   └── graph.js           # Client-side 25-station graph and Dijkstra logic
│   ├── App.jsx                # Root React component
│   ├── index.css              # Custom styles using Geist typography
│   └── main.jsx               # Vite entry point
├── metroway.mp4               # Demo walkthrough video
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Getting started

### 1. Web application (React + Vite)

You need Node.js 18 or higher installed.

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

To create an optimized production build:

```bash
npm run build
```

### 2. C++ terminal engine

You can compile the C++ source with any C++17 compiler (such as Clang or GCC):

```bash
# Compile
clang++ -std=c++17 cpp/Path_Tracker.cpp -o metro_tracker

# Run
./metro_tracker
```

The CLI menu provides options to print all 25 stations, inspect connections across the network map, or enter source and destination station names to compute the shortest path.

---

## Algorithmic complexity

| Parameter | Value | Details |
| :--- | :--- | :--- |
| **Time complexity** | $\mathcal{O}((V + E) \log V)$ | Min-heap distance relaxation |
| **Space complexity** | $\mathcal{O}(V + E)$ | Adjacency list storing stations and edge weights |
| **Vertices ($V$)** | 25 | Key interchange and terminal stations |
| **Edges ($E$)** | 38 | Bidirectional track connections |

---

## License

This project is licensed under the MIT License.
