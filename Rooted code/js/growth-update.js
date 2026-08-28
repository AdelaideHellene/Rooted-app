import { app, db } from "./firebase.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
    doc,
    getDoc,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


const auth = getAuth(app);


// Get plant ID from URL
const urlParams = new URLSearchParams(window.location.search);

const plantId = urlParams.get("id");


// Get form elements
const updateForm = document.querySelector(".update-form");

const photoInput = document.querySelector("#update-photo");

const photoPreviewContainer = document.querySelector("#photo-preview-container");

const photoPreview = document.querySelector("#photo-preview");


// Check plant ID
if (!plantId) {

    alert("Plant could not be found.");

    window.location.href = "garden.html";

}


// Preview selected photo
photoInput.addEventListener("change", function(){

    const photoFile = photoInput.files[0];


    if(photoFile){

        const reader = new FileReader();


        reader.onload = function(event){

            photoPreview.src = event.target.result;

            photoPreviewContainer.style.display = "block";

        };


        reader.readAsDataURL(photoFile);

    }

});


// Check current user
onAuthStateChanged(auth, async function(user){

    if(!user){

        alert("Please sign in first.");

        window.location.href = "login.html";

        return;

    }


    // Make sure the plant actually belongs to this user
    try {

        const plantReference = doc(
            db,
            "users",
            user.uid,
            "plants",
            plantId
        );


        const plantSnapshot = await getDoc(plantReference);


        if(!plantSnapshot.exists()){

            alert("Plant could not be found.");

            window.location.href = "garden.html";

            return;

        }


        console.log("🌱 Plant found:", plantSnapshot.data());


        // Handle form submission
        updateForm.addEventListener("submit", async function(event){

            event.preventDefault();


            const updateDate =
                document.querySelector("#update-date").value;

            const updateChange =
                document.querySelector("#update-change").value;

            const updateHeight =
                document.querySelector("#update-height").value;

            const updateNotes =
                document.querySelector("#update-notes").value;


            // Create update data
            const newUpdate = {

    date: updateDate,

    change: updateChange,

    height: updateHeight,

    notes: updateNotes,

    photo: null,

    createdAt: serverTimestamp()

};


            // Handle photo
            if(photoInput.files.length > 0){

                const photoFile = photoInput.files[0];


                const reader = new FileReader();


                reader.onload = async function(){

                    newUpdate.photo = reader.result;

                    await saveUpdate(
                        user.uid,
                        newUpdate
                    );

                };


                reader.readAsDataURL(photoFile);

            } else {

                await saveUpdate(
                    user.uid,
                    newUpdate
                );

            }

        });


    } catch(error){

        console.error("Error finding plant:", error);

    }

});


// Save update to Firestore
async function saveUpdate(userId, update){

    try {

        await addDoc(

            collection(
                db,
                "users",
                userId,
                "plants",
                plantId,
                "updates"
            ),

            update

        );


        console.log("🌱 Growth update saved!");


        window.location.href =
            `growth.html?id=${plantId}`;


    } catch(error){

        console.error(
            "Error saving growth update:",
            error
        );

        alert(error.message);

    }

}

const backButton = document.querySelector("#back-button");

backButton.addEventListener("click", function(){

    window.location.href = `growth.html?id=${plantId}`;

});