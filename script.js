
var submitButton = document.getElementById("submit")
var FeedbackField = document.getElementById("FeedbackField")
var WebsiteSelect = document.getElementById("WebsiteSelect")
var WebpageSelect = document.getElementById("WebpageSelect")
var slider = document.getElementById("range")
var emojiBox = document.getElementById("emoji")
var TextOK = false
var firstFocus = false


function checkText(){
    var content =  String(FeedbackField.value)
    while(content.includes(" ")){content = content.replace(" ", "")}
    while(content.includes("    ")){content = content.replace(" ", "")}
    if(content == ""){TextOK = false; return false}else{TextOK = true; return true}
}



function disableSubmit(){
    submitButton.disabled = true
    submitButton.style.backgroundColor = "black"
    submitButton.style.border = "none"
    submitButton.style.color = "grey"
    submitButton.style.backgroundImage = "none"
}

function enableSubmit(){
    submitButton.disabled = false
    submitButton.style.border = "none"
    submitButton.style.color = "white"
    submitButton.style.backgroundImage = "linear-gradient(to right, #9818c0, #e2645b)"
}

FeedbackField.addEventListener("input", ()=>{
    if(FeedbackField.value == ""){disableSubmit()}
    else{if(checkText() == true){enableSubmit()}else{disableSubmit()}}
})

WebsiteSelect.addEventListener("select", (selection)=>{
    console.log(selection)
})

WebsiteSelect.addEventListener("input", (i)=>{
    var choice = String(WebsiteSelect.value)
    var noChoice = `
        <option>(nothing)</option>
    `
    var CertificateSiteChoices = `
    <option>Homepage</option>
    <option>Certificate page</option>    
    `
    var AboutMeChoices = `
    <option>Homepage</option>
    <option>Discord</option>
    <option>Websites</option>
    `
    var FeedbackChoices = `
    <option>Homepage</option>
    <option>Thank you page</option>    
    `
    var EverythingChoices = `
    <option>Everything</option>
    `
    var MeChoices = `    
    <option>hmm...</option>
    `
    switch(WebsiteSelect.value){
        case "null":
            WebpageSelect.innerHTML = noChoice
            break;
        case "Certificate Generator":
            WebpageSelect.innerHTML = CertificateSiteChoices
            break;
        case "About Me":
            WebpageSelect.innerHTML = AboutMeChoices
            break;
        case "Feedback Site":
            WebpageSelect.innerHTML = FeedbackChoices
            break;
        case "Everything":
            WebpageSelect.innerHTML = EverythingChoices
            break;
        case "Me":
            WebpageSelect.innerHTML = MeChoices
            break;
    }
})


slider.addEventListener("input", ()=>{
    switch (parseInt(slider.valueAsNumber)){
        case 1:
            emojiBox.innerHTML = "🤬";
            break;
        case 2:
            emojiBox.innerHTML = "😞";
            break;
        case 3:
            emojiBox.innerHTML = "🙂";
            break;
        case 4:
            emojiBox.innerHTML = "😊";
            break;
        case 5:
            emojiBox.innerHTML = "❤";
            break;
    }
})

FeedbackField.addEventListener("focus", ()=>{
    FeedbackField.innerText = ""
    FeedbackField.style.color = "chartreuse"
    FeedbackField.removeEventListener("focus", ()=>{})
})

disableSubmit()