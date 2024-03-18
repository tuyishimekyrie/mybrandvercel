const projects = document.querySelector(".projects-content");
const project = document.querySelector(".project");
const projectImg = document.querySelector(".projectImg");
const projectHeading = document.querySelector(".projectheading");
const projectDesc = document.querySelector(".projectDesc");
const projectSite = document.querySelector(".site");

const projectsContent = [
  {
    id: 1,
    img: "./UI/assests/hero.jpeg",
    heading: "Kora Finance Management Application",
    desc: "A centralized dashboard offering an overview of key business metrics, performance indicators, and important alerts. Customizable widgets for users to tailor the dashboard to their specific needs.",
    url: "https://tuyishimekyrie.github.io/my-brand-Hope/index.html",
  },
  {
    id: 2,
    img: "./UI/assests/project1.png", // Fixed typo here
    heading: "Business Management Application",
    desc: "A centralized dashboard offering an overview of key business metrics, performance indicators, and important alerts. Customizable widgets for users to tailor the dashboard to their specific needs.",
    url: "https://tuyishimekyrie.github.io/my-brand-Hope/index.html",
  },
];
  console.log(projectsContent[1].img)
 window.onload = function () {
   projectsContent.forEach((content) => {
       const pro = document.createElement("div");
       pro.classList = "project";

       const proImg = document.createElement("img");
       proImg.classList = "projectImg";
       proImg.src = content.img; // Set image source

       const proHeading = document.createElement("h2");
       proHeading.classList = "projectheading";
       proHeading.textContent = content.heading; // Set heading text

       const proDesc = document.createElement("h5");
       proDesc.classList = "projectDesc";
       proDesc.textContent = content.desc; // Set description text

       const proSite = document.createElement("a");
       proSite.classList = "site";
       proSite.href = content.url; // Set site URL
       proSite.textContent = "Visit Site"; // Set button text

       pro.appendChild(proImg);
       pro.appendChild(proHeading);
       pro.appendChild(proDesc);
       pro.appendChild(proSite);

       projects.appendChild(pro); // Append project to .projects container
   });
 };

