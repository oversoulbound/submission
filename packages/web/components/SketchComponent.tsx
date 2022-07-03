import dynamic from "next/dynamic";
import p5Types from "p5";
import React from "react";
import Matter from "matter-js";
import { useBreakpointValue } from "@chakra-ui/react";

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
  let { Engine, Bodies, Composite, Runner } = Matter;

  let engine: any;
  let subjects: any[] = [];
  let runner;
  let ground, wallA, wallB;
  let font: any;
  let image: any;

  const canvasWidth = useBreakpointValue({ base: 400, md: 500 });

  const preload = (p5: p5Types) => {
    image = p5.loadImage("creative/polygon.png");
    font = p5.loadFont("creative/GentiumBookPlus-Bold.ttf");
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    console.log(canvasParentRef);
    p5.createCanvas(canvasWidth as number, 500).parent(canvasParentRef);
    p5.noStroke();
    engine = Engine.create();
    ground = Bodies.rectangle(200, 500, 600, 20, {
      isStatic: true,
    });
    wallA = Bodies.rectangle(0, 200, 20, 500, {
      isStatic: true,
    });
    wallB = Bodies.rectangle(500, 200, 20, 500, {
      isStatic: true,
    });

    engine.world.gravity.x = 0;
    engine.world.gravity.y = -1;
    engine.gravity.scale = 0.0001;

    Composite.add(engine.world, [ground, wallA, wallB]);
    runner = Runner.create();

    Runner.run(runner, engine);
    p5.colorMode(p5.HSB, 360, 100, 100, 100);
    p5.textFont(font);
    p5.textSize(25);
  };

  let count = 0;

  const draw = (p5: p5Types) => {
    let phrases: string[] = [];
    for (let i = 0; i < nfts.length; i++) {
      const words = nfts[i].phrase.split(" ");
      for (let j = 0; j < words.length; j++) {
        phrases.push(words[j]);
      }
    }
    p5.clear();
    p5.background("#171923");
    const height = p5.windowWidth > 500 ? 180 : p5.windowWidth / 2 - 50;
    const width = p5.windowWidth > 500 ? 180 : p5.windowWidth / 2 - 50;
    p5.image(image, height, width, 100, 100);
    p5.fill(185, 10, 100);
    for (var i = 0; i < subjects.length; i++) {
      subjects[i].show();
    }
    p5.frameRate(10);
    // @ts-ignore
    p5.drawingContext.shadowBlur = 64;
    // @ts-ignore
    p5.drawingContext.shadowColor = p5.color(27, 7, 99);
    subjects.push(
      new Subject(
        (canvasWidth as number) / 2 - p5.random(-50, 50),
        500,
        20,
        20,
        phrases[count % phrases.length],
        p5,
        engine
      )
    );
    count++;

    // if (subjects.length > 500) {
    //   subjects.shift();
    // }
  };

  // const windowResized = (p5: p5Types) => {
  //   p5.resizeCanvas(500, 500);
  // };

  class Subject {
    body: any;
    restitution = 0.8;
    composite: any;
    p5: p5Types;
    frase = "";

    constructor(x: any, y: any, w: any, h: any, frase: string, p5: p5Types, engine: any) {
      this.body = Bodies.rectangle(x, y, w, h);
      Composite.add(engine.world, this.body);
      this.p5 = p5;
      this.frase = frase;
    }

    show() {
      var angle = this.body.angle;
      this.p5.push();
      this.p5.translate(this.body.position.x, this.body.position.y);
      this.p5.rotate(angle);
      this.p5.rectMode(this.p5.CENTER);
      this.p5.textAlign(this.p5.CENTER);

      this.p5.text(this.frase, 0, 0);

      this.p5.pop();
    }
  }

  return <Sketch preload={preload} setup={setup} draw={draw} />;
};
