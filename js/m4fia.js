const sections = document.querySelectorAll("section");
const tocThing = document.querySelectorAll(".toc a");

function trackTOC() {
  let current = "";
  
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (window.scrollY >= top - height / 3) {
      current = section.id;
    }
  });

  tocThing.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", trackTOC);
window.addEventListener("load", trackTOC);

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