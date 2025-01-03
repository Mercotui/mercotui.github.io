window.addEventListener('resize', function(){
    const size = document.getElementById('content').offsetWidth;
    jsCanvasSnow.resize(size, size);
    jsCanvasSnow.init();
    tree_lights.resize();
}, false);

window.addEventListener('load', function(){
  var audio = new Audio('silentnight.mp3');
  audio.volume = 0.0;

  var query_string = window.location.search.substr(1);
  var hash_string = window.location.hash.substr(1);
  var decoded_string = window.atob(query_string);
  set_greetings(decoded_string, hash_string);

  jsCanvasSnow.init();
  const size = document.getElementById('content').offsetWidth;
  jsCanvasSnow.resize(size, size);
  jsCanvasSnow.start();

  tree_lights.init();

  // Event handlers
  document.ontouchstart = function(){
    var text_hint = document.getElementById('text_hint');
    text_hint.textContent = "Hold for Lights";

    animate_cycle();
    animate_lightup();
    tree_lights.start();
    jsCanvasSnow.startsnow();
    audio_fade(audio, 1.0);
  };
  document.ontouchend = function(){
    animate_shutdown();
    tree_lights.stop();
    jsCanvasSnow.stopsnow();
    audio_fade(audio, 0.0);
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
    setInterval(function () {
      var train = document.getElementById('train');
      train.classList.remove('cycle');
      void train.offsetWidth;
      train.classList.add('cycle');
    }, 20000);

    setInterval(function () {
      var bike = document.getElementById('bike');
      bike.classList.remove('cycle');
      void bike.offsetWidth;
      bike.classList.add('cycle');
    }, 15000);
  }
}

function animate_lightup() {
  var back_light = document.getElementById('back_light');
  back_light.classList.remove('fadeout');
  back_light.classList.add('fadein');

  var tree = document.getElementById('tree');
  tree.classList.remove('fadeout');
  tree.classList.add('fadein');

  var text_1 = document.getElementById('text_1');
  text_1.classList.remove('fadeout');
  text_1.classList.add('fadein');

  var text_2 = document.getElementById('text_2');
  text_2.classList.remove('fadeout');
  text_2.classList.add('fadein');

  var text_hint = document.getElementById('text_hint');
  text_hint.classList.remove('fadein');
  text_hint.classList.add('fadeout');

  var text_3 = document.getElementById('text_3');
  text_3.classList.remove('fadeout');
  text_3.classList.add('fadein');

  var text_4 = document.getElementById('text_4');
  text_4.classList.remove('fadeout');
  text_4.classList.add('fadein');
}

function animate_shutdown() {
  var back_light = document.getElementById('back_light');
  back_light.classList.remove('fadein');
  back_light.classList.add('fadeout');

  var tree = document.getElementById('tree');
  tree.classList.remove('fadein');
  tree.classList.add('fadeout');

  var text_1 = document.getElementById('text_1');
  text_1.classList.remove('fadein');
  text_1.classList.add('fadeout');

  var text_2 = document.getElementById('text_2');
  text_2.classList.remove('fadein');
  text_2.classList.add('fadeout');

  var text_hint = document.getElementById('text_hint');
  text_hint.classList.remove('fadeout');
  text_hint.classList.add('fadein');

  var text_3 = document.getElementById('text_3');
  text_3.classList.remove('fadein');
  text_3.classList.add('fadeout');

  var text_4 = document.getElementById('text_4');
  text_4.classList.remove('fadein');
  text_4.classList.add('fadeout');

  // document.getElementById('text_hint').classList.add('fadeout');
  // var marginLeft = window.getComputedStyle(boxOne).getPropertyValue('margin-left');
  // boxOne.style.marginLeft = marginLeft;
  // boxOne.classList.remove('horizTranslate');
}
