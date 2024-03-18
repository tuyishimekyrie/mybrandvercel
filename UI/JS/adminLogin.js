// import jwt_decode from "jwt-decode";

var formLogin = document.querySelector(".formLogin");
var emailINPUT = document.getElementById("email");
var passwordINPUT = document.getElementById("password");
var buttonSignIn = document.querySelector(".button");
var message = document.querySelector(".message");

window.addEventListener("load", async () => {
  const token = localStorage.getItem("token-admin");
  // const isAdmin = localStorage.getItem("isAdmin");

  if (token ) {
    // Admin is logged in, redirect to admin dashboard
    window.location.href = "../pages/HomeDashboard.html";
  }
});

buttonSignIn.addEventListener("click", async function (e) {
  e.preventDefault();

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailINPUT.value)) {
    message.innerHTML = "Please enter a valid email address";
    message.style.color = "#FF0000";
    setTimeout(function () {
      message.innerHTML = "";
    }, 3000);
    return; // Exit early if validation fails
  }
  if (!passwordINPUT.value) {
    message.innerHTML = "Please enter a password";
    message.style.color = "#FF0000";
    setTimeout(function () {
      message.innerHTML = "";
    }, 3000);
    return; // Exit early if validation fails
  }

  var loginCredentials = {
    email: emailINPUT.value,
    password: passwordINPUT.value,
  };

  try {
    const response = await fetch(
      "https://mybrandbackend-q8gq.onrender.com/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginCredentials),
      }
    );

    if (!response.ok) {
      console.error("Login failed");
     message.innerHTML = "User Not Found or Invalid Password, Try again";
     message.style.color = "#dc2626";
     setTimeout(function () {
       message.innerHTML = "";
     }, 3000);
      return; // Exit early if login fails
    }

    const { token, isAdmin } = await response.json();

    // Save token and isAdmin status to localStorage
    localStorage.setItem("token-admin", token);
    // localStorage.setItem("isAdmin", isAdmin);

    if (isAdmin) {
      console.log("User is an admin");
      (emailINPUT.value = ""), (passwordINPUT.value = "");
      // Redirect to admin dashboard or perform admin-related actions
      window.location.href = "../pages/HomeDashboard.html";
    } else {
      console.log("User is not an admin");
      message.innerHTML = "User Not Found or Invalid Password, Try again";
      message.style.color = "#dc2626";
      setTimeout(function () {
        message.innerHTML = "";
      }, 3000);
      // Redirect to regular user dashboard or perform user-related actions
    }
    // Redirect to the appropriate page
  } catch (error) {
    console.error("Login error:", error);
    message.innerHTML = "User Not Found or Invalid Password, Try again";
    message.style.color = "#dc2626";
    setTimeout(function () {
      message.innerHTML = "";
    }, 2000);
  }
});
