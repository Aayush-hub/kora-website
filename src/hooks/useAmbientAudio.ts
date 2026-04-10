import { useEffect, useRef, useCallback } from "react";

// Synthesized birds chirping + nature ambience using Web Audio API
export const useAmbientAudio = () => {
  const ctxRef = useRef<AudioContext | null>(null);
  const activeRef = useRef(false);

  const playChirp = useCallback((ctx: AudioContext, masterGain: GainNode) => {
    const now = ctx.currentTime;
    const freq = 2000 + Math.random() * 3000;
    const duration = 0.05 + Math.random() * 0.12;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * (0.8 + Math.random() * 0.4), now + duration);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.015 + Math.random() * 0.01, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    osc.connect(gain);
    gain.connect(masterGain);
    
    osc.start(now);
    osc.stop(now + duration + 0.05);
    
    // Sometimes do a double chirp
    if (Math.random() > 0.5) {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      const delay = 0.08 + Math.random() * 0.06;
      
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(freq * 1.2, now + delay);
      osc2.frequency.exponentialRampToValueAtTime(freq * 0.9, now + delay + duration);
      
      gain2.gain.setValueAtTime(0, now + delay);
      gain2.gain.linearRampToValueAtTime(0.012, now + delay + 0.01);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + delay + duration);
      
      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.start(now + delay);
      osc2.stop(now + delay + duration + 0.05);
    }
  }, []);

  const start = useCallback(() => {
    if (activeRef.current) return;
    
    try {
      const ctx = new AudioContext();
      ctxRef.current = ctx;
      activeRef.current = true;
      
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.6, ctx.currentTime);
      masterGain.connect(ctx.destination);
      
      // Random chirps
      const scheduleChirp = () => {
        if (!activeRef.current) return;
        playChirp(ctx, masterGain);
        const nextDelay = 200 + Math.random() * 2000;
        setTimeout(scheduleChirp, nextDelay);
      };
      
      // Start multiple "bird" patterns
      setTimeout(() => scheduleChirp(), 500);
      setTimeout(() => scheduleChirp(), 1200);
      setTimeout(() => scheduleChirp(), 2500);
      
      // Soft wind noise
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.003;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;
      
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "lowpass";
      noiseFilter.frequency.setValueAtTime(400, ctx.currentTime);
      
      noise.connect(noiseFilter);
      noiseFilter.connect(masterGain);
      noise.start();
    } catch {
      // Web Audio not supported
    }
  }, [playChirp]);

  const stop = useCallback(() => {
    activeRef.current = false;
    if (ctxRef.current) {
      ctxRef.current.close();
      ctxRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return { start, stop };
};
