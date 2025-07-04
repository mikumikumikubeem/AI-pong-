# Simple Pong Game (with AI & Online Mode)

## Features

- **Player vs Player** (local)
- **Player vs AI**
- **Online Multiplayer** (beta, via WebSockets)

## How to Run

### 1. Install Node.js

If not installed, download from https://nodejs.org/

### 2. Start the WebSocket Server

In your project folder:

```bash
npm install ws
node server.js
```

This starts a WebSocket server at ws://localhost:3000.

### 3. Open the Game

Open `index.html` in your browser.

- For **Online Multiplayer**, open in two separate browsers/windows/computers, both connecting to the same server.

## Modes

- **Player vs Player:** W/S (left) and ↑/↓ (right).
- **Player vs AI:** W/S (left), AI controls right.
- **Online Multiplayer:** Each player controls their assigned paddle.

## Notes

- Online mode only supports 2 players.
- Both players must connect to the same server.
- For remote play, forward port 3000 or use a VPS.

---