 const hello = document.querySelector("input[type='submit']");

hello.addEventListener("click", () => {
    let num = document.getElementById("category").value;
    let nam = document.getElementById("name").value
    let cons = document.getElementById("minicons");
    console.clear()

    cons.textContent = ""

    if (num >= 1 && num <= 3 || Number.isNaN(num))  {
        console.log("category's fine now");
    }
    else {
        console.log("HOLY SHIT CATEGORY IS WRONG");
        cons.textContent += " Invalid Category!"
    }

    if (nam != "") {
        console.log("name is fine")
    }
    else {
        console.log("HOLY SHIT NAME IS WRONG")
        cons.textContent += " Please input a Name!"
    }

    
})