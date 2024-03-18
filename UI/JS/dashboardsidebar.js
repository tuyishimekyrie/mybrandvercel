const sidebar = document.querySelector(".sidebar");
const nav = document.querySelector(".mobile-nav img");
const navClose = document.querySelector(".mobile-nav ");
const menu = document.querySelector(".menu");
const logoutBtn = document.querySelector(".logout");
const logoutBtns = document.querySelector(".logouts");

// window.addEventListener("load", function () {
//   var usersData = localStorage.getItem("adminCredentials");
//   var datas = [];
//   if (usersData) {
//     datas = JSON.parse(usersData);
//     var authenticatedUser = datas.find(function (element) {
//       return element.authenticated;
//     });
//     console.log(authenticatedUser.authenticated);
//     // if (authenticatedUser.authenticated) {
//     //   window.location.href = "../pages/HomeDashboard.html"; // Redirect if an authenticated user is found
//     // }
//     // else {
//     //   window.location.href = "../pages/adminLogin.html"; // Redirect to login page if no authenticated user is found
//     // }
//   }
//   //  else {
//   //   console.log("No user data found");
//   //   // Handle the case where no user data is found in localStorage
//   // }
//   console.log("hello");
// });

// console.log(logoutBtn)
// Dashboard Cards

window.addEventListener("load", async () => {
  const token = localStorage.getItem("token-admin");
  // const isAdmin = localStorage.getItem("isAdmin");

  if (!token) {
    // No token or isAdmin status found, redirect to login page
    window.location.href = "./login.html";
  }
});

const userCount = document.querySelector(".row2 p");
const emailCount = document.querySelector(".cEmail");
// const users = localStorage.getItem("userCredentials");
// const emails = localStorage.getItem("contactData");
// Function to fetch user and message counts from the backend APIs
function getToken() {
  return localStorage.getItem("token-admin");
}
async function fetchCountsAndUpdateUI() {
  try {
    // Fetch user count
    const userResponse = await fetch(
      "https://mybrandbackend-q8gq.onrender.com/api/users/getUserCount",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": getToken(), // Include token in the header
        },
      }
    );
    if (!userResponse.ok) {
      console.error("Failed to fetch user count");
    }
    const userData = await userResponse.json();
    const userCount = userData.count || 0;

    // Fetch message count
    const messageResponse = await fetch(
      "https://mybrandbackend-q8gq.onrender.com/api/messages/getMessageCount",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": getToken(), // Include token in the header
        },
      }
    );
    if (!messageResponse.ok) {
      throw new Error("Failed to fetch message count");
    }
    const messageData = await messageResponse.json();
    const messageCount = messageData.count || 0;

    // Update UI with the counts
    updateUserCount(userCount);
    updateMessageCount(messageCount);
  } catch (error) {
    console.error("Error fetching counts:", error);
  }
}

// Function to update user count on the UI
function updateUserCount(count) {
  userNumber = count;
  console.log("User count:", userNumber);
  userCount.textContent = userNumber;
}

// Function to update message count on the UI
function updateMessageCount(count) {
  emailNumber = count;
  console.log("Message count:", emailNumber);
  emailCount.textContent = emailNumber;
}

// Initial fetch and update
fetchCountsAndUpdateUI();

// Set interval to fetch and update counts every 5 seconds
setInterval(fetchCountsAndUpdateUI, 5000);

menu.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  navClose.style.display = "flex";
});

nav.addEventListener("click", () => {
  sidebar.classList.remove("active");
  navClose.style.display = "hidden";
});

// logoutBtn.addEventListener("click", () => {
//   const usersCred = localStorage.getItem("adminCredentials");
//   const data = JSON.parse(usersCred);
//   if (data) {
//     for (const userData of data) {
//       if (userData.authenticated) {
//         userData.authenticated = false;
//         localStorage.setItem("adminCredentials", JSON.stringify(data));
//         break; // Exit loop once the authenticated user is found and updated
//       }
//     }

//   }
//   console.log(data);
// });

logoutBtn.addEventListener("click", () => {
  // Remove token and isAdmin status from localStorage to logout the admin
  localStorage.removeItem("token-admin");
  // localStorage.removeItem("isAdmin");

  // Redirect to the login page
  // window.location.href = "./UI/pages/login.html";
  window.location.href = "../../index.html";

  console.log("clicked");
});
logoutBtns.addEventListener("click", () => {
  // Remove token and isAdmin status from localStorage to logout the admin
  localStorage.removeItem("token-admin");
  // localStorage.removeItem("isAdmin");

  // Redirect to the login page
  window.location.href = "../../index.html";

  console.log("clicked");
});