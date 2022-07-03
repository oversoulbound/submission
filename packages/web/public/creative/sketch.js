const urlParams = new URLSearchParams(window.location.search);
const contractAddress = urlParams.get("seed");

let sketch = (p5) => {
  let { Engine, Runner, Bodies, World } = Matter;

  let engine;
  let subjects = [];
  let runner;
  let font;
  let image;
  let count = 0;
  let world;
  let ligne = [];

  let nfts = [{ phrase: "Try Polygon ID with SBTs" }];
  p5.preload = () => {
    image = p5.loadImage("polygon.png");
    font = p5.loadFont("GentiumBookPlus-Bold.ttf");
    // apiでnfts取得
    console.log(contractAddress, "contractAddress");
    let url = `https://oversoul.vercel.app/api/${contractAddress}`;
    p5.httpGet(url, "json", false, function (response) {
      nfts = response;
      console.log(nfts);
    });
  };

  p5.setup = () => {
    if (p5.windowWidth > 720) {
      p5.createCanvas(720, 720);
    } else {
      p5.createCanvas(p5.windowWidth, p5.windowWidth);
    }
    p5.noStroke();
    engine = Engine.create();
    console.log(engine);
    engine.world.gravity.x = 0;
    engine.world.gravity.y = -1;
    engine.world.gravity.scale = 0.0001;
    engine.world.gravity.isPoint = true;
    runner = Runner.create();
    world = engine.world;
    // ligne.push(new Ligne(540, 200, 10, 350, -p5.PI / 7));
    // ligne.push(new Ligne(440, 200, 10, 150, -p5.PI / 7));
    // ligne.push(new Ligne(180, 200, 10, 350, p5.PI / 7));
    // ligne.push(new Ligne(280, 200, 10, 150, p5.PI / 7));
    // ligne.push(new Ligne(650, 500, 10, 250, 0));
    // ligne.push(new Ligne(70, 500, 10, 250, 0));
    // ligne.push(new Ligne(380, 420, 60, 20, -p5.PI / 7));
    // ligne.push(new Ligne(340, 420, 60, 20, p5.PI / 7));
    // ligne.push(new Ligne(360, 380, 60, 60, 0));

    Runner.run(runner, engine);
    p5.colorMode(p5.HSB, 360, 100, 100, 100);
    p5.textFont(font);
    p5.textSize(25);
  };

  p5.draw = () => {
    let phrases = [];
    for (let i = 0; i < nfts.length; i++) {
      const words = nfts[i].phrase.split(" ");
      for (let j = 0; j < words.length; j++) {
        phrases.push(words[j]);
      }
    }
    p5.clear();
    p5.background("#171923");
    const height = p5.windowWidth > 720 ? 310 : p5.windowWidth / 2 - 50;
    const wigth = p5.windowWidth > 720 ? 310 : p5.windowWidth / 2 - 50;
    p5.image(image, height, wigth, 100, 100);
    for (let i = 0; i < ligne.length; i++) {
      ligne[i].affiche();
    }

    p5.fill(185, 10, 100);
    for (var i = 0; i < subjects.length; i++) {
      subjects[i].show();
    }

    p5.frameRate(15);
    p5.drawingContext.shadowBlur = 64;
    p5.drawingContext.shadowColor = p5.color(27, 7, 99);
    const screenWidth = p5.windowWidth > 720 ? 720 : p5.windowWidth;
    subjects.push(
      new Subject(screenWidth / 2 - p5.random(-25, 25), 650, 20, 20, phrases[count % phrases.length], p5, engine)
    );
    count++;
  };

  //   function Ligne(x, y, l, h, a) {
  //     let options = {
  //       isStatic: true,
  //       angle: a,
  //     };
  //     this.body = Bodies.rectangle(x, y, l, h, options);
  //     this.largeur = l;
  //     this.hauteur = h;
  //     World.add(world, this.body);

  //     this.affiche = function () {
  //       let position = this.body.position;
  //       let angle = this.body.angle;
  //       p5.push();
  //       p5.translate(position.x, position.y);
  //       p5.rectMode(p5.CENTER);
  //       p5.noStroke();
  //       p5.drawingContext.shadowBlur = 0;
  //       p5.fill(0, 0, 0, 0);
  //       p5.rotate(angle);
  //       p5.rect(0, 0, this.largeur, this.hauteur);
  //       p5.pop();
  //     };
  //   }
};

class Subject {
  constructor(x, y, w, h, frase, p5, engine) {
    let { Bodies, Composite } = Matter;

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

let windowFlowers = new p5(sketch);
