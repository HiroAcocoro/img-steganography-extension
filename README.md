# Image Password

Chrome extension for embedding encrypted password inside an image.

![ezgif-899ecdec77cb12](https://github.com/user-attachments/assets/a21b8de5-f932-4fe5-a57d-c1890a87508e)

## Features

 - Embed password inside images replacing Lease-Significant Bits (LSB) with the encrypted password bits. This means images will have no noticeable changes making it discreet.
 - Decrypt images with embedded passwords.
 - Drag and Drop images with password directly into password fields to extract and fill passwords.
##
### Requirements
- node: >= 14.0.0
- npm: >= 6.0.0
- any chromium-based browser

### Installation
 1. run `yarn build`
 2. go to the browser's extension
 3. turn on **Developer mode**
 4. Click **Load unpacked**
 5. navigate to the project's directory
 6. select `dist` directory


## How to use

 ### Encrypting passwords
 
 1. open the extension inside the browser
 2. select any image or drag inside the dropzone
 3. **optional** enter a key
 4. enter your password and confirm password
 5. click **Encrypt**
 6. click  **Encrypted image** to download the image with embedded pasword

 ### Decrypting passwords
 1. open the extension inside the browser
 2. select any image or drag inside the dropzone
 3.  **optional** enter key
 4. click **Decrypt**

 ### Using image password fill
 
 1. navigate to a page with a password field
 2. hover on the password field to reveal dropzone component
 3. select password image or drag in the password field
