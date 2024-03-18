// const formRegister = document.querySelector(".formRegister") as HTMLElement;
var emailInputCont = document.getElementById("email");
var namesInputCont = document.getElementById("names");
var passwordInputCont = document.getElementById("password");
var cpasswordInputCont = document.getElementById("confirm-password");
var buttonSignUpBtn = document.querySelector(".button");
var errorMessageCont = document.querySelector(".error");
const registerWithGoogle = document.querySelector(".registerGoogle")



window.addEventListener("load", async function () {
  // Parse the URL to extract the token
  const urlParams = new URLSearchParams(window.location.search);
  const tokens = urlParams.get("token");
   const userToken = localStorage.getItem("token");
  console.log(tokens)
  const token = localStorage.getItem("token");
  const tokenAdmin = localStorage.getItem("token-admin");
  if (tokens) {
    const tokenGoogle = localStorage.setItem("token", tokens);
    window.location.href = "../../index.html";
  }
 if (userToken || token) {
   window.location.href = "../../index.html";
 }
   if (tokenAdmin) {
     // Admin is logged in, redirect to admin dashboard
     window.location.href = "../pages/HomeDashboard.html";
   }
  if (token) {
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
  window.location.href = "http://localhost:3000/googleregister";

  // After the user is redirected back to your callback URL, extract the token from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  // If a code parameter is present in the URL, it means the user has been authenticated and redirected back
 if (code) {
   // If a code is present, send it to your backend
   fetch("http://localhost:3000/exchangeCodeForToken", {
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



// window.addEventListener("load", function () {
//   var usersData = localStorage.getItem("userCredentials");
//   var data = [];
//   if (usersData) {
//     data = JSON.parse(usersData);
//     data.forEach(function (element) {
//       if (element.authenticated) {
//         window.location.href = "../../index.html";
//       }
//     });
//   }
//   console.log("hello");
// });
buttonSignUpBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    emailInputCont.value === "" ||
    namesInputCont.value === "" ||
    passwordInputCont.value === "" ||
    cpasswordInputCont.value === ""
  ) {
    errorMessageCont.innerHTML = "Please fill all the fields";
    errorMessageCont.style.color = "#FF0000";
    setTimeout(function () {
      errorMessageCont.innerHTML = "";
    }, 3000);
  } else if (!emailRegex.test(emailInputCont.value)) {
    errorMessageCont.innerHTML = "Please enter a valid email address";
    errorMessageCont.style.color = "#FF0000";
    setTimeout(function () {
      errorMessageCont.innerHTML = "";
    }, 3000);
  } else if (
    passwordInputCont.value.length <= 6 ||
    namesInputCont.value.length <= 2
  ) {
    errorMessageCont.innerHTML = "Please Enter Strong Password";
    errorMessageCont.style.color = "#FF0000";
    setTimeout(function () {
      errorMessageCont.innerHTML = "";
    }, 3000);
  } else if (passwordInputCont.value === cpasswordInputCont.value) {
    var userData = {
    //   id: Date.now(),
      email: emailInputCont.value,
      name: namesInputCont.value,
      password: passwordInputCont.value,
      confirmpassword: cpasswordInputCont.value,
    //   date: new Date().toISOString(),
    //   authenticated: false,
    };
      
    // var contentData = localStorage.getItem("userCredentials");
    // var existingData ;
    // if (contentData) {
    //   existingData = JSON.parse(contentData) || [];
    // }
    // existingData.push(userData);
    // var updatedDataString = JSON.stringify(existingData);
    try {
      const response = await fetch(
        "https://mybrandbackend-q8gq.onrender.com/api/users/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        // const errorMessage = await response.text();
        // console.error(errorMessage);
        response.text().then((errorMessage) => {
          console.log("Error message:", errorMessage);
          // Assuming messagesCont is a DOM element to display error messages
          errorMessageCont.innerHTML = errorMessage;
          errorMessageCont.style.color = "#FF0000";
          setTimeout(function () {
            errorMessageCont.innerHTML = "";
          }, 3000);
        });
      }
      if (response.status == 201) {
            setTimeout(function () {
              window.location.href = "../pages/login.html";
            }, 500);
      }
    } catch (error) {
      console.log(error);
    }
    // localStorage.setItem("userCredentials", updatedDataString);
    errorMessageCont.innerHTML = "User successfully registered.";
    errorMessageCont.style.color = "#059669";
    emailInputCont.value = "";
    namesInputCont.value = "";
    passwordInputCont.value = "";
    cpasswordInputCont.value = "";

  } else {
    errorMessageCont.innerHTML = "Password doesn't match";
    errorMessageCont.style.color = "#b91c1c";
    setTimeout(function () {
      errorMessageCont.innerHTML = "";
    }, 3000);
  }
});
