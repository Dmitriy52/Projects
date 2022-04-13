let messageWrapper = document.getElementById("messageWrapper");
let buttonStart = document.getElementById("button-start");
let buttonLeft = document.getElementById("button-left");
let buttonRight = document.getElementById("button-right");
let buttonOver = document.getElementById("button-over");

let game = {
  width: 300,
  height: 150,
  ctx: undefined,
  platform: undefined,
  ball: undefined,
  raws: 4,
  cols: 6,
  running: true,
  score: 0,
  blocks: [],
  sprites: {
    gameBackground: undefined,
    platform: undefined,
    ball: undefined,
    blueBrick: undefined,
  },
  //получаем контекст
  init: function () {
    let canvas = document.getElementById("gameCanvas");
    this.ctx = canvas.getContext("2d");
    this.ctx.font = "10px Arial";
    this.ctx.fillStyle = "white";

    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 37) {
        game.platform.dx = -game.platform.velocity;
      } else if (e.keyCode === 39) {
        game.platform.dx = game.platform.velocity;
      } else if (e.keyCode === 32) {
        game.platform.releaseBall();
        buttonStart.style.display = "none";
      }
    });

    window.addEventListener("keyup", function (e) {
      game.platform.stop();
    });
  },
  //загружаем изображения
  load: function () {
    for (let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = "../img/" + key + ".png";
    }
  },

  create: function () {
    //выводим блоки
    for (let raw = 0; raw < this.raws; raw++) {
      for (let col = 0; col < this.cols; col++) {
        this.blocks.push({
          x: 45 * col + 18,
          y: 18 * raw + 5,
          width: 41,
          height: 14,
          isAlive: true,
        });
      }
    }
  },

  start: function () {
    this.init();
    this.load();
    this.create();
    this.run();
  },
  //отрисовка
  render: function () {
    //чистим форму
    this.ctx.clearRect(0, 0, this.width, this.height);
    //выводим изображения
    this.ctx.drawImage(this.sprites.gameBackground, 0, 0);
    this.ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y);
    this.ctx.drawImage(
      this.sprites.ball,
      this.ball.width * this.ball.frame,
      0,
      this.ball.width,
      this.ball.height,
      this.ball.x,
      this.ball.y,
      this.ball.width,
      this.ball.height
    );
    this.ctx.fillText("SCORE: " + this.score, 15, this.height - 15);

    this.blocks.forEach(function (element) {
      if (element.isAlive) {
        this.ctx.drawImage(this.sprites.blueBrick, element.x, element.y);
      }
    }, this);
  },
  // логика игры
  update: function () {
    //соприкосновение мяча с платформой
    if (this.ball.collide(this.platform)) {
      this.ball.bumpPlatform(this.platform);
    }

    //отрисовываем движение платформы
    if (this.platform.dx) {
      this.platform.move();
    }

    if (this.ball.dx || this.ball.dy) {
      this.ball.move();
    }
    //соприкосновение с блоками
    this.blocks.forEach(function (element) {
      if (element.isAlive) {
        if (this.ball.collide(element)) {
          this.ball.bumpBlock(element);
        }
      }
    }, this);
    //соприкосновение со стенами
    this.ball.checkBounds();
  },

  run: function () {
    this.update();
    this.render();

    if (this.running) {
      window.requestAnimationFrame(function () {
        game.run();
      });
    }
  },

  over: function (message) {
    this.running = false;
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 32 && messageWrapper.style.display !== "none") {
        buttonOver.click();
      }
    });
    messageWrapper.style.display = "grid";
    messageWrapper.querySelector("span").textContent = message;
  },
};

game.ball = {
  width: 16,
  height: 16,
  frame: 0,
  x: 140,
  y: 119,
  dx: 0,
  dy: 0,
  velocity: 1,
  jump: function () {
    this.dx = -this.velocity;
    this.dy = -this.velocity;
    this.animate();
  },
  //смена кадров мяча
  animate: function () {
    setInterval(function () {
      ++game.ball.frame;

      if (game.ball.frame > 3) {
        game.ball.frame = 0;
      }
    }, 100);
  },

  move: function () {
    this.x += this.dx;
    this.y += this.dy;
  },
  collide: function (element) {
    let x = this.x + this.dx; //координаты след.кадра анимации
    let y = this.y + this.dy; //координаты след.кадра анимации

    if (
      x + this.width > element.x &&
      x < element.x + element.width &&
      y + this.height > element.y &&
      y < element.y + element.height
    ) {
      return true;
    }
    return false;
  },
  bumpBlock: function (block) {
    this.dy *= -1;
    block.isAlive = false;
    ++game.score;

    if (game.score >= game.blocks.length) {
      game.over("You Win!");
    }

    if (game.score === 3) {
      this.velocity = 1.5;
    }

    if (game.score === 6) {
      this.velocity = 2;
    }

    if (game.score === 12) {
      this.velocity = 2.5;
    }

    if (game.score === 18) {
      this.velocity = 3;
    }
  },
  onTheLeftSide: function (platform) {
    return this.x + this.width / 2 < platform.x + platform.width / 2;
  },

  bumpPlatform: function (platform) {
    this.dy = -this.velocity;
    this.dx = this.onTheLeftSide(platform) ? -this.velocity : this.velocity;
  },
  checkBounds: function () {
    let x = this.x + this.dx;
    let y = this.y + this.dy;

    if (x < 0) {
      this.x = 0;
      this.dx = this.velocity;
    } else if (x + this.width > game.width) {
      this.x = game.width - this.width;
      this.dx = -this.velocity;
    } else if (y < 0) {
      this.y = 0;
      this.dy = this.velocity;
    } else if (y + this.height > game.height) {
      game.over("Game Over");
    }
  },
};

game.platform = {
  x: 110,
  y: 135,
  velocity: 6,
  dx: 0,
  ball: game.ball,
  width: 79,
  height: 15,
  releaseBall: function () {
    if (this.ball) {
      this.ball.jump();
      this.ball = false;
    }
  },
  move: function () {
    if (this.x + this.width > game.width) {
      this.x += -this.velocity;
      this.dx = 0;
    } else if (this.x < 0) {
      this.x -= -this.velocity;
      this.dx = 0;
    } else {
      this.x += this.dx;
    }

    if (this.ball) {
      this.ball.x += this.dx;
    }
  },
  stop: function () {
    this.dx = 0;

    if (this.ball) {
      this.ball.dx = 0;
    }
  },
};

window.addEventListener("load", function () {
  game.start();
});

buttonStart.addEventListener("click", function () {
  game.platform.releaseBall();
  buttonStart.style.display = "none";
});

buttonLeft.addEventListener("click", function () {
  game.platform.dx = -game.platform.velocity;
  setTimeout(() => {
    game.platform.stop();
  }, 280);
});

buttonRight.addEventListener("click", function () {
  game.platform.dx = game.platform.velocity;
  setTimeout(() => {
    game.platform.stop();
  }, 280);
});
