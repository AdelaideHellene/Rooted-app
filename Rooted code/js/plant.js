import { app, db } from "./firebase.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


const auth = getAuth(app);


const plantForm = document.querySelector(".plant-form");


plantForm.addEventListener("submit", async function(event){

    event.preventDefault();


    const plantName = document.querySelector("#plant-name").value;

    const quantity = Number(
        document.querySelector("#plant-quantity").value
    );

    const datePlanted = document.querySelector("#plant-date").value;

    const stage = document.querySelector("#plant-stage").value;

    const location = document.querySelector("#plant-location").value;

    const notes = document.querySelector("#plant-notes").value;


    const user = auth.currentUser;


    if (!user) {

        alert("Please sign in before adding a plant.");

        window.location.href = "login.html";

        return;

    }


    try {

        await addDoc(
            collection(db, "users", user.uid, "plants"),
            {

                name: plantName,

                quantity: quantity,

                datePlanted: datePlanted,

                stage: stage,

                location: location,

                notes: notes,

                createdAt: serverTimestamp()

            }
        );


        console.log("🌱 Plant saved to Firestore!");


        alert("🌱 Plant added successfully!");


        window.location.href = "garden.html";


    } catch (error) {

        console.error("Error adding plant:", error);

        alert(error.message);

    }

});

const backButton = document.querySelector("#back-button");

backButton.addEventListener("click", function(){

    window.location.href = "garden.html";

});