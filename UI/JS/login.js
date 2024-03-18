// const formLogin = document.querySelector(".formLogin") as HTMLFormElement;
var emailINPUTCont = document.getElementById("email");
var passwordINPUTCont = document.getElementById("password");
var buttonSignInSubmit = document.querySelector(".button");
var messagesCont = document.querySelector(".message");
var logoutButtons = document.querySelector(".logoutButtons");
const registerWithGoogle = document.querySelector(".registerGoogle");
window.addEventListener("load", async function () {
  // Parse the URL to extract the token
  const urlParams = new URLSearchParams(window.location.search);
  const tokens = urlParams.get("token");
  console.log(tokens);
  const token = localStorage.getItem("token");
  const tokenAdmin = localStorage.getItem("token-admin");
  if (tokens) {
    const tokenGoogle = localStorage.setItem("token", tokens);
     window.location.href = "../../index.html";
  }
  if (tokenAdmin) {
    // Admin is logged in, redirect to admin dashboard
    window.location.href = "../pages/HomeDashboard.html";
  }
  if (token ) {
    window.location.href = "../../index.html";
    logoutButtons.textContent = "logout";
  } else {
    console.log("Token not available");
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
buttonSignInSubmit.addEventListener("click", async (e) => {
  e.preventDefault();
  // Regular expression for email validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailINPUTCont.value)) {
    messagesCont.innerHTML = "Please enter a valid email address";
    messagesCont.style.color = "#FF0000";
    setTimeout(function () {
      messagesCont.innerHTML = "";
    }, 3000);
  } else {
    var loginCredentials = {
      email: emailINPUTCont.value,
      password: passwordINPUTCont.value,
    };

    fetch("https://mybrandbackend-q8gq.onrender.com/api/users/login", {
      method: "POST",
      body: JSON.stringify(loginCredentials),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          console.log("Login failed");
          response.text().then((errorMessage) => {
            console.log("Error message:", errorMessage);
            // Assuming messagesCont is a DOM element to display error messages
            messagesCont.innerHTML = errorMessage;
            messagesCont.style.color = "#FF0000";
            setTimeout(function () {
              messagesCont.innerHTML = "";
            }, 3000);
          });
          throw new Error("Login failed");
        }

        const data = await response.json();
        const { token } = data;
        storeTokenInLocalStorage(token);
        setTimeout(function () {
          messagesCont.innerHTML = "";
          window.location.href = "../../index.html";
        }, 500);
        messagesCont.innerHTML = "Logged in Successfully";
        messagesCont.style.color = "#1e40af";
        //   Clear input fields after checking credentials
        emailINPUTCont.value = "";
        passwordINPUTCont.value = "";

        console.log("successfully logged in");
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    function storeTokenInLocalStorage(token) {
      if (token) {
        localStorage.setItem("token", token);
        console.log("Token stored in localStorage:", token);
      } else {
        console.warn("Token not found in response");
      }
    }

    // var authenticated = false;
    // var usersData = localStorage.getItem("userCredentials");
    // var data = [];
    // if (usersData) {
    //     data = JSON.parse(usersData);
    // }
    // if (data) {
    //     for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
    //         var user = data_1[_i];
    //         if (user.email === loginCredentials.email &&
    //             user.password === loginCredentials.password) {
    //             authenticated = true;
    //             // Set authenticated to true for the logged-in user
    //             user.authenticated = true;
    //             break;
    //         }
    //     }
    //     if (authenticated) {
    //         // Save the updated data back to localStorage
    //         localStorage.setItem("userCredentials", JSON.stringify(data));
    //         setTimeout(function () {
    //             messagesCont.innerHTML = "";
    //             window.location.href = "../../index.html";
    //         }, 1000);
    //         messagesCont.innerHTML = "Logged in Successfully";
    //         messagesCont.style.color = "#1e40af";
    //         // Clear input fields after checking credentials
    //         emailINPUTCont.value = "";
    //         passwordINPUTCont.value = "";
    //     }
    //     else {
    //         setTimeout(function () {
    //             messagesCont.innerHTML = "";
    //         }, 2000);
    //         messagesCont.innerHTML = "User Not Found, Try again";
    //         messagesCont.style.color = "#dc2626";
    //     }
    // }
    // else {
    //     setTimeout(function () {
    //         messagesCont.innerHTML = "";
    //     }, 2000);
    //     // If no data is found in localStorage
    //     messagesCont.innerHTML = "No user data found";
    //     messagesCont.style.color = "#dc2626";
    // }
  }
});
