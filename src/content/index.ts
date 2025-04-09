import decryptImg from "../utils/decryptImg";

function askForKey() {
  const key = prompt(
    "Enter key for the password. (Leave blank if password has no key)",
  );
  if (key) {
    return key;
  }
  return "";
}

// Only run in web page context, not in extension popup
if (
  window.location.protocol === "http:" ||
  window.location.protocol === "https:"
) {
  // Convert all password fields to text fields
  function convertPasswordFields() {
    document.querySelectorAll('input[type="password"]').forEach((input) => {
      // Create wrapper div for the input
      const wrapper = document.createElement("div");
      wrapper.style.position = "relative";
      wrapper.style.display = "inline-block";

      // Create hidden file input
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.style.display = "none";

      // Handle file processing
      const handleImageFile = (file: File) => {
        if (file.type.startsWith("image/")) {
          const key = askForKey();
          if (key) {
            const decrytedPassword = decryptImg(file, key);
            alert(decrytedPassword);
          }
        }
      };

      fileInput.addEventListener("change", (e) => {
        const files = (e.target as HTMLInputElement).files;
        if (files && files.length > 0) {
          handleImageFile(files[0]);
        }
      });

      // Overlay div
      const overlay = document.createElement("div");
      overlay.style.position = "absolute";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "rgb(57 57 57)";
      overlay.style.border = "2px dashed #ffb100";
      overlay.style.borderRadius = "5px";
      overlay.style.color = "white";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.cursor = "pointer";
      overlay.style.opacity = "0";
      overlay.style.transition = "opacity 0.2s";
      overlay.textContent = "Drop image here or click to browse";

      // Show overlay on hover
      wrapper.addEventListener("mouseenter", () => {
        overlay.style.opacity = "1";
      });
      wrapper.addEventListener("mouseleave", () => {
        overlay.style.opacity = "0";
      });

      // Handle click to open file explorer
      overlay.addEventListener("click", () => {
        fileInput.click();
      });

      // Handle drag and drop events
      wrapper.addEventListener("dragover", (e) => {
        e.preventDefault();
        overlay.style.opacity = "1";
      });

      wrapper.addEventListener("drop", (e) => {
        e.preventDefault();
        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
          handleImageFile(files[0]);
        }
      });

      // Wrap the input with new elements
      input.parentNode?.insertBefore(wrapper, input);
      wrapper.appendChild(input);
      wrapper.appendChild(fileInput);
      wrapper.appendChild(overlay);

      input.setAttribute("type", "text");
    });
  }

  // Set up observer and run initial conversion
  function setupObserver() {
    convertPasswordFields();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          convertPasswordFields();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupObserver);
  } else {
    setupObserver();
  }
}
