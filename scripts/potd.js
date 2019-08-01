const imagelist = [
  
    {
      title: "Brussels Tram",
      url: "/potd/brussels_tram.jpg"
    }
    , {
      title: "Den Bosch Sint Jan",
      url: "/potd/denbosch_church.jpg"
    }
    , {
      title: "Groningen Sunset",
      url: "/potd/groningen_church.jpg"
    }
    , {
      title: "Nijmegen Sunset",
      url: "/potd/nijmegen_bridge.jpg"
    }
    , {
      title: "Sonsbeek After Drought",
      url: "/potd/sonsbeek_sky.jpg"
    }
    , {
      title: "Velperpoort Cat",
      url: "/potd/velperpoort_cat.jpg"
    }
]
window.onload = function () {
  let images = document.getElementsByClassName('potd');

  for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("click", onImageClick);
  }
}

function onImageClick(event) {
  let element = event.target;
  //
  // var modal = new tingle.modal({
  //     footer: true,
  //     stickyFooter: false,
  //     closeMethods: ['overlay', 'button', 'escape'],
  //     closeLabel: "Close",
  //     cssClass: ['custom-class-1', 'custom-class-2'],
  //     onOpen: function() {
  //         console.log('modal open');
  //     },
  //     onClose: function() {
  //         console.log('modal closed');
  //     },
  //     beforeClose: function() {
  //         // here's goes some logic
  //         // e.g. save content before closing the modal
  //         return true; // close the modal
  //         return false; // nothing happens
  //     }
  // });
  //
  // // set content
  // modal.setContent('<h1>here\'s some content</h1>');
  //
  // // add a button
  // modal.addFooterBtn('Button label', 'tingle-btn tingle-btn--primary', function() {
  //     // here goes some logic
  //     modal.close();
  // });
  //
  // // add another button
  // modal.addFooterBtn('Dangerous action !', 'tingle-btn tingle-btn--danger', function() {
  //     // here goes some logic
  //     modal.close();
  // });
  //
  // // open modal
  // modal.open();

  var modal = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    // cssClass: ['modal-image']
    });

    // set content
    modal.setContent('<img src="'+element.src+'" class="modal-image"></img>');
    modal.checkOverflow();
    modal.open();
}
