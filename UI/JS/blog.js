function getToken() {
  return localStorage.getItem("token");
}
window.onload = function () {
  const articlesContainer = document.querySelector(".articles");
  // Retrieve clickedBlogID from local storage
  const clickedBlogID = localStorage.getItem("clickedBlogId");

  // Retrieve blogsContent from local storage
  let storedBlogsContent = [];
  let specificBlogID = clickedBlogID; // Assuming clickedBlogID is defined somewhere
  let specificBlog = null; // Initialize specificBlog as null or undefined

  fetch("https://mybrandbackend-q8gq.onrender.com/api/blogs")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((blogs) => {
      storedBlogsContent = blogs; // Store the fetched blogs in storedBlogsContent
      console.log(storedBlogsContent); // Log the stored blogs

      // Find the specific blog here
      specificBlog = storedBlogsContent.find(
        (blog) => blog._id == specificBlogID
      );

      // Call the render method here after specificBlog is set
      renderSpecificBlog(specificBlog);
    })
    .catch((error) => {
      console.error("Error fetching blogs:", error.message);
      // Optionally display an error message to the user
    });

  function renderSpecificBlog(blog) {
    if (blog) {
      console.log("Rendering specific blog:", blog);
      if (specificBlog) {
        const article = document.createElement("div");
        article.classList.add("article");

        const imgDiv = document.createElement("div");
        imgDiv.classList.add("articleImg");
        const img = document.createElement("img");
        img.src = specificBlog.img;
        imgDiv.appendChild(img);

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("content");
        const header = document.createElement("h2");
        header.textContent = specificBlog.header;
        const desc = document.createElement("p");
        desc.textContent = specificBlog.desc;
        contentDiv.appendChild(header);
        contentDiv.appendChild(desc);

        const featuresDiv = document.createElement("div");
        featuresDiv.classList.add("features");

        // Likes count
        const likesDiv = document.createElement("div");
        likesDiv.classList.add("likes");
        const likesCount = document.createElement("p");
        likesCount.textContent = specificBlog.likesCount;
        const likesImg = document.createElement("img");
        likesImg.src = "../assests/Facebook Like.png";
        likesDiv.appendChild(likesCount);
        likesDiv.appendChild(likesImg);
        featuresDiv.appendChild(likesDiv);

        // Comments count
        const commentsDiv = document.createElement("div");
        commentsDiv.classList.add("likes");
        const commentCount = document.createElement("p");
        commentCount.textContent = specificBlog.comments.length;
        const commentImg = document.createElement("img");
        commentImg.src = "../assests/Topic.png";
        commentsDiv.appendChild(commentCount);
        commentsDiv.appendChild(commentImg);
        featuresDiv.appendChild(commentsDiv);

        // Create comment form
        const leaveCommentDiv = document.createElement("div");
        leaveCommentDiv.classList.add("comments");
        const leaveCommentForm = document.createElement("form"); // Change to form element
        const leaveCommentLabel = document.createElement("label");
        leaveCommentLabel.setAttribute("for", `comment-${specificBlog.id}`); // Use unique ID for label
        leaveCommentLabel.textContent = "Leave a Comment:";
        const commentInput = document.createElement("input");
        commentInput.setAttribute("type", "text");
        commentInput.setAttribute("name", "comment");
        commentInput.setAttribute("id", `comment-${specificBlog.id}`); // Use unique ID for input
        commentInput.setAttribute("placeholder", "type a comment");

        leaveCommentForm.appendChild(leaveCommentLabel);
        leaveCommentForm.appendChild(commentInput);
        leaveCommentDiv.appendChild(leaveCommentForm);
        article.appendChild(leaveCommentDiv);

        // // Event listener for form submission
        // leaveCommentForm.addEventListener("submit", (event) => {
        //   event.preventDefault(); // Prevent form submission

        //   // Assuming you're using fetch API
        //   const addComment = async () => {
        //     const id = specificBlog._id; // Replace 'your_blog_post_id' with the actual ID of the blog post
        //     const commentText = commentInput.value.trim(); // Assuming commentInput is the input field where the user types the comment

        //     // Send a POST request to your backend API endpoint
        //     try {
        //       const response = await fetch(`/api/posts/${id}/comments`, {
        //         method: "POST",
        //         headers: {
        //           "Content-Type": "application/json",
        //           "x-auth-token": getToken(), // Replace 'your_jwt_token' with the actual JWT token
        //         },
        //         body: JSON.stringify({ comment: commentText }),
        //       });

        //       const data = await response.json();

        //       if (response.ok) {
        //         console.log("Comment added successfully:", data);
        //         // Handle success, update UI or show a success message
        //       } else {
        //         console.error("Failed to add comment:", data.message);
        //         // Handle error, show error message to the user
        //       }
        //     } catch (error) {
        //       console.error("Error adding comment:", error);
        //       // Handle error, show error message to the user
        //     }
        //   };

        //   console.log(addComment);

        //   // Call the addComment function when the user submits the comment
        //   // submitButton.addEventListener("click", addComment);

        //   // Get the comment text from the input field
        //   const commentText = commentInput.value.trim();

        //   // Validate if the comment is not empty
        //   if (commentText !== "") {
        //     // Retrieve blogsContent from local storage
        //     const storedBlogsContent =
        //       JSON.parse(localStorage.getItem("blogsContent")) || [];

        //     // Find the specific blog based on clickedBlogID
        //     const specificBlogIndex = storedBlogsContent.findIndex(
        //       (blog) => blog.id == clickedBlogID
        //     );
        //     console.log(specificBlogIndex);

        //     if (specificBlogIndex !== -1) {
        //       // Ensure that the specific blog object exists
        //       if (
        //         storedBlogsContent[specificBlogIndex].comments === undefined
        //       ) {
        //         storedBlogsContent[specificBlogIndex].comments = []; // Initialize comments array if it doesn't exist
        //       }

        //       if (users) {
        //         for (const user of users) {
        //           if (user.authenticated) {
        //             // Create a new comment object
        //             const newComment = {
        //               commenterName: user.authenticated
        //                 ? `${user.names}`
        //                 : "User", // Assuming the commenter's name is fixed for now
        //               comment: commentText,
        //               date: getCurrentDate().split(" ")[0], // Get current date
        //               time: getCurrentDate().split(" ")[1], // Get current time
        //             };

        //             // Add the new comment to the specific blog's comments array
        //             storedBlogsContent[specificBlogIndex].comments.push(
        //               newComment
        //             );
        //           }
        //         }
        //       }

        //       // Save the updated blogsContent back to local storage
        //       localStorage.setItem(
        //         "blogsContent",
        //         JSON.stringify(storedBlogsContent)
        //       );

        //       // Render all comments
        //       renderComments(
        //         storedBlogsContent[specificBlogIndex].comments,
        //         commentsSectionDiv
        //       );

        //       // Clear the comment input field
        //       commentInput.value = "";
        //     } else {
        //       console.error("Specific blog not found in storedBlogsContent.");
        //     }
        //   } else {
        //     alert("Please enter a comment."); // Display error message if comment is empty
        //   }
        // });
        // Event listener for form submission
        leaveCommentForm.addEventListener("submit", async (event) => {
          event.preventDefault(); // Prevent form submission

          const commentText = commentInput.value.trim(); // Get the comment text from the input field

          // Validate if the comment is not empty
          if (commentText !== "") {
            try {
              const id = specificBlog._id; // Assuming 'specificBlog' contains the details of the current blog post
              const response = await fetch(
                `https://mybrandbackend-q8gq.onrender.com/api/blogs/${id}/comments`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": getToken(), 
                  },
                  body: JSON.stringify({ comment: commentText }),
                }
              );

              const data = await response.json();

              if (response.ok) {
                console.log("Comment added successfully:", data);
                 commentInput.value = ""
              } else {
                console.error("Failed to add comment:", data.message);
              }
            } catch (error) {
              console.error("Error adding comment:", error);
            }
          } else {
            alert("Please enter a comment."); 
          }
        });
        const likesImgs = document.querySelector(".likes img");
        const like = document.querySelector(".likes p");
        console.log(likesImg);
        likesImg.addEventListener("click", async () => {
          try {
            const id = specificBlog._id; 
            const token = getToken(); 

            if (!token) {
              console.error("Access denied. No token provided.");
              return;
            }

            const response = await fetch(
              `https://mybrandbackend-q8gq.onrender.com/api/blogs/likes/${id}/like`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  "x-auth-token": token,
                },
              }
            );

            const data = await response.json();

            if (response.ok) {
              console.log("Blog like updated successfully:", data);
              like.textContent = specificBlog.likesCount;
            } else {
              console.error("Failed to update blog like:", data.message);
            }
          } catch (error) {
            console.error("Error updating blog like:", error);
          }
        });

        function renderComments(comments, commentsSectionDiv) {
          commentsSectionDiv.innerHTML = "";

          // Iterate over all comments and create DOM elements for each comment
          comments.forEach((comment) => {
            const commentedDiv = document.createElement("div");
            commentedDiv.classList.add("commented");
            const commenterDiv = document.createElement("div");
            commenterDiv.classList.add("img");
            const commenterImg = document.createElement("img");
            commenterImg.src = "../assests/avatar.png";
            const commenterName = document.createElement("p");
            commenterName.textContent = comment.commenterName;
            commenterDiv.appendChild(commenterImg);
            commenterDiv.appendChild(commenterName);
            const commentP = document.createElement("p");
            commentP.textContent = comment.comment;
            const timeDiv = document.createElement("div");
            timeDiv.classList.add("time");
            const dateP = document.createElement("p");
            dateP.textContent = comment.date;
            const timeP = document.createElement("p");
            timeP.textContent = comment.time;
            timeDiv.appendChild(dateP);
            timeDiv.appendChild(timeP);
            commentedDiv.appendChild(commenterDiv);
            commentedDiv.appendChild(commentP);
            commentedDiv.appendChild(timeDiv);
            commentsSectionDiv.appendChild(commentedDiv);
          });
        }

        const commentsSectionDiv = document.createElement("div");
        commentsSectionDiv.classList.add("comments-section");
        if (specificBlog.comments) {
          // Render all existing comments
            renderComments(specificBlog.comments, commentsSectionDiv);
        }

        const readMoreLink = document.createElement("a");
        readMoreLink.href = "./Blogs.html";
        const readMoreButton = document.createElement("button");
        readMoreButton.textContent = "Read More";
        readMoreLink.appendChild(readMoreButton);

        article.appendChild(imgDiv);
        article.appendChild(contentDiv);
        article.appendChild(featuresDiv);
        article.appendChild(leaveCommentDiv);
        article.appendChild(commentsSectionDiv);
        article.appendChild(readMoreLink);

        articlesContainer.appendChild(article);
      }
    } else {
      console.log("Specific blog not found.");
      // Handle case when specificBlog is not found
    }
  }



  // Event listener for likes
  // likesImg.addEventListener("click", () => {
  //   // Retrieve blogsContent from local storage
  //   const storedBlogsContent =
  //     JSON.parse(localStorage.getItem("blogsContent")) || [];

  //   // Retrieve clickedBlogID from local storage
  //   const clickedBlogID = localStorage.getItem("clickedBlogId");

  //   // Find the specific blog based on clickedBlogID
  //   const specificBlog = storedBlogsContent.find(
  //     (blog) => blog.id == clickedBlogID
  //   );

  //   // Check if specificBlog exists
  //   if (specificBlog) {
  //     // Toggle the like state
  //     if (!specificBlog.liked) {
  //       specificBlog.likesCount++;
  //       specificBlog.liked = true;
  //     } else {
  //       specificBlog.likesCount--;
  //       specificBlog.liked = false;
  //     }

  //     // Update likes count in localStorage
  //     localStorage.setItem("blogsContent", JSON.stringify(storedBlogsContent));

  //     // Update UI with the new likes count
  //     like.textContent = specificBlog.likesCount;
  //   }
  // });
};

// Function to get current date and time
function getCurrentDate() {
  const date = new Date();

  // Get the current date and time components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if necessary
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if necessary
  const hours = String(date.getHours()).padStart(2, "0"); // Add leading zero if necessary
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Add leading zero if necessary
  const seconds = String(date.getSeconds()).padStart(2, "0"); // Add leading zero if necessary

  // Construct the date and time string in the desired format
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  // Return the formatted date and time
  return `${formattedDate} ${formattedTime}`;
}
