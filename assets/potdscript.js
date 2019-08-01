window.onload = init;

function init() {
  let images = document.getElementsByClassName('potd');

  for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("click", onImageClick);
  }
}

function onImageClick(event) {
  let element = event.target;
  uglipop({class:'modal-image', source:'html', content:'<img src="'+element.src+'"></img>'});
}
