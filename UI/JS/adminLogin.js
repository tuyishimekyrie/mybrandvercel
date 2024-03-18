// import jwt_decode from "jwt-decode";

var formLogin = document.querySelector(".formLogin");
var emailINPUT = document.getElementById("email");
var passwordINPUT = document.getElementById("password");
var buttonSignIn = document.querySelector(".button");
var message = document.querySelector(".message");
var errorMessageCont = document.querySelector(".error");
const registerWithGoogle = document.querySelector(".registerGoogle");

window.addEventListener("load", async () => {
  // Parse the URL to extract the token
  const urlParams = new URLSearchParams(window.location.search);
  const tokens = urlParams.get("token");
  console.log(tokens);
  const token = localStorage.getItem("token-admin");
  const userToken = localStorage.getItem("token");
  if (tokens) {
    const tokenGoogle = localStorage.setItem("token-admin", tokens);
    window.location.href = "../pages/HomeDashboard.html";
  }
  // const isAdmin = localStorage.getItem("isAdmin");
  if (userToken || token) {
    window.location.href = "../../index.html";
  }
  if (token) {
    // Admin is logged in, redirect to admin dashboard
    window.location.href = "../pages/HomeDashboard.html";
  }
});

registerWithGoogle.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("Clicked");

  // Redirect the user to the Google authentication URL
  window.location.href =
    "https://mybrandbackend-q8gq.onrender.com/googleregister";

  // After the user is redirected back to your callback URL, extract the token from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  // If a code parameter is present in the URL, it means the user has been authenticated and redirected back
  if (code) {
    // If a code is present, send it to your backend
    fetch("https://mybrandbackend-q8gq.onrender.com/exchangeCodeForToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then((response) => response.json())
      .then((data) => {
        const { token } = data;
        if (token) {
          // Redirect the user to the login page with the token as a query parameter
          window.location.href = `../pages/login.html`;
        } else {
          console.error("Token not received");
        }
      })
      .catch((error) => {
        console.error("Error exchanging code for token:", error);
      });
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
