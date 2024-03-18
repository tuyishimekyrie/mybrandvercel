const blogs = document.querySelector(".blogs");
let data = localStorage.getItem("blogsContent");
const blogsContent = JSON.parse(data);
// const blogsContent = [
//   {
//     img: "../assests/nosql-nedir-1.png",
//     header: "The future of NoSQL",
//     desc: "The future of artificial intelligence entails unprecedented advancements, integrating machine learning, robotics, and ethical considerations, shaping a transformative and intelligent digital era.",
//     likesCount: 10,
//     commentsCount: 10,
//     readMoreURL: "./Blog.html",
//   },
//   {
//     img: "../assests/TS.png",
//     header: "Understanding Machine Learning",
//     desc: "Machine learning is a subset of artificial intelligence that enables machines to learn from data without being explicitly programmed. It has applications in various fields, including healthcare, finance, and transportation.",
//     likesCount: 15,
//     commentsCount: 8,
//     readMoreURL: "./Blog.html",
//   },
//   {
//     img: "../assests/TS.png",
//     header: "The Rise of Robotics",
//     desc: "Advancements in robotics technology are revolutionizing industries such as manufacturing, healthcare, and agriculture. With the development of autonomous robots and collaborative robots, the future of robotics looks promising.",
//     likesCount: 20,
//     commentsCount: 12,
//     readMoreURL: "./Blog.html",
//   },
//   {
//     img: "../assests/photo-1507146153580-69a1fe6d8aa1.jpeg",
//     header: "Ethical Considerations in AI",
//     desc: "As artificial intelligence continues to advance, ethical considerations become increasingly important. Issues such as bias in algorithms, data privacy, and the impact on jobs and society must be addressed to ensure responsible AI development.",
//     likesCount: 18,
//     commentsCount: 9,
//     readMoreURL: "./Blog.html",
//   },
//   {
//     img: "../assests/TS.png",
//     header: "The Impact of IoT",
//     desc: "The Internet of Things (IoT) refers to the network of interconnected devices that collect and exchange data. IoT has the potential to revolutionize various industries, including healthcare, transportation, and smart cities.",
//     likesCount: 25,
//     commentsCount: 14,
//     readMoreURL: "./Blog.html",
//   },
//   {
//     img: "../assests/blockchain.png",
//     header: "Advancements in Blockchain",
//     desc: "Blockchain technology, originally developed for cryptocurrencies like Bitcoin, is now being explored for applications beyond finance. Its decentralized and tamper-proof nature makes it suitable for use cases such as supply chain management, voting systems, and identity verification.",
//     likesCount: 30,
//     commentsCount: 20,
//     readMoreURL: "./Blog.html",
//   },
// ];


window.onload = function () {
  function fetchAndRenderBlogs() {
    fetch("https://mybrandbackend-q8gq.onrender.com/api/blogs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((blogs) => {
        // Clear existing blogs before rendering
        //  blogscont.innerHTML = "";
        // Render each blog
        blogs.forEach((blog) => {
          renderBlogs(blog);
        });
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error.message);
        // Optionally display an error message to the user
      });
  }
  // Initial fetch and render
  fetchAndRenderBlogs();

  // Poll for updates every one second
  // setInterval(fetchAndRenderBlogs, 1000);
  function renderBlogs(blog) {
    console.log(blog);
    // blog.forEach((content) => {
      const pro = document.createElement("div");
      pro.classList = "blog";

      const proImg = document.createElement("img");
      proImg.classList = "img";
      proImg.src = blog.img; // Set image source

      const proHeading = document.createElement("h2");
      proHeading.classList = "blogHeader";
      proHeading.textContent = blog.header; // Set heading text

      const proDesc = document.createElement("p");
      proDesc.classList = "blogDesc";
      proDesc.textContent = truncateText(blog.desc, 20);

      const proFeatures = document.createElement("div");
      proFeatures.classList = "features";

      const proLikes = document.createElement("div");
      proLikes.classList = "likes";
      const likesCount = document.createElement("p");
      likesCount.classList = "likesCount";
      likesCount.textContent = blog.likesCount;
      const likesLogo = document.createElement("img");
      likesLogo.classList = "likesLogo";
      likesLogo.src = "../assests/Facebook Like.png";
      proLikes.appendChild(likesCount);
      proLikes.appendChild(likesLogo);

      const proComments = document.createElement("div");
      proComments.classList = "likes";
      const commentsCount = document.createElement("p");
      commentsCount.classList = "commentsCount";
      commentsCount.textContent = blog.comments.length;
      const commentsLogo = document.createElement("img");
      commentsLogo.classList = "commentsLogo";
      commentsLogo.src = "../assests/Topic.png";
      proComments.appendChild(commentsCount);
      proComments.appendChild(commentsLogo);

      proFeatures.appendChild(proLikes);
      proFeatures.appendChild(proComments);

      const proSite = document.createElement("a");
      proSite.classList = "readMore";
      proSite.href = "./Blog.html";
      // proSite.setAttribute("href", blog.readMoreURL); // Set href attribute
      // proSite.setAttribute("target", "_blank");
      const button = document.createElement("button");
      button.classList = "login";
      button.textContent = "Read More";
      proSite.appendChild(button);

      // Add event listener to the entire blog post
      pro.addEventListener("click", () => {
        // Store the clicked blog's id in localStorage
        localStorage.setItem("clickedBlogId", blog._id);
        // Redirect to the specified blog URL
        // window.location.href = content.readMoreURL;
      });

      pro.appendChild(proImg);
      pro.appendChild(proHeading);
      pro.appendChild(proDesc);
      pro.appendChild(proFeatures);
      pro.appendChild(proSite);

      blogs.appendChild(pro);

      // Function to truncate text to specified number of words
      function truncateText(text, numWords) {
        const words = text.split(" ");
        if (words.length > numWords) {
          return words.slice(0, numWords).join(" ") + "...";
        }
        return text;
      }
    // });
  }
  // Attach event listener outside the loop
  const likesLogos = document.querySelectorAll(".likesLogo");
  // likesLogos.forEach((likesLogo, index) => {
  //   likesLogo.addEventListener("click", () => {
  //     // Toggle the like state
  //     if (!blogsContent[index].liked) {
  //       // Increment the likes count
  //       blogsContent[index].likesCount++;
  //       blogsContent[index].liked = true;
  //     } else {
  //       // Decrement the likes count
  //       blogsContent[index].likesCount--;
  //       blogsContent[index].liked = false;
  //     }

  //     // Update the likes count in localStorage
  //     localStorage.setItem("blogsContent", JSON.stringify(blogsContent));

  //     // Update the UI to reflect the new likes count and state
  //     const likesCount = likesLogo.parentElement.querySelector(".likesCount");
  //     likesCount.textContent = blogsContent[index].likesCount;

  //     // Update the like button appearance based on the state
  //     likesLogo.src = blogsContent[index].liked
  //       ? "../assests/Facebook Like.png"
  //       : "../assests/Facebook like.png";

  //     console.log("Clicked");
  //   });
  // });
};



