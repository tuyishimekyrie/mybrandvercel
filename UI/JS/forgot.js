const formForgot = document.querySelector(".formForgot");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const cpasswordInput = document.getElementById("confirm-password");
const buttonSignIn = document.querySelector(".button");
const message = document.querySelector(".message");


window.addEventListener("load", async () => {
  // Parse the URL to extract the token
  const urlParams = new URLSearchParams(window.location.search);
  const tokens = urlParams.get("token");
  console.log(tokens);
  const token = localStorage.getItem("token-admin");
  const userToken = localStorage.getItem("token");
  if (tokens) {
    const tokenGoogle = localStorage.setItem("token-admin", tokens);
  }
  // const isAdmin = localStorage.getItem("isAdmin");
  if (userToken) {
    window.location.href = "../../index.html";
  }
  if (token) {
    // Admin is logged in, redirect to admin dashboard
    window.location.href = "../pages/HomeDashboard.html";
  }
});



buttonSignIn.addEventListener(
  "click",
  (e) => {
    e.preventDefault();
    const loginCredentials = {
      email: emailInput.value,
      password: passwordInput.value,
      confirmPassword: cpasswordInput.value,
    };
    const usersData = localStorage.getItem("userCredentials");
    const data = JSON.parse(usersData);
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      message.innerHTML = "Please enter a valid email address";
      message.style.color = "#FF0000";
      setTimeout(() => {
        message.innerHTML = "";
      }, 3000);
    } else {
      if (
        loginCredentials.email !== "" ||
        loginCredentials.password !== "" ||
        loginCredentials.confirmPassword !== ""
      ) {
        if (data) {
          for (const user of data) {
            if (user.email === loginCredentials.email) {
              if (
                loginCredentials.password !== loginCredentials.confirmPassword
              ) {
                setTimeout(() => {
                  message.innerHTML = "";
                }, 2000);

                message.innerHTML = "Password Doesn't Match";
                message.style.color = "#dc2626";
              }
              // authenticated = true;
              setTimeout(() => {
                message.innerHTML = "";
                window.location.href = "../pages/login.html";
              }, 1000);
              user.password = loginCredentials.password;
              user.confirmPassword = loginCredentials.confirmPassword;

              message.innerHTML = "Password Updated";
              message.style.color = "#10b981";
              emailInput.value = "";
              passwordInput.value = "";
              loginCredentials.confirmPassword = "";
              console.log("Email Exists");
              console.log(data);
              break;
            } else {
              setTimeout(() => {
                message.innerHTML = "";
              }, 2000);

              message.innerHTML = "User Doesn't Exist, Try Again";
              message.style.color = "#dc2626";
            }
            // authenticated = true;
          }
        }
      } else {
        setTimeout(() => {
          message.innerHTML = "";
        }, 2000);

        message.innerHTML = "Please fill the fields";
        message.style.color = "#dc2626";
      }
    }
  }
  // console.log(loginCredentials)
  // console.log(data)
);

