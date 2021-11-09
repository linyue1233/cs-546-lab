console.log("123123123");
document.getElementById("formSubmit").addEventListener("submit", event => {
    event.preventDefault();
    let palidData = document.getElementById("palidromeText").value;
    if (palidData.trim() == "") {
        document.getElementById("formSubmit").innerHTML += "<p class= error-inform>  the text is an empty string, please input again </p>";
        return;
    } else {
        let lowerData = transferLower(palidData);
        // judge the string is palindrome
        let reversedData = lowerData.split("").reverse().join("");
        if (lowerData === reversedData) {
            document.getElementById("attempts").innerHTML += "<li class = is-palindrome>" + palidData + "</li>";
        } else {
            document.getElementById('attempts').innerHTML += "<li class = not-palindrome>" + palidData + "</li>";
        }

        document.getElementById("palidromeText").value = "";
        return;
    }
})

function transferLower(textstr) {
    // build pattern regex
    let pattern = /[^A-Za-z0-9]/g;
    let palidStr = textstr.toLowerCase().replace(pattern, '');
    return palidStr;
}