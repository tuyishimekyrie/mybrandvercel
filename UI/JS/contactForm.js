var form = document.querySelector(".form");
var btnSubmit = document.querySelector(".btn-submit");
var email = document.getElementById("email");
var messageContent = document.getElementById("message");
var errorMessageContent = document.querySelector(".error");
btnSubmit.addEventListener("click", async function (e) {
  e.preventDefault();
  var emailValue = email.value.trim();
  var messageValue = messageContent.value.trim();
  if (emailValue === "" || messageValue === "") {
    setTimeout(function () {
      errorMessageContent.innerHTML = "";
    }, 2000);
    errorMessageContent.innerHTML = "Please enter both email and message.";
    errorMessageContent.style.color = "#FF0000";
  } else {
    errorMessageContent.innerHTML = "Message successfully sent.";
    errorMessageContent.style.color = "#16F8B6";
    // Retrieve existing data from localStorage or initialize an empty array if no data exists
    // Retrieve the value from localStorage
    try {
      const response = await fetch(
        "https://mybrandbackend-q8gq.onrender.com/api/messages/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailValue,
            message: messageValue,
          }),
        }
      );

      if (!response.ok) {
        console.error("Failed to send message");
        return;
      }

      // alert("Message sent successfully!");

      // Clear input fields after successful submission
     email.value = "";
     messageContent.value = "";
    } catch (error) {
      console.error("Error sending message:", error);
      // alert("Failed to send message. Please try again.");
    }
    // console.log(contactData);
    setTimeout(function () {
      errorMessageContent.innerHTML = "";
    }, 2000);
    email.value = "";
    messageContent.value = "";
  }
  // console.log(contactData);
});
