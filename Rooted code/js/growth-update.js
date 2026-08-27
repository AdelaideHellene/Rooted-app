const urlParams = new URLSearchParams(window.location.search);

const plantId = urlParams.get("id");


const plants = JSON.parse(localStorage.getItem("plants")) || [];


const plant = plants.find(function(item){

    return String(item.id) === String(plantId);

});


/* ==========================
   CHECK PLANT
   ========================== */

if(!plant){

    alert("Plant could not be found.");

    window.location.href = "garden.html";

}


/* ==========================
   UPDATE FORM
   ========================== */

const updateForm = document.querySelector(".update-form");


updateForm.addEventListener("submit", function(event){

    event.preventDefault();


    const updateDate = document.querySelector("#update-date").value;

    const updateChange = document.querySelector("#update-change").value;

    const updateHeight = document.querySelector("#update-height").value;

    const updateNotes = document.querySelector("#update-notes").value;

    const photoInput = document.querySelector("#update-photo");


    /* ==========================
       CREATE UPDATE
       ========================== */

    const newUpdate = {

        date: updateDate,

        change: updateChange,

        height: updateHeight,

        notes: updateNotes,

        photo: null

    };


    /* ==========================
       HANDLE PHOTO
       ========================== */

    if(photoInput.files.length > 0){

        const photoFile = photoInput.files[0];

        const reader = new FileReader();


        reader.onload = function(){

            newUpdate.photo = reader.result;

            saveUpdate();

        };


        reader.readAsDataURL(photoFile);

    } else {

        saveUpdate();

    }


    /* ==========================
       SAVE UPDATE FUNCTION
       ========================== */

    function saveUpdate(){

        if(!plant.growthUpdates){

            plant.growthUpdates = [];

        }


        plant.growthUpdates.push(newUpdate);


        localStorage.setItem("plants", JSON.stringify(plants));


        window.location.href = `growth.html?id=${plantId}`;

    }

});

const photoInput = document.querySelector("#update-photo");

const photoPreviewContainer = document.querySelector("#photo-preview-container");

const photoPreview = document.querySelector("#photo-preview");


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