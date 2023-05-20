document.addEventListener("DOMContentLoaded", function() {
  const popups = document.querySelectorAll(".popup-container");
  const centerBtn = document.querySelector("#center-btn");
  const smallBtns = Array.from(document.querySelectorAll(".small-btn"));
  const container = document.querySelector(".container");
  const mainpop = document.getElementById("mainpop");
  const videopop = document.getElementById("videopop");
  const textopop = document.getElementById("textopop");
  const photopop = document.getElementById("photopop");
  const soundpop = document.getElementById("soundpop");
  const closeBtn = document.getElementById("close-btn");
  const addBtn = document.querySelector("#add-btn");
  const menu = document.querySelector(".menu");
  const popupIds = ["videopop", "textopop", "photopop", "soundpop"];

  const smallBtnsContainer = document.createElement("div");
  smallBtnsContainer.className = "small-btns-container";
  container.appendChild(smallBtnsContainer);

  // Function to show the specified popup and hide others
  function showPopup(popup) {
    mainpop.style.display = "block";
    videopop.style.display = "none";
    textopop.style.display = "none";
    photopop.style.display = "none";
    soundpop.style.display = "none";

    if (popup === "videopop") {
      videopop.style.display = "block";
    } else if (popup === "textopop") {
      textopop.style.display = "block";
    } else if (popup === "photopop") {
      photopop.style.display = "block";
    } else if (popup === "soundpop") {
      soundpop.style.display = "block";
    }
  }

// Add event listeners for button drag
smallBtns.forEach((btn) => {
  btn.addEventListener("mousedown", (event) => {
    if (event.button === 0) {
      handleButtonDrag(event);
    }
  });
  btn.addEventListener("touchstart", handleButtonDrag);
});


  // Function to close the popup
  function closePopup() {
    mainpop.style.display = "none";
  }

  // Add event listener to the close button
  closeBtn.addEventListener("click", closePopup);

  addBtn.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  menu.addEventListener("click", (event) => {
    const optionBtn = event.target.closest(".option-btn");
    if (optionBtn) {
      const selectedId = optionBtn.dataset.id;
      createSmallBtn(selectedId);
      menu.classList.remove("open");
      positionSmallButtons(); // Recalculate small button positions
    }
  });

function createSmallBtn(id) {
  const smallBtn = document.createElement("button");
  smallBtn.className = "small-btn";
  smallBtn.id = `small-btn-${id}`;
  smallBtn.innerText = id;
  smallBtn.addEventListener("click", (event) => {
    const popupId = event.target.id.split("-")[2];
    showPopup(popupId);
    console.log("Split popupId:", popupId);
  });

  smallBtn.addEventListener("mousedown", handleButtonDrag);
  smallBtn.addEventListener("touchstart", handleButtonDrag);

  smallBtnsContainer.appendChild(smallBtn);
  smallBtns.push(smallBtn);
}

  function positionSmallButtons() {
    const containerSize = Math.min(container.offsetWidth, container.offsetHeight);
    const radius = containerSize * 0.35;
    const transitionDuration = 1500; // Adjust this value to control the transition speed

    smallBtns.forEach((btn, index) => {
      const angle = (360 / smallBtns.length) * index;
      const radians = (angle * Math.PI) / 180;
      const top =
        Math.sin(radians) * radius +
        container.offsetHeight * 0.5 -
        btn.offsetHeight * 0.5;
      const left =
        Math.cos(radians) * radius +
        container.offsetWidth * 0.5 -
        btn.offsetWidth * 0.5;

      btn.style.transitionDuration = `${transitionDuration}ms`;
      btn.style.transform = `translate(${left}px, ${top}px)`;
    });
  }

  // Call the positionSmallButtons function initially and on window resize
  positionSmallButtons();
  window.addEventListener("resize", positionSmallButtons);

  // Function to handle the "Add Button" feature
  function addButton() {
    const newButtonId = prompt("Enter the ID for the new button:");
    if (newButtonId) {
      createSmallBtn(newButtonId);
      positionSmallButtons();
    }
  }

  // Create and add the "Add Button" functionality
  const addButtonBtn = document.createElement("button");
  addButtonBtn.className = "add-button";
  addButtonBtn.innerText = "+";
  addButtonBtn.addEventListener("click", addButton);
  container.appendChild(addButtonBtn);

  // Function to delete a button
  function deleteButton(button) {
    const index = smallBtns.indexOf(button);
    if (index !== -1) {
      smallBtns.splice(index, 1);
      button.remove();
      positionSmallButtons();
    }
  }
  
  // Function to handle the button drag
function handleButtonDrag(event) {
  const button = event.target;
  const containerRect = container.getBoundingClientRect();
  const marginThreshold = window.innerHeight * 0.35;

  const handleDragMove = (dragEvent) => {
    dragEvent.preventDefault();
    let clientX, clientY;

    if (dragEvent.type === "touchmove") {
      const touch = dragEvent.touches[0] || dragEvent.changedTouches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else {
      clientX = dragEvent.clientX;
      clientY = dragEvent.clientY;
    }

    const mouseY = clientY - containerRect.top;
    const mouseX = clientX - containerRect.left;
    const buttonRect = button.getBoundingClientRect();

    if (mouseY >= window.innerHeight - marginThreshold) {
      // Delete the button
      deleteButton(button);
      } else {
        // Move the button with the pointer
        
      button.style.transitionDuration = "200ms";
        button.style.transform = `translate(${mouseX - buttonRect.width / 2}px, ${
          mouseY - buttonRect.height / 2}px)`;
      }
    };

  const handleDragEnd = () => {
    document.removeEventListener("mousemove", handleDragMove);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchmove", handleDragMove);
    document.removeEventListener("touchend", handleDragEnd);

    // Reset transition duration on release
    button.style.transitionDuration = "1500ms";
  };

  document.addEventListener("mousemove", handleDragMove);
  document.addEventListener("mouseup", handleDragEnd);
  document.addEventListener("touchmove", handleDragMove, { passive: false });
  document.addEventListener("touchend", handleDragEnd);
}




  // Add event listeners for button drag
  smallBtns.forEach((btn) => {
  btn.addEventListener("mousedown", handleButtonDrag);
  btn.addEventListener("touchstart", handleButtonDrag);
});
});


// |FULL SCREEN start -

const fullscreenBtn = document.getElementById("fullscreen-btn");

// Toggle fullscreen mode when the button is clicked
fullscreenBtn.addEventListener("click", toggleFullscreen);

// Function to toggle fullscreen mode
function toggleFullscreen() {
  if (document.fullscreenElement || document.webkitFullscreenElement ||
    document.mozFullScreenElement || document.msFullscreenElement) {
    exitFullscreen();
  } else {
    enterFullscreen();
  }
}

// Function to enter fullscreen mode
function enterFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
}

// Function to exit fullscreen mode
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

// Listen for fullscreen change event
document.addEventListener("fullscreenchange", handleFullscreenChange);
document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
document.addEventListener("mozfullscreenchange", handleFullscreenChange);
document.addEventListener("MSFullscreenChange", handleFullscreenChange);

// Function to handle fullscreen change event
function handleFullscreenChange() {
  if (document.fullscreenElement || document.webkitFullscreenElement ||
    document.mozFullScreenElement || document.msFullscreenElement) {
    fullscreenBtn.classList.add("fullscreen");
  } else {
    fullscreenBtn.classList.remove("fullscreen");
  }
}


// Check if the current device is a mobile device
const isMobileDevice = /Mobi/i.test(navigator.userAgent);

// Toggle fullscreen mode on mobile devices by default
if (isMobileDevice) {
  toggleFullscreen();
}

// - FULL SCREEN end|
