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
  if(currentSlide < slides.length) {
    currentSlide
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