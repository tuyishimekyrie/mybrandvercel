// Function to render emails on the UI
function renderEmails(emailsContent) {
  const emailsContainer = document.querySelector(".emails");
  emailsContainer.innerHTML = ""; // Clear previous emails

  if (emailsContent.length === 0) {
    const emailMessageText = document.createElement("h1");
    emailMessageText.textContent = "NO EMAILS";
    emailMessageText.style.color = "white";
    emailsContainer.appendChild(emailMessageText);
  } else {
    // Sort emailsContent by date in descending order
    emailsContent.sort((a, b) => new Date(b.date) - new Date(a.date));
    emailsContent.forEach((content) => {
      const email = document.createElement("div");
      email.classList.add("email");

      const emailHeader = document.createElement("div");
      emailHeader.classList.add("email-header");

      const emailSpan = document.createElement("span");
      emailSpan.textContent = content.email;

      const emailMinutes = document.createElement("p");
      emailMinutes.textContent = content.timeAgo;

      emailHeader.appendChild(emailSpan);
      emailHeader.appendChild(emailMinutes);
      email.appendChild(emailHeader);

      const emailMessage = document.createElement("div");
      emailMessage.classList.add("email-message");
      const emailMessageText = document.createElement("p");
      emailMessageText.textContent = content.message;

      emailMessage.appendChild(emailMessageText);
      email.appendChild(emailMessage);

      const emailButtons = document.createElement("div");
      emailButtons.classList.add("email-buttons");

      const replyButton = document.createElement("button");
      replyButton.classList.add("reply");
      replyButton.textContent = "Reply";

      const markAsReadButton = document.createElement("button");
      markAsReadButton.classList.add("markasread");
      markAsReadButton.textContent = "Mark as read";

      emailButtons.appendChild(replyButton);
      emailButtons.appendChild(markAsReadButton);
      email.appendChild(emailButtons);

      emailsContainer.appendChild(email);
      //  replyButton.addEventListener("click", () => {
      //    console.log("Clicked");
      //    var gmailEmail =
      //      "mailto:" +
      //      content.email +
      //      "?subject=Re: " +
      //      content.subject +
      //      "&body=";
      //    window.location.href = gmailEmail;
      //  });
    });
  }
}

// Function to retrieve data from localStorage and update the emailsContent array
async function fetchDataAndUpdate() {
  try {
    // Fetch messages from the backend API
    const response = await fetch(
      "https://mybrandbackend-q8gq.onrender.com/api/messages/getALL",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": getToken(), 
        },
      }
    );
    if (!response.ok) {
      console.error("Failed to fetch messages");
    }
    const messages = await response.json();

    // Calculate time difference for each message
  const now = new Date();
  messages.forEach((message) => {
    const messageDate = new Date(message.createdAt);
    const differenceInMilliseconds = now - messageDate;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    // Debugging logs
    console.log("Message creation date:", messageDate);
    console.log("Current date:", now);
    console.log("Time difference in milliseconds:", differenceInMilliseconds);

    // Construct the time ago string based on the largest non-zero difference
    let timeAgo = "";
    if (differenceInDays > 0) {
      timeAgo = `${differenceInDays} day${
        differenceInDays !== 1 ? "s" : ""
      } ago`;
    } else if (differenceInHours > 0) {
      timeAgo = `${differenceInHours} hour${
        differenceInHours !== 1 ? "s" : ""
      } ago`;
    } else if (differenceInMinutes > 0) {
      timeAgo = `${differenceInMinutes} minute${
        differenceInMinutes !== 1 ? "s" : ""
      } ago`;
    } else {
      timeAgo = "Just now";
    }

    // Add the time ago string to the message object
    message.timeAgo = timeAgo;
  });


    // Render the messages on the UI
    renderEmails(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}


// Initial fetch and update
fetchDataAndUpdate();

// Set interval to fetch and update data every 3 seconds
// setInterval(fetchDataAndUpdate, 3000);
