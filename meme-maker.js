document.addEventListener('DOMContentLoaded', function() {
    const imageUpload = document.getElementById('imageUpload');
    const backgroundImageInput = document.getElementById('background-image');
    const topTextInput = document.getElementById('topText');
    const bottomTextInput = document.getElementById('bottomText');
    const generateMemeButton = document.getElementById('generateMeme');
    const downloadMemeButton = document.getElementById('downloadMeme');
    const addBackgroundButton = document.getElementById('addBackground');
    const canvas = document.getElementById('memeCanvas');
    const ctx = canvas.getContext('2d');
    let uploadedImage = null;
    let backgroundImage = null;

    // Upload the image
    imageUpload.addEventListener('change', function(event) {
        const reader = new FileReader();
        reader.onload = function(event) {
            uploadedImage = new Image();
            uploadedImage.src = event.target.result;
            uploadedImage.onload = function() {
                drawMeme();
            };
        };
        reader.readAsDataURL(event.target.files[0]);
    });

    // Upload the background image
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

    // Draw meme on the canvas
    function drawMeme() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set canvas dimensions to match the image
        canvas.width = uploadedImage.width;
        canvas.height = uploadedImage.height;

        // Draw the background image (if available)
        if (backgroundImage) {
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        }

        // Draw the main image
        ctx.drawImage(uploadedImage, 0, 0);

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
    }

    // Generate the meme when the button is clicked
    generateMemeButton.addEventListener('click', function() {
        if (uploadedImage) {
            drawMeme();
        } else {
            alert('Please upload an image first.');
        }
    });

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

    // Add the background image
    addBackgroundButton.addEventListener('click', function() {
        if (backgroundImageInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(event) {
                backgroundImage = new Image();
                backgroundImage.src = event.target.result;
                backgroundImage.onload = function() {
                    drawMeme();
                };
            };
            reader.readAsDataURL(backgroundImageInput.files[0]);
        } else {
            backgroundImage = null;
            drawMeme();
        }
    });
});