const introMessage = [
  "Shuffling role IDs...",
  "Hiding the dead bodies...",
  "*Insert Generic Game Loading In Message*",
  "You wake up and see a burning city",
  "Wake me up inside~",
  "Oh no! Its the Gunship!",
  "Which one of you were going to tell me that tea tastes different if you put it in hot water?",
  "Welcome or Welcome back!",
  "Let's trap Timothy in the Basement and make him shake his-",
  "HDMI 5 connected",
  "Why are you buying clothes in the soup store?!",
  "So I have materials btw",
  "Knife",
  "You should check the console"
];
const introText = document.getElementById("introText");

introText.textContent = introMessage[Math.floor(Math.random() * introMessage.length)];





const audioFiles = [
  "audio/Boundless Box - Apeirophobia Original Soundtrack (Placeholder).mp3",
  "audio/Kri3tyy Galaxii - Surreal Peace (Placeholder).mp3"
];
const audioElements = document.getElementById("musicBG");

function playMusic() {
  const randomMusic = Math.floor(Math.random() * audioFiles.length);

  audioElements.src = audioFiles[randomMusic];
  audioElements.onload();
  audioElements.play();
}

/* Continue => line 219 */





const landingBg = document.querySelector(".landing-bg");
const landing = document.querySelector(".landing");

window.addEventListener("scroll", () => {
    const rect = landing.getBoundingClientRect();

    if (rect.bottom > 0 && rect.top < window.innerHeight) {
        landingBg.style.transform = `translateY(${window.scrollY * 0.75}px)`;
    }
});





const sections = document.querySelectorAll("section");
const tocThing = document.querySelectorAll(".toc a");

function trackTOC() {
  let currentTOC = "";
  
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (window.scrollY >= top - height / 3) {
      currentTOC = section.id;
    }
  });

  tocThing.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentTOC) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", trackTOC);
window.addEventListener("load", trackTOC);








const slides = document.querySelectorAll(".about-slider-part");

let currentSlide = 0;

function showSlide(index) {
  slides.forEach(slide => {
    slide.classList.remove("active");
  });

  slides[index].classList.add("active");
}

function nextSlide() {
  currentSlide++;
  if(currentSlide >= slides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);
}

let slideshow = setInterval(nextSlide, 7000);





function prevSlide() {
  currentSlide--;
  if(currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  showSlide(currentSlide);
}

document
.getElementById("btnUp")
.addEventListener("click", () => {
  nextSlide();
  resetTimer();
});

document
.getElementById("btnDown")
.addEventListener("click", () => {
  prevSlide();
  resetTimer();
});

function resetTimer() {
  clearInterval(slideshow);
  slideshow = setInterval(nextSlide, 7000);
}



let tvOn = true;
const screen = document.querySelector(".about-slider");

const tvOverlay = document.querySelector(".tv-effect");

document
.getElementById("btnPower")
.addEventListener("click", () => {
  tvOn = !tvOn;

  if(tvOn) {
    tvOverlay.classList.remove("turnOff");
    tvOverlay.classList.add("turnOn");

    setTimeout(() => {
      screen.style.opacity = 1;
    }, 450);
    clearInterval(slideshow);

    resetTimer();
  }
  else {
    tvOverlay.classList.remove("turnOn");
    tvOverlay.classList.add("turnOff");

    screen.style.opacity = 0;
  }
});



let tvPlay = true;

document
.getElementById("btnPause")
.addEventListener("click", () => {
  if(tvPlay) {
    clearInterval(slideshow);
  }
  else {
    resetTimer();
  }

  tvPlay = !tvPlay;
});



const bgMusic = document.getElementById("bgMusic");
const btnMute = document.getElementById("btnMute");

btnMute.addEventListener("click", () => {
  bgMusic.muted = !bgMusic.muted;
});






// Dont mind this lol, I got bored TRYING to look, code, and understand this shiz lmao
console.log('why are you here?');
console.log('well, while you are here,');
console.log('I am going to say...');
setTimeout(() => {console.log('...'); }, 10000); 
setTimeout(() => {console.log('...'); }, 20000); 
setTimeout(() => {console.log('...'); }, 30000); 
setTimeout(() => {console.log('...'); }, 40000); 
setTimeout(() => {console.log('...'); }, 50000); 
setTimeout(() => {console.log('...nothing.'); }, 60000); 
setTimeout(() => {console.log('thank you for your wasted time waiting for this.'); }, 63000); 



playMusic();
/* for some reason this breaks the following code placed below it, so I placed here in the end */