"use client";
import { useEffect } from "react";

interface FiresimProps {
  width: string;
  height: string;
}

export default function Firesim({ width, height }: FiresimProps) {
  useEffect(() => {
    async function run() {
      await import("firesim");
    }
    run();
  }, []);

  return <canvas id="canvas" style={{ width, height }} />;
}
