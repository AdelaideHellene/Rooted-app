import { app, db } from "./firebase.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


const auth = getAuth(app);


const plantsContainer = document.querySelector("#plants-container");

const addPlantButton = document.querySelector("#add-plant-button");


addPlantButton.addEventListener("click", function(){

    window.location.href = "plant.html";

});


// Check which user is signed in
onAuthStateChanged(auth, async function(user){

    if (!user) {

        console.log("No user is signed in.");

        window.location.href = "login.html";

        return;

    }


    console.log("🌱 Loading plants for:", user.uid);


    try {

        const plantsCollection = collection(
            db,
            "users",
            user.uid,
            "plants"
        );


        const plantsSnapshot = await getDocs(plantsCollection);


        if (plantsSnapshot.empty) {

            console.log("🌱 No plants found.");

            return;

        }


        // Remove the empty garden message
        plantsContainer.innerHTML = "";


        plantsSnapshot.forEach(function(documentSnapshot){

            const plant = documentSnapshot.data();

            const plantId = documentSnapshot.id;


            const plantElement = document.createElement("div");

            plantElement.classList.add("plant-item");


            plantElement.innerHTML = `

                <h2>${plant.name}</h2>

                <p>${plant.quantity} plants · ${plant.stage}</p>

                <p>Planted ${plant.datePlanted}</p>

            `;


            plantElement.addEventListener("click", function(){

                window.location.href = `growth.html?id=${plantId}`;

            });


            plantsContainer.appendChild(plantElement);

        });


        console.log("🌱 Plants loaded successfully!");


    } catch (error) {

        console.error("Error loading plants:", error);

    }

});

const backButton = document.querySelector("#back-button");

backButton.addEventListener("click", function(){

    window.location.href = "dashboard.html";

});