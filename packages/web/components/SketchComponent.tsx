import dynamic from "next/dynamic";
import p5Types from "p5";
import React from "react";

import { NFT } from "../types/nft";

const Sketch = dynamic(import("react-p5"), {
  loading: () => <></>,
  ssr: false,
});

interface SketchComponentProps {
  nfts: NFT[];
}

export const SketchComponent: React.FC<SketchComponentProps> = ({ nfts }) => {
  console.log(nfts);
  const bubbles: any[] = [];
  const soulbounds: any[] = [];
  let c;
  const preload = (p5: p5Types) => {
    for (let i = 1; i <= 4; i++) {
      soulbounds.push(p5.loadImage(`soulbounds${i}.png`));
    }
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    // p5.colorMode(p5.HSB, p5.width, p5.height, 100);
    p5.noStroke();
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 200; i++) {
        bubbles.push(new colorbubble(p5, j));
      }
    }
  };

  const draw = (p5: p5Types) => {
    p5.clear();
    p5.background(51);
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 100; i++) {
        bubbles.push(new colorbubble(p5, j));
      }
    }
    for (const colorbubble of bubbles) {
      colorbubble.move();
      colorbubble.delete();
      colorbubble.display();
    }
  };

  class colorbubble {
    pos: any;
    vel: any;
    acc: any;
    size: any;
    p5: any;
    soulIndex: number;
    constructor(p5: p5Types, soulIndex: number) {
      this.pos = p5.createVector(p5.randomGaussian(p5.width / 2, 10), p5.random(0, p5.height));
      this.vel = p5.createVector(0, 0);
      this.acc = p5.createVector(p5.random(-0.1, 0.1), -0.05);
      this.size = p5.random(1, 20);
      this.p5 = p5;
      this.soulIndex = soulIndex;
    }

    move() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
    }

    delete() {
      if (this.pos.x > this.p5.width + this.size * 2 || this.pos.x < 0 - this.size * 2) {
        const index = bubbles.indexOf(this);
        bubbles.splice(index, 1);
      }
    }

    display() {
      this.p5.noStroke();
      c = soulbounds[this.soulIndex].get(this.pos.x - 50, this.pos.y);
      this.p5.fill(c);
      this.p5.ellipse(this.pos.x, this.pos.y, this.size);
    }
  }

  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch preload={preload} setup={setup} draw={draw} windowResized={windowResized} />;
};
