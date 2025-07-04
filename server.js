const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

let players = [];

function broadcast(msg, except=null) {
  players.forEach(ws => {
    if (ws !== except && ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(msg));
    }
  });
}

wss.on('connection', ws => {
  if (players.length >= 2) {
    ws.close();
    return;
  }
  players.push(ws);
  const side = players.length === 1 ? 'left' : 'right';
  ws.send(JSON.stringify({ type: 'side', side: side }));
  if (players.length === 2) {
    players.forEach(p => p.send(JSON.stringify({ type: 'ready' })));
  }

  ws.on('message', data => {
    try {
      const msg = JSON.parse(data);
      if (msg.type === 'state') {
        // Only left player sends state, relay to right
        if (side === 'left' && players.length === 2) {
          players[1].send(JSON.stringify({ type: 'state', state: msg.state }));
        }
      }
    } catch (e) {}
  });

  ws.on('close', () => {
    players = players.filter(p => p !== ws);
    broadcast({ type: 'close' });
  });
});

console.log('Pong WebSocket server running on ws://localhost:3000');