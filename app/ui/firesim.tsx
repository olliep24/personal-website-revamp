"use client";
import { useEffect } from "react";

interface FiresimProps {
  width: string;
  height: string;
}

export default function Firesim({ width, height }: FiresimProps) {
  useEffect(() => {
    // TODO: Update firesim wasm to a release build, not a debug build.
    async function run() {
      await import("firesim");
    }
    run();
  }, []);

  return <canvas id="canvas" style={{ width, height }} />;
}
