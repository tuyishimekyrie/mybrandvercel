// const formRegister = document.querySelector(".formRegister") as HTMLElement;
var emailInputCont = document.getElementById("email");
var namesInputCont = document.getElementById("names");
var passwordInputCont = document.getElementById("password");
var cpasswordInputCont = document.getElementById("confirm-password");
var buttonSignUpBtn = document.querySelector(".button");
var errorMessageCont = document.querySelector(".error");
const registerWithGoogle = document.querySelector(".registerGoogle")



window.addEventListener("load", async function () {
  const token = localStorage.getItem("token");

  if (token) {
    window.location.href = "../../index.html";
    logoutButtons.textContent = "logout";
  } else {
    console.log("Token not available");
  }
});


registerWithGoogle.addEventListener("click",async (e) => {
  e.preventDefault()
  console.log("Clcked")
    try {
      const response = await fetch("http://localhost:3000/googleregister", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(userData),
      });

      console.log(response)

      // if (!response.ok) {
      //   // const errorMessage = await response.text();
      //   // console.error(errorMessage);
      //   response.text().then((errorMessage) => {
      //     console.log("Error message:", errorMessage);
      //     // Assuming messagesCont is a DOM element to display error messages
      //     errorMessageCont.innerHTML = errorMessage;
      //     errorMessageCont.style.color = "#FF0000";
      //     setTimeout(function () {
      //       errorMessageCont.innerHTML = "";
      //     }, 3000);
      //   });
      // }
      // if (response.status == 201) {
      //       setTimeout(function () {
      //         window.location.href = "../pages/login.html";
      //       }, 500);
      // }
    } catch (error) {
      console.log(error);
    }
})


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
