const searchBar = document.querySelector("#SEARCH-BAR");
const cards = document.querySelectorAll(".card");
const srcc = document.querySelector("#SEARCH-RESULTS-CARD-CONT");
const tags = document.querySelectorAll(".filter-label");
const title = document.querySelector("#LANDING-TITLE");
const noResult = document.querySelector("#NO-MATCHING-SEARCH");
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

const zoomCont = document.querySelector("#ZOOMED-IN-CONTAINER");
const zoomContBtn = document.querySelector("#ZOOM-CONT-CLOSE");
const zoomedCardCont = document.querySelector("#ZOOM-IMG-CONT");
const imgHolder = document.querySelector("#ZOOM-IMG");

//INTRO ANIM
randomChar(4, 0, "M");
randomChar(5, 1, "4");
randomChar(6, 2, "F");
randomChar(7, 3, "I");
randomChar(8, 4, "A");
randomChar(9, 5, " ");
randomChar(10, 6, "C");
randomChar(11, 7, "A");
randomChar(12, 8, "R");
randomChar(13, 9, "D");
randomChar(14, 10, "S");
randomChar(15, 11, " ");
randomChar(16, 12, "D");
randomChar(17, 13, "A");
randomChar(18, 14, "T");
randomChar(19, 15, "A");
randomChar(20, 16, "B");
randomChar(21, 17, "A");
randomChar(22, 18, "S");
randomChar(23, 19, "E");


function randomChar(randomInds, textIndex, finalChar) {
    for (let i = 0; i < randomInds; i++) {
        setTimeout(() => {
            const char = randomBase64Char()
            title.textContent = replaceAt(title.textContent, textIndex, char)
        }, i * 50)

        setTimeout(() => {
            title.textContent = replaceAt(title.textContent, textIndex, finalChar);
        }, randomInds * 50);
    }
}

function replaceAt(str, index, replacement) {
    return str.slice(0, index) + replacement + str.slice(index + 1);
}

function randomBase64Char() {
    return chars[Math.floor(Math.random() * chars.length)];
}


//SEARCH FUNCTIONALITY
searchBar.addEventListener("input", (inp) => {
    let children = Array.from(srcc.children)

    if (children.length > 0) {
        children.forEach((child) => {
            child.remove()
        })
    }

    const searchValue = inp.target.value.toLowerCase();

    if (searchValue.trim() === "") {
        if (children.length > 0) {
            children.forEach((child) => {
                child.remove()
            })
        }

        noResult.classList.remove("show")
    } else {
        cards.forEach((el) => {
            const cardTitle = el.querySelector("h4");

            if (cardTitle.textContent.toLowerCase().includes(searchValue)) {
                const card = el.cloneNode(true);
                const parent = el.parentElement.parentElement.id;

                if (parent === "REMNANTS-SECTION") {
                    card.classList.add("remnant");
                } else if (parent === "SYNDICATE-SECTION") {
                    card.classList.add("syndicate");
                } else if ( parent === "NULL-SECTION") {
                    card.classList.add("null");
                };

                card.classList.add("searched");
                card.style.opacity = "1";
                srcc.appendChild(card);
            };
        });

        
        children = Array.from(srcc.children)

        console.log(children.length)

        if (children.length === 0) {
            noResult.classList.add("show");
        } else {
            noResult.classList.remove("show");
        }
    }
});

cards.forEach((el) => {
    el.addEventListener("click", () => {
        if (zoomedCardCont.children > 0) {
            zoomedCardCont.firstElementChild.remove()
        }

        zoomCont.classList.add("active");
        const img = el.querySelector(".roleback");
        const chosenCard = img.cloneNode(true)
        chosenCard.classList.add("opened");

        zoomedCardCont.appendChild(chosenCard);
    })
});

zoomContBtn.addEventListener("click", () => {
    zoomCont.classList.remove("active")
})

// SCROLL ANIMMATIONS
const cardObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if (entry.isIntersecting){
            entry.target.classList.add("fade-in");
        }
    })
}, {});

cards.forEach((card)=>cardObserver.observe(card));
