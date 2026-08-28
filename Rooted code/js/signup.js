import { app, db } from "./firebase.js";

import {
    getAuth,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


const auth = getAuth(app);


const signupForm = document.querySelector(".signup-form");


signupForm.addEventListener("submit", async function(event){

    event.preventDefault();


    const name = document.querySelector("#name-field").value;

    const email = document.querySelector("#email-field").value;

    const password = document.querySelector("#password-field").value;


    try {

        // Create the Firebase Authentication account
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );


        const user = userCredential.user;


        // Save the user's profile in Firestore
        await setDoc(doc(db, "users", user.uid), {

            name: name,

            email: email

        });


        // Keep this for your existing dashboard for now
        localStorage.setItem("studentName", name);


        console.log("🌱 Account created!", user);

        console.log("🌱 User profile saved to Firestore!");


        window.location.href = "dashboard.html";


    } catch (error) {

        console.error("Signup error:", error);

        alert(error.message);

    }

});