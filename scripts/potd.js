const imagelist = [
  
    {
      title: "Very Distant Arnhem",
      url: "/potd/beek_arnhem.jpg"
    }
    , {
      title: "Church Window",
      url: "/potd/beek_church.jpg"
    }
    , {
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
      title: "Near Kreuzberg Market",
      url: "/potd/kreuzberg_birds.jpg"
    }
    , {
      title: "Oberbaum Before Sunset",
      url: "/potd/kreuzberg_oberbaum.jpg"
    }
    , {
      title: "Luxemburg Bank",
      url: "/potd/luxemburg_tower.jpg"
    }
    , {
      title: "Bode Museum",
      url: "/potd/museum_doors.jpg"
    }
    , {
      title: "Nijmegen Sunset",
      url: "/potd/nijmegen_bridge.jpg"
    }
    , {
      title: "Bend in the Saar",
      url: "/potd/saar_bend.jpg"
    }
    , {
      title: "Sonsbeek After Drought",
      url: "/potd/sonsbeek_sky.jpg"
    }
    , {
      title: "Velperpoort Cat",
      url: "/potd/velperpoort_cat.jpg"
    }
    , {
      title: "Venemans Mill",
      url: "/potd/venemans.jpg"
    }
]
window.onload = function () {
  select_random_potd();

  baguetteBox.run('.gallery', {noScrollbars: true});
}

function select_random_potd () {
  let element = document.getElementById('potd-random');

  if (element){
    var daily_random_number = javascript_is_dumb_random(day());
    daily_random_number = Math.floor(daily_random_number *= imagelist.length);

    let random_image = imagelist[daily_random_number];

    element.src = random_image.url;
    element.className = "potd";

    let container_element = document.getElementById('potd-random-container');
    if (container_element) {
      container_element.href = random_image.url;

    }
  }
}

function day() {
  var now = new Date();
  var fullDaysSinceEpoch = Math.floor(now/8.64e7);
  return fullDaysSinceEpoch;
}

function javascript_is_dumb_random(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}
