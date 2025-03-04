document.addEventListener("DOMContentLoaded", () => {
    // Dynamic Word Animation
    const dynamicWordElement = document.getElementById("dynamic-word");
    if (dynamicWordElement) {
        const words = ["Tech Evolution", "Modern Era", "Digital Future"];
        let currentIndex = 0;

        function changeWord() {
            dynamicWordElement.style.opacity = "0";
            setTimeout(() => {
                dynamicWordElement.textContent = words[currentIndex];
                dynamicWordElement.style.opacity = "1";
                currentIndex = (currentIndex + 1) % words.length;
            }, 800);
        }
        setInterval(changeWord, 2500);
    }

    // Loader
    const loaders = document.querySelectorAll('.loader');
    if (loaders.length > 0) {
        setTimeout(() => {
            loaders.forEach(loader => {
                loader.classList.add("dis");
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            });
        }, 5500);
    }

    // Navbar Toggle
    window.toggleNavBar = function () {
        const bar = document.querySelector('.bar');
        const navBar = document.getElementById("navbar");
        if (bar && navBar) {
            bar.classList.toggle('active');
            navBar.classList.toggle("navigation");

            if (navBar.classList.contains("navigation")) {
                const items = navBar.querySelectorAll('li');
                items.forEach(item => {
                    item.style.animation = 'none';
                    item.offsetHeight;
                    item.style.animation = null;
                });
            }
        }
    }

    // Shadow Scroller
    if (document.querySelector("header")) {
        function ShadowScroller() {
            const shadowHeader = document.querySelector("header");
            window.addEventListener("scroll", () => {
                const isScrolled = window.scrollY > 200;
                shadowHeader.classList.toggle("shadow", isScrolled);
            });
        }
        ShadowScroller();
    }

    // Dropdown
    window.toggleDropdown = function () {
        const dropdown = document.getElementById('servicesDropdown');
        const chevron = document.querySelector('.chevron');
        if (dropdown && chevron) {
            dropdown.classList.toggle('show');
            chevron.classList.toggle('open');
        }
    }

    // Dropdown outside click
    window.onclick = function (event) {
        if (!event.target.matches('.dropdown-button') && !event.target.matches('.chevron')) {
            const dropdowns = document.getElementsByClassName('dropdown_content');
            const chevrons = document.getElementsByClassName('chevron');
            for (let i = 0; i < dropdowns.length; i++) {
                if (dropdowns[i].classList.contains('show')) {
                    dropdowns[i].classList.remove('show');
                    chevrons[i].classList.remove('open');
                }
            }
        }
    }

    // Audio Player
        const audioPlayer = document.getElementById('audioPlayer');
        const playButton = document.getElementById('playButton');

    if (audioPlayer && playButton) {
        const micIcon = playButton.querySelector('i');
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaElementSource(audioPlayer);
        const pitchShift = audioContext.createBiquadFilter();

                pitchShift.type = "lowshelf";
                pitchShift.frequency.value = 100;
                pitchShift.gain.value = 25;

                source.connect(pitchShift);
                pitchShift.connect(audioContext.destination);
                audioPlayer.playbackRate = 1.1;

        window.togglePlay = function() {
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

        window.adjustBass = function(bassValue) {
            pitchShift.gain.value = bassValue;
        }

        window.changeSpeed = function(speed) {
            audioPlayer.playbackRate = speed;
        }

        audioPlayer.addEventListener('ended', () => {
            playButton.classList.remove('pulse-active');
            micIcon.classList.remove('bx-microphone-off');
            micIcon.classList.add('bx-microphone');
        });

        playButton.addEventListener('click', togglePlay);
    }
});


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




document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline_item');

    if (timelineItems.length > 0) {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-animation');
                }
            });
        }, options);

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const scrollIndicator = document.querySelector('.timeline_scroll_indicator');
    const timelineContainer = document.querySelector('.timeline_items');
    const timelineItems = document.querySelectorAll('.timeline_item');

    if (scrollIndicator && timelineContainer && timelineItems.length > 0) {
        window.addEventListener('scroll', () => {
            try {
                const containerRect = timelineContainer.getBoundingClientRect();
                const visibleItem = [...timelineItems].find(item => {
                    const rect = item.getBoundingClientRect();
                    return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
                });

                if (visibleItem) {
                    const dot = visibleItem.querySelector('.timeline_dot');
                    const dotRect = dot.getBoundingClientRect();
                    scrollIndicator.style.top = `${dotRect.top - containerRect.top}px`;
                }
            } catch (error) {
                console.warn('Timeline scroll update failed:', error);
            }
        });
    }
});