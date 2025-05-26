document.addEventListener("DOMContentLoaded", function () {
  // Verificar que los elementos existen antes de asignar eventos
  const startBtn = document.getElementById("startBtn");
  const ejerciciosBtn = document.getElementById("ejerciciosBtn");
  const volverBtn = document.getElementById("volverBtn");
  const godotSprite = document.getElementById("godotSprite");
  const canvas = document.getElementById("vectorCanvas");

  if (startBtn) {
    startBtn.addEventListener("click", function () {
      if (godotSprite) {
        godotSprite.style.transform = "scale(1.1)"; // Animación de bienvenida
      }
      setTimeout(() => {
        window.location.href = "explicacion.html"; // Ir a la sección de teoría
      }, 1200);
    });
  }

  if (ejerciciosBtn) {
    ejerciciosBtn.addEventListener("click", function () {
      window.location.href = "Ejercicios.html"; // Redirigir a la página de ejercicios
    });
  }

  if (volverBtn) {
    volverBtn.addEventListener("click", function () {
      window.location.href = "index.html"; // Volver a la pantalla principal
    });
  }

  // Configuración del canvas
  if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 300;

    function dibujarVectores() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Vector A (lanzamiento) - Azul
      drawVector(50, 250, 150, 150, "blue");

      // Vector B (viento) - Rojo
      drawVector(50, 250, 250, 250, "red");

      // Vector proyectado (componente afectada) - Verde
      drawVector(150, 150, 150, 250, "green");
    }

    function drawVector(x1, y1, x2, y2, color) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.closePath();
    }

    dibujarVectores(); // Dibujar gráficos al iniciar
  }
});

// Contador de respuestas correctas
let correctAnswersCount = 0;

// Función para verificar respuestas y actualizar el contador
function checkAnswer(button, answer) {
  const correctAnswers = {
    "(3,0)": "feedback1",
    16: "feedback2",
    "(4.8,6.4)": "feedback3",
  };

  const feedbackId = correctAnswers[answer];
  const feedback = document.getElementById(feedbackId);
  const godotSprite = document.getElementById("godotSprite");

  if (feedback) {
    if (correctAnswers.hasOwnProperty(answer)) {
      feedback.innerHTML = "✅ ¡Correcto! Godot está feliz. 🎉";
      correctAnswersCount++; // Incrementar respuestas correctas
    } else {
      feedback.innerHTML =
        "❌ Incorrecto... Godot está confundido. 🤔 Intenta de nuevo.";
    }

    updateGodotImage(); // Actualizar imagen de Godot
  }
}

// Función para cambiar la imagen de Godot según el número de respuestas correctas
function updateGodotImage() {
  const godotSprite = document.getElementById("godotSprite");

  if (!godotSprite) return;

  let imagePath = "Archivos/GodotTriste.png";
  if (correctAnswersCount === 3) {
    imagePath = "Archivos/GodotMuyFeliz.png";
  } else if (correctAnswersCount === 2) {
    imagePath = "Archivos/GodotFeliz.png";
  } else if (correctAnswersCount === 1) {
    imagePath = "Archivos/GodotNeutral.png";
  }

  godotSprite.src = imagePath;

  // Animación para hacer la transición más fluida
  godotSprite.style.transform = "scale(1.1)";
  setTimeout(() => {
    godotSprite.style.transform = "scale(1)";
  }, 500);
}
const canvas = document.getElementById("vectorCanvas");
const ctx = canvas.getContext("2d");

// Definir los vectores
const u = { x: 8, y: -6 }; // Velocidad del barco
const v = { x: 4, y: 0 }; // Corriente marina

const dotProduct = u.x * v.x + u.y * v.y;
const normV2 = v.x * v.x + v.y * v.y;
const vectorProjection = {
  x: (dotProduct / normV2) * v.x,
  y: (dotProduct / normV2) * v.y,
};
const perpendicularComponent = {
  x: u.x - vectorProjection.x,
  y: u.y - vectorProjection.y,
};

function drawVector(baseX, baseY, vector, color, label) {
  ctx.beginPath();
  ctx.moveTo(baseX, baseY);
  ctx.lineTo(baseX + vector.x * 30, baseY - vector.y * 30);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.font = "14px Arial";
  ctx.fillText(label, baseX + vector.x * 30 + 5, baseY - vector.y * 30 - 5);
}

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const originX = 150,
    originY = 350;

  drawVector(originX, originY, u, "blue", "u → (8,6)"); // Ruta del barco
  drawVector(originX, originY, v, "red", "v → (4,0)"); // Corriente marina
  drawVector(originX, originY, vectorProjection, "green", "Proy. v(u)"); // Proyección sobre v
  drawVector(
    originX + vectorProjection.x * 30,
    originY - vectorProjection.y * 30,
    perpendicularComponent,
    "purple",
    "Componente ⊥"
  ); // Componente perpendicular
}

drawScene();
