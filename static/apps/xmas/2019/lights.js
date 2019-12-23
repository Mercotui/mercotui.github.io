class Light {
  constructor(origin, size){
  	this.origin = origin;
  	this.position = new Vector2(origin.x, origin.y);
  	this.velocity = new Vector2(0, 0);
  	this.size = size;
  	this.amplitude = 2;

  	// randomize start values a bit
  	this.dx = Math.random() * 100;

  	this.update = function(delta_time){
  		this.position.y += this.velocity.y * delta_time;

  		// oscilate the x value between -amplitude and +amplitude
  		this.dx += this.velocity.x*delta_time;
  		this.position.x = this.origin.x + (this.amplitude * Math.sin(this.dx));
  	};
  };
};

var tree_lights =
{
	canvas : null,
	ctx : null,
  mask : null,
  mask_ctx : null,
	lights : [],
	running : false,
  snowing : true,
	start_time : 0,
	frame_time : 0,

	init : function( )
	{
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
    }
    mask_image.src = 'tree_lightmask.svg';

		this.light_amount = 1000;         // amount of lights
		this.light_size = [0.5 , 2.0];    // min and max size
		// this.pSwing = [0.1, 1];      // min and max oscilation speed for x movement
		this.light_speed = [10, 50];     // min and max y speed
		// this.pAmplitude = [25, 50];  // min and max distance for x movement
	},

	start : function()
	{
    this._init_lights();
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
    const tree = document.getElementById('tree');
    this.canvas.width = tree.offsetWidth;
    this.canvas.height = tree.offsetHeight;
  },

	_loop : function()
	{
		if ( tree_lights.running )
		{
			tree_lights._update();
			tree_lights._draw();
			tree_lights._queue();
		}
	},

	_init_lights : function()
	{
		// clear the lights array
		this.lights.length = 0;

		for ( var i = 0 ; i < this.light_amount ; i++)
		{
			var position = new Vector2(frand(0, this.canvas.width), frand(0, this.canvas.height));
			// var velocity = new Vector2(frand(this.pSwing[0],this.pSwing[1]), frand(this.pSpeed[0],this.pSpeed[1]));
			var size = frand(this.light_size[0], this.light_size[1]);
			// var amplitude = frand(this.pAmplitude[0], this.pAmplitude[1]);

			this.lights.push(new Light(position, size));
		}

    var mask_data = this.mask_ctx.createImageData(this.mask.width, this.mask.height);
    const getPixelIndex = (x, y) => {
      return y * (this.mask.width * 4) + x * 4;
    };

    var i = this.lights.length
    while (i--) {
      var position = this.lights[i].position;
      const red_idx = getPixelIndex(position.x, position.y);
      var mask_pixel = mask_data[red_idx];
      if (!mask_pixel) {
        // this.lights.splice(i, 1);
      }
    }
	},

	_update : function()
	{
		// calculate the time since the last frame
		var now_time = microtime();
		var delta_time = now_time - this.frame_time;

		for ( var i = 0 ; i < this.lights.length ; i++)
		{
			var light = this.lights[i];

      // if ((light.position.y - light.size) < this.canvas.height){
      //   light.update(delta_time);
      // } else if (this.snowing) {
			// 	// reset the light to the top and a random x position
			// 	light.position.y = -light.size;
			// 	light.position.x = light.origin.x = Math.random() * this.canvas.width;
			// 	light.dx = Math.random() * 100;
			// }
		}

		// save this time for the next frame
		this.frame_time = now_time;
	},

	_draw : function()
	{
    if (this.mask !== null && this.mask.complete){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.mask, 0, 0);
      this.ctx.fillStyle = "blue";
      // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  		for ( var i = 0 ; i < this.lights.length ; i++)
  		{
  			var light = this.lights[i];
        this.ctx.fillRect(light.position.x, light.position.y, light.size, light.size);
  		}
    }
	},

	_queue : function()
	{
		window.requestAnimationFrame( tree_lights._loop );
	}
};

function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
