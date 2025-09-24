const hexInput = document.getElementById("hex-input");
const colorPreview = document.getElementById("color-preview");

const hueValue = document.getElementById("h-value");
const saturationValue = document.getElementById("s-value");
const brightnessValue = document.getElementById("b-value");

const hueSlider = document.getElementById("hue-slider");
const saturationSlider = document.getElementById("saturation-slider");
const brightnessSlider = document.getElementById("brightness-slider");

function hexToRgb(hex) {
  let r = 0,
    g = 0,
    b = 0;
  // 3 digits
  if (hex.length == 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
    // 6 digits
  } else if (hex.length == 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }
  return { r: +r, g: +g, b: +b };
}

function rgbToHsb(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    v = max;

  let d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    b: Math.round(v * 100),
  };
}

function updateConverter() {
  const hexColor = hexInput.value;

  if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexColor)) {
    colorPreview.style.backgroundColor = hexColor;

    const { r, g, b } = hexToRgb(hexColor);
    const { h, s, b: brightness } = rgbToHsb(r, g, b);

    hueValue.textContent = h + "°";
    saturationValue.textContent = s + "%";
    brightnessValue.textContent = brightness + "%";

    hueSlider.value = h;
    saturationSlider.value = s;
    brightnessSlider.value = brightness;
  }
}

// Event listener para o campo de entrada
hexInput.addEventListener("input", updateConverter);

// Chamada inicial para o valor padrão
updateConverter();
