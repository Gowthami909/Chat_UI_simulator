const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const fileInput = document.getElementById("fileInput");
const typingIndicator = document.getElementById("typingIndicator");
const userSelect = document.getElementById("userSelect");

let messages = JSON.parse(localStorage.getItem("proChat")) || [];

function saveMessages() {
    localStorage.setItem("proChat", JSON.stringify(messages));
}

function renderMessages() {
    chatBox.innerHTML = "";

    messages.forEach(msg => {
        const div = document.createElement("div");
        div.classList.add("message", msg.type);

        if (msg.image) {
            div.innerHTML = `<img src="${msg.image}">`;
        } else {
            div.textContent = msg.text;
        }

        chatBox.appendChild(div);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const text = messageInput.value.trim();
    if (text === "") return;

    messages.push({
        text,
        type: "sent",
        user: userSelect.value
    });

    messageInput.value = "";
    saveMessages();
    renderMessages();

    simulateReply();
}

function simulateReply() {
    typingIndicator.classList.remove("hidden");

    setTimeout(() => {
        typingIndicator.classList.add("hidden");

        messages.push({
            text: "Auto reply from bot 🤖",
            type: "received"
        });

        saveMessages();
        renderMessages();
    }, 1500);
}

fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        messages.push({
            image: e.target.result,
            type: "sent"
        });

        saveMessages();
        renderMessages();
    };

    reader.readAsDataURL(file);
});

function toggleTheme() {
    document.body.classList.toggle("dark");
}

function clearChat() {
    messages = [];
    saveMessages();
    renderMessages();
}

messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

renderMessages();
