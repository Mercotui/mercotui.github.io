window.addEventListener('resize', function(){
    const size = document.getElementById('content').offsetWidth;
    jsCanvasSnow.resize(size, size);
    jsCanvasSnow.init();
    tree_lights.resize();
}, false);

window.addEventListener('load', function(){

  var audio = new Audio('silentnight.mp3');

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
    animate_cycle();
    animate_lightup();
    tree_lights.start();
    jsCanvasSnow.startsnow();
    audio.play();
    audio_fadein(audio);
  };
  document.ontouchend = function(){
    animate_shutdown();
    tree_lights.stop();
    audio_fadeout(audio);
    jsCanvasSnow.stopsnow();
  };

  document.onmousedown = document.ontouchstart;
  document.onmouseup = document.ontouchend;
}, false);

function audio_fadein(q){
    var InT = 0;
    var setVolume = 0.4; // Target volume level for new song
    var speed = 0.05; // Rate of increase
    q.volume = InT;
    var eAudio = setInterval(function(){
      InT += speed;
      q.volume = InT.toFixed(1);
      if(InT.toFixed(1) >= setVolume){
        clearInterval(eAudio);
        //alert('clearInterval eAudio'+ InT.toFixed(1));
      };
    },50);
};

function audio_fadeout(q){
  if(q.volume){
    var InT = 0.4;
    var setVolume = 0;
    var speed = 0.005;  // Rate of volume decrease
    q.volume = InT;
    var fAudio = setInterval(function(){
      InT -= speed;
      q.volume = InT.toFixed(1);
      if(InT.toFixed(1) <= setVolume){
        clearInterval(fAudio);
        q.pause();
        //alert('clearInterval fAudio'+ InT.toFixed(1));
      };
    },50);
  };
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
  // text_hint.classList.remove('fadeout');
  // text_hint.classList.add('fadein');

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
