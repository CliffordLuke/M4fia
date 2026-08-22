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

input.forEach((check) => { 
    check.addEventListener('keydown', () => {
        err.textContent = "" 
        if ((event.code === "Enter" && !(event.shiftKey)) || (event.code === "NumpadEnter" && !(event.shiftKey))) {
            switch (true) {
                case divtext.classList.contains("hide"):
                    if (incat.value >= 1 && incat.value <= 3 || Number.isNaN(incat.value)) {
                        divtext.classList.toggle("hide");
                        divtext.classList.toggle("show");
                        intext.focus();
                        incat.disabled = true; 
                        switch (true){
                            case (Number(incat.value) === 1 || Number(incat.value) === 3):
                                labtext.textContent += "Suggestion> Input your suggestions below:";
                                break;

                            case (Number(incat.value) === 2):
                                labtext.textContent += "Bug> Report your bug below:";
                                break;
                        }
                    }
                    else {
                        err.textContent = "Invalid Category!";
                    }
                    break;
                case divema.classList.contains("hide"):
                    if (intext.value != "") {
                        divema.classList.toggle("hide");
                        divema.classList.toggle("show");
                        inema.focus();
                        intext.disabled = true;
                    }
                    else {
                        err.textContent = "Report can not be blank!";
                    }
                    break;
                case divconf.classList.contains("hide"):
                    divconf.classList.toggle("hide");
                    divconf.classList.toggle("show");
                    inconf.focus();
                    inema.disabled = true; 
                    break;
                case divconf.classList.contains("show"):
                    switch (true) {
                        case (inconf.value === "y" || inconf.value === "Y"):
                            inconf.disabled = true
                            err.classList.toggle("red")
                            err.classList.toggle("green")
                            err.textContent = "Thank you suggesting!"
                            break;
                        case (inconf.value === "n" || inconf.value === "N"):
                            err.textContent = "bruh."
                            break;
                    }
                    break;
            }  
        }          
    })        
})