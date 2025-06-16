let personaText = "";

document.getElementById("persona-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const origin = document.getElementById("origin").value;
  const language = document.getElementById("language").value;
  const bio = document.getElementById("bio").value;

  personaText = `Name: ${name}\nAlter: ${age}\nHerkunft: ${origin}\nSprache: ${language}\nLebensgeschichte: ${bio}`;
  document.getElementById("persona-form").style.display = "none";
  document.getElementById("chat").style.display = "block";
});

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value;
  if (!message) return;
  appendMessage("Du", message);
  input.value = "";

  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, persona: personaText }),
  });
  const data = await res.json();
  appendMessage("Michelle110", data.text);
}

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  document.getElementById("messages").appendChild(div);
}
