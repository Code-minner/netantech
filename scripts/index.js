const words = [ "Tech Evolution", "Modern Era", "Digital Future"];
let currentIndex = 0;

const dynamicWordElement = document.getElementById("dynamic-word");

function changeWord() {
    // Start fade out
    dynamicWordElement.style.opacity = "0";
    
    setTimeout(() => {
        // Change text and fade in
        dynamicWordElement.textContent = words[currentIndex];
        dynamicWordElement.style.opacity = "1";
        currentIndex = (currentIndex + 1) % words.length;
    }, 800); // Wait 1s for fade out
}

// Change words every 4 seconds (3s display + 1s fade transition)
setInterval(changeWord, 3000);




let loader = document.getElementById("loader");

setTimeout(() => {
    loader.classList.add("dis");
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500); // Match this delay to the animation duration in CSS
}, 6000);




function toggleNavBar() {
    var bar = document.querySelector('.bar');
    var navBar = document.getElementById("navbar")


    bar.classList.toggle('roller');
    bar.classList.toggle('active');
    navBar.classList.toggle("navigation")
}


function opener() {
    var menu = document.getElementById("menu")
    var icon = document.querySelector(".bx-menu")

    menu.classList.toggle("menu")
    icon.classList.toggle("bxs-x-square")

}



const audioPlayer = document.getElementById('audioPlayer');
const playButton = document.getElementById('playButton');
const micIcon = playButton.querySelector('i');

// Create audio context and nodes
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const source = audioContext.createMediaElementSource(audioPlayer);
const pitchShift = audioContext.createBiquadFilter();

// Set up the filter for deeper sound
pitchShift.type = "lowshelf";
pitchShift.frequency.value = 100;
pitchShift.gain.value = 25; // Increase this value for deeper sound

// Connect the nodes
source.connect(pitchShift);
pitchShift.connect(audioContext.destination);

// Set initial playback speed
audioPlayer.playbackRate = 1.1;

function togglePlay() {
   // Resume audio context if suspended (browser policy)
   if (audioContext.state === 'suspended') {
       audioContext.resume();
   }

   if (audioPlayer.paused) {
       audioPlayer.play();
       playButton.classList.add('pulse-active');
       micIcon.classList.remove('bx-microphone');
       micIcon.classList.add('bx-microphone-off');
   } else {
       audioPlayer.pause();
       playButton.classList.remove('pulse-active');
       micIcon.classList.remove('bx-microphone-off');
       micIcon.classList.add('bx-microphone');
   }
}

// Function to adjust deepness
function adjustBass(bassValue) {
   pitchShift.gain.value = bassValue; // Try values between 0-25
}

// Function to change playback speed
function changeSpeed(speed) {
   audioPlayer.playbackRate = speed;
   // Examples:
   // changeSpeed(0.5) // Half speed
   // changeSpeed(1.0) // Normal speed
   // changeSpeed(2.0) // Double speed
}

playButton.addEventListener('click', togglePlay);

