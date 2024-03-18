var blogscont = document.querySelector(".blogs");
var formCreate = document.querySelector(".formCreate");
var imageInput = document.getElementById("image");
var headInput = document.getElementById("title");
var descInput = document.getElementById("description");
var messagesContent = document.querySelector(".message");
var btnCreate = document.querySelector(".createBlog");
var updateForm = document.querySelector(".formUpdate");

// btnCreate.addEventListener("click", function (e) {
//   e.preventDefault();
//   // Retrieve existing blogs content from localStorage or initialize an empty array
//   var blogsContent = JSON.parse(localStorage.getItem("blogsContent")) || [];
//   if (headInput.value !== "" || descInput.value !== "") {
//     // Get the image file selected by the user
//     var file = imageInput.files[0];
//     if (file) {
//       // Create a new FileReader object
//       var reader = new FileReader();
//       // Event listener for when the FileReader finishes reading the file
//       reader.onload = function (event) {
//         // Get the base64-encoded string from the FileReader result
//         var base64Image = event.target.result;
//         // Create the blog data object with the base64-encoded image
//         // const blogData = {
//         //   id: Date.now(),
//         //   img: base64Image,
//         //   header: headInput.value,
//         //   desc: descInput.value,
//         //   commentsCount: 0, // Assuming initial comments count is 0
//         // };
//         var blogData = {
//           id: Date.now(),
//           readMoreURL: "./Blog.html", // Assuming the read more URL is fixed
//           img: base64Image,
//           likesCount: 0, // Assuming initial likes count is 0
//           header: headInput.value,
//           desc: descInput.value,
//           commentsCount: 1,
//           comments: [
//             {
//               commenterName: "Tuyishime Hope",
//               comment:
//                 "Thanks to the emergence of Docker, we'll harness its capabilities to enhance software shipping and streamline the development process.",
//               date: "2024-01-02",
//               time: "12:34:23",
//             },
//           ],
//         };
//         console.log(blogData);
//         // Push the new blog data to the blogsContent array
//         blogsContent.push(blogData);
//         // Save the updated blogsContent array to localStorage
//         localStorage.setItem("blogsContent", JSON.stringify(blogsContent));
//         // Clear the form fields after submission
//         imageInput.value = "";
//         headInput.value = "";
//         descInput.value = "";
//         // Render the updated blogs immediately
//         renderBlogs(blogsContent);
//       };
//       // Read the image file as a data URL (base64-encoded string)
//       reader.readAsDataURL(file);
//     }
//   } else {
//     setTimeout(function () {
//       messagesContent.innerHTML = "";
//     }, 3000);
//     messagesContent.innerHTML = "Please Fill the fields";
//     messagesContent.style.color = "#b91c1c";
//   }
// });

// function renderBlogs(blogsContent) {
//   // Clear existing blogs before rendering
//   blogscont.innerHTML = "";
//   if (blogsContent) {
//     blogsContent.forEach(function (content) {
//       var blog = document.createElement("div");
//       blog.classList.add("blog");
//       var blogContent = document.createElement("div");
//       blogContent.classList.add("content");
//       blog.appendChild(blogContent);
//       var blogHeading = document.createElement("h2");
//       blogHeading.textContent = content.header;
//       blogContent.appendChild(blogHeading);
//       var btns = document.createElement("div");
//       btns.classList.add("btns");
//       var blogButtonUpdate = document.createElement("button");
//       blogButtonUpdate.classList.add("updateBtn");
//       blogButtonUpdate.textContent = "Update";
//       var blogButtonDelete = document.createElement("button");
//       blogButtonDelete.classList.add("deleteBtn");
//       blogButtonDelete.textContent = "Delete";
//       blogContent.appendChild(btns);
//       btns.appendChild(blogButtonUpdate);
//       btns.appendChild(blogButtonDelete);
//       var blogImageContainer = document.createElement("div");
//       blogImageContainer.classList.add("image");
//       var blogImage = document.createElement("img");
//       blogImage.src = content.img;
//       blogImageContainer.appendChild(blogImage);
//       blog.appendChild(blogImageContainer);
//       blogButtonDelete.addEventListener("click", function () {
//         var storedData = localStorage.getItem("blogsContent");
//         // Parse the retrieved data into an array of objects
//         var blogsContent = JSON.parse(storedData) || [];
//         // Filter out the item to be deleted
//         blogsContent = blogsContent.filter(function (user) {
//           return user.id !== content.id;
//         });
//         // Update localStorage with the modified array
//         localStorage.setItem("blogsContent", JSON.stringify(blogsContent));
//         renderBlogs(blogsContent);
//         console.log("Blog deleted successfully.");
//       });
//       var updateBtn = document.querySelector(".updateBtn");
//       var updateModal = document.querySelector(".modal");
//       var closeModal = document.querySelector(".close");
//       blogButtonUpdate.addEventListener("click", () => {
//         updateModal.classList.add("active");
//         console.log(content.id);
//         const UpdateImageInput = document.getElementById("images");
//         const UpdateTitleInput = document.getElementById("titles");
//         const UpdateDescInput = document.getElementById("descriptions");
//         const submitBtn = document.querySelector(".submitBtn");
//         submitBtn.addEventListener("click", (e) => {
//           e.preventDefault();
//           const blogId = content.id;
//           // Find the specific blog in the blogsContent array using its ID
//           const specificBlogIndex = blogsContent.findIndex(
//             (blog) => blog.id === blogId
//           );
//           if (specificBlogIndex !== -1) {
//             const specificBlog = blogsContent[specificBlogIndex];
//             // Check if input values are provided, if not, use previous values
//             const updatedHeader =
//               UpdateTitleInput.value !== ""
//                 ? UpdateTitleInput.value
//                 : specificBlog.header;
//             const updatedDesc =
//               UpdateDescInput.value !== ""
//                 ? UpdateDescInput.value
//                 : specificBlog.desc;
//             var file = UpdateImageInput.files[0];
//             let updatedImg = specificBlog.img; // Initialize to the previous image

//             if (file) {
//               // Create a new FileReader object
//               var reader = new FileReader();
//               // Event listener for when the FileReader finishes reading the file
//               reader.onload = function (event) {
//                 // Get the base64-encoded string from the FileReader result
//                 var base64Image = event.target.result;
//                 updatedImg = base64Image; // Update to the new image
//                 // Update the specific blog with the new or previous values
//                 blogsContent[specificBlogIndex] = {
//                   ...specificBlog,
//                   header: updatedHeader,
//                   desc: updatedDesc,
//                   img: updatedImg,
//                 };
//                 // Update localStorage with the modified array
//                 localStorage.setItem(
//                   "blogsContent",
//                   JSON.stringify(blogsContent)
//                 );
//                 renderBlogs(blogsContent);
//                 // Log the updated blog data
//                 console.log("Updated Blog:", blogsContent[specificBlogIndex]);
//                 console.log(updatedImg);
//                 // Close the update modal or perform any other action
//                 updateModal.classList.remove("active");
//               };
//               // Read the image file as a data URL (base64-encoded string)
//               reader.readAsDataURL(file);
//             } else {
//               // Update the specific blog with the new or previous values
//               blogsContent[specificBlogIndex] = {
//                 ...specificBlog,
//                 header: updatedHeader,
//                 desc: updatedDesc,
//                 img: updatedImg,
//               };
//               // Update localStorage with the modified array
//               localStorage.setItem(
//                 "blogsContent",
//                 JSON.stringify(blogsContent)
//               );
//               renderBlogs(blogsContent);
//               // Log the updated blog data
//               console.log("Updated Blog:", blogsContent[specificBlogIndex]);
//               console.log(updatedImg);
//               // Close the update modal or perform any other action
//               updateModal.classList.remove("active");
//             }
//           } else {
//             console.log("Blog Not Found");
//           }
//         });
//       });
//       closeModal.addEventListener("click", function () {
//         updateModal.classList.remove("active");
//       });
//       blogscont.appendChild(blog);
//     });
//     // Now continue with the rest of your code...
//   }
// }

// Optionally, render blogs when the window loads
// window.onload = function () {
//   // Retrieve and render existing blogs from localStorage
//   var storedBlogsContent = JSON.parse(localStorage.getItem("blogsContent"));
//   if (storedBlogsContent) {
//     // console.log("loaded");
//     // console.log(storedBlogsContent);
//     renderBlogs(storedBlogsContent);
//     // setInterval(renderBlogs,2000)
//   }
// };

function getToken() {
  return localStorage.getItem("token-admin");
}

btnCreate.addEventListener("click", function (e) {
  e.preventDefault();

  // Check if header and description fields are not empty
  if (headInput.value.trim() !== "" && descInput.value.trim() !== "") {
    // Get the image file selected by the user
    var file = imageInput.files[0];
    console.log(file);

    // Check if an image file is selected by the user
    if (file) {
      // Create the data object with the file name
      var blogData = {
        header: headInput.value.trim(),
        desc: descInput.value.trim(),
        image: file, // Include the file name
      };
      const formData = new FormData();
      formData.append("image", imageInput.files[0]); // Assuming imageInput is an input field of type file
      formData.append("header", headInput.value.trim());
      formData.append("desc", descInput.value.trim());
      // const header = headInput.value.trim();
      // const desc = description.value.trim();
      // const imgData = "data:image/jpeg;base64," + btoa(file); // Convert binary to Base64
      // var reader = new FileReader();
      //       // Event listener for when the FileReader finishes reading the file
      // reader.onload = function (event) {
      //         // Get the base64-encoded string from the FileReader result
      // var base64Image = event.target.result;
      // const formData = {
      //   header: header,
      //   desc: desc,
      //   img: file,
      // };
      // Send the data to the backend
      console.log(formData);
      console.log(blogData);
      fetch("https://mybrandbackend-q8gq.onrender.com/api/blogs/upload", {
        method: "POST",
        body: formData,
        headers: {
          // "Content-Type": "application/json",
          "x-auth-token": getToken(), // Include token in the header
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Assuming the backend returns JSON
        })
        .then((data) => {
          // Handle success response from the backend
          console.log("Blog created successfully:", data);
          // Clear the form fields after successful submission
          imageInput.value = "";
          headInput.value = "";
          descInput.value = "";
          // You may optionally update the UI here
        })
        .catch((error) => {
          // Handle errors
          console.error("Error creating blog:", error.message);
          // You may optionally display an error message to the user
        });
    }
  } else {
    // Display a message if header or description fields are empty
    messagesContent.innerHTML = "Please fill in all fields";
    messagesContent.style.color = "#b91c1c";
    // Clear the message after 3 seconds
    setTimeout(function () {
      messagesContent.innerHTML = "";
    }, 3000);
  }
});

// Define a function to render a single blog
function renderBlog(blog) {
  var blogElement = document.createElement("div");
  blogElement.classList.add("blog");

  var blogContent = document.createElement("div");
  blogContent.classList.add("content");

  var blogHeading = document.createElement("h2");
  blogHeading.textContent = blog.header;

  var blogImageContainer = document.createElement("div");
  blogImageContainer.classList = "image";
  var blogImage = document.createElement("img");
  blogImage.src = blog.img;
  blogImageContainer.appendChild(blogImage);

  var btns = document.createElement("div");
  btns.classList.add("btns");
  var updateBtn = document.createElement("button");
  updateBtn.classList.add("updateBtn");
  updateBtn.textContent = "Update";

  var deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.textContent = "Delete";

  blogContent.appendChild(blogHeading);
  btns.appendChild(updateBtn);
  btns.appendChild(deleteBtn);
  blogContent.appendChild(btns);
  blogElement.appendChild(blogContent);
  blogElement.appendChild(blogImageContainer);
  blogscont.appendChild(blogElement);

  var updateModal = document.querySelector(".modal");
  var closeModal = document.querySelector(".close");
  const errorMessages = document.querySelector(".errorMessages");
  const UpdateImageInput = document.getElementById("images");
  const UpdateTitleInput = document.getElementById("titles");
  const UpdateDescInput = document.getElementById("descriptions");
  // Add event listeners for update and delete buttons (similar to your existing code)
  const submitBtn = document.querySelector(".submitBtn");
  updateBtn.addEventListener("click", function () {
    // Handle update button click
    updateModal.classList.add("active");
    // e.preventDefault();
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      var file = UpdateImageInput.files[0];
      if (
        UpdateTitleInput.value === "" ||
        UpdateTitleInput.value == null ||
        UpdateTitleInput !== ""
      ) {
        // Get the image file selected by the user
        // var file = imageInput.files[0];
        console.log(file);

        // Check if an image file is selected by the user
        if (file) {
          // Create the data object with the file name
          var blogData = {
            header: UpdateTitleInput.value.trim(),
            desc: UpdateDescInput.value.trim(),
            image: file, // Include the file name
          };
          const headerUpdate =
            UpdateTitleInput.value.trim() !== ""
              ? UpdateTitleInput.value.trim()
              : blog.header;
          const descUpdate =
            UpdateDescInput.value.trim() !== ""
              ? UpdateDescInput.value.trim()
              : blog.desc;
          const formData = new FormData();
          formData.append("image", UpdateImageInput.files[0]); // Assuming imageInput is an input field of type file
          formData.append("header", headerUpdate);
          formData.append("desc", descUpdate);
          console.log(formData);
          console.log(blogData);
          fetch(
            "https://mybrandbackend-q8gq.onrender.com/api/blogs/updates/" +
              blog._id,
            {
              method: "PATCH",
              body: formData,
              headers: {
                // "Content-Type": "application/json",
                "x-auth-token": getToken(), // Include token in the header
              },
            }
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json(); // Assuming the backend returns JSON
            })
            .then((data) => {
              // Handle success response from the backend
              console.log("Blog Updated successfully:", data);
              // Clear the form fields after successful submission
              UpdateImageInput.value = "";
              UpdateTitleInput.value = "";
              UpdateDescInput.value = "";
              // You may optionally update the UI here
               updateModal.classList.remove("active");
            })
            .catch((error) => {
              // Handle errors
              console.error("Error creating blog:", error.message);
              // You may optionally display an error message to the user
            });
        }
      } else {
        // Display a message if header or description fields are empty
        errorMessages.innerHTML = "Please fill in all fields";
        errorMessages.style.color = "#b91c1c";
        // Clear the message after 3 seconds
        setTimeout(function () {
          errorMessages.innerHTML = "";
        }, 3000);
      }
    });
  });

  closeModal.addEventListener("click", function () {
    updateModal.classList.remove("active");
  });
  deleteBtn.addEventListener("click", function () {
    // Handle delete button click
    fetch(
      "https://mybrandbackend-q8gq.onrender.com/api/blogs/delete/" + blog._id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": getToken(), // Include token in the header
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((blogs) => {
        // Clear existing blogs before rendering
        blogscont.innerHTML = "";
        // Render each blog
        blogs.forEach((blog) => {
          renderBlog(blog);
        });
      })
      .catch((error) => {
        console.error("Error Deleting blog:", error.message);
        // Optionally display an error message to the user
      });
  });
}

window.onload = function () {
  // Function to fetch and render blogs
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
        blogscont.innerHTML = "";
        // Render each blog
        blogs.forEach((blog) => {
          renderBlog(blog);
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
  setInterval(fetchAndRenderBlogs, 1000);
};
