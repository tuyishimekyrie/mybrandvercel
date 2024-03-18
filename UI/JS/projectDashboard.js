const emailsContent = [
  {
    id: 1,
    email: "tuyishimehope01@gmail.com",
    title: "Single Page Website (Commercial)",
    message:
      "A technical homepage showcases a seamless blend of innovation and user-friendly design, featuring key technologies and services. The contact page serves as a responsive gateway, enabling effortless communication and collaboration, enhancing user experience through intuitive forms and direct communication channels.",
    status: "Active",
  },
];

window.onload = function () {
  const emailsContainer = document.querySelector(".emails");

  emailsContent.forEach((content) => {
    const email = document.createElement("div");
    email.classList.add("email");

    const emailHeader = document.createElement("div");
    emailHeader.classList.add("email-header");

    const emailEmail = document.createElement("span");
    emailEmail.textContent = content.email;

    const emailStatusDiv = document.createElement("div");
    emailStatusDiv.innerHTML = `<p>${content.status}</p>`;

    emailHeader.appendChild(emailEmail);
    emailHeader.appendChild(emailStatusDiv);
    email.appendChild(emailHeader);

    const emailMessage = document.createElement("div");
    emailMessage.classList.add("email-message", "project-message");

    const emailTitle = document.createElement("span");
    emailTitle.textContent = content.title;

    const emailDesc = document.createElement("h4");
    emailDesc.textContent = content.message;

    emailMessage.appendChild(emailTitle);
    emailMessage.appendChild(emailDesc);
    email.appendChild(emailMessage);

    const emailButtons = document.createElement("div");
    emailButtons.classList.add("email-buttons", "project-button");

    const markAsDoneButton = document.createElement("button");
    markAsDoneButton.classList.add("markBtn"); 
    markAsDoneButton.textContent = "Mark as Done";

    emailButtons.appendChild(markAsDoneButton);
    email.appendChild(emailButtons);

    emailsContainer.appendChild(email);
  });
};
