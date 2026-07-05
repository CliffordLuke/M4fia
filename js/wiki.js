

// SCROLL ANIMATIONS
const infoText = document.querySelector("#M4FIA-INFORMATION-TITLE");

const infoTextObserver = new IntersectionObserver((entry)=>{
    if (entry[0].isIntersecting){
        entry[0].target.classList.add("flicker");
    }
}, {});

infoTextObserver.observe(infoText);



const folders = document.querySelectorAll(".folder");

const folderObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if (entry.isIntersecting){
            entry.target.classList.add("slam");
        }
    })
}, {
    threshold: 0.3
});

folders.forEach((folder)=>folderObserver.observe(folder));