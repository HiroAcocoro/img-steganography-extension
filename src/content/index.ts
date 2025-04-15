import decryptImg from "../utils/decryptImg";

async function extractPasswordFromImg(file: File) {
  if (file.type.startsWith("image/")) {
    const key = askForKey();
    if (key) {
      const decrytedPassword = await decryptImg(file, key);
      if (decrytedPassword) return decrytedPassword;
    }
  }
}

function injectPasswordToInput(input: HTMLInputElement, password: string) {
  input.value = password;
}

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
  // Set up observer and run initial conversion
  function setupObserver() {
    // Track processed inputs to avoid duplicates
    const processedInputs = new WeakSet<HTMLInputElement>();

    function convertPasswordFields() {
      document
        .querySelectorAll('input[type="password"]')
        .forEach(async (element) => {
          const input = element as HTMLInputElement;

          // Skip if already processed
          if (processedInputs.has(input)) return;
          processedInputs.add(input);

          // Create wrapper div for the input
          const wrapper = document.createElement("div");
          wrapper.style.position = "relative";
          wrapper.style.display = "inline-block";

          // Create hidden file input
          const fileInput = document.createElement("input");
          fileInput.type = "file";
          fileInput.accept = "image/*";
          fileInput.style.display = "none";

          // Create a single event handler for file processing
          const handleFile = async (file: File) => {
            const password = await extractPasswordFromImg(file);
            if (password) injectPasswordToInput(input, password);
          };

          // Handle file input change
          fileInput.addEventListener("change", async (e) => {
            const files = (e.target as HTMLInputElement).files;
            if (files && files.length > 0) {
              await handleFile(files[0]);
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
          overlay.style.transition = "opacity 0.2s ease-in-out";
          overlay.textContent = "Drop image here or click to browse";

          // Create a single event handler for overlay interactions
          const handleOverlayInteraction = () => {
            fileInput.click();
          };

          // Show overlay on hover
          const showOverlay = () => (overlay.style.opacity = "1");
          const hideOverlay = () => (overlay.style.opacity = "0");

          wrapper.addEventListener("mouseenter", showOverlay);
          wrapper.addEventListener("mouseleave", hideOverlay);
          overlay.addEventListener("click", handleOverlayInteraction);

          // Handle drag and drop events
          wrapper.addEventListener("dragover", (e) => {
            e.preventDefault();
            showOverlay();
          });

          wrapper.addEventListener("drop", async (e) => {
            e.preventDefault();
            const files = e.dataTransfer?.files;
            if (files && files.length > 0) {
              await handleFile(files[0]);
            }
          });

          // Wrap the input with new elements
          input.parentNode?.insertBefore(wrapper, input);
          wrapper.appendChild(input);
          wrapper.appendChild(fileInput);
          wrapper.appendChild(overlay);
        });
    }

    convertPasswordFields();

    let timeout: NodeJS.Timeout | undefined;
    const observer = new MutationObserver((mutations) => {
      // Only process mutations that might affect password fields
      const hasRelevantChanges = mutations.some((mutation) => {
        if (mutation.type !== "childList") return false;

        // Check if any added nodes contain password inputs
        for (const node of mutation.addedNodes) {
          if (
            node instanceof HTMLElement &&
            (node.querySelector('input[type="password"]') ||
              (node.tagName === "INPUT" &&
                (node as HTMLInputElement).type === "password"))
          ) {
            return true;
          }
        }
        return false;
      });

      if (!hasRelevantChanges) return;

      // Debounce the conversion
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        convertPasswordFields();
      }, 100);
    });

    // Only observe changes to the document body
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup function
    return () => {
      observer.disconnect();
      if (timeout) clearTimeout(timeout);

      // Clean up all created wrappers and event listeners
      document.querySelectorAll(".password-wrapper").forEach((wrapper) => {
        const input = wrapper.querySelector('input[type="password"]');
        if (input) {
          wrapper.parentNode?.insertBefore(input, wrapper);
          wrapper.remove();
        }
      });

      // The WeakSet will be garbage collected automatically
    };
  }

  // Run when DOM is ready
  let cleanup: (() => void) | undefined;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      cleanup = setupObserver();
    });
  } else {
    cleanup = setupObserver();
  }

  // Add cleanup on page unload
  window.addEventListener("unload", () => {
    if (cleanup) cleanup();
  });
}
