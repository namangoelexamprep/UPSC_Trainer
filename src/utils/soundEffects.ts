/**
 * Synthetic Web Audio effects for UPSC Map Trainer
 * Zero external audio downloads, 100% offline compliant.
 */

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function toggleSound(): boolean {
  soundEnabled = !soundEnabled;
  try {
    localStorage.setItem('upsc_map_sound', JSON.stringify(soundEnabled));
  } catch {}
  return soundEnabled;
}

export function isSoundEnabled(): boolean {
  try {
    const val = localStorage.getItem('upsc_map_sound');
    if (val !== null) return JSON.parse(val);
  } catch {}
  return soundEnabled;
}

/**
 * Pleasant ascending harmonic chime for correct guess or location
 */
export function playSuccessChime() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  const now = ctx.currentTime;

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.08);

    gain.gain.setValueAtTime(0.001, now + idx * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.08);
    osc.stop(now + idx * 0.08 + 0.36);
  });
}

/**
 * Soft curious pluck for hint reveals
 */
export function playHintSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.exponentialRampToValueAtTime(660, now + 0.12);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.23);
}

/**
 * Triumphant fanfare for quiz completion or badge unlock
 */
export function playFanfare() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const chords = [
    { freq: 523.25, time: 0.0 }, // C5
    { freq: 659.25, time: 0.1 }, // E5
    { freq: 783.99, time: 0.2 }, // G5
    { freq: 1046.5, time: 0.32 }, // C6
    { freq: 1318.51, time: 0.44 } // E6
  ];
  const now = ctx.currentTime;

  chords.forEach((c) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(c.freq, now + c.time);

    gain.gain.setValueAtTime(0.001, now + c.time);
    gain.gain.exponentialRampToValueAtTime(0.2, now + c.time + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + c.time + 0.55);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + c.time);
    osc.stop(now + c.time + 0.56);
  });
}

/**
 * Centering meditative bowl chime for beginning Deep Work map revision
 */
export function playFocusStartChime() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Fundamental + octave + fifth overtone (Singing bowl harmony)
  const partials = [
    { freq: 432, gain: 0.15, decay: 1.2 },
    { freq: 864, gain: 0.08, decay: 0.9 },
    { freq: 1296, gain: 0.04, decay: 0.6 }
  ];

  partials.forEach((p) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(p.freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(p.gain, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + p.decay + 0.05);
  });
}

/**
 * Resonant completion bell when a Deep Work block concludes
 */
export function playFocusCompleteChime() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const bellPitches = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C major pentatonic bells

  bellPitches.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.1);

    gain.gain.setValueAtTime(0.001, now + idx * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.1 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.1);
    osc.stop(now + idx * 0.1 + 1.25);
  });
}

/**
 * Ultra-subtle wooden clock tick for rhythmic focus (zero distraction)
 */
export function playFocusTick() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.015);

  gain.gain.setValueAtTime(0.02, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.018);
}

