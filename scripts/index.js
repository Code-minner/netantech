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
setInterval(changeWord, 2500);




let loader = document.getElementById("loader");

setTimeout(() => {
    loader.classList.add("dis");
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500); // Match this delay to the animation duration in CSS
}, 6000);




function toggleNavBar() {
    const bar = document.querySelector('.bar');
    const navBar = document.getElementById("navbar");
    
    bar.classList.toggle('active');
    navBar.classList.toggle("navigation");
    
    // Reset animations by removing and re-adding navigation class
    if (navBar.classList.contains("navigation")) {
        const items = navBar.querySelectorAll('li');
        items.forEach(item => {
            item.style.animation = 'none';
            item.offsetHeight; // Trigger reflow
            item.style.animation = null;
        });
    }
}
document.addEventListener("DOMContentLoaded", ShadowScroller);
function ShadowScroller() {
    // Navbar shadowHeader Scroller Section //
    const shadowHeader = document.querySelector("header");
  
    window.addEventListener("scroll", () => {
      const isScrolled = window.scrollY > 200;

      
      shadowHeader.classList.toggle("shadow", isScrolled);
    });
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

audioPlayer.addEventListener('ended', () => {
    playButton.classList.remove('pulse-active');
    micIcon.classList.remove('bx-microphone-off');
    micIcon.classList.add('bx-microphone');
});

playButton.addEventListener('click', togglePlay);



let swiper_tes;

document.addEventListener('DOMContentLoaded', function () {
    swiper_tes = new Swiper('.swiper_content_tes', {
        slidesPerView: 4,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        speed: 5000,
        breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 15 },
            968: { slidesPerView: 3, spaceBetween: 15 },
            1200: { slidesPerView: 4, spaceBetween: 20 }
        }
    });

    const swiperContainer = document.querySelector('.swiper_content_tes');
    
    swiperContainer.addEventListener('mouseenter', () => {
        swiper_tes.autoplay.stop();
    });

    swiperContainer.addEventListener('mouseleave', () => {
        swiper_tes.autoplay.start();
    });
});

