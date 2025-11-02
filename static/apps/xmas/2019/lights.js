// SPDX-FileCopyrightText: 2025 Menno van der Graaf <mennovandergraaf@hotmail.com>
// SPDX-License-Identifier: MIT
class Light {
  constructor(origin, size, speed, color) {
    this.position = new Vector2(origin.x, origin.y);
    this.color = color
    this.speed = speed;
    this.size = size;
    this.tick = 0;
    this.opacity = 0;

    this.update = function (delta_time, running) {
      if (running) {
        this.tick += delta_time * speed;
        this.opacity = (Math.cos(this.tick) - 1) * -0.5;
      } else {
        this.tick = 0;
        this.opacity = Math.max((this.opacity - delta_time * speed), 0);
      }
    };
  };
};

var tree_lights =
    {
      canvas: null,
      ctx: null,
      mask: null,
      mask_ctx: null,
      lights: [],
      running: false,
      snowing: true,
      start_time: 0,
      frame_time: 0,

      init: function () {
        // use the container width and height
        this.canvas = document.getElementById('lights_canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resize();

        this.mask = document.createElement('canvas');
        this.mask_ctx = this.mask.getContext('2d');
        this.mask.width = this.canvas.width;
        this.mask.height = this.canvas.height;
        var mask_image = new Image();
        mask_image.onload = () => {
          this.mask_ctx.drawImage(mask_image, 0, 0, this.mask.width, this.mask.height);
          this._init_lights();
        }
        mask_image.src = 'tree_lightmask.svg';

        this.light_amount = 1000;          // amount of lights
        this.light_size = [this.canvas.width / 30, this.canvas.width / 15]; // min and max size
        this.light_speed = [0.1, 1];      // min and max blink speed
        this.light_colors = ["#f6b30a", "#e74626", "#b9221f", "#2754a8"];
      },

      start: function () {
        this.running = true;
        this.start_time = this.frame_time = microtime();
        this._loop();
      },

      stop: function () {
        this.running = false;
      },

      resize: function () {
        const tree = document.getElementById('tree');
        this.canvas.width = tree.offsetWidth;
        this.canvas.height = tree.offsetHeight;
      },

      _loop: function () {
        tree_lights._update();
        tree_lights._draw();
        tree_lights._queue();

      },

      _init_lights: function () {
        // clear the lights array
        this.lights.length = 0;

        for (var i = 0; i < this.light_amount; i++) {
          var position = new Vector2(frand(0, this.canvas.width - 1), frand(0, this.canvas.height - 1));
          var speed = frand(this.light_speed[0], this.light_speed[1]);
          var size = frand(this.light_size[0], this.light_size[1]);
          var color = this.light_colors[Math.floor(Math.random() * this.light_colors.length)];
          // var amplitude = frand(this.pAmplitude[0], this.pAmplitude[1]);

          this.lights.push(new Light(position, size, speed, color));
        }

        var mask_data = this.mask_ctx.getImageData(0, 0, this.mask.width, this.mask.height);
        const getPixelIndex = (x, y) => {
          return (y * (mask_data.width * 4) + (x * 4)) + 3;
        };

        var i = this.lights.length
        while (i--) {
          var position = this.lights[i].position;
          const red_idx = getPixelIndex(Math.round(position.x), Math.round(position.y));
          var mask_pixel = mask_data.data[red_idx];
          if (mask_pixel == 0) {
            this.lights.splice(i, 1);
          }
        }
      },

      _update: function () {
        // calculate the time since the last frame
        var now_time = microtime();
        var delta_time = now_time - this.frame_time;

        for (var i = 0; i < this.lights.length; i++) {
          var light = this.lights[i];
          light.update(delta_time, this.running);
        }

        // save this time for the next frame
        this.frame_time = now_time;
      },

      _draw: function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.ctx.drawImage(this.mask, 0, 0);
        for (var i = 0; i < this.lights.length; i++) {
          var light = this.lights[i];
          var opacity = ("00" + Math.round(light.opacity * 0xFF).toString(16)).slice(-2);
          this.ctx.fillStyle = light.color + opacity;
          this.ctx.fillRect(light.position.x - (light.size / 2), light.position.y - (light.size / 2), light.size, light.size);
        }
      },

      _queue: function () {
        window.requestAnimationFrame(tree_lights._loop);
      }
    };

function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
