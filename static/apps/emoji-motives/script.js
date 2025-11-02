// SPDX-FileCopyrightText: 2025 Menno van der Graaf <mennovandergraaf@hotmail.com>
// SPDX-License-Identifier: MIT

const inputsNames = ["canvasWidth", "canvasHeight", "canvasColor", "characters", "paddingChar", "offset", "columns", "rows"];
let inputs = {};
let canvas;

window.onload = (event) => {
  canvas = document.querySelector("#canvas");

  for (const name of inputsNames.values()) {
    const input = document.querySelector("#" + name);
    if (!input) {
      console.error("Query failed for input id: " + name)
      continue;
    }

    input.oninput = update;
    inputs[name] = input;
  }

  document.querySelector("#regenerate").onclick = update;

  update();
}

function update() {
  const settings = getSettings()
  configureCanvas(settings);
  generate(settings);
}

function getSettings() {
  return {
    canvasWidth: parseInt(inputs["canvasWidth"].value),
    canvasHeight: parseInt(inputs["canvasHeight"].value),
    canvasColor: inputs["canvasColor"].value,
    charset: inputs["characters"].value.split(","),
    offset: parseInt(inputs["offset"].value),
    paddingChar: inputs["paddingChar"].value,
    columns: parseInt(inputs["columns"].value),
    rows: parseInt(inputs["rows"].value),
  }
}

function configureCanvas(settings) {
  if (canvas.width !== settings.canvasWidth) {
    canvas.style.width = settings.canvasWidth + "px";
  }
  if (canvas.height !== settings.canvasHeight) {
    canvas.style.height = settings.canvasHeight + "px";
  }
  if (canvas.style.backgroundColor !== settings.canvasColor) {
    canvas.style.backgroundColor = settings.canvasColor;
  }
}

function generate(settings) {
  const count = settings.columns * settings.rows;
  let output = "";

  for (i = 0; i < count; i++) {
    if (i !== 0 && i % settings.columns === 0) {
      output += "</tr><tr>";
    }

    let char = settings.paddingChar;
    if (i % settings.offset === 0) {
      let charIndex = Math.floor(Math.random() * settings.charset.length);
      char = settings.charset[charIndex];
    }
    output += "<td>" + char + "</td>";
  }

  canvas.innerHTML = "<table><tr>" + output + "</tr></table>"
}
