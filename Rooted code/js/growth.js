const plants = JSON.parse(localStorage.getItem("plants")) || [];

const urlParams = new URLSearchParams(window.location.search);

const plantId = urlParams.get("id");


/* ==========================
   FIND PLANT
   ========================== */

const plant = plants.find(function(item){

    return String(item.id) === String(plantId);

});


/* ==========================
   DISPLAY PLANT INFORMATION
   ========================== */

if(plant){

    document.querySelector("#plant-name").textContent = plant.name;

    document.querySelector("#plant-status").textContent = plant.stage;

    document.querySelector("#plant-quantity").textContent = plant.quantity;

    document.querySelector("#plant-date").textContent = plant.date;

    document.querySelector("#plant-location").textContent = plant.location;

}


/* ==========================
   ADD UPDATE BUTTON
   ========================== */

const addUpdateButton = document.querySelector("#add-update-button");


if(addUpdateButton){

    addUpdateButton.addEventListener("click", function(){

        window.location.href = `growth-update.html?id=${plantId}`;

    });

}


/* ==========================
   DISPLAY GROWTH UPDATES
   ========================== */

const growthContainer = document.querySelector("#growth-container");


if(plant && plant.growthUpdates && plant.growthUpdates.length > 0){

    growthContainer.innerHTML = "";


    [...plant.growthUpdates].reverse().forEach(function(update){

        const updateElement = document.createElement("div");

        updateElement.classList.add("growth-update");


        updateElement.innerHTML = `

            <p class="update-date">
                ${update.date}
            </p>

            <h3>
                ${update.change}
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

}