let posts = [];

function addPost() {
    const postContent = document.getElementById('postContent').value;
    const timestamp = new Date().toLocaleString();

    if (postContent.trim() !== '') {
        posts.push({
            content: postContent,
            timestamp: timestamp
        });
        document.getElementById('postContent').value = '';  // Clear the input field
        displayPosts();
    } else {
        alert('Post content cannot be empty!');
    }
}

function displayPosts() {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';

    posts.forEach((post, index) => {
        postsContainer.innerHTML += `
            <div class="post" id="post-${index}">
                <div class="post-header">
                    <img src="https://via.placeholder.com/50" alt="User Avatar">
                    <div class="user-info">
                        <span class="username">User${index + 1}</span>
                        <span class="timestamp">${post.timestamp}</span>
                    </div>
                </div>
                <div class="post-content" id="content-${index}">${post.content}</div>
                <textarea class="post-edit" id="editContent-${index}">${post.content}</textarea>
                <div class="post-actions">
                    <button onclick="editPost(${index})">Edit</button>
                    <button onclick="savePost(${index})" class="save-button" style="display:none;">Save</button>
                    <button onclick="deletePost(${index})">Delete</button>
                </div>
            </div>
        `;
    });
}

function editPost(index) {
    const content = document.getElementById(`content-${index}`);
    const editContent = document.getElementById(`editContent-${index}`);
    const saveButton = document.querySelector(`#post-${index} .save-button`);

    content.style.display = 'none';
    editContent.style.display = 'block';
    saveButton.style.display = 'inline-block';
}

function savePost(index) {
    const newContent = document.getElementById(`editContent-${index}`).value;

    if (newContent.trim() !== '') {
        posts[index].content = newContent;
        displayPosts();
    } else {
        alert('Post content cannot be empty!');
    }
}

function deletePost(index) {
    posts.splice(index, 1);
    displayPosts();
}

// Sidebar
const menuItems = document.querySelectorAll('.menu-item');

// Messages 
const messageNotification = document.querySelector('#messages-notifications');
const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');

//Theme
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fontSize = document.querySelectorAll('.choose-size span');
var root = document.querySelector(':root');
const colorPalette = document.querySelectorAll('.choose-color span');
const Bg1 = document.querySelector('.bg-1');
const Bg2 = document.querySelector('.bg-2');
const Bg3 = document.querySelector('.bg-3');


// ============== SIDEBAR ============== 

// Remove active class from all menu items
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
        if(item.id != 'notifications') {
            document.querySelector('.notifications-popup').
            style.display = 'none';
        } else {
            document.querySelector('.notifications-popup').
            style.display = 'block';
            document.querySelector('#notifications .notification-count').
            style.display = 'none';
        }
    })
})

// ============== MESSAGES ============== 

//Searches messages
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    message.forEach(user => {
        let name = user.querySelector('h5').textContent.toLowerCase();
        if(name.indexOf(val) != -1) {
            user.style.display = 'flex'; 
        } else {
            user.style.display = 'none';
        }
    })
}

//Search for messages
messageSearch.addEventListener('keyup', searchMessage);

//Highlight messages card when messages menu item is clicked
messageNotification.addEventListener('click', () => {
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';
    messageNotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messages.style.boxShadow = 'none';
    }, 2000);
})

// ============== THEME / DISPLAY CUSTOMIZATION ============== 

// Opens Modal
const openThemeModal = () => {
    themeModal.style.display = 'grid';
}

// Closes Modal
const closeThemeModal = (e) => {
    if(e.target.classList.contains('customize-theme')) {
        themeModal.style.display = 'none';
    }
}

themeModal.addEventListener('click', closeThemeModal);
theme.addEventListener('click', openThemeModal);


// ============== FONT SIZE ============== 

// remove active class from spans or font size selectors
const removeSizeSelectors = () => {
    fontSize.forEach(size => {
        size.classList.remove('active');
    })
}

fontSize.forEach(size => { 
   size.addEventListener('click', () => {
        removeSizeSelectors();
        let fontSize;
        size.classList.toggle('active');

        if(size.classList.contains('font-size-1')) { 
            fontSize = '10px';
            root.style.setProperty('----sticky-top-left', '5.4rem');
            root.style.setProperty('----sticky-top-right', '5.4rem');
        } else if(size.classList.contains('font-size-2')) { 
            fontSize = '13px';
            root.style.setProperty('----sticky-top-left', '5.4rem');
            root.style.setProperty('----sticky-top-right', '-7rem');
        } else if(size.classList.contains('font-size-3')) {
            fontSize = '16px';
            root.style.setProperty('----sticky-top-left', '-2rem');
            root.style.setProperty('----sticky-top-right', '-17rem');
        } else if(size.classList.contains('font-size-4')) {
            fontSize = '19px';
            root.style.setProperty('----sticky-top-left', '-5rem');
            root.style.setProperty('----sticky-top-right', '-25rem');
        } else if(size.classList.contains('font-size-5')) {
            fontSize = '22px';
            root.style.setProperty('----sticky-top-left', '-12rem');
            root.style.setProperty('----sticky-top-right', '-35rem');
        }

        // change font size of the root html element
        document.querySelector('html').style.fontSize = fontSize;
   })
})

// Remove active class from colors
const changeActiveColorClass = () => {
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active');
    })
}

// Change color primary
colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let primary;
        changeActiveColorClass(); 

        if(color.classList.contains('color-1')) {
            primaryHue = 252;
        } else if(color.classList.contains('color-2')) {
            primaryHue = 52;
        } else if(color.classList.contains('color-3')) {
            primaryHue = 352;
        } else if(color.classList.contains('color-4')) {
            primaryHue = 152;
        } else if(color.classList.contains('color-5')) {
            primaryHue = 202;
        }

        color.classList.add('active');
        root.style.setProperty('--primary-color-hue', primaryHue);
    })
})

//Theme Background Values
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

// Changes background color
const changeBG = () => {
    root.style.setProperty('--light-color-lightness', lightColorLightness);
    root.style.setProperty('--white-color-lightness', whiteColorLightness);
    root.style.setProperty('--dark-color-lightness', darkColorLightness);
}

Bg1.addEventListener('click', () => {
    // add active class
    Bg1.classList.add('active');
    // remove active class from the others
    Bg2.classList.remove('active');
    Bg3.classList.remove('active');
    //remove customized changes from local storage
    window.location.reload();
});

Bg2.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '20%';
    lightColorLightness = '15%';

    // add active class
    Bg2.classList.add('active');
    // remove active class from the others
    Bg1.classList.remove('active');
    Bg3.classList.remove('active');
    changeBG();
});

Bg3.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '10%';
    lightColorLightness = '0%';

    // add active class
    Bg3.classList.add('active');
    // remove active class from the others
    Bg1.classList.remove('active');
    Bg2.classList.remove('active');
    changeBG();
});
// Select all Accept and Decline buttons
const acceptButtons = document.querySelectorAll('.accept-btn');

const declineButtons = document.querySelectorAll('.decline-btn');

acceptButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        // Change button text to 'Request Accepted'
        button.textContent = 'Request Accepted';

        // Add the 'request-accepted' class for styling and animation
        button.classList.add('request-accepted');

        // Disable the button to prevent further clicks
        button.disabled = true;
    });

    // Handle the Decline button click to reset the Accept button
    declineButtons[index].addEventListener('click', function() {
        // Reset Accept button text and styles
        button.textContent = 'Accept';
        button.classList.remove('request-accepted');
        button.disabled = false;
    });

    // for like buttons
    // Select all the like buttons (heart icons)
const likeButtons = document.querySelectorAll('.uil-heart');

likeButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Toggle the 'liked' class on click
        button.classList.toggle('liked');
    });
});

// for the comments working
document.addEventListener('DOMContentLoaded', () => {
    // Get all comment sections
    const commentSections = document.querySelectorAll('.feed');

    commentSections.forEach(feed => {
        const commentInput = feed.querySelector('.comment-input');
        const commentButton = feed.querySelector('.comment-submit');
        const commentList = feed.querySelector('.comment-list');
        const commentCountElement = feed.querySelector('.comment-count');
        let commentCount = parseInt(commentCountElement.textContent, 10); // Get the initial comment count

        // Add event listener to the comment button
        commentButton.addEventListener('click', () => {
            const commentText = commentInput.value.trim();

            if (commentText !== '') {
                // Create a new comment element
                const newComment = document.createElement('p');
                newComment.textContent = `Rushi: ${commentText}`;

                // Add the comment to the list
                commentList.appendChild(newComment);

                // Clear the input box
                commentInput.value = '';

                // Increase the comment count
                commentCount++;
                commentCountElement.textContent = commentCount;
            }
        });
    });
});


// for cahtting
const sendMessageButton = document.getElementById('sendMessage');
const messageInputBox = document.getElementById('messageInputBox');
const messageInput = document.getElementById('messageInput');
// const messagesList = document.getElementById('messagesList');
let activeChat = null;

// Function to handle clicking on a message chat
function openChat(chatElement) {
    // Show the message input box below the clicked chat
    messageInputBox.style.display = 'flex';

    // Insert the message input box after the selected chat element
    chatElement.insertAdjacentElement('afterend', messageInputBox);

    // Optionally clear the input field for a new message
    messageInput.value = '';
    activeChat = chatElement.getAttribute('data-chat');
}

// Event listener for each chat message
document.querySelectorAll('.message').forEach(message => {
    message.addEventListener('click', function() {
        // Mark this chat as active (optional: highlight the active chat)
        document.querySelectorAll('.message').forEach(msg => msg.classList.remove('active'));
        this.classList.add('active');

        // Open the chat and show the message input below this specific chat
        openChat(this);
    });
});

// Handle sending a message
sendMessageButton.addEventListener('click', function() {
    const messageText = messageInput.value.trim();

    if (messageText && activeChat) {
        // Create a new message element
        const newMessage = document.createElement('div');
        newMessage.classList.add('message');
        newMessage.innerHTML = `
            <div class="profile-photo">
                <img src="./PHOTO.jpg" alt="User Photo"> <!-- Placeholder for user photo -->
            </div>
            <div class="message-body">
                <a href="#">Rushi</a> <!-- Optional: Show 'You' for the sender -->
                <p>${messageText}</p>
            </div>
        `;

        // Insert the new message after the currently active chat
        const activeChatElement = document.querySelector(`.message[data-chat="${activeChat}"]`);
        activeChatElement.insertAdjacentElement('afterend', newMessage);

        // Optionally scroll to the bottom of the messages list (if applicable)
        activeChatElement.scrollIntoView({ behavior: "smooth" });

        // Clear the input after sending
        messageInput.value = '';
    }
});

// For create a Post

document.addEventListener('DOMContentLoaded', () => {
    const createPostForm = document.getElementById('create-post-form');
    const mediaPicker = document.getElementById('create-post');
    const myPostsSection = document.getElementById('my-posts');
    const submitButton = createPostForm.querySelector('input[type="submit"]');

    // Event listener for form submission
    createPostForm.addEventListener('submit', handleFormSubmit);

    function handleFormSubmit(e) {
        e.preventDefault(); // Prevent page refresh

        submitButton.disabled = true; // Disable the submit button to avoid multiple submissions

        const files = mediaPicker.files;

        if (files.length > 0) {
            const post = document.createElement('div');
            post.classList.add('post');

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileURL = URL.createObjectURL(file);

                if (file.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = fileURL;
                    img.alt = "Uploaded media"; 
                    post.appendChild(img);
                } else if (file.type.startsWith('video/')) {
                    const video = document.createElement('video');
                    video.src = fileURL;
                    video.controls = true;
                    post.appendChild(video);
                }

                // Revoke the object URL after it's no longer needed
                post.onload = () => URL.revokeObjectURL(fileURL);
            }

            // Add Edit and Delete buttons
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-btn');
            editButton.addEventListener('click', () => handleEditPost(post));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', () => handleDeletePost(post));

            post.appendChild(editButton);
            post.appendChild(deleteButton);

            myPostsSection.appendChild(post);
            mediaPicker.value = ''; // Clear the media picker
            
            // Show success message once
            alert('Successfully added your post!');
        } else {
            alert('Please select media to add to your post.');
        }

        submitButton.disabled = false; // Re-enable the submit button
    }

    function handleEditPost(post) {
        // Prompt the user to select new files
        const newFiles = mediaPicker.files;

        if (newFiles.length > 0) {
            // Clear the old media in the post
            while (post.firstChild) {
                post.removeChild(post.firstChild);
            }

            // Add new files
            for (let i = 0; i < newFiles.length; i++) {
                const file = newFiles[i];
                const fileURL = URL.createObjectURL(file);

                if (file.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = fileURL;
                    img.alt = "Uploaded media";
                    post.appendChild(img);
                } else if (file.type.startsWith('video/')) {
                    const video = document.createElement('video');
                    video.src = fileURL;
                    video.controls = true;
                    post.appendChild(video);
                }
            }

            // Revoke the object URL after it's no longer needed
            post.onload = () => URL.revokeObjectURL(fileURL);

            // Add back the Edit and Delete buttons
            // const editButton = document.createElement('button');
            // // editButton.textContent = 'Edit';
            // editButton.classList.add('edit-btn');
            // editButton.addEventListener('click', () => handleEditPost(post));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', () => handleDeletePost(post));

            // post.appendChild(editButton);
            post.appendChild(deleteButton);
        } else {
            alert('Please select new media to update the post.');
        }
    }

    function handleDeletePost(post) {
        // Remove the post from the DOM
        post.remove();
        alert('Post deleted.');
    }
});


// for story section

// Display the floating video player when a story is clicked
document.querySelectorAll('.story').forEach(story => {
    story.addEventListener('click', function() {
        const content = this.getAttribute('data-content');
        
        if (content.endsWith('.mp4')) {
            const floatingPlayer = document.getElementById('floating-player');
            const floatingVideo = document.getElementById('floating-video');
            const floatingVideoSource = document.getElementById('floating-video-source');
            
            // Set video source and display floating player
            floatingVideoSource.src = content;
            floatingPlayer.style.display = 'block';
            floatingVideo.load(); // Load the video
            floatingVideo.play(); // Auto-play the video
        }
    });
});

// Close floating player when the close button is clicked
document.getElementById('close-floating-player').addEventListener('click', function() {
    const floatingPlayer = document.getElementById('floating-player');
    const floatingVideo = document.getElementById('floating-video');
    
    floatingVideo.pause(); // Pause the video if playing
    floatingVideo.currentTime = 0; // Reset the video
    floatingPlayer.style.display = 'none'; // Hide the player
});

// Hide the floating player when the video ends
document.getElementById('floating-video').addEventListener('ended', function() {
    const floatingPlayer = document.getElementById('floating-player');
    
    floatingPlayer.style.display = 'none'; // Hide the player when the video ends
});




});


