const gtTitle = document.querySelector(".GTspan1");
const gtSubtitle = document.querySelector(".GTspan2");
const holo = document.querySelectorAll(".hologram")


// SCROLL ANIMATIONS
const TextObserver = new IntersectionObserver((entry)=>{
    if (entry[0].isIntersecting){
        entry[0].target.classList.add("flicker");
    }
}, {});

const Text2Observer = new IntersectionObserver((entry)=>{
    if (entry[0].isIntersecting){
        entry[0].target.classList.add("fade-in");
    }
}, {});

TextObserver.observe(gtTitle);
Text2Observer.observe(gtSubtitle);

setTimeout(() => {
    const holoObserver = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if (entry.isIntersecting){
                entry.target.classList.add("seen");
            }
        })
    }, {
        threshold: 0.2
    });

    holo.forEach((hologram)=>holoObserver.observe(hologram));
}, 400);