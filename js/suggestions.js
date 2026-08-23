const formItems = document.querySelector("#FORM-ITEMS");

// Defines labes in command line
let int = document.getElementById("int");
let com = document.getElementById("intcom");

// Sleep helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Defines Form Divs and Labels
const temp = document.querySelector("#cli-temp");
const tempCont = document.importNode(temp.content, true)

const divcat = tempCont.querySelector("#sug-cat");
const divtext = tempCont.querySelector("#sug-text");
const divema = tempCont.querySelector("#sug-ema");
const divconf = tempCont.querySelector("#sug-conf");
const labtext = tempCont.querySelector("#sug-bug");

const err = tempCont.querySelector("#err");

// Defines Inputs Separately
const incat = tempCont.querySelector("#category");
const intext = tempCont.querySelector("#suggestion");
const inema = tempCont.querySelector("#ema");
const inconf = tempCont.querySelector("#conf");

let input = tempCont.querySelectorAll(".cli-input");
const cliCont = document.querySelector("#clicont");
let elChild

const time = "0"
const tvtitle = document.querySelector("#TVTITLE")

// Main CLI (Command Line Interface)

function errorP(result) {
    if (result === "error") {
        err.textContent = "Invalid Input!"
        err.classList.add("red");
        err.classList.remove("green")
    } else if (result === "success") {
        err.textContent = "Thank you for submitting! We'll look into this soon."
        err.classList.remove("red");
        err.classList.add("green")
    }

    let errClone = err.cloneNode(true)
    formItems.appendChild(errClone)
}

function errorCheck() {
    if (formItems.lastElementChild.id === "err") {
        formItems.lastElementChild.remove()
    }
};


formItems.addEventListener("keydown", ev => {
    if (ev.key !== "Enter" || ev.shiftKey) {
        return;
    }

    const inp = ev.target;

    if (!inp.classList.contains("cli-input")) {
        return;
    }

    ev.preventDefault();
    errorCheck();

    switch (inp.id) {
        case "category": {
            let catval = Number(inp.value);

            if (catval >= 1 && catval <= 3) {
                inp.readOnly = true;

                sugClone = divtext.cloneNode(true);
                sugClone.querySelector(".cli-input").value = ""
                sugClone.querySelector(".cli-input").readOnly = false
                formItems.appendChild(sugClone);
                sugClone.querySelector(".cli-input").focus()
            } else {
                errorP("error");
            }

            break;
        }

        case "suggestion":
            if (inp.value.length > 0) {
                inp.readOnly = true
                emaClone = divema.cloneNode(true);
                emaClone.querySelector(".cli-input").value = ""
                emaClone.querySelector(".cli-input").readOnly = false
                formItems.appendChild(emaClone);
                emaClone.querySelector(".cli-input").focus()
            } else {
                errorP("error")
            }
            break;
        case "ema":
            if (inp.checkValidity()) {
                inp.readOnly = true
                confClone = divconf.cloneNode(true);
                confClone.querySelector(".cli-input").value = ""
                confClone.querySelector(".cli-input").readOnly = false
                formItems.appendChild(confClone);
                confClone.querySelector(".cli-input").focus()
            } else {
                errorP("error")
            }

            break;

        case "conf": {
            let confval = inp.value;

            if (confval === "y" || confval === "Y") {
                inp.readOnly = true
                errorP("success");
                formItems.submit()
            } else if (confval === "n" || confval === "N") {
                var formChild = Array.from(formItems.children);
                formChild.toReversed().forEach(el => {
                    if (el.name !== "_next" && el.name !== "_template")
                        cliCont.insertBefore(el, Array.from(cliCont.children)[5]);
                });

                inp.readOnly = true;

                catClone = divcat.cloneNode(true);
                catClone.querySelector(".cli-input").value = "";
                catClone.querySelector(".cli-input").readOnly = false;
                formItems.appendChild(catClone);
                catClone.querySelector(".cli-input").focus();
            } else {
                errorP("error")
            }

            break;
        }
    }
});

tvtitle.addEventListener("animationend", async ev => {
    if (ev.animationName === "flicker") {
        // Start up anim
        await sleep (200)
            int.classList.remove("hide")
            int.classList.add("show")

            for (let i = 0; i < 3; i++) {
                await sleep (750)
                int.textContent += "."
            }

            await sleep (time)
            com.classList.remove("hide")
            com.classList.add("show")

            await sleep (time)
            formItems.appendChild(divcat)
            incat.focus()
    }
})