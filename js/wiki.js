// VARIABLES
const infoText = document.querySelector("#M4FIA-INFORMATION-TITLE");
const folders = document.querySelectorAll(".folder");

const folderOpenContainer = document.querySelector("#FOLDER-OPENED-CONTAINER");
const folderContainer = document.querySelector("#FOLDER-SECTION");
const rulesFolder = document.querySelector(".rules");
const loreFolder = document.querySelector(".lore");
const returnBtn = document.querySelector("#FOLDER-OPEN-RETURN-BTN");

const firstPageR = rulesFolder.children[2];
const firstPageL = loreFolder.children[2];
const paperContainer = document.querySelector("#PAPER-CONTAINER");

const rulesTempCont = document.querySelector("#RULES-TEMPLATE-CONT");
const loreTempCont = document.querySelector("#LORE-TEMPLATE-CONT");
const rulesTempChildren = Array.from(rulesTempCont.content.children);
const loreTempChildren = Array.from(loreTempCont.content.children);
let temp = 0;

let folderOpened = false;

// FOLDER FUNCTIONALITY
    //FOLDER OPEN
    rulesFolder.addEventListener("click", () => {
        if (folderOpened === false) {
            folderOpened = true
            folderOpen(rulesFolder, firstPageR, 'top left', rulesTempChildren)
        }
    });

    loreFolder.addEventListener("click", () => {
        if (folderOpened === false) {
            folderOpened = true
            folderOpen(loreFolder, firstPageL, 'center right', loreTempChildren)
        }
    });

    //FOLDER CLOSE
    rulesFolder.children[0].addEventListener("animationend", (event) => {
        folderClose(rulesFolder, event, 0, '-3deg')
    });

    loreFolder.children[0].addEventListener("animationend", (event) => {
        folderClose(loreFolder, event, 1, '5deg')
    });

    //RETURN
    returnBtn.addEventListener("click", () => {
        returnBtn.classList.remove("show");

        requestAnimationFrame(() => {
            returnBtn.classList.add("hide");
        });

        returnBtn.style.pointerEvents = "none";

        if (folderOpenContainer.children[3] === rulesFolder) {
            folderReturn(rulesFolder, firstPageR)
        } else if (folderOpenContainer.children[3] === loreFolder) {
            folderReturn(loreFolder, firstPageL)
        }
    });


// FOLDER FUNCTIONS
async function folderOpen(folder, folderPage, transOrig, tempChildren) {
    folderOpenContainer.style.pointerEvents = "all";

    const firstR = folder.getBoundingClientRect();
    folderOpenContainer.appendChild(folder);
    folder.style.position = 'static';
    const lastR = folder.getBoundingClientRect();

    const deltaXR = firstR.left - lastR.left;
    const deltaYR = firstR.top - lastR.top;
    const deltaWR = firstR.width / lastR.width;
    const deltaHR = firstR.height / lastR.height;

    const initialAnim = folder.animate([{
        transformOrigin: transOrig,
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
    folderPage.appendChild(pageTemp);

    const page = folderPage.lastElementChild;

    page.offsetHeight

    requestAnimationFrame(() => {
        page.classList.add("visible")
    })

    folder.children[0].classList.add("open");
}

async function folderClose(folder, event, folderContIndex, rotation) {
    if (event.animationName === "closeFolder") {
        folder.children[0].classList.remove("close");

        const firstR = folder.getBoundingClientRect();
        folderContainer.children[folderContIndex].appendChild(folder);
        folder.style.position = "relative";
        const lastR = folder.getBoundingClientRect();

        const deltaX = firstR.left - lastR.left;
        const deltaY = firstR.top - lastR.top;

        const returnAnim = folder.animate([{
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
            rotate: rotation
        }], {
            duration: 1000,
            easing: 'ease',
        });

        await returnAnim.finished;
        
        folderOpenContainer.style.pointerEvents = "none";
        folder.style.pointerEvents = "all";
        returnAnim.commitStyles();
        returnAnim.cancel();
        folderOpened = false;
        folderOpenContainer.classList.remove("open")
    } else if (event.animationName === "openFolder") {
        returnBtn.classList.remove("hide");
        returnBtn.classList.add("show");
        returnBtn.style.pointerEvents = "all";
    };
}

function folderReturn(folder, folderPage) {
    folder.children[0].classList.remove("open");

    requestAnimationFrame(() => {
        folder.children[0].classList.add("close");
    });

    folderOpenContainer.classList.remove("opened");

    const page = folderPage.lastElementChild;
    page.classList.remove("visible");

    page.addEventListener("transitionend", (event) => {
        if (event.propertyName === "opacity") {
            page.remove()
        }
    });
}


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