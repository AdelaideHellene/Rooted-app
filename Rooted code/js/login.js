import { app } from "./firebase.js";

import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";


const auth = getAuth(app);


const loginForm = document.querySelector(".login-form");


loginForm.addEventListener("submit", async function(event){

    event.preventDefault();


    const email = document.querySelector("#email-field").value;

    const password = document.querySelector("#password-field").value;


    try {

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );


        console.log("🌱 Signed in!", userCredential.user);


        window.location.href = "dashboard.html";


    } catch (error) {

        console.error("Login error:", error);

        alert(error.message);

    }

});