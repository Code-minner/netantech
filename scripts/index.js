
const words = ["Digital Future", "Tech Evolution", "Modern Era"];
let currentIndex = 0;

const dynamicWordElement = document.getElementById("dynamic-word");

function changeWord() {
    // Fade out the current word
    dynamicWordElement.style.opacity = "0";


    // After fade-out, change the word and fade it back in
    setTimeout(() => {
        dynamicWordElement.innerHTML = words[currentIndex];

        dynamicWordElement.style.opacity = "1";

        // Move to the next word in the array
        currentIndex = (currentIndex + 1) % words.length;
    }, 1000); // Fade-out duration
}

// Change the word every 3 seconds
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

