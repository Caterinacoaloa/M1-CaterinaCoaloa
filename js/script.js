const generarBoton = document.getElementById("boton-generar");
const paleta = document.getElementById("paleta");
const selectorColores = document.getElementById("colores");
const Selectorformato = document.getElementById("formato");
const coloresActuales = [];


generarBoton.addEventListener("click", () => {
  const cantidadColores = Number(selectorColores.value);
  const formatoElegido = Selectorformato.value;
  paleta.replaceChildren();

  for (let i = 0; i < cantidadColores; i += 1) {
    const colorAnterior = coloresActuales[i];
    const color = colorAnterior?.bloqueado
      ? colorAnterior
      : { ...generarColorAleatorio(), bloqueado: false };
    coloresActuales[i] = color;
    const tarjeta = document.createElement("article");
    const muestra = document.createElement("div");
    const codigo = document.createElement("p");
    const botonBloqueo = document.createElement("button");

    tarjeta.classList.add("tarjeta-color");
    muestra.classList.add("muestra-color");
    muestra.style.backgroundColor = color.hsl;

    codigo.classList.add("codigo-color");
    codigo.textContent = formatoElegido === "rgba" ? color.rgba : color.hex;

    botonBloqueo.classList.add("boton-bloqueo");
    botonBloqueo.type = "button";
    botonBloqueo.setAttribute("aria-pressed", String(color.bloqueado));
    botonBloqueo.setAttribute(
      "aria-label",
      `${color.bloqueado ? "Desbloquear" : "Bloquear"} color ${i + 1}`
    );
    botonBloqueo.textContent = color.bloqueado ? "Desbloquear" : "Bloquear";
    botonBloqueo.addEventListener("click", () => {
      color.bloqueado = !color.bloqueado;
      botonBloqueo.setAttribute("aria-pressed", String(color.bloqueado));
      botonBloqueo.setAttribute(
        "aria-label",
        `${color.bloqueado ? "Desbloquear" : "Bloquear"} color ${i + 1}`
      );
      botonBloqueo.textContent = color.bloqueado ? "Desbloquear" : "Bloquear";
    });

    tarjeta.append(muestra, codigo, botonBloqueo);
    paleta.appendChild(tarjeta);
  }

  coloresActuales.length = cantidadColores;
});


function getRandomNumber(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;

}

function generarColorAleatorio( ) {
    const hue = getRandomNumber(0, 359);
    const saturation = getRandomNumber(0, 100);
    const lightness = getRandomNumber(0, 100);
    const hex = hslToHex(hue, saturation, lightness);
    const hexSinNumeral = hex.slice(1);
    const rojo = parseInt(hexSinNumeral.slice(0, 2), 16);
    const verde = parseInt(hexSinNumeral.slice(2, 4), 16);
    const azul = parseInt(hexSinNumeral.slice(4, 6), 16);

    return {
      hex,
      hue,
      saturation,
      lightness,
      hsl: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
      rgba: `rgba(${rojo}, ${verde}, ${azul}, 1)`,
    };
}


function hslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, '0');
    };

    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}
