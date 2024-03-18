const Users = document.querySelector(".users");
function getToken() {
  return localStorage.getItem("token-admin");
}
// Function to render users on the UI
function renderUsers(usersContent) {
  const usersContainer = document.querySelector(".users");
  usersContainer.innerHTML = "";

  if (usersContent.length === 0) {
    const noUsersText = document.createElement("h1");
    noUsersText.textContent = "NO USERS";
    noUsersText.style.color = "white";
    usersContainer.appendChild(noUsersText);
  } else {
    usersContent.forEach((content) => {
      const user = document.createElement("div");
      user.classList = "user";

      const userId = document.createElement("p");
      userId.textContent = content._id.substring(0, 5);

      const userName = document.createElement("p");
      userName.textContent = content.name;

      const userEmail = document.createElement("p");
      userEmail.textContent = content.email;

      const deleteButton = document.createElement("button");
      deleteButton.classList = "delete";
      deleteButton.textContent = "Delete";

      user.appendChild(userId);
      user.appendChild(userName);
      user.appendChild(userEmail);
      user.appendChild(deleteButton);

      Users.appendChild(user);

      deleteButton.addEventListener("click", async () => {
        try {
          const response = await fetch(
            `https://mybrandbackend-q8gq.onrender.com/api/users/delete/${content._id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": getToken(), // Include token in the header
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to delete user");
          }
          console.log("User deleted successfully.");
          // After successful deletion, fetch and render users again
          fetchDataAndUpdate();
        } catch (error) {
          console.error("Error:", error);
        }
      });
    });
  }
}

// Function to fetch users from the backend and update the UI
async function fetchDataAndUpdate() {
  try {
    const response = await fetch(
      "https://mybrandbackend-q8gq.onrender.com/api/users/getALL",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": getToken(), // Include token in the header
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const { users } = await response.json();
    console.log("Response from backend:", users);
    renderUsers(users);
  } catch (error) {
    console.error("Error:", error);
  }
}


// Initial fetch and update
fetchDataAndUpdate();

// Set interval to fetch and update data every 3 seconds
setInterval(fetchDataAndUpdate, 3000);
