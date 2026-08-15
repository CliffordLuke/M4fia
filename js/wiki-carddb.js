const searchBar = document.querySelector("#SEARCH-BAR");
const cards = document.querySelectorAll(".card");
const srcc = document.querySelector("#SEARCH-RESULTS-CARD-CONT");
const tags = document.querySelectorAll(".filter-label");

searchBar.addEventListener("input", (inp) => {
    const children = Array.from(srcc.children)

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
    }

});

// SCROLL ANIMMATIONS
const cardObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if (entry.isIntersecting){
            entry.target.classList.add("fade-in");
        }
    })
}, {});

cards.forEach((card)=>cardObserver.observe(card));
