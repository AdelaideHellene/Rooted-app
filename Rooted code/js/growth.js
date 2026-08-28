import { app, db } from "./firebase.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
    doc,
    getDoc,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


const auth = getAuth(app);


// Get the plant ID from the URL
const urlParams = new URLSearchParams(window.location.search);

const plantId = urlParams.get("id");


// Get the page elements
const plantName = document.querySelector("#plant-name");

const plantStatus = document.querySelector("#plant-status");

const plantQuantity = document.querySelector("#plant-quantity");

const plantDate = document.querySelector("#plant-date");

const plantLocation = document.querySelector("#plant-location");

const growthContainer = document.querySelector("#growth-container");

const addUpdateButton = document.querySelector("#add-update-button");


// Add update button
addUpdateButton.addEventListener("click", function(){

    window.location.href = `growth-update.html?id=${plantId}`;

});


// Check the logged-in user
onAuthStateChanged(auth, async function(user){

    if (!user) {

        console.log("No user is signed in.");

        window.location.href = "login.html";

        return;

    }


    if (!plantId) {

        console.error("No plant ID found in URL.");

        return;

    }


    try {

        // Get this specific plant
        const plantReference = doc(
            db,
            "users",
            user.uid,
            "plants",
            plantId
        );


        const plantSnapshot = await getDoc(plantReference);


        if (!plantSnapshot.exists()) {

            console.log("🌱 Plant not found.");

            return;

        }


        const plant = plantSnapshot.data();


        console.log("🌱 Plant loaded:", plant);


        // Display plant information
        plantName.textContent = plant.name;

        plantStatus.textContent = plant.stage;

        plantQuantity.textContent = plant.quantity;

        plantDate.textContent = plant.datePlanted;

        plantLocation.textContent = plant.location || "Not specified";


        // Load growth updates
        const updatesCollection = collection(
            db,
            "users",
            user.uid,
            "plants",
            plantId,
            "updates"
        );


        const updatesSnapshot = await getDocs(updatesCollection);


        if (updatesSnapshot.empty) {

            console.log("🌱 No growth updates yet.");

            return;

        }


        // Remove empty message
        growthContainer.innerHTML = "";


        const updates = [];


        updatesSnapshot.forEach(function(updateDocument){

            updates.push({

                id: updateDocument.id,

                ...updateDocument.data()

            });

        });


        // Show newest updates first
        updates.reverse();


        updates.forEach(function(update){

            const updateElement = document.createElement("div");

            updateElement.classList.add("growth-update");


            updateElement.innerHTML = `

                <p class="update-date">
                    ${update.date || ""}
                </p>

                <h3>
                    ${update.change || ""}
                </h3>

                ${
                    update.height
                    ? `<p class="update-height">${update.height} cm</p>`
                    : ""
                }

                ${
                    update.notes
                    ? `<p class="update-notes">${update.notes}</p>`
                    : ""
                }

                ${
                    update.photo
                    ? `<img class="update-photo" src="${update.photo}" alt="Growth update photo">`
                    : ""
                }

            `;


            growthContainer.appendChild(updateElement);

        });


        console.log("🌱 Growth updates loaded!");


    } catch (error) {

        console.error("Error loading plant:", error);

    }

});

const backButton = document.querySelector("#back-button");

backButton.addEventListener("click", function(){

    window.location.href = "garden.html";

});