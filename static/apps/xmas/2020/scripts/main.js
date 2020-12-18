window.addEventListener('resize', function(){
    // const size = document.getElementById('content').offsetWidth;
    snow_renderer.resize();
    water_renderer.resize();
}, false);

window.addEventListener('load', function(){
  var audio = new Audio('assets/theAmbientVisitor-Crimble.mp3');
  audio.volume = 0.0;

  var query_string = window.location.search.substr(1);
  var hash_string = window.location.hash.substr(1);
  var decoded_string = window.atob(query_string);
  // set_greetings(decoded_string, hash_string);

  snow_renderer.init();
  water_renderer.init();

  // Event handlers
  document.ontouchstart = function(){
    animate_cycle();
    animate_lightup();
    audio_fade(audio, 1.0);

    snow_renderer.start();
    water_renderer.start();
  };
  document.ontouchend = function(){
    animate_shutdown();
    audio_fade(audio, 0.0);

    snow_renderer.stop();
    water_renderer.stop();
  };

  document.onmousedown = document.ontouchstart;
  document.onmouseup = document.ontouchend;
}, false);

var fade_interval;
function audio_fade(audio, setpoint){
  clearInterval(fade_interval);
  audio.play();

  var setVolume = setpoint;
  var delta = setVolume - audio.volume;
  if (delta > 0.0){
    var speed = 0.1;
  } else {
    var speed = -0.01;
  }

  fade_interval = setInterval(function(){
    var new_volume = audio.volume + speed;
    new_volume = Math.max(new_volume,0.0);
    new_volume = Math.min(new_volume,1.0);
    audio.volume = new_volume;

    if (delta > 0.0) {
      if (audio.volume >= setVolume || audio.volume >= 1.0) {
        clearInterval(fade_interval);
      }
    } else {
      if (audio.volume <= setVolume || audio.volume <= 0.0) {
        clearInterval(fade_interval);
        audio.pause();
      }
    }
  },50);
};

function set_greetings(custom_text, name_index){
  var text_1 = document.getElementById('text_1');
  var text_2 = document.getElementById('text_2');
  var text_3 = document.getElementById('text_3');
  var text_4 = document.getElementById('text_4');

  var lines =  custom_text.split('|');
  if (lines.length == 1){
    text_2.textContent = lines[0];
  } else if (lines.length == 2){
    text_1.textContent = lines[0];
    text_2.textContent = lines[1];
  }


  switch (name_index) {
    case '1':
      text_3.textContent = "Season's Greetings,";
      text_4.textContent = "Mercotui";
      break;
    case '2':
      text_3.textContent = "Bork Bork Bork,";
      text_4.textContent = "Mercotui";
      break;
    case '3':
      text_3.textContent = "Liefs,";
      text_4.textContent = "Menno";
      break;
    default:
  }
}

var cycle_started = false;
function animate_cycle() {
  if (!cycle_started) {
    cycle_started = true;
  }
}

function animate_lightup() {
  var back_light = document.getElementById('back_light');
  back_light.classList.remove('fadeout');
  back_light.classList.add('fadein');
}

function animate_shutdown() {
  var back_light = document.getElementById('back_light');
  back_light.classList.remove('fadein');
  back_light.classList.add('fadeout');
}
