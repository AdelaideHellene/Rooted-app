const plantsContainer = document.querySelector("#plants-container");


const plants = JSON.parse(localStorage.getItem("plants")) || [];


if(plants.length > 0){

    plantsContainer.innerHTML = "";


    plants.forEach(function(plant){

        const plantElement = document.createElement("div");

        plantElement.classList.add("plant-item");


        plantElement.innerHTML = `

            <h2>${plant.name}</h2>

            <p>${plant.quantity} plants · ${plant.stage}</p>

            <p>Planted ${plant.date}</p>

        `;


        plantElement.addEventListener("click", function(){

            window.location.href = `growth.html?id=${plant.id}`;

        });


        plantsContainer.appendChild(plantElement);

    });

}

const addPlantButton = document.querySelector("#add-plant-button");

addPlantButton.addEventListener("click", function(){

    window.location.href = "plant.html";

});