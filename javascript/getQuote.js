const url =
    "https://dry-refuge-90427.herokuapp.com/https://api.quotable.io/random?maxLength=120";

async function getQuote() {
    const response = await fetch(url);
    const data = await response.json();
    const disp = document.querySelector(".quote");
    disp.innerText = `"` + data.content + `"` + " ~ " + data.author;

    let font = document.getElementById("quote");
    if (data.length <= 50) {
        font.style.fontSize = "1.7rem";
    } else {
        font.style.fontSize = "1.5rem";
    }

    console.log(data.length);
}

getQuote();
