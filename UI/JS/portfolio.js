const projects = document.querySelector(".projects-content");
const project = document.querySelector(".project");
const projectImg = document.querySelector(".projectImg");
const projectHeading = document.querySelector(".projectheading");
const projectDesc = document.querySelector(".projectDesc");
const projectSite = document.querySelector(".site");

const projectsContent = [
  {
    id: 1,
    img: "../assests/hero.jpeg",
    heading: "Kora Finance Management Application",
    desc: "A centralized dashboard offering an overview of key business metrics, performance indicators, and important alerts. Customizable widgets for users to tailor the dashboard to their specific needs.",
    url: "https://tuyishimekyrie.github.io/my-brand-Hope/index.html",
  },
  {
    id: 2,
    img: "../assests/project1.png",
    heading: "Business Management Application",
    desc: "A centralized dashboard offering an overview of key business metrics, performance indicators, and important alerts. Customizable widgets for users to tailor the dashboard to their specific needs.",
    url: "https://tuyishimekyrie.github.io/my-brand-Hope/index.html",
  },
  {
    id: 3,
    img: "../assests/meditation.jpg",
    heading: "Project Management System",
    desc: "A comprehensive tool for managing projects, tasks, and team collaboration. Includes features such as task assignment, progress tracking, and file sharing.",
    url: "https://example.com/project-management-system",
  },
  {
    id: 4,
    img: "../assests/blockchain.png",
    heading: "E-commerce Platform",
    desc: "An online platform for selling products and services. Includes features such as product catalog, shopping cart, and secure checkout.",
    url: "https://example.com/e-commerce-platform",
  },
  {
    id: 5,
    img: "../assests/financial.jpg",
    heading: "Social Media Analytics Tool",
    desc: "A tool for analyzing social media performance and engagement. Provides insights into audience demographics, content performance, and campaign effectiveness.",
    url: "https://example.com/social-media-analytics",
  },
  {
    id: 6,
    img: "../assests/gaming.png",
    heading: "Online Learning Platform",
    desc: "A platform for delivering online courses and educational content. Includes features such as video lectures, quizzes, and progress tracking.",
    url: "https://example.com/online-learning-platform",
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

