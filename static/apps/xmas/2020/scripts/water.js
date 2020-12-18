class Wave {
  constructor(origin, size, speed, color){
  	this.position = new Vector2(origin.x, origin.y);
    this.color = color
  	this.speed = speed;
  	this.size = size;
    this.tick = 0;


  	this.update = function(delta_time, running){
      if (running) {
        this.tick += delta_time * speed;
        this._calculate_bezier();
      }
  	};

    this._calculate_bezier = function () {
        this.Left = Math.abs(Math.pow( Math.sin(this.tick), 2 )) * 100;
        this.Right = Math.abs(Math.pow( Math.sin((this.tick) + 10), 2 )) * 100;
        this.LeftConstraint = Math.abs(Math.pow( Math.sin((this.tick)+2), 2 )) * 100;
        this.RightConstraint = Math.abs(Math.pow( Math.sin((this.tick)+1), 2)) * 100;
    };

    this._calculate_bezier();
  };
};

var water_renderer =
{
	canvas : null,
	ctx : null,
  mask : null,
  mask_ctx : null,
	waves : [],
	running : false,
  watering : true,
	start_time : 0,
	frame_time : 0,

	init : function( )
	{
		// use the container width and height
		this.canvas = document.getElementById('water_canvas');
		this.ctx = this.canvas.getContext('2d');
    this.resize();

		this.wave_amount = 3;                                             // amount of waves
		this.wave_size   = [this.canvas.width/100 , this.canvas.width/2]; // min and max size
		this.wave_speed  = [0.01, 1];                                     // min and max speed
		this.wave_colors = ["#00506b", "#0b3441", "#082630"];

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
			var position = new Vector2(frand(0, this.canvas.width-1), frand(0, this.canvas.height-1));
			var speed = frand(this.wave_speed[0], this.wave_speed[1]);
			var size = frand(this.wave_size[0], this.wave_size[1]);
      var color = this.wave_colors[i];
			// var amplitude = frand(this.pAmplitude[0], this.pAmplitude[1]);

			this.waves.push(new Wave(position, size, speed, color));
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

		// save this time for the next frame
		this.frame_time = now_time;
	},

	_draw : function()
	{
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for ( var i = 0 ; i < this.waves.length ; i++) {
      var wave = this.waves[i];

      this.ctx.beginPath();
      this.ctx.moveTo(0, wave.Left);
      // ctx.lineTo(canvas.width, randomRight);
      this.ctx.bezierCurveTo(this.canvas.width / 3, wave.LeftConstraint, this.canvas.width / 3 * 2, wave.RightConstraint, this.canvas.width, wave.Right);
      this.ctx.lineTo(this.canvas.width , this.canvas.height);
      this.ctx.lineTo(0, this.canvas.height);
      this.ctx.lineTo(0, wave.Left);
      this.ctx.closePath();

      var opacity = "ff";//("00" + Math.round(wave.opacity * 0xFF).toString(16)).slice(-2);
      this.ctx.fillStyle = wave.color + opacity;
      this.ctx.fill();
      // this.ctx.fillRect(wave.position.x - (wave.size/2), wave.position.y - (wave.size/2), wave.size, wave.size);
    }
	},

	_queue : function()
	{
		window.requestAnimationFrame( water_renderer._loop );
	}
};
