// CONSTANTS
const infoText = document.querySelector("#M4FIA-INFORMATION-TITLE");
const folders = document.querySelectorAll(".folder");

const folderOpenContainer = document.querySelector("#FOLDER-OPENED-CONTAINER");
const folderContainer = document.querySelector("#FOLDER-SECTION");
const rulesFolder = document.querySelector(".rules");
const loreFolder = document.querySelector(".lore");
const returnBtn = document.querySelector("#FOLDER-OPEN-RETURN-BTN");

const firstPageR = rulesFolder.children[2];
const secondPageR = rulesFolder.children[1];
const paperContainer = document.querySelector("#PAPER-CONTAINER");

const tempCont = document.querySelector("#TEMPLATE-CONT");
const tempChildren = Array.from(tempCont.content.children);
let temp = 0;

let folderOpened = false;

// FOLDER FUNCTIONALITY
rulesFolder.addEventListener("click", async (event) => {
    if (folderOpened === false) {
        folderOpened = true
        folderOpenContainer.style.pointerEvents = "all";

        const firstR = rulesFolder.getBoundingClientRect();
        folderOpenContainer.appendChild(rulesFolder);
        rulesFolder.style.position = 'static';
        const lastR = rulesFolder.getBoundingClientRect();

        const deltaXR = firstR.left - lastR.left;
        const deltaYR = firstR.top - lastR.top;
        const deltaWR = firstR.width / lastR.width;
        const deltaHR = firstR.height / lastR.height;

        const initialAnim = rulesFolder.animate([{
            transformOrigin: 'top left',
            transform: `
                translate(${deltaXR}px, ${deltaYR}px)
                scale(${deltaWR}, ${deltaHR})
            `
        }, {
            transformOrigin: 'top left',
            transform:  `
                translate(0, 0)
                scale(1.1)
            `,
            rotate: '0deg'
        }], {
            duration: 1000,
            easing: 'ease',
        });

        folderOpenContainer.classList.add("opened");
        folderOpenContainer.classList.add("open")

        await initialAnim.finished;
        initialAnim.commitStyles();
        initialAnim.cancel();

        
        const pageTemp = document.importNode(tempChildren[temp].content, true);
        firstPageR.appendChild(pageTemp);

        const page = firstPageR.lastElementChild;

        page.offsetHeight

        requestAnimationFrame(() => {
            page.classList.add("visible")
        })

        rulesFolder.children[0].classList.add("open");
    }
});

loreFolder.addEventListener("click", async (event) => {
    if (folderOpened === false) {
        folderOpened = true
        folderOpenContainer.style.pointerEvents = "all";
        
        const firstR = loreFolder.getBoundingClientRect();
        folderOpenContainer.appendChild(loreFolder);
        loreFolder.style.position = 'static';
        const lastR = loreFolder.getBoundingClientRect();

        const deltaXR = firstR.left - lastR.left;
        const deltaYR = firstR.top - lastR.top;
        const deltaWR = firstR.width / lastR.width;
        const deltaHR = firstR.height / lastR.height;

        const initialAnim = loreFolder.animate([{
            transformOrigin: 'center right',
            transform: `
                translate(${deltaXR}px, ${deltaYR}px)
                scale(${deltaWR}, ${deltaHR})
            `
        }, {
            transformOrigin: 'top left',
            transform:  `
                translate(0, 0)
                scale(1.1)
            `,
            rotate: '0deg'
        }], {
            duration: 1000,
            easing: 'ease',
        });

        folderOpenContainer.classList.add("opened");
        folderOpenContainer.classList.add("open")

        await initialAnim.finished;
        initialAnim.commitStyles();
        initialAnim.cancel();

        loreFolder.children[0].classList.add("open");
    }
});

returnBtn.addEventListener("click", (event) => {
    returnBtn.classList.remove("show");
    requestAnimationFrame(() => {
        returnBtn.classList.add("hide");
     });
    returnBtn.style.pointerEvents = "none";

    if (folderOpenContainer.children[3] === rulesFolder) {
        rulesFolder.children[0].classList.remove("open");

        requestAnimationFrame(() => {
            rulesFolder.children[0].classList.add("close");
        });

        folderOpenContainer.classList.remove("opened");

        const page = firstPageR.lastElementChild;
        page.classList.remove("visible");

        page.addEventListener("transitionend", (event) => {
            if (event.propertyName === "opacity") {
                page.remove()
            }
        })

    } else if (folderOpenContainer.children[3] === loreFolder) {
        loreFolder.children[0].classList.remove("open");

        requestAnimationFrame(() => {
            loreFolder.children[0].classList.add("close");
        });

        folderOpenContainer.classList.remove("opened");
    }
});


rulesFolder.children[0].addEventListener("animationend", async (event) => {
    if (event.animationName === "closeFolder") {
        rulesFolder.children[0].classList.remove("close");

        const firstR = rulesFolder.getBoundingClientRect();
        folderContainer.children[0].appendChild(rulesFolder);
        rulesFolder.style.position = "relative";
        const lastR = rulesFolder.getBoundingClientRect();

        const deltaX = firstR.left - lastR.left;
        const deltaY = firstR.top - lastR.top;

        const returnAnim = rulesFolder.animate([{
            transformOrigin: 'top left',
            transform: `
                translate(${deltaX}px, ${deltaY}px)
                scale(1.1)
            `
        }, {
            transformOrigin: 'center center',
            transform:  `
                translate(0, 0)
                scale(1)
            `,
            rotate: '-3deg'
        }], {
            duration: 1000,
            easing: 'ease',
        });

        await returnAnim.finished;
        
        folderOpenContainer.style.pointerEvents = "none";
        rulesFolder.style.pointerEvents = "all";
        returnAnim.commitStyles();
        returnAnim.cancel();
        folderOpened = false;
        folderOpenContainer.classList.remove("open")
    } else if (event.animationName === "openFolder") {
        returnBtn.classList.remove("hide");
        returnBtn.classList.add("show");
        returnBtn.style.pointerEvents = "all";
    };
});

loreFolder.children[0].addEventListener("animationend", async (event) => {
    if (event.animationName === "closeFolder") {
        loreFolder.children[0].classList.remove("close");

        const firstL = loreFolder.getBoundingClientRect();
        folderContainer.children[1].appendChild(loreFolder);
        loreFolder.style.position = "relative";
        const lastL = loreFolder.getBoundingClientRect();

        const deltaX = firstL.left - lastL.left;
        const deltaY = firstL.top - lastL.top;

        const returnAnim = loreFolder.animate([{
            transformOrigin: 'top left',
            transform: `
                translate(${deltaX}px, ${deltaY}px)
                scale(1.1)
            `
        }, {
            transformOrigin: 'center center',
            transform:  `
                translate(0, 0)
                scale(1)
            `,
            rotate: '5deg'
        }], {
            duration: 1000,
            easing: "ease",
        });

        await returnAnim.finished;
        
        folderOpenContainer.style.pointerEvents = "none";
        loreFolder.style.pointerEvents = "all";
        returnAnim.commitStyles();
        returnAnim.cancel();
        folderOpened = false;
        folderOpenContainer.classList.remove("open")
    } else if (event.animationName === "openFolder") {
        returnBtn.classList.remove("hide");
        returnBtn.classList.add("show");
        returnBtn.style.pointerEvents = "all"
    };
});

// SCROLL ANIMATIONS
const infoTextObserver = new IntersectionObserver((entry)=>{
    if (entry[0].isIntersecting){
        entry[0].target.classList.add("flicker");
    }
}, {});

infoTextObserver.observe(infoText);

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