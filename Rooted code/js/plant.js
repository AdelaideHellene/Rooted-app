const plantForm = document.querySelector(".plant-form");


plantForm.addEventListener("submit", function(event){

    event.preventDefault();


    const plantName = document.querySelector("#plant-name").value;

    const plantQuantity = document.querySelector("#plant-quantity").value;

    const plantDate = document.querySelector("#plant-date").value;

    const plantStage = document.querySelector("#plant-stage").value;

    const plantLocation = document.querySelector("#plant-location").value;

    const plantNotes = document.querySelector("#plant-notes").value;


    const newPlant = {

        id: Date.now(),

        name: plantName,

        quantity: plantQuantity,

        date: plantDate,

        stage: plantStage,

        location: plantLocation,

        notes: plantNotes,

        growthUpdates: []

    };


    let plants = JSON.parse(localStorage.getItem("plants")) || [];


    plants.push(newPlant);


    localStorage.setItem("plants", JSON.stringify(plants));


    window.location.href = "garden.html";

});