// Frontend-friendly simulation of grinder automation.
// In a real deployment, the backend will host the actual discord.js-selfbot logic.
// This module exposes an event-driven simulator to unblock UI wiring now.

class Emitter {
  constructor() {
    this.listeners = new Map();
  }
  on(evt, cb) {
    if (!this.listeners.has(evt)) this.listeners.set(evt, new Set());
    this.listeners.get(evt).add(cb);
    return () => this.off(evt, cb);
  }
  off(evt, cb) {
    if (this.listeners.has(evt)) this.listeners.get(evt).delete(cb);
  }
  emit(evt, payload) {
    if (!this.listeners.has(evt)) return;
    for (const cb of this.listeners.get(evt)) cb(payload);
  }
}

const COMMAND_INTERVAL = 3000;
const CYCLE_INTERVAL = 45000;

const active = new Map(); // token -> interval ids
const emitter = new Emitter();

function maskToken(token) {
  if (!token) return 'INVALID_TOKEN';
  return token.slice(0, 4) + '...' + token.slice(-4);
}

function addToken(token, channelId) {
  emitter.emit('log', { ts: Date.now(), message: `Added token ${maskToken(token)} for channel ${channelId}` });
  return { token, channelId, active: false };
}

function startToken(token, channelId) {
  if (active.has(token)) return;
  const commands = ['pls beg', 'pls hunt', 'pls dig', 'pls bal'];
  emitter.emit('log', { ts: Date.now(), message: `Starting cycle for ${maskToken(token)} in #${channelId}` });
  emitter.emit('status', { token, active: true });

  const send = async () => {
    const cmd = commands[Math.floor(Math.random() * commands.length)];
    emitter.emit('log', { ts: Date.now(), message: `[${maskToken(token)}] Sent command: ${cmd}` });
    emitter.emit('stats', { token, delta: { commands: 1 } });
    // Random loot/coins simulation
    if (Math.random() < 0.6) {
      const coins = Math.floor(Math.random() * 120);
      emitter.emit('stats', { token, delta: { coins } });
    }
    if (Math.random() < 0.3) {
      emitter.emit('stats', { token, delta: { animals: 1, catches: 1 } });
      emitter.emit('log', { ts: Date.now(), message: `[${maskToken(token)}] caught an animal` });
    } else if (Math.random() < 0.25) {
      emitter.emit('stats', { token, delta: { items: 1, catches: 1 } });
      emitter.emit('log', { ts: Date.now(), message: `[${maskToken(token)}] found an item` });
    }
  };

  const cmdInterval = setInterval(send, COMMAND_INTERVAL);
  const cycleInterval = setInterval(() => {
    emitter.emit('log', { ts: Date.now(), message: `[${maskToken(token)}] Cycle tick` });
  }, CYCLE_INTERVAL);
  active.set(token, { cmdInterval, cycleInterval });
}

function stopToken(token) {
  if (!active.has(token)) return;
  const timers = active.get(token);
  clearInterval(timers.cmdInterval);
  clearInterval(timers.cycleInterval);
  active.delete(token);
  emitter.emit('status', { token, active: false });
  emitter.emit('log', { ts: Date.now(), message: `Stopped client for ${maskToken(token)}` });
}

export const grinder = {
  on: (...args) => emitter.on(...args),
  addToken,
  startToken,
  stopToken,
  maskToken,
};
