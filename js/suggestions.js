// Defines Inputs in Suggestions
const input = document.querySelectorAll(".cli-input");      

// Defines Form Divs
const divcat = document.getElementById("sug-cat");
const divtext = document.getElementById("sug-text");
const divema = document.getElementById("sug-ema");
const divconf = document.getElementById("sug-conf");

// Defines Inputs Separately
const incat = document.getElementById("category");
const intext = document.getElementById("suggestion");
const inema = document.getElementById("ema");
const inconf = document.getElementById("conf");
const labtext = document.getElementById("sug-bug")

// Defines Error/
let err = document.getElementById("err");

incat.value = ""
inema.value = ""
intext.value = ""
inconf.value = ""

// Main CLI (Command Line Interface) function
input.forEach((check) => { 
    check.addEventListener('keydown', () => { 
        if ((event.code === "Enter" && !(event.shiftKey)) || (event.code === "NumpadEnter" && !(event.shiftKey))) {
            err.textContent = ""
            switch (true) {
                case divtext.classList.contains("hide"):
                    if (incat.value >= 1 && incat.value <= 3 || Number.isNaN(incat.value)) {
                        incat.disabled = true; 
                        setTimeout(() => {
                            divtext.classList.remove("hide");
                            divtext.classList.add("show");
                            intext.focus();

                            switch (true) {
                                case (Number(incat.value) === 1 || Number(incat.value) === 3):
                                    labtext.textContent += "Suggestion> Input your suggestions below:";
                                    break;

                                case (Number(incat.value) === 2):
                                    labtext.textContent += "Bug> Report your bug below:";
                                    break;     
                            }
                        }, 500)
                    } 
                    else {
                        err.textContent = "Invalid Category!";
                    }
                    break;

                case divema.classList.contains("hide"):
                    if (intext.value != "") {
                        intext.disabled = true;
                        setTimeout(() => {
                            divema.classList.remove("hide");
                            divema.classList.add("show");
                            inema.focus();
                        }, 500)
                    }
                    else {
                        err.textContent = "Report can not be blank!";
                    }
                    break;

                case divconf.classList.contains("hide"):
                    inema.disabled = true; 
                    setTimeout(() => {
                        divconf.classList.remove("hide");
                        divconf.classList.add("show");
                        inconf.focus();
                    }, 500);
                    break;

                case divconf.classList.contains("show"):
                    switch (true) {
                        case (inconf.value === "y" || inconf.value === "Y"):
                            incat.disabled = true;
                            intext.disabled = true;
                            inema.disabled = true;
                            inconf.disabled = true
                            err.classList.toggle("red")
                            err.classList.toggle("green")
                            setTimeout(() => {
                                err.textContent = "Thank you for suggesting!"    
                            }, 500);
                            break;

                        case (inconf.value === "n" || inconf.value === "N"):
                            err.textContent = "Please edit your response. When done, type y."
                            incat.disabled = false;
                            intext.disabled = false;
                            inema.disabled = false;
                            break;
                    }        
                    break;
            }
        }
    })
})

// start up anim
