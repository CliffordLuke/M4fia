// Defines labes in command line
let int = document.getElementById("int");
let com = document.getElementById("intcom")

// Sleep helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Checcks current step (what part of the form you're currently in)
let curstep = "cat"

const intblk = document.getElementById("test")
if (intblk) {
    attachlisteners(intblk)
}

// Attacking listeners 
function attachlisteners(currentblock) {
    // Defines Form Divs and Labels
    const divcat = document.getElementById("sug-cat");
    const divtext = document.getElementById("sug-text");
    const divema = document.getElementById("sug-ema");
    const divconf = document.getElementById("sug-conf");
    const labtext = document.getElementById("sug-bug");
    let err = document.getElementById("err");

    // Defines Inputs Separately
    const incat = document.getElementById("category");
    const intext = document.getElementById("suggestion");
    const inema = document.getElementById("ema");
    const inconf = document.getElementById("conf");
    const input = document.querySelectorAll(".cli-input");   


    const time = "0"
    // Main CLI (Command Line Interface)
    input.forEach((check) => { 
        check.addEventListener('keydown', async () => { 
            if ((event.code === "Enter" && !event.shiftKey) || (event.code === "NumpadEnter" && !event.shiftKey)) {
                err.textContent = "";
                switch (curstep) {
                    case "cat":
                        let catval = document.getElementById("category").value;
                        if (catval >= 1 && catval <= 3 || Number.isNaN(catval)) {
                            incat.disabled = true; 
                            await sleep(time);
                            divtext.classList.remove("hide");
                            divtext.classList.add("show");
                            intext.focus();
                            switch (true) {
                                case (Number(catval) === 1 || Number(catval) === 3):
                                    labtext.textContent += "Suggestion> Input your suggestions below:";
                                    break;

                                case (Number(catval) === 2):
                                    labtext.textContent += "Bug> Report your bug below:";
                                    break;     
                            }
                            curstep = "sug";
                        }
                        else {
                            err.textContent = "Invalid Category!";
                        }
                        break;

                    case "sug":
                        let cleantxt = intext.value.replace(/[\r\n]/g, "").trim();
                        if (cleantxt !== "") {
                            intext.disabled = true;
                            await sleep(time);
                            divema.classList.remove("hide");
                            divema.classList.add("show");
                            inema.focus();
                            curstep = "ema";
                        }
                        else {
                            switch (true) {
                                    case (Number(catval) === 1 || Number(catval) === 3):
                                            err.textContent = "Suggestion can not be blank!";
                                        break;

                                    case (Number(catval) === 2):
                                            err.textContent = "Bug Report can not be blank!";
                                        break;
                                }
                        }
                        break;

                    case "ema":
                        inema.disabled = true; 
                        await sleep(time);
                        divconf.classList.remove("hide");
                        divconf.classList.add("show");
                        inconf.focus();
                        curstep = "conf";
                        break;

                    case "conf":
                        let confval = inconf.value
                        console.log(confval)
                        inconf.disabled = true
                        switch (confval) {
                            case ("y"):
                            case ("Y"):
                                
                                err.classList.toggle("red");
                                err.classList.toggle("green");
                                await sleep(time);
                                err.textContent = "Thank you for suggesting!";
                                break;

                            case ("n"):
                            case ("N"):
                                currentblock.removeAttribute("id");
                                currentblock.querySelectorAll("[id]").forEach(el => el.removeAttribute("id"));

                                const template = document.getElementById("cli-temp");
                                const clone = template.content.cloneNode(true);
                                const newBlock = clone.querySelector("test");

                                newBlock.id = "test";
                                document.getElementById("clicont").appendChild(clone);

                                curstep = "category";

                                attachlisteners(newBlock);
                                newBlock.querySelector("#category").focus();
                                break;

                            default:
                                inconf.disabled = false;
                                err.textContent = "Enter y or n"
                                break;
                        }        
                        break;
                }
            }
        })
    })


    // Start up anim
    window.addEventListener("load", async () => {
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
        divcat.classList.remove("hide")
        divcat.classList.add("show")
        incat.focus()
        incat.value = ""
        inema.value = ""
        intext.value = ""
        inconf.value = ""
    })

    intext.addEventListener('input', () => {
        intext.style.height = 'auto';
        intext.style.height = intext.scrollHeight + 'px';
    });
}




