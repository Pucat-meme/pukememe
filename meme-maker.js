document.addEventListener('DOMContentLoaded', function() {
    const imageUpload = document.getElementById('imageUpload');
    const imageButton = document.getElementById('imageButton');
    const backgroundImageInput = document.getElementById('background-image');
    const topTextInput = document.getElementById('topText');
    const bottomTextInput = document.getElementById('bottomText');
    const downloadMemeButton = document.getElementById('downloadMeme');
    const addBackgroundButton = document.getElementById('addBackground');
    const removeBackgroundButton = document.getElementById('removeBackground');
    const canvas = document.getElementById('memeCanvas');
    const ctx = canvas.getContext('2d');
    const accessorySelector = document.getElementById('accessory-selector');
    
    let uploadedImage = null;
    let backgroundImage = null;
    let currentAccessory = null;

    // Toggle image upload/remove
    imageButton.addEventListener('click', function() {
        if (uploadedImage) {
            // Remove image
            uploadedImage = null;
            imageUpload.value = ''; // Clear the file input
            imageButton.textContent = 'Add Image';
            drawMeme();
        } else {
            // Upload image
            imageUpload.click();
        }
    });

    imageUpload.addEventListener('change', function(event) {
        const reader = new FileReader();
        reader.onload = function(event) {
            uploadedImage = new Image();
            uploadedImage.src = event.target.result;
            uploadedImage.onload = function() {
                imageButton.textContent = 'Remove Image';
                drawMeme();
            };
        };
        reader.readAsDataURL(event.target.files[0]);
    });

    // Upload the background image
    addBackgroundButton.addEventListener('click', function() {
        backgroundImageInput.click();
    });

    backgroundImageInput.addEventListener('change', function(event) {
        const reader = new FileReader();
        reader.onload = function(event) {
            backgroundImage = new Image();
            backgroundImage.src = event.target.result;
            backgroundImage.onload = function() {
                drawMeme();
            };
        };
        reader.readAsDataURL(event.target.files[0]);
    });

    // Remove background
    removeBackgroundButton.addEventListener('click', function() {
        backgroundImage = null;
        drawMeme();
    });

    // Draw meme on the canvas
    function drawMeme() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (uploadedImage) {
            // Set canvas dimensions to match the image
            canvas.width = uploadedImage.width;
            canvas.height = uploadedImage.height;

            // Draw the background image (if available)
            if (backgroundImage) {
                ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
            }

            // Draw the main image
            ctx.drawImage(uploadedImage, 0, 0);

            // Draw accessory (if selected)
            if (currentAccessory) {
                ctx.drawImage(currentAccessory, 0, 0, 100, 100); // Adjust position and size as needed
            }

            // Set font style
            ctx.font = '50px Impact';
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.textAlign = 'center';

            // Draw top text
            ctx.fillText(topTextInput.value.toUpperCase(), canvas.width / 2, 50);
            ctx.strokeText(topTextInput.value.toUpperCase(), canvas.width / 2, 50);

            // Draw bottom text
            ctx.fillText(bottomTextInput.value.toUpperCase(), canvas.width / 2, canvas.height - 20);
            ctx.strokeText(bottomTextInput.value.toUpperCase(), canvas.width / 2, canvas.height - 20);
        } else {
            // Reset canvas size if no image
            canvas.width = 600; // Default width
            canvas.height = 400; // Default height
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#333';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('No image uploaded', canvas.width / 2, canvas.height / 2);
        }
    }

    // Update meme when text inputs change
    topTextInput.addEventListener('input', drawMeme);
    bottomTextInput.addEventListener('input', drawMeme);

    // Download the meme
    downloadMemeButton.addEventListener('click', function() {
        if (uploadedImage) {
            const link = document.createElement('a');
            link.download = 'pucat-meme.png';
            link.href = canvas.toDataURL();
            link.click();
        } else {
            alert('Please generate a meme first.');
        }
    });

    // Event listener for accessory selection
    accessorySelector.addEventListener('change', function() {
        const selectedAccessory = this.value;
        if (selectedAccessory) {
            currentAccessory = new Image();
            currentAccessory.src = `${selectedAccessory}.png`; // Assuming accessory images are named accordingly
            currentAccessory.onload = drawMeme;
        } else {
            currentAccessory = null;
            drawMeme();
        }
    });
});
