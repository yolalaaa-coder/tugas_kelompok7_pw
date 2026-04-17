const questions = [
  {
    q: "CPU singkatan dari?",
    opts: ["Central Processing Unit","Computer Power Unit","Core Program Unit","Control Panel Unit"],
    ans: 0
  },
  {
    q: "Apa fungsi RAM?",
    opts: ["menyimpan data permanen"," menyimpan  data Sementara","hiasan motherboard","otak kumputer"],
    ans: 1
  },
  {
    q: "HTML digunakan untuk?",
    opts: ["Styling","Struktur web","Database","Server"],
    ans: 1
  },
  {
    q: "CSS digunakan untuk?",
    opts: ["Logika","Tampilan","Database","Server"],
    ans: 1
  },
  {
    q: "JavaScript digunakan untuk?",
    opts: ["Struktur","Tampilan","Interaksi","Database"],
    ans: 2
  }
];

let current = 0;
let score = 0;
let answered = false;

function renderQ() {
  const q = questions[current];

  document.getElementById("q-text").textContent = q.q;
  document.getElementById("counter").textContent =
    (current + 1) + " / " + questions.length;

  const optDiv = document.getElementById("options");
  optDiv.innerHTML = "";

  q.opts.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "opt-btn";
    btn.onclick = () => pick(i);
    optDiv.appendChild(btn);
  });

  document.getElementById("feedback").textContent = "";
  document.getElementById("next-btn").style.display = "none";
  document.getElementById("back-btn").style.display = current > 0 ? "inline-block" : "none";

  answered = false;
}

function pick(i) {
  if (answered) return;

  const q = questions[current];
  const btns = document.querySelectorAll(".opt-btn");

  btns.forEach(b => b.disabled = true);

  if (i === q.ans) {
    score++;
    btns[i].classList.add("correct");
    document.getElementById("feedback").textContent = "✅ Benar!";
  } else {
    btns[i].classList.add("wrong");
    btns[q.ans].classList.add("correct");
    document.getElementById("feedback").textContent = "❌ Salah!";
  }

  document.getElementById("next-btn").style.display = "inline-block";
  answered = true;
}

document.getElementById("next-btn").onclick = () => {
  current++;
  if (current < questions.length) {
    renderQ();
  } else {
    document.querySelector(".card").innerHTML =
      "<h2>Skor kamu 🏆 : " + score + "/" + questions.length + "</h2>";
  }
};

document.getElementById("back-btn").onclick = () => {
  current--;
  renderQ();
};

renderQ();