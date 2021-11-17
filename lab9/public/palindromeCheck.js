

let emptyError = document.getElementById("emptyError");
let palidromeText = document.getElementById("palidromeText");
// document.getElementById("formSubmit").addEventListener("submit", event => {
//     event.preventDefault();
//     let palidData = document.getElementById("palidromeText").value;
//     if (palidData.trim() === "") {
//         emptyError.hidden = false;
//         document.getElementById("palidromeText").value = "";
//         palidromeText.focus();
//         return;
//     } else {
//         let lowerData = transferLower(palidData);
//         if(lowerData === ""){
//             emptyError.hidden = false;
//             document.getElementById("palidromeText").value = "";
//             palidromeText.focus();
//             return;
//         }
//         // judge the string is palindrome
//         let reversedData = lowerData.split("").reverse().join("");
//         if (lowerData === reversedData) {
//             emptyError.hidden = true;
//             document.getElementById("attempts").innerHTML += "<li class = is-palindrome>" + palidData + "</li>";
//         } else {
//             emptyError.hidden = true;
//             document.getElementById('attempts').innerHTML += "<li class = not-palindrome>" + palidData + "</li>";
//         }

//         document.getElementById("palidromeText").value = "";
//         return;
//     }
// })

function transferLower(textstr) {
    // build pattern regex
    let pattern = /[^A-Za-z0-9]/g;
    let palidStr = textstr.toLowerCase().replace(pattern, '');
    return palidStr;
}


document.getElementById('textSubmit').addEventListener('submit', event => {
    event.preventDefault();
    console.log("1231");
    const editorData = document.getElementById("editor").value;
    console.log(editorData)
});