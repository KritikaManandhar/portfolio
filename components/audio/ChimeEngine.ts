"use client";

// Web Audio API Pentatonic Wind Chime Engine for Studio Ghibli Theme
class ChimeAudioManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  // Ghibli warm pentatonic scale (C5, D5, E5, G5, A5, C6)
  private readonly notes = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
  private lastNoteIndex = -1;

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ghibli_chimes_enabled");
      if (saved !== null) {
        this.isMuted = saved === "false";
      }
    }
  }

  private initCtx(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (typeof window !== "undefined") {
      localStorage.setItem("ghibli_chimes_enabled", (!muted).toString());
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    if (!this.isMuted) {
      this.playChime(2); // play friendly test note
    }
    return this.isMuted;
  }

  // Play a single soft resonant chime note
  public playChime(index?: number): void {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    let noteIdx = index ?? Math.floor(Math.random() * this.notes.length);
    if (index === undefined && noteIdx === this.lastNoteIndex) {
      noteIdx = (noteIdx + 1) % this.notes.length;
    }
    this.lastNoteIndex = noteIdx;

    const freq = this.notes[noteIdx];
    const now = ctx.currentTime;

    // Master chime gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.18, now + 0.008);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
    masterGain.connect(ctx.destination);

    // Warm Lowpass Filter for cozy acoustic vibe
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2800, now);
    filter.connect(masterGain);

    // Fundamental Tone (Sine)
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, now);
    osc1.connect(filter);

    // Harmonic Overtone for bell/chime shimmer
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(freq * 2.76, now);
    const overtoneGain = ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.04, now);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
    osc2.connect(overtoneGain);
    overtoneGain.connect(filter);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.85);
    osc2.stop(now + 1.85);
  }

  // Play a gentle 3-note breeze arpeggio
  public playBreezeChord(): void {
    if (this.isMuted) return;
    const chord = [0, 2, 4];
    chord.forEach((n, i) => {
      setTimeout(() => this.playChime(n), i * 90);
    });
  }

  // Play celebratory wind chime rush on success
  public playCelebration(): void {
    if (this.isMuted) return;
    const sequence = [0, 1, 2, 3, 4, 5];
    sequence.forEach((n, i) => {
      setTimeout(() => this.playChime(n), i * 80);
    });
  }

  // Soft paper rustle / gentle breeze sound
  public playPaperRustle(): void {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;
    const now = ctx.currentTime;

    const bufferSize = ctx.sampleRate * 0.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.setValueAtTime(1.5, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
  }
}

export const chimeEngine = typeof window !== "undefined" ? new ChimeAudioManager() : (null as unknown as ChimeAudioManager);
