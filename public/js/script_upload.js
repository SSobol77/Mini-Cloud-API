// Script Upload page
const form = document.getElementById('uploadForm');
form.onsubmit = async function(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = '0%';
    progressBar.textContent = '0%';

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        if (response.ok) {
            progressBar.style.width = '100%';
            progressBar.textContent = '100%';
            alert('File successfully uploaded');
        } else {
            throw new Error(result.message || 'An error occurred while uploading the file');
        }
    } catch (error) {
        alert(error.message);
    }
};

form.addEventListener('change', () => {
    const file = document.getElementById('fileInput').files[0];
    if (file.size > 10 * 1024 * 1024) { // 10 MB limit upload file
        alert('File is too large. Max size is 10MB.');
        form.reset();
    } else {
        if (!isValidFileType(file.name, file.type)) {
            alert('Invalid file type.');
            form.reset();
        }
    }
});

// Function filtering type upload file
function isValidFileType(fileName, fileType) {
    const extension = fileName.split('.').pop().toLowerCase();
    const mimeTypes = {
        video: ['video/mp4', 'video/x-msvideo', 'video/quicktime', 'video/x-ms-wmv', 'video/x-flv', 'video/x-matroska', 'video/webm'],
        audio: ['audio/mpeg', 'audio/wav', 'audio/aac', 'audio/ogg', 'audio/flac', 'audio/x-ms-wma', 'audio/mp4'],
        images: ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff', 'image/svg+xml', 'image/webp', 'image/x-icon', 'image/vnd.adobe.photoshop', 'image/x-canon-cr2', 'image/x-nikon-nef', 'image/x-sony-arw', 'image/vnd.dwg', 'image/x-psd', 'image/vnd.corel-draw', 'image/x-krita'],
        documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'text/plain', 'application/rtf', 'application/vnd.oasis.opendocument.text', 'application/vnd.oasis.opendocument.spreadsheet', 'application/vnd.oasis.opendocument.presentation']
    };

    const extensions = {
        video: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'],
        audio: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'wma', 'm4a'],
        images: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'svg', 'webp', 'ico', 'psd', 'cr2', 'nef', 'arw', 'cdr', 'cpt', 'kra', 'ai', 'eps'],
        documents: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf', 'odt', 'ods', 'odp', 'md', 'djvu', 'epub']
    };

    for (const category in extensions) {
        if (extensions[category].includes(extension) && mimeTypes[category].includes(fileType)) {
            return true;
        }
    }
    return false;
}
