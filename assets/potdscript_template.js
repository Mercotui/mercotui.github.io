// SPDX-FileCopyrightText: 2025 Menno van der Graaf <mennovandergraaf@hotmail.com>
// SPDX-License-Identifier: MIT

const imagelist = [
  {{ $potd_page := site.GetPage "potd" }}
  {{ $images := $potd_page.Resources.Get "images.yaml" | transform.Unmarshal }}
  {{ range $year := $images  }}
    {{ range $meta := $year.photos }}{
      {{ $photo := $potd_page.Resources.GetMatch $meta.src }}
        title: "{{ $meta.title }}",
        url: "{{ $photo.Permalink }}"
      },{{ end }}{{ end }}
]

window.onload = set_potd;

function set_potd() {
  select_random_potd();
  baguetteBox.run('.gallery', {noScrollbars: true, animation: false});
}

function select_random_potd() {
  let element = document.getElementById('potd-random');

  const daily_random_index = Math.floor(javascript_is_dumb_random(day()) * imagelist.length);
  let random_image = imagelist[daily_random_index];

  element.src = random_image.url;
  element.className = "potd";

  let container_element = document.getElementById('potd-random-container');
  if (container_element) {
    container_element.href = random_image.url;

  }
}

function day() {
  // Divide current timestamp by milliseconds per day, to return total days since epoch
  return Math.floor(new Date() / 8.64e7);
}

function javascript_is_dumb_random(seed) {
  // Guess JS doesn't have a random generator that takes a seed value 🤷
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
