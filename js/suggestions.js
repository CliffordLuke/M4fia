// Defines Inputs in Suggestions
const input = document.querySelectorAll("input"); 

// Defines Form Divs
const divname = document.getElementById("sug-name");
const divcat = document.getElementById("sug-cat");
const divtext = document.getElementById("sug-text");
const divconf = document.getElementById("sug-conf");

// Defines Inputs Separately
const innam = document.getElementById("name");
const incat = document.getElementById("category");
const intext = document.getElementById("suggestion");
const inconf = document.getElementById("conf");

let err = document.getElementById("err");

input.forEach((check) => { 
    check.addEventListener('keydown', () => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            let nam = document.getElementById("name").value
            let num = document.getElementById("category").value
            let sug = document.getElementById("suggestion").value
            let confval = document.getElementById("conf").value
            err.textContent = "" 
            switch (true) {
                case divcat.classList.contains("hide"):
                    if (nam != "") {
                        divcat.classList.toggle('hide');
                        divcat.classList.toggle('show');
                        innam.disabled = true 
                    }
                    else {
                        err.textContent = "Please input a Name!"                 
                    }
                    break;
                
                case divtext.classList.contains("hide"):
                    if (num >= 1 && num <= 3 || Number.isNaN(num)) {
                        divtext.classList.toggle('hide');
                        divtext.classList.toggle('show');
                        incat.disabled = true 
                    }
                    else {
                        err.textContent = "Invalid Category!"
                    }
                    break;  
                
                case divconf.classList.contains("hide"):
                    if (sug != "") {
                        divconf.classList.toggle('hide');
                        divconf.classList.toggle('show');
                        intext.disabled = true 
                    }
                    else {
                        err.textContent = "Suggestion cannot be empty!"
                    }
                    break;

                case divconf.classList.contains("show"):
                    if (confval == "y" || confval == "n" || confval == "Y" || confval == "N") {
                        err.textContent = "Thank you for your suggestion!"  
                    }
                    else {
                        err.textContent = "y or n only!"
                    }
                    break;
            }
        }
    })
})
