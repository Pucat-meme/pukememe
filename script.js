document.addEventListener('DOMContentLoaded', function() {
    const memeCanvas = document.getElementById('meme-canvas');
    const accessorySelector = document.getElementById('accessory-selector');

    // Function to update meme canvas with selected accessory
    function updateAccessory(accessory) {
        // Clear existing accessory elements
        const existingAccessory = document.querySelector('.accessory');
        if (existingAccessory) {
            existingAccessory.remove();
        }

        if (accessory) {
            // Create new accessory element
            const accessoryImg = document.createElement('img');
            accessoryImg.src = `${accessory}.png`; // Assuming accessory images are named accordingly
            accessoryImg.className = 'accessory';
            accessoryImg.style.position = 'absolute';
            accessoryImg.style.top = '0';
            accessoryImg.style.left = '0';
            accessoryImg.style.width = '100px'; // Adjust size as needed
            accessoryImg.style.height = 'auto'; // Maintain aspect ratio

            // Append the accessory image to the meme canvas
            memeCanvas.appendChild(accessoryImg);
        }
    }

    // Event listener for accessory selection
    accessorySelector.addEventListener('change', function() {
        const selectedAccessory = this.value;
        updateAccessory(selectedAccessory);
    });
});
