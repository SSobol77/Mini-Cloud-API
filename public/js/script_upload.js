// Script for Upload page
const form = document.getElementById('uploadForm');
let progressBar = document.getElementById('progressBar');

form.onsubmit = function(event) {
    event.preventDefault();
    const formData = new FormData(form);
    uploadFile(formData);
};

form.addEventListener('change', () => {
    const fileInput = document.getElementById('fileInput');
    if (!fileInput.files.length) {
        alert('Please select a file.');
        return;
    }

    const file = fileInput.files[0];
    if (file.size > 200 * 1024 * 1024) { // 200 MB limit upload file
        alert('Sorry, the file is too large. The maximum allowed size is 200MB.');
        form.reset();
    } else {
        const selectedType = document.getElementById('themeSelect').value;
        if (!isValidFileType(file.name, file.type, selectedType)) {
            alert('Sorry, the selected file type is not supported.');
            form.reset();
        }
    }
});

// Function filtering type of uploaded file
function isValidFileType(fileName, fileType, selectedType) {
    const extension = fileName.split('.').pop().toLowerCase();
    const mimeTypes = {
        video: ['video/mp4', 'video/x-msvideo', 'video/quicktime', 'video/x-ms-wmv', 'video/x-flv', 'video/x-matroska', 'video/webm'],
        audio: ['audio/mpeg', 'audio/wav', 'audio/aac', 'audio/ogg', 'audio/flac', 'audio/x-ms-wma', 'audio/mp4'],
        images: ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff', 'image/svg+xml', 'image/webp', 'image/x-icon', 'image/vnd.adobe.photoshop', 'image/x-canon-cr2', 'image/x-nikon-nef', 'image/x-sony-arw'],
        documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'text/plain', 'application/rtf', 'application/vnd.oasis.opendocument.text', 'application/vnd.oasis.opendocument.spreadsheet', 'application/vnd.oasis.opendocument.presentation']
    };

    const extensions = {
        video: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'],
        audio: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'wma', 'm4a'],
        images: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'svg', 'webp', 'ico', 'psd', 'cr2', 'nef', 'arw'],
        documents: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf', 'odt', 'ods', 'odp', 'md', 'djvu', 'epub']
    };

    console.log('Selected Type:', selectedType);
    console.log('File Extension:', extension);
    console.log('File Type:', fileType);

    if (selectedType.includes('other')) {
        // Accept any file type for 'other'
        return true;
    }

    // Normalize selectedType based on its keyword
    if (selectedType.includes('images')) {
        selectedType = 'images';
    } else if (selectedType.includes('video')) {
        selectedType = 'video';
    } else if (selectedType.includes('audio')) {
        selectedType = 'audio';
    } else if (selectedType.includes('documents')) {
        selectedType = 'documents';
    }

    if (extensions[selectedType] && mimeTypes[selectedType]) {
        const isExtensionValid = extensions[selectedType].includes(extension);
        const isMimeTypeValid = mimeTypes[selectedType].includes(fileType);

        console.log('Extension Valid:', isExtensionValid);
        console.log('MIME Type Valid:', isMimeTypeValid);

        return isExtensionValid && isMimeTypeValid;
    }

    return false;
}

// Function to upload file with progress tracking
function uploadFile(formData) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload', true);

    // Progress event
    xhr.upload.onprogress = function(event) {
        if (event.lengthComputable) {
            let percentComplete = (event.loaded / event.total) * 100;
            progressBar.style.width = percentComplete + '%';
            progressBar.textContent = Math.round(percentComplete) + '%';
        }
    };

    // Load event
    xhr.onload = function() {
        if (xhr.status === 200) {
            progressBar.style.width = '100%';
            progressBar.textContent = '100%';
            alert('Your file has been successfully uploaded.');
        } else {
            alert('Sorry, an error occurred while uploading your file. Please try again.');
        }
    };

    // Error event
    xhr.onerror = function() {
        alert('Sorry, an error occurred while uploading your file. Please try again.');
    };

    // Send the request
    xhr.send(formData);
}
