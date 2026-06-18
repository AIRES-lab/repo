const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const canvas = document.querySelector("#agentMap");
const context = canvas?.getContext("2d");

function resizeCanvas() {
  if (!canvas || !context) return;
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.round(rect.width * ratio);
  canvas.height = Math.round(rect.height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

const nodes = [
  { x: 0.16, y: 0.22, r: 5, c: "#3bd6c6" },
  { x: 0.32, y: 0.34, r: 4, c: "#7ca7ff" },
  { x: 0.54, y: 0.22, r: 6, c: "#f0b84f" },
  { x: 0.72, y: 0.38, r: 4, c: "#3bd6c6" },
  { x: 0.82, y: 0.68, r: 7, c: "#ee5d5d" },
  { x: 0.58, y: 0.74, r: 4, c: "#7ca7ff" },
  { x: 0.38, y: 0.62, r: 6, c: "#3bd6c6" },
  { x: 0.2, y: 0.76, r: 4, c: "#f0b84f" },
];

const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 0],
  [1, 6],
  [2, 5],
  [0, 4],
];

function draw(time = 0) {
  if (!canvas || !context) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  context.clearRect(0, 0, width, height);

  context.lineWidth = 1;
  edges.forEach(([from, to], index) => {
    const a = nodes[from];
    const b = nodes[to];
    const pulse = (Math.sin(time / 900 + index) + 1) / 2;
    context.strokeStyle = `rgba(174, 187, 183, ${0.16 + pulse * 0.22})`;
    context.beginPath();
    context.moveTo(a.x * width, a.y * height);
    context.lineTo(b.x * width, b.y * height);
    context.stroke();
  });

  nodes.forEach((node, index) => {
    const x = node.x * width;
    const y = node.y * height;
    const pulse = (Math.sin(time / 720 + index * 1.7) + 1) / 2;

    context.fillStyle = "rgba(238, 245, 242, 0.06)";
    context.beginPath();
    context.arc(x, y, node.r * (4.5 + pulse), 0, Math.PI * 2);
    context.fill();

    context.fillStyle = node.c;
    context.beginPath();
    context.arc(x, y, node.r, 0, Math.PI * 2);
    context.fill();
  });

  context.strokeStyle = "rgba(59, 214, 198, 0.32)";
  context.lineWidth = 1;
  for (let i = 0; i < 5; i += 1) {
    const y = height * (0.17 + i * 0.14);
    context.beginPath();
    context.moveTo(width * 0.08, y);
    for (let x = width * 0.08; x < width * 0.94; x += 24) {
      const wave = Math.sin(x / 48 + time / 800 + i) * 9;
      context.lineTo(x, y + wave);
    }
    context.stroke();
  }

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.requestAnimationFrame(draw);
  }
}

if (canvas && context) {
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  draw();
}
