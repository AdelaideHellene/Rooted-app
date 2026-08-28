import { app } from "./firebase.js";

const startButton = document.querySelector("#start-button");

startButton.addEventListener("click", function(){

    window.location.href = "welcome.html";

});

console.log("🌱 Firebase connected!", app);