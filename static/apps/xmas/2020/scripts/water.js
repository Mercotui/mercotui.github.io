class Wave {
  constructor(height, speed, offset, color){
    this.color = color
  	this.speed = speed;
  	this.height = height;
    this.offset = offset;
    this.tick = 0;


  	this.update = function(delta_time, running){
      if (running) {
        this.tick += delta_time * speed;
        this._calculate_bezier();
      }
  	};

    this._calculate_bezier = function () {
        this.Left = (Math.pow( Math.sin(this.tick + this.offset), 2 ) * 100) + this.height;
        this.Right = (Math.pow( Math.sin(this.tick + this.offset + 10), 2 ) * 100) + this.height;
        this.LeftConstraint = (Math.pow( Math.sin(this.tick + this.offset + 2), 2 ) * 100) + this.height;
        this.RightConstraint = (Math.pow( Math.sin(this.tick + this.offset + 1), 2) * 100) + this.height;
    };

    this._calculate_bezier();
  };
};

var water_renderer =
{
	canvas : null,
	ctx : null,
	waves : [],
	running : false,
	start_time : 0,
	frame_time : 0,

	init : function( )
	{
		// use the container width and height
		this.canvas = document.getElementById('water_canvas');
		this.ctx = this.canvas.getContext('2d');
    this.resize();

    this.opacity = 0;
    this.opacity_fadein = 0.0002;
    this.opacity_fadeout = 0.003;
		this.wave_amount = 3;              // amount of waves
    this.wave_height = [0, 0.25, 0.5];
		this.wave_offset = [0, 3.14];      // min and max size
		this.wave_speed  = [0.01, 0.1];    // min and max speed
		this.wave_colors = ["#082630", "#0b3441", "#00506b"];

    this._init_waves();
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
    const canvas = document.getElementById('water_canvas');
    this.canvas.width = canvas.offsetWidth;
    this.canvas.height = canvas.offsetHeight;
  },

	_loop : function()
	{
		water_renderer._update();
		water_renderer._draw();
		water_renderer._queue();

	},

	_init_waves : function()
	{
		// clear the waves array
		this.waves.length = 0;

		for ( var i = 0 ; i < this.wave_amount ; i++)
		{
			var speed = frand(this.wave_speed[0], this.wave_speed[1]);
      var offset = frand(this.wave_offset[0], this.wave_offset[1]);
			var height = this.wave_height[i] * this.canvas.height;
      var color = this.wave_colors[i];

			this.waves.push(new Wave(height, speed, offset, color));
		}
	},

	_update : function()
	{
		// calculate the time since the last frame
		var now_time = microtime();
		var delta_time = now_time - this.frame_time;

		for ( var i = 0 ; i < this.waves.length ; i++)
		{
			var wave = this.waves[i];
      wave.update(delta_time, this.running);
		}

    if (this.running) {
      this.opacity = Math.min(1, (this.opacity + this.opacity_fadein));
    } else {
      this.opacity = Math.max(0, (this.opacity - this.opacity_fadeout));
    }

		// save this time for the next frame
		this.frame_time = now_time;
	},

	_draw : function()
	{
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // draw the waves
		for ( var i = 0 ; i < this.waves.length ; i++) {
      var wave = this.waves[i];

      // outline the wave
      this.ctx.beginPath();
      this.ctx.moveTo(0, wave.Left);
      // ctx.lineTo(canvas.width, randomRight);
      this.ctx.bezierCurveTo(this.canvas.width / 3, wave.LeftConstraint, this.canvas.width / 3 * 2, wave.RightConstraint, this.canvas.width, wave.Right);
      this.ctx.lineTo(this.canvas.width , this.canvas.height);
      this.ctx.lineTo(0, this.canvas.height);
      this.ctx.lineTo(0, wave.Left);
      this.ctx.closePath();

      // convert opacity from range [0,1] to string hex value between ["00","FF"]
      var opacity = ("00" + Math.round(this.opacity * 0xFF).toString(16)).slice(-2);

      this.ctx.fillStyle = wave.color + opacity;
      this.ctx.fill();
    }
	},

	_queue : function()
	{
		window.requestAnimationFrame( water_renderer._loop );
	}
};
