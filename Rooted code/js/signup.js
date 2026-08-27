const signupForm = document.querySelector(".signup-form");


signupForm.addEventListener("submit", function(event){

    event.preventDefault();


    const name = document.querySelector("#name-field").value;


    localStorage.setItem("studentName", name);


    window.location.href = "dashboard.html";

});