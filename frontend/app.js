let currentMode = "text";

// Toggle Mode
function toggleMode() {
  currentMode = document.getElementById("mode").value;

  const mics = document.querySelectorAll(".mic");
  const readBtn = document.getElementById("readBtn");

  if (currentMode === "voice") {
    mics.forEach(m => m.style.display = "inline");
    readBtn.style.display = "inline";
  } else {
    mics.forEach(m => m.style.display = "none");
    readBtn.style.display = "none";
  }
}

// Voice Input
function startVoice(id) {
  if (currentMode !== "voice") return;

  const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  rec.lang = "ta-IN";
  rec.start();

  rec.onresult = e => {
    document.getElementById(id).value = e.results[0][0].transcript;
  };
}

// Text-to-Speech
function speakText(text) {
  if (currentMode !== "voice") return;

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "ta-IN";
  window.speechSynthesis.speak(speech);
}

// Speak Response
function speakResponse() {
  speakText(document.getElementById("response").innerText);
}

// Submit
document.getElementById("form").addEventListener("submit", async e => {
  e.preventDefault();

  const data = {
    name: name.value,
    age: age.value,
    gender: gender.value,
    address: address.value,
    village: village.value,
    taluk: taluk.value,
    district: district.value,
    phone: phone.value,
    issue: issue.value
  };

  const res = await fetch("http://localhost:5000/submit", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });

  const result = await res.json();

  document.getElementById("response").innerText = result.response;

  if (currentMode === "voice") {
    speakText(result.response);
  }
});

// Init
toggleMode();
