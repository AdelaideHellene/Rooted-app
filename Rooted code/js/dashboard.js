import { app, db } from "./firebase.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
    doc,
    getDoc,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


const auth = getAuth(app);


// ==========================
// GET ELEMENTS
// ==========================

const gardenButton = document.querySelector("#garden-button");

const addPlantButton = document.querySelector("#add-plant-button");

const userName = document.querySelector("#user-name");

const plantCount = document.querySelector("#plant-count");

const logoutButton = document.querySelector("#logout-button");

const activitySection = document.querySelector(".activity");


// ==========================
// BUTTONS
// ==========================

logoutButton.addEventListener("click", async function(){

    try {

        await signOut(auth);

        console.log("🌱 User signed out.");

        window.location.href = "login.html";

    } catch (error) {

        console.error("Logout error:", error);

        alert(error.message);

    }

});


gardenButton.addEventListener("click", function(){

    window.location.href = "garden.html";

});


addPlantButton.addEventListener("click", function(){

    window.location.href = "plant.html";

});


// ==========================
// CHECK CURRENT USER
// ==========================

onAuthStateChanged(auth, async function(user){

    if (!user) {

        console.log("No user is signed in.");

        window.location.href = "login.html";

        return;

    }


    console.log("🌱 Current user:", user.uid);


    try {

        // ==========================
        // LOAD USER PROFILE
        // ==========================

        const userDocument = await getDoc(
            doc(db, "users", user.uid)
        );


        if (userDocument.exists()) {

            const userData = userDocument.data();

            userName.textContent = userData.name;

            console.log(
                "🌱 User profile loaded:",
                userData
            );

        }


        // ==========================
        // GET USER'S PLANTS
        // ==========================

        const plantsCollection = collection(
            db,
            "users",
            user.uid,
            "plants"
        );


        const plantsSnapshot = await getDocs(
            plantsCollection
        );


        // ==========================
        // PLANT COUNT
        // ==========================

        const numberOfPlants = plantsSnapshot.size;

        plantCount.textContent = numberOfPlants;


        console.log(
            "🌱 Number of plants:",
            numberOfPlants
        );


        // ==========================
        // RECENT ACTIVITY
        // ==========================

        const activities = [];


        for (const plantDocument of plantsSnapshot.docs) {

            const plant = plantDocument.data();

            const plantId = plantDocument.id;


            const updatesCollection = collection(
                db,
                "users",
                user.uid,
                "plants",
                plantId,
                "updates"
            );


            const updatesSnapshot = await getDocs(
                updatesCollection
            );


            updatesSnapshot.forEach(function(updateDocument){

                const update = updateDocument.data();


                activities.push({

                    plantName: plant.name,

                    change: update.change,

                    height: update.height,

                    date: update.date,

                    createdAt: update.createdAt

                });

            });

        }


        // ==========================
        // SORT ACTIVITIES
        // ==========================

        activities.sort(function(a, b){

            const timeA = a.createdAt
                ? a.createdAt.toMillis()
                : 0;

            const timeB = b.createdAt
                ? b.createdAt.toMillis()
                : 0;

            return timeB - timeA;

        });


        // ==========================
        // SHOW RECENT ACTIVITY
        // ==========================

        if (activities.length > 0) {

            const sectionTitle =
                activitySection.querySelector(".section-title");


            activitySection.innerHTML = "";

            activitySection.appendChild(sectionTitle);


            activities.slice(0, 5).forEach(function(activity){

                const activityElement =
                    document.createElement("div");


                activityElement.classList.add(
                    "activity-item"
                );


                activityElement.innerHTML = `

                    <h3>
                        ${activity.plantName}
                    </h3>

                    <p>
                        ${activity.change}
                    </p>

                    ${
                        activity.height
                        ? `<span>${activity.height} cm</span>`
                        : ""
                    }

                    <small>
                        ${activity.date}
                    </small>

                `;


                activitySection.appendChild(
                    activityElement
                );

            });


        } else {

            console.log(
                "🌱 No recent activity yet."
            );

        }


    } catch (error) {

        console.error(
            "Error loading dashboard:",
            error
        );

    }

});