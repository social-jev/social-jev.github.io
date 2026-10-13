import { useEffect, useState } from "react";

export function usePlayback(length, interval = 2200) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(
      () => setStep((current) => (current + 1) % length),
      interval,
    );
    return () => window.clearInterval(timer);
  }, [playing, length, interval]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => {
      if (media.matches) setPlaying(false);
    };
    media.addEventListener("change", stop);
    return () => media.removeEventListener("change", stop);
  }, []);
  return {
    step,
    playing,
    toggle: () => setPlaying((current) => !current),
    choose: (index) => {
      setStep(index);
      setPlaying(false);
    },
  };
}

export function PlaybackButton({ playing, toggle, label }) {
  return (
    <button
      className="playback-button"
      onClick={toggle}
      aria-label={`${playing ? "Pause" : "Play"} ${label}`}
    >
      {playing ? "Pause" : "Play"}
    </button>
  );
}
