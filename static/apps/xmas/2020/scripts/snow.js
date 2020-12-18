class Flake {
  constructor(origin, size, speed, color){
  	this.position = new Vector2(origin.x, origin.y);
    this.color = color
  	this.speed = speed;
  	this.size = size;
    this.tick = 0;
    this.opacity = 0;

  	this.update = function(delta_time, running){
      if (running) {
        this.tick += delta_time * speed;
    		this.opacity = (Math.cos(this.tick) - 1) * -0.5;
      } else {
        this.tick = 0;
        this.opacity =  Math.max((this.opacity - delta_time*speed), 0);
      }
  	};
  };
};

var snow_renderer =
{
	canvas : null,
	ctx : null,
  mask : null,
  mask_ctx : null,
	flakes : [],
	running : false,
  snowing : true,
	start_time : 0,
	frame_time : 0,

	init : function( )
	{
		// use the container width and height
		this.canvas = document.getElementById('snow_canvas');
		this.ctx = this.canvas.getContext('2d');
    this.resize();

		this.flake_amount = 50;          // amount of flakes
		this.flake_size   = [this.canvas.width/100 , this.canvas.width/10]; // min and max size
		this.flake_speed  = [0.01, 1];      // min and max blink speed
		this.flake_colors = ["#4D0A21", "#700814", "#C11F1F", "#AB5457", "#CEDEDF",
                        "#FFE77A", "#D6AE29", "#00661F", "#00661F", "#1E4812"];

    this._init_flakes();
	},

	start : function()
	{
		this.running = true;
		this.start_time = this.frame_time = microtime();
		this._loop();
	},

	stop : function()
	{
		this.running = false;
	},

  resize : function()
  {
    const canvas = document.getElementById('snow_canvas');
    this.canvas.width = canvas.offsetWidth;
    this.canvas.height = canvas.offsetHeight;
  },

	_loop : function()
	{
		snow_renderer._update();
		snow_renderer._draw();
		snow_renderer._queue();

	},

	_init_flakes : function()
	{
		// clear the flakes array
		this.flakes.length = 0;

		for ( var i = 0 ; i < this.flake_amount ; i++)
		{
			var position = new Vector2(frand(0, this.canvas.width-1), frand(0, this.canvas.height-1));
			var speed = frand(this.flake_speed[0], this.flake_speed[1]);
			var size = frand(this.flake_size[0], this.flake_size[1]);
      var color = this.flake_colors[Math.floor(Math.random() * this.flake_colors.length)];
			// var amplitude = frand(this.pAmplitude[0], this.pAmplitude[1]);

			this.flakes.push(new Flake(position, size, speed, color));
		}
	},

	_update : function()
	{
		// calculate the time since the last frame
		var now_time = microtime();
		var delta_time = now_time - this.frame_time;

		for ( var i = 0 ; i < this.flakes.length ; i++)
		{
			var flake = this.flakes[i];
      flake.update(delta_time, this.running);
		}

		// save this time for the next frame
		this.frame_time = now_time;
	},

	_draw : function()
	{
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for ( var i = 0 ; i < this.flakes.length ; i++) {
      var flake = this.flakes[i];

      this.ctx.beginPath();
  		this.ctx.arc(flake.position.x - (flake.size/2), flake.position.y - (flake.size/2), flake.size, 0, 2 * Math.PI);
  		this.ctx.closePath();

      var opacity = ("00" + Math.round(flake.opacity * 0xFF).toString(16)).slice(-2);
      this.ctx.fillStyle = flake.color + opacity;
      this.ctx.fill();
      // this.ctx.fillRect(flake.position.x - (flake.size/2), flake.position.y - (flake.size/2), flake.size, flake.size);
    }
	},

	_queue : function()
	{
		window.requestAnimationFrame( snow_renderer._loop );
	}
};
