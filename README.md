<img src="https://github.com/SSobol77/Mini-Cloud/blob/main/public/logo.png" alt="Logo of Mini-Cloud" title="Mini-Cloud" width="170" height="170">

# Mini-Cloud API

**Project Description:**
MiniCloud is a lightweight web server for hosting and managing files. It is implemented using Node.js, with Express.js and the Handlebars template engine for rendering pages. Key functionalities include uploading, storing, downloading, and deleting files via a web interface.

#### Storage:
<img src="https://github.com/SSobol77/Mini-Cloud/blob/main/img/mc_storage.png" alt="Logo of Mini-Cloud" title="Mini-Cloud" width="470" height="270">

#### Upload:
<img src="https://github.com/SSobol77/Mini-Cloud/blob/main/img/mc_upload.png" alt="Logo of Mini-Cloud" title="Mini-Cloud" width="470" height="270">

#### Docs:
<img src="https://github.com/SSobol77/Mini-Cloud/blob/main/img/mc_docs.png" alt="Logo of Mini-Cloud" title="Mini-Cloud" width="470" height="270">

#### Config:
<img src="https://github.com/SSobol77/Mini-Cloud/blob/main/img/mc_config.png" alt="Logo of Mini-Cloud" title="Mini-Cloud" width="470" height="270">


### Mini-Cloud API: Detailed Project Structure and Description

#### Project Structure:
```
MINI-CLOUD-API
|
|--/cloud
|
|--/datajsons
|   |
|   |--newtopic1-typefile.json (newtopic - name create from user; typefile = [video, audio, images, documents, other])
|   |--...
|
|--/node_modules
|
|--/public
|   |
|   |--favicon.ico    
|   |--logo.png
|   |
|   |--/css
|   |   |--styles.css
|   |   |--styles_docs.css
|   |
|   |--/js
|       |--script_config.js
|       |--script_index.js
|       |--script_upload.js
|       |--scripts.js
|
|--/routes
|   |--api.js
|   |--config.js
|   |--docs.js
|   |--storage.js
|   |--upload.js
|       
|--/views
|   |
|   |--/partial
|   |   |--menu.hbs
|   |
|   |--config.hbs
|   |--docs.hbs
|   |--index.hbs
|   |--upload.hbs
|
|--app.js
|--package-lock.json
|--package.json
|--readme.md
|--filesData.json (contains a list of downloaded files)
```

#### Directory and File Descriptions:

- `/cloud`: Directory for storing uploaded files.
- `/datajsons`: Directory for storing JSON files corresponding to new topics created by the user. These files are named using the format `newtopic-typefile.json`, where `newtopic` is a user-created name, and `typefile` indicates the type of file (video, audio, images, documents, other).
- `/node_modules`: Contains Node.js modules and dependencies.
- `/public`: Contains static files such as images, CSS, and JavaScript.
  - `/css`: Directory for CSS stylesheets.
    - `styles.css`: Main stylesheet.
    - `styles_docs.css`: Stylesheet specifically for the documents page.
  - `/js`: Directory for JavaScript files.
    - `script_config.js`: JavaScript for configuration-related functionality.
    - `script_index.js`: JavaScript for the main index page.
    - `script_upload.js`: JavaScript for file upload functionality.
    - `scripts.js`: General JavaScript functions used across the project.
  - `favicon.ico`: Icon for the web application.
  - `logo.png`: Logo image for the web application.
- `/routes`: Contains route handlers for different parts of the application.
  - `api.js`: Route handler for API endpoints.
  - `config.js`: Route handler for configuration-related endpoints.
  - `docs.js`: Route handler for documentation-related endpoints.
  - `storage.js`: Route handler for storage-related endpoints.
  - `upload.js`: Route handler for upload-related endpoints.
- `/views`: Contains Handlebars templates for rendering web pages.
  - `/partial`: Directory for partial templates.
    - `menu.hbs`: Template for the navigation menu.
  - `config.hbs`: Template for the configuration page where users can generate new topics.
  - `docs.hbs`: Template for the documentation page.
  - `index.hbs`: Template for the main index page.
  - `upload.hbs`: Template for the file upload page.
- `app.js`: Main server file that initializes and runs the Node.js application.
- `package-lock.json` & `package.json`: Configuration files that list project dependencies and metadata.
- `readme.md`: Project description and documentation.
- `filesData.json`: File containing data about uploaded files.

#### Key Features:

1. **File Upload**:
   - Files are uploaded to the `/cloud` directory using Multer and are saved under their original names.
   
2. **Viewing and Downloading**:
   - Pages for viewing uploaded files, downloading them, or opening them directly in the browser.
   
3. **File Deletion**:
   - Functionality to delete files from the server and update the file list.
   
4. **Security**:
   - Content Security Policy that restricts the sources from which scripts, styles, and other resources can be loaded.
   
5. **Server Startup**:
   - The server runs on port 3000 and is available locally for development and testing functionalities.

#### Technologies:

- **Node.js and Express.js**: For server logic and routing.
- **Handlebars**: For server-side page rendering.
- **Bootstrap**: For styling the interface and ensuring responsiveness.
- **Multer**: For handling files uploaded to the server.
- **JSON**: For storing file data and topics.

This project provides a foundation for more complex content management systems or personal cloud solutions that support a broader range of features and a high level of customization.


# Mini-Cloud Documentation

## Learn how to effectively use Mini Cloud

### Table of Contents

- [Learn how to effectively use Mini Cloud](#learn-how-to-effectively-use-mini-cloud)
- [Introduction to Mini-Cloud API](#introduction-to-mini-cloud-api)
- [Installation Instructions](#installation-instructions)
- [API Usage Instructions](#api-usage-instructions)
- [Configuring Mini-Cloud API](#configuring-mini-cloud-api)
- [Utilizing Mini-Cloud API](#utilizing-mini-cloud-api)
- [How-To Guides](#how-to-guides)
- [Integration Examples](#integration-examples)
  - [CI/CD Tools (Continuous Integration/Continuous Deployment)](#cicd-tools-continuous-integrationcontinuous-deployment)
    - [Jenkins Integration](#jenkins-integration)
    - [GitLab CI/CD Integration](#gitlab-cicd-integration)
  - [Monitoring and Alerting](#monitoring-and-alerting)
    - [Prometheus Integration (Python)](#prometheus-integration-python)
    - [Nagios Integration](#nagios-integration)
  - [Cloud Services](#cloud-services)
    - [AWS S3 Sync (Node.js)](#aws-s3-sync-nodejs)
    - [Google Cloud Storage Integration (Python)](#google-cloud-storage-integration-python)
  - [Project Management Tools](#project-management-tools)
    - [JIRA Integration](#jira-integration)
    - [Trello Integration](#trello-integration)
  - [Content Management Systems (CMS)](#content-management-systems-cms)
    - [WordPress Integration](#wordpress-integration)
    - [Drupal Integration](#drupal-integration)
  - [Data Tools](#data-tools)
    - [Jupyter Notebook Integration (Python)](#jupyter-notebook-integration-python)
    - [Apache Kafka Integration](#apache-kafka-integration)
  - [Automation Tools](#automation-tools)
    - [Ansible Integration](#ansible-integration)
    - [Terraform Integration](#terraform-integration)

## Introduction to Mini-Cloud API

Mini-Cloud is a lightweight web server designed to host and manage files. It provides functionalities for uploading, storing, downloading, and deleting files through a user-friendly web interface. Users can organize their files into themes, making file management more intuitive and efficient.

Key features of Mini-Cloud include:

- **File Upload:** Upload files through an easy-to-use web interface.
- **File Storage:** Store files securely on the server.
- **File Download:** Download files when needed.
- **File Deletion:** Delete files that are no longer needed.
- **Theme Management:** Organize files into user-defined themes for better management.

Mini-Cloud is implemented using Node.js, with Express.js for the server and Handlebars for rendering pages. This makes it a flexible and scalable solution for small to medium-sized file hosting needs.

## Installation Instructions

To install and set up Mini-Cloud API, follow these steps:

**Prerequisites:**

- Ensure you have Node.js and npm installed on your system.

**Steps:**

1. Clone the repository from GitHub:

    ```bash
    git clone https://github.com/your-repo/MiniCloud.git
    ```

2. Navigate to the project directory:

    ```bash
    cd MiniCloud
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Start the server:

    ```bash
    npm start
    ```

5. Open your browser and go to [http://localhost:3000](http://localhost:3000) to access Mini-Cloud.

After completing these steps, Mini-Cloud will be up and running on your local machine.

## API Usage Instructions

The Mini-Cloud API allows you to manage files and themes programmatically. Below are the key endpoints and their usage:

**Get List of Files**

```http
GET /api/files
```

Retrieves a list of all files stored in the cloud.

**Upload File**

```http
POST /api/upload
```

Uploads a new file to the cloud.

**Request Parameters:**

- `filedata` (form-data): The file to be uploaded.
- `theme` (form-data): The theme under which the file should be categorized.

**Download File**

```http
GET /api/download/:filename
```

Downloads the specified file.

**Delete File**

```http
DELETE /api/delete/:filename
```

Deletes the specified file.

**Get List of Themes**

```http
GET /api/themes
```

Retrieves a list of all themes.

**Create New Theme**

```http
POST /api/themes
```

Creates a new theme.

**Request Parameters:**

- `themeName` (JSON): The name of the new theme.
- `themeType` (JSON): The type of the theme (e.g., video, audio, documents, images, other).

**Delete Theme**

```http
DELETE /api/themes/:themeName
```

Deletes the specified theme.

## Configuring Mini-Cloud API

Configuring Mini-Cloud involves setting up and managing themes to categorize your files efficiently. Themes are a powerful feature that allows you to group files based on their types or any other criteria you choose. Here's how you can configure themes in Mini-Cloud:

**Creating a New Theme:**

- Navigate to the Configuration page.
- Enter a unique name for the new theme. The name should be descriptive and relevant to the type of files it will contain.
- Select the type of files the theme will handle (e.g., video, audio, documents, images, other).
- Click the "Create Theme" button to add the new theme.

**Managing Existing Themes:**

- On the Configuration page, you will see a list of existing themes.
- Each theme can be deleted by clicking the "Delete" button next to its name. Deleting a theme will remove it from the system, but it will not delete the files associated with it.

Using themes helps keep your files organized and makes it easier to manage them within the Mini-Cloud system. Themes can be tailored to suit your specific needs, providing a flexible and scalable solution for file organization.

## Utilizing Mini-Cloud API

Using Mini-Cloud is straightforward and user-friendly. Here are the key steps to effectively utilize Mini-Cloud:

**Uploading Files:**

- Navigate to the Upload page.
- Select the theme under which you want to categorize the file.
- Choose the file you want to upload from your local system.
- Click the "Upload" button to upload the file to the server.

**Downloading Files:**

- Go to the Storage page where all uploaded files are listed.
- Find the file you want to download and click the "Download" button next to it.

**Deleting Files:**

- On the Storage page, locate the file you wish to delete.
- Click the "Delete" button next to the file. Confirm the deletion if prompted.

Mini-Cloud's user interface is designed to be intuitive, making it easy for users to manage their files without any hassle. Whether you are uploading, downloading, or deleting files, the process is simple and efficient.

## How-To Guides

Our How-To Guides provide step-by-step instructions on performing various tasks within Mini-Cloud. Whether you are uploading your first file or configuring complex themes, these guides will help you get the most out of Mini-Cloud.

**How to Upload Files:**

- Navigate to the Upload page.
- Select the theme under which you want to categorize the file.
- Choose the file you want to upload from your local system.
- Click the "Upload" button to upload the file to the server.
- Wait for the upload to complete and check for the confirmation message.

**How to Download Files:**

- Go to the Storage page where all uploaded files are listed.
- Find the file you want to download and click the "Download" button next to it.

**How to Delete Files:**

- On the Storage page, locate the file you wish to delete.
- Click the "Delete" button next to the file. Confirm the deletion if prompted.

These guides ensure you can utilize all the features of Mini-Cloud effectively, allowing you to manage your files with ease.

## Integration Examples

### CI/CD Tools (Continuous Integration/Continuous Deployment)

#### Jenkins Integration

Jenkins can integrate with Mini-Cloud API to upload and store build artifacts. Here is an example of how to achieve this integration.

```groovy
pipeline {
    agent any

    stages {
        stage('Upload Artifact') {
            steps {
                script {
                    def response = httpRequest(
                        httpMode: 'POST',
                        url: 'http://localhost:3000/api/upload',
                        formData: [
                            filedata: file('path/to/artifact.zip'),
                            theme: 'artifacts'
                        ]
                    )
                    echo "Response: ${response}"
                }
            }
        }
    }
}
```

#### GitLab CI/CD Integration

Use Mini-Cloud API to store logs or artifacts in the cloud with GitLab CI/CD.

```yaml
stages:
  - upload

upload_artifact:
  stage: upload
  script:
    - curl -X POST -F "filedata=@path/to/artifact.zip" -F "theme=artifacts" http://localhost:3000/api/upload
```

### Monitoring and Alerting

#### Prometheus Integration (Python)

Prometheus and Grafana can use Mini-Cloud API for storing metrics and logs, which can then be visualized in Grafana.

```python
import requests

# Get list of files
response = requests.get('http://localhost:3000/api/files')
files = response.json()
print(files)

# Upload a file
files

 = {'filedata': open('path/to/your/file.txt', 'rb')}
data = {'theme': 'documents'}
response = requests.post('http://localhost:3000/api/upload', files=files, data=data)
print(response.json())

# Download a file
response = requests.get('http://localhost:3000/api/download/file.txt')
with open('downloaded_file.txt', 'wb') as f:
    f.write(response.content)

# Delete a file
response = requests.delete('http://localhost:3000/api/delete/file.txt')
print(response.json())
```

#### Nagios Integration

Nagios can use Mini-Cloud for storing logs or configuration files.

```bash
# Command definition for Nagios to check file existence
define command {
    command_name    check_file_exists
    command_line    /usr/lib/nagios/plugins/check_file_exists.sh $ARG1$
}

# Script: /usr/lib/nagios/plugins/check_file_exists.sh
#!/bin/bash
if [ -f "$1" ]; then
    echo "File $1 exists."
    exit 0
else
    echo "File $1 does not exist."
    exit 2
fi
```

### Cloud Services

#### AWS S3 Sync (Node.js)

Integrate Mini-Cloud API with AWS S3 to sync files between Mini-Cloud and AWS S3.

```javascript
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const axios = require('axios');
const fs = require('fs');

// Download file from Mini-Cloud
axios.get('http://localhost:3000/api/download/file.txt', { responseType: 'stream' })
  .then(response => {
    const filePath = 'file.txt';
    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    writer.on('finish', () => {
      // Upload to S3
      s3.upload({
        Bucket: 'your-s3-bucket',
        Key: 'file.txt',
        Body: fs.createReadStream(filePath)
      }, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`File uploaded successfully at ${data.Location}`);
        }
      });
    });

    writer.on('error', error => console.error(error));
  })
  .catch(error => console.error(error));
```

#### Google Cloud Storage Integration (Python)

Similar to AWS S3, you can integrate Mini-Cloud API with Google Cloud Storage for synchronization and storage.

```python
from google.cloud import storage
import requests

# Initialize a client
storage_client = storage.Client()

# Create a bucket object
bucket_name = 'your-gcs-bucket'
bucket = storage_client.bucket(bucket_name)

# Download file from Mini-Cloud
response = requests.get('http://localhost:3000/api/download/file.txt')
with open('file.txt', 'wb') as file:
    file.write(response.content)

# Upload the file to GCS
blob = bucket.blob('file.txt')
blob.upload_from_filename('file.txt')

print(f'File uploaded to {bucket_name}.')
```

### Project Management Tools

#### JIRA Integration

Use Mini-Cloud API for storing attachments to JIRA issues.

```javascript
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const form = new FormData();
form.append('filedata', fs.createReadStream('path/to/attachment.zip'));
form.append('theme', 'attachments');

axios.post('http://localhost:3000/api/upload', form, {
  headers: form.getHeaders()
})
  .then(response => {
    const attachmentUrl = response.data.url;
    const jiraUrl = 'https://your-jira-instance.atlassian.net';
    const issueId = 'PROJECT-123';
    const auth = {
      username: 'your-email@example.com',
      password: 'your-api-token'
    };

    axios.post(`${jiraUrl}/rest/api/3/issue/${issueId}/attachments`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${auth.username}:${auth.password}`).toString('base64')}`,
        'X-Atlassian-Token': 'no-check'
      },
      body: fs.createReadStream(attachmentUrl)
    })
      .then(res => console.log('Attachment added to JIRA issue:', res.data))
      .catch(err => console.error('Error adding attachment to JIRA issue:', err));
  })
  .catch(err => console.error('Error uploading file to Mini-Cloud:', err));
```

#### Trello Integration

Store files and documents related to Trello cards using Mini-Cloud API.

```python
import requests

# Trello API details
api_key = 'your-api-key'
api_token = 'your-api-token'
board_id = 'your-board-id'

# File upload details
theme = 'attachments'
file_path = 'path/to/attachment.zip'

# Upload file to Mini-Cloud
with open(file_path, 'rb') as file:
    response = requests.post(
        'http://localhost:3000/api/upload',
        files={'filedata': file},
        data={'theme': theme}
    )
    response.raise_for_status()

file_url = response.json()['url']

# Add attachment to Trello card
card_id = 'your-card-id'
attachment_url = f'https://api.trello.com/1/cards/{card_id}/attachments'
params = {
    'key': api_key,
    'token': api_token,
    'url': file_url
}
response = requests.post(attachment_url, params=params)
response.raise_for_status()

print('Attachment added to Trello card.')
```

### Content Management Systems (CMS)

#### WordPress Integration

Use Mini-Cloud API to store media files with WordPress.

```php
function upload_to_minicloud($file_path, $theme) {
    $url = 'http://localhost:3000/api/upload';
    $file_data = array('filedata' => new CURLFile($file_path), 'theme' => $theme);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $file_data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}

$file_path = 'path/to/your/file.jpg';
$theme = 'images';
$response = upload_to_minicloud($file_path, $theme);
echo 'File uploaded: ' . $response['url'];
```

#### Drupal Integration

Similar to WordPress, integrate Mini-Cloud API with Drupal to store documents and images.

```php
function upload_to_minicloud($file_path, $theme) {
    $url = 'http://localhost:3000/api/upload';
    $file_data = array('filedata' => new CURLFile($file_path), 'theme' => $theme);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $file_data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}

$file_path = 'path/to/your/file.jpg';
$theme = 'images';
$response = upload_to_minicloud($file_path, $theme);
echo 'File uploaded: ' . $response['url'];
```

### Data Tools

#### Jupyter Notebook Integration (Python)

Integrate Mini-Cloud API with Jupyter Notebook to store and retrieve datasets.

```python
import requests

# Upload a file to Mini-Cloud
file_path = 'path/to/your/dataset.csv'
theme = 'datasets'

with open(file_path, 'rb') as file:
    response = requests.post(
        'http://localhost:3000/api/upload',
        files={'filedata': file},
        data={'theme': theme}
    )
    response.raise_for_status()

print('File uploaded:', response.json()['url'])

# Download a file from Mini-Cloud
response = requests.get('http://localhost:3000/api/download/dataset.csv')
with open('downloaded_dataset.csv', 'wb') as file:
    file.write(response.content)

print('File downloaded')
```

#### Apache Kafka Integration

Store logs or metrics using Mini-Cloud API with Apache Kafka.

```python
from kafka import KafkaProducer
import requests

# Kafka producer configuration
producer = KafkaProducer(bootstrap_servers='localhost:9092')

# Upload a log file to Mini-Cloud
log_file_path = 'path/to/your/logfile.log'
theme = 'logs'

with open(log_file_path, 'rb') as file:
    response = requests.post(
        'http://localhost:3000/api/upload',
        files={'filedata': file},
        data={'theme': theme}
    )
    response.raise_for_status()

log_url = response.json()['url']
print('Log file uploaded:', log_url)

# Send the log URL to Kafka
producer.send('logs_topic', log_url.encode('utf-8'))
producer.flush()

print('Log URL sent to Kafka')
```

### Automation Tools

#### Ansible Integration

Ansible is a task automation tool that can be used for configuration management and deployments. With Mini-Cloud API, you can store configuration files and other artifacts, making it easy to integrate them into your Ansible playbooks.

**Example Ansible Playbook for Uploading and Downloading Files**

```yaml
---
- name: Integrate Mini-Cloud API with Ansible
  hosts: localhost
  tasks:
    - name: Download configuration file from Mini-Cloud


      get_url:
        url: http://localhost:3000/api/download/config.yaml
        dest: /path/to/destination/config.yaml

    - name: Upload configuration file to Mini-Cloud
      uri:
        url: http://localhost:3000/api/upload
        method: POST
        headers:
          Content-Type: multipart/form-data
        body_format: form-multipart
        body:
          filedata: "{{ lookup('file', '/path/to/source/config.yaml') }}"
          theme: "configurations"
```

**Code Explanation**

1. **Downloading a Configuration File from Mini-Cloud**

    ```yaml
    - name: Download configuration file from Mini-Cloud
      get_url:
        url: http://localhost:3000/api/download/config.yaml
        dest: /path/to/destination/config.yaml
    ```

    This task uses the `get_url` module to download a configuration file from Mini-Cloud by specifying the URL and saving it to the specified location on the local machine.

2. **Uploading a Configuration File to Mini-Cloud**

    ```yaml
    - name: Upload configuration file to Mini-Cloud
      uri:
        url: http://localhost:3000/api/upload
        method: POST
        headers:
          Content-Type: multipart/form-data
        body_format: form-multipart
        body:
          filedata: "{{ lookup('file', '/path/to/source/config.yaml') }}"
          theme: "configurations"
    ```

    This task uses the `uri` module to upload a configuration file to Mini-Cloud. We specify the upload URL, the HTTP POST method, headers, and the request body, which includes the file and the theme under which it should be uploaded.

**Example Ansible Playbook for Configuring and Deploying an Application**

```yaml
---
- name: Configure and deploy application
  hosts: webservers
  tasks:
    - name: Ensure configuration file is present
      get_url:
        url: http://localhost:3000/api/download/app-config.yaml
        dest: /etc/myapp/config.yaml

    - name: Start the application
      service:
        name: myapp
        state: started
```

This Ansible playbook downloads a configuration file from Mini-Cloud and places it in the appropriate location on the server, then starts the application service using the downloaded configuration file.

**Example Playbook for Uploading Terraform State File**

```yaml
---
- name: Upload Terraform state file to Mini-Cloud
  hosts: localhost
  tasks:
    - name: Upload state file
      uri:
        url: http://localhost:3000/api/upload
        method: POST
        headers:
          Content-Type: multipart/form-data
        body_format: form-multipart
        body:
          filedata: "{{ lookup('file', 'terraform.tfstate') }}"
          theme: "state-files"
```

This Ansible playbook uploads a Terraform state file to Mini-Cloud, allowing you to easily manage state files when using Terraform for infrastructure management.

These examples demonstrate how to use Mini-Cloud API for integration with Ansible, automating tasks for uploading and downloading configuration and state files.

#### Terraform Integration

```hcl
provider "http" {}

data "http" "download_config" {
  url = "http://localhost:3000/api/download/config.yaml"
}

resource "local_file" "config" {
  content  = data.http.download_config.response_body
  filename = "/path/to/destination/config.yaml"
}

resource "null_resource" "upload_state" {
  provisioner "local-exec" {
    command = <<EOT
      curl -X POST -F "filedata=@/path/to/source/terraform.tfstate" -F "theme=configurations" http://localhost:3000/api/upload
    EOT
  }
}
```

This Terraform configuration uses the `http` provider to download a configuration file from Mini-Cloud and store it locally. It also includes a `null_resource` to upload a Terraform state file to Mini-Cloud using a local-exec provisioner.

.
