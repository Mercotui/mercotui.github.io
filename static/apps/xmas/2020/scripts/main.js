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
  var playing = false;
  var muted = false;
  // set_greetings(decoded_string, hash_string);

  snow_renderer.init();
  water_renderer.init();

  // Event handlers
  var button_play = document.getElementById('buttonPlay');
  button_play.onclick = function(event){
    if (controlls_enabled === true) {
      event.stopImmediatePropagation();
      if (playing != true){
        playing = true;
        animate_cycle();
        animate_lightup();
        audio_fade(audio, 1.0);

        snow_renderer.start();
        water_renderer.start();

        button_play.src = "assets/pause.svg";
      } else {
        playing = false;
        animate_shutdown();
        audio_fade(audio, 0.0);

        snow_renderer.stop();
        water_renderer.stop();

        button_play.src = "assets/play.svg";
      }

      if (playing && !muted){
        audio_fade(audio, 1.0);
      } else {
        audio_fade(audio, 0.0);
      }
    }
  }

  var button_mute = document.getElementById('buttonMute');
  button_mute.onclick = function(event){
    if (controlls_enabled === true) {
      event.stopImmediatePropagation();
      if (muted) {
        muted = false;
        button_mute.src = "assets/mute.svg";
      } else {
        muted = true;
        button_mute.src = "assets/music.svg";
      }

      if (playing && !muted){
        audio_fade(audio, 1.0);
      } else {
        audio.volume = 0;
        audio.pause();
      }
    }
  }

  var button_info = document.getElementById('buttonInfo');
  button_info.onclick = function(event){
    if (controlls_enabled === true) {
      event.stopImmediatePropagation();
      window.open('https://github.com/Mercotui/mercotui.github.io/tree/master/apps/xmas/2020', '_blank');
    }
  }


  document.onclick = function() {
    show_controls();
    start_controls_timer();
  }
  show_controls();
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

    setInterval(function () {
      var ubahn = document.getElementById('ubahn');
      ubahn.classList.remove('cycle');
      void ubahn.offsetWidth;
      ubahn.classList.add('cycle');
    }, 25000);
  }
}

function animate_lightup() {
  var back_light = document.getElementById('back_light');
  back_light.classList.remove('fadeout');
  back_light.classList.add('fadein');

  var bridge = document.getElementById('bridge');
  bridge.classList.remove('fadeout');
  bridge.classList.add('fadein');

  var controlls = document.getElementById('controlls');
  controlls.classList.remove('fadein');
  controlls.classList.add('fadeout');
}

function animate_shutdown() {
  var back_light = document.getElementById('back_light');
  back_light.classList.remove('fadein');
  back_light.classList.add('fadeout');

  var bridge = document.getElementById('bridge');
  bridge.classList.remove('fadein');
  bridge.classList.add('fadeout');
}

var controlls_timeout;
var controlls_enabled;
function start_controls_timer() {
  clearInterval(controlls_timeout);
  controlls_timeout = setTimeout(hide_controls, 4000);
}

function hide_controls() {
  var controlls = document.getElementById('controlls');
  controlls.classList.remove('fadein');
  controlls.classList.add('fadeout');

  controlls_enabled = false;
}

function show_controls() {
  var controlls = document.getElementById('controlls');
  controlls.classList.remove('fadeout');
  controlls.classList.add('fadein');

  controlls_enabled = true;
}
