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
  select_random_potd();

  baguetteBox.run('.gallery', {noScrollbars: true});
}

function select_random_potd () {
  let element = document.getElementById('potd-random');
  console.log(element);
}
