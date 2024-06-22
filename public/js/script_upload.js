const form = document.getElementById('uploadForm');
form.onsubmit = async function(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = '0%';
    progressBar.textContent = '0%';

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const result = await response.json();
        progressBar.style.width = '100%';
        progressBar.textContent = '100%';
        alert('File successfully uploaded');
    } catch (error) {
        alert(error.message);
    }
};

form.addEventListener('change', () => {
    const file = document.getElementById('fileInput').files[0];
    const themeType = document.getElementById('themeSelect').value.split('-').pop();

    if (file.size > 200 * 1024 * 1024) { // 200 MB limit upload file
        alert('File size exceeds the limit of 200MB. Please select a smaller file.');
        form.reset();
    } else {
        if (themeType !== 'other' && !isValidFileType(file.name, themeType)) {
            alert('Invalid file type. Please select a valid file.');
            form.reset();
        }
    }
});

// Function filtering type upload file
function isValidFileType(fileName, themeType) {
    const extension = fileName.split('.').pop().toLowerCase();
    const mimeTypes = {
        video: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'],
        audio: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'wma', 'm4a'],
        images: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'svg', 'webp', 'ico', 'psd', 'cr2', 'nef', 'arw'],
        documents: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf', 'odt', 'ods', 'odp']
    };

    return themeType === 'other' || (mimeTypes[themeType] && mimeTypes[themeType].includes(extension));
}
