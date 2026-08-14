// VARIABLES
const infoText = document.querySelector("#M4FIA-INFORMATION-TITLE");
const folders = document.querySelectorAll(".folder");
const factionIcons = document.querySelectorAll(".faction-img")
const factionHolo = document.querySelectorAll(".holo-tri")

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
const nextPage = document.querySelector("#NEXT-PAGE");
const prevPage = document.querySelector("#PREV-PAGE");
let temp = 0;

const remnantsCards = document.querySelector("#REMNANTS-CARDS");
const syndicateCards = document.querySelector("#SYNDICATE-CARDS");
const nullCards = document.querySelector("#NULL-CARDS");
const remHolo = document.querySelector("#REMNANTS-HOLO");
const synHolo = document.querySelector("#SYNDICATE-HOLO");
const nullHolo = document.querySelector("#NULL-HOLO");

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
        folderClose(rulesFolder, event, 0, '-3deg', firstPageR)
    });

    loreFolder.children[0].addEventListener("animationend", (event) => {
        folderClose(loreFolder, event, 1, '5deg', firstPageL)
    });

    //RETURN
    returnBtn.addEventListener("click", () => {
        returnBtn.classList.remove("show");

        requestAnimationFrame(() => {
            returnBtn.classList.add("hide");
        });

        returnBtn.style.pointerEvents = "none";

        prevPage.style.pointerEvents = "none";
        nextPage.style.pointerEvents = "none";
        
        if (temp === 0) {
            nextPage.classList.add("hide");
            nextPage.classList.remove("show");
        } else if ((temp === loreTempChildren.length - 1) || (temp === rulesTempChildren.length - 1)) {
            prevPage.classList.add("hide");
            prevPage.classList.remove("show");
        } else {
            nextPage.classList.add("hide");
            nextPage.classList.remove("show");
            prevPage.classList.add("hide");
            prevPage.classList.remove("show");
        }

        if (folderOpenContainer.children[3] === rulesFolder) {
            folderReturn(rulesFolder, firstPageR);
            hidePage(firstPageR);
        } else if (folderOpenContainer.children[3] === loreFolder) {
            folderReturn(loreFolder, firstPageL)
            hidePage(firstPageL);
        }
    });

    // PAGE BUTTON FUNCTION
    nextPage.addEventListener("click", () => {
        prevPage.style.pointerEvents = "none";
        nextPage.style.pointerEvents = "none";
        if (folderOpenContainer.children[3] === rulesFolder) {
            nextPageFunc(firstPageR, rulesTempChildren)
        } else if (folderOpenContainer.children[3] === loreFolder) {
            nextPageFunc(firstPageL, loreTempChildren)
        }
    });

    prevPage.addEventListener("click", () => {
        prevPage.style.pointerEvents = "none";
        nextPage.style.pointerEvents = "none";
        if (folderOpenContainer.children[3] === rulesFolder) {
            prevPageFunc(firstPageR, rulesTempChildren)
        } else if (folderOpenContainer.children[3] === loreFolder) {
            prevPageFunc(firstPageL, loreTempChildren)
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

    folder.children[0].classList.add("open");
    nextPage.classList.add("show");
    nextPage.style.pointerEvents = "all";
    
    const pageTemp = document.importNode(tempChildren[temp].content, true);
    folderPage.appendChild(pageTemp);

    const page = folderPage.lastElementChild;

    page.offsetHeight

    requestAnimationFrame(() => {
        page.classList.add("visible")
    })
};

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
        folderOpenContainer.classList.remove("open");
    } else if (event.animationName === "openFolder") {
        returnBtn.classList.remove("hide");
        returnBtn.classList.add("show");
        returnBtn.style.pointerEvents = "all";
    };
};

function folderReturn(folder, folderPage) {
    folder.children[0].classList.remove("open");

    requestAnimationFrame(() => {
        folder.children[0].classList.add("close");
    });

    folderOpenContainer.classList.remove("opened");
};

    // FOLDER PAGE FUNCTIONS
    function nextPageFunc(folderPage, tempChildren) {
        prevPage.classList.remove("hide");
        prevPage.classList.add("show");

        if (!(temp === tempChildren.length - 1)) {
            temp += 1;

            if (temp === tempChildren.length - 1) {
                nextPage.classList.remove("show");
                nextPage.classList.add("hide");
                nextPage.style.pointerEvents = "none";
            }
        };

        pageChange(folderPage, tempChildren);
    };

    function prevPageFunc(folderPage, tempChildren) {
        nextPage.classList.remove("hide");
        nextPage.classList.add("show");

        if (!(temp === 0)) {
            temp -= 1;

            if (temp === 0) {
                prevPage.classList.remove("show");
                prevPage.classList.add("hide");
            }
        }

        pageChange(folderPage, tempChildren);
    };

    function pageChange(folderPage, tempChildren) {
        page = folderPage.lastElementChild;
        page.classList.remove("visible");

        page.addEventListener("transitionend", (event) => {
            if (event.propertyName === "opacity") {
                page.remove();

                const pageTemp = document.importNode(tempChildren[temp].content, true);
                folderPage.appendChild(pageTemp);   

                
                const newPage = folderPage.lastElementChild;

                newPage.offsetHeight

                requestAnimationFrame(() => {
                    newPage.classList.add("visible")
                });

                newPage.addEventListener("transitionend", (event) => {
                    if (event.propertyName === "opacity") {
                        if (temp === 0) {
                            nextPage.style.pointerEvents = "all";
                            prevPage.style.pointerEvents = "none";
                        } else if (temp === tempChildren.length -1) {
                            prevPage.style.pointerEvents = "all";
                            nextPage.style.pointerEvents = "none";
                        } else {
                            prevPage.style.pointerEvents = "all";
                            nextPage.style.pointerEvents = "all";
                        }
                    }
                });
            };
        });
    };

    function hidePage(folderPage) {
        page = folderPage.lastElementChild;
        page.classList.remove("visible");

        page.addEventListener("transitionend", (event) => {
            if (event.propertyName === "opacity") {
                page.remove();
                temp = 0
            }
        });
    };


// HOLOGRAM FUNCTIONALITY
remHolo.addEventListener("click", () => {
    cardContToggle(remnantsCards, syndicateCards, nullCards);
})

synHolo.addEventListener("click", () => {
    cardContToggle(syndicateCards, remnantsCards, nullCards);
})

nullHolo.addEventListener("click", () => {
    cardContToggle(nullCards, remnantsCards, syndicateCards);
})

function cardContToggle(targetCard, otherCard1, otherCard2) {
    remHolo.style.pointerEvents = "none";
    synHolo.style.pointerEvents = "none";
    nullHolo.style.pointerEvents = "none";

    otherCard1.classList.remove("opened");
    otherCard2.classList.remove("opened");

    targetCard.classList.toggle("opened");

    targetCard.addEventListener("transitionend", (event) => {
        if (event.propertyName === "max-height") {
            remHolo.style.pointerEvents = "all";
            synHolo.style.pointerEvents = "all";
            nullHolo.style.pointerEvents = "all";
        };
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

const holoImgObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if (entry.isIntersecting){
            entry.target.classList.add("popup");
        }
    })
}, {
    threshold: 0.5
});

factionIcons.forEach((icon)=>holoImgObserver.observe(icon));

const holoObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if (entry.isIntersecting){
            entry.target.classList.add("flicker");
        }
    })
}, {
    threshold: 0.3
});

factionHolo.forEach((holo)=>holoObserver.observe(holo));