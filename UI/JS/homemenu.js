const menu = document.querySelector(".menu-open img");
const menuLinks = document.querySelector(".menu-links");
const close = document.querySelector(".menu-close ");
const header = document.querySelector(".header");
const loginButton = document.querySelector(".login");
const logoutButton = document.querySelector(".logoutButtons");
const adminButton = document.querySelector(".adminButtons");

// window.addEventListener("load", () => {
//   const usersData = localStorage.getItem("userCredentials");
//   if (usersData) {
//     const data = JSON.parse(usersData);
//     if (data.some((user) => user.authenticated)) {
//       const buttonLogout = document.createElement("button");
//       buttonLogout.textContent = "Logout";
//       buttonLogout.classList.add("login");
//       logoutButton.appendChild(buttonLogout);
//       loginButton.textContent="Admin"

//       // Add event listener to logout button
//       document.addEventListener("click", (event) => {
//         if (event.target.classList.contains("login")) {
//           const userIndex = data.findIndex((user) => user.authenticated);

//           if (userIndex !== -1) {
//             data[userIndex].authenticated = false;
//             localStorage.setItem("userCredentials", JSON.stringify(data));
//             console.log("User logged out successfully.");
//           } else {
//             console.error("Error: User not found.");
//           }
//         }
//       });
//     }
//   }
// });

// logoutButton.addEventListener("click", () => {
//   console.log("clicked");
// });

window.addEventListener("load", () => {
  // Check if user is already authenticated
  const token = localStorage.getItem("token");

  if (token) {
    // User is already authenticated, redirect to index.html
    redirectToIndex();
    loginButton.style.display= "none"
  } else {
    // User is not authenticated, proceed with login request
    // fetchLoginRequest();
  }
});

function redirectToIndex() {
  // window.location.href = "../../index.html";
  // Create the "Logout" button
  const buttonLogout = document.createElement("button");
  buttonLogout.textContent = "Logout";
  buttonLogout.classList.add("login");

  // Attach click event listener to the logout button
  buttonLogout.addEventListener("click", () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Redirect to the login page
    window.location.href = "./UI/pages/login.html";
  });

  // Create the "Admin" button
  const buttonAdmin = document.createElement("button");
  adminButton.textContent = "Admin";
  adminButton.classList.add("login"); // Corrected class name

  // Attach click event listener to the "Admin" button
  adminButton.addEventListener("click", () => {
    // Redirect to the admin login page
    // window.location.href = "./UI/pages/contact.html";
    console.log("clicked")
  });

  // Append buttons to the logoutButtons container
  logoutButton.appendChild(buttonLogout);
  // logoutButton.appendChild(buttonAdmin);
}

// async function fetchLoginRequest() {
//   try {
//     const response = await fetch(
//       "https://mybrandbackend-q8gq.onrender.com/api/pages/login.html",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // Check response status and handle accordingly
//     if (!response.ok) {
//       console.log("Login request failed");
//     } else {
//       console.log("Login request successful");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }



menu.addEventListener("click", () => {
  header.classList.toggle("active");
  menuLinks.classList.add("active");
  close.style.display = "block";
  menu.style.display = " none";
  // close.style.zIndex = "10";

  console.log("Hello");
});
close.addEventListener("click", () => {
  menuLinks.classList.remove("active");
  menu.style.display = " block";
  console.log("");
  header.classList.toggle("active");
  close.style.display = "none";
});
