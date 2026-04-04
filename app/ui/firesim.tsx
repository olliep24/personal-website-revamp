"use client";
import { useEffect } from "react";

export default function FireSim() {
  useEffect(() => {
    async function run() {
      await import("firesim");
    }
    run();
  }, []);

  return <canvas id="canvas" style={{ width: "32vw", height: "18vh" }} />;
}
