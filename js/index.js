const HOME = 1;
const LEARN = 2;
const TEST = 3;
var current = HOME; 

window.onload = init;

function init() {
    // getting input element by id
    var inputElement = document.getElementById("search");

    
    inputElement.addEventListener("keyup", function(event) {
        // enter keycode = 13
        if (event.keyCode === 13) {
            event.preventDefault();
           
            // click button
            document.getElementById("searchButton").click();
        }
    }); 
                   
}

function search() {

    var inputElement = document.getElementById("search");
    var inputValue = inputElement.value;

    if (inputValue.length > 1) {
        alert("Please type only one character. Currently working on multiple characters");
        return;
    }

    // display the result section
    document.querySelector(".search-result-section").style.display = "flex";

    console.log(inputValue);

    var charBoxArr = ["searchCharBox", "practiceCharBox"]
    // remove the box element 
    for (var i=0; i < charBoxArr.length; i++) {
        removeCharBox(charBoxArr[i]);
    }

    // for animation box
    var charDivEle = createCharBox();
    charDivEle.id = "searchCharBox";
    document.getElementById("searchResult").appendChild(charDivEle);

    // for practice box
    var pracCharDivEle = createCharBox();
    pracCharDivEle.id = "practiceCharBox";
    document.getElementById("practice").insertBefore(pracCharDivEle, document.getElementById("clearPractice"));

    
   
    // for animation
    var charWriter = HanziWriter.create("searchCharBox", inputValue, {
        width: 250,
        height: 250,
        padding: 5,
        strokeColor: '#FF0000', // red
        delayBetweenLoops: 3000,
    });

    charWriter.loopCharacterAnimation();


    // for practice
    var prac_writer = HanziWriter.create("practiceCharBox", inputValue, {
        width: 150,
        height: 150,
        padding: 5,
        strokeColor: '#FF0000', // red
        highlightOnComplete: true,
        showOutline: false
    });
    prac_writer.quiz();
   
            
    
}

function createCharBox() {
    // create div box for character
    var charDivElement = document.createElement("div");
    charDivElement.className = "char-box";

    return charDivElement;
}

function removeCharBox(boxID) {
    var charBox = document.getElementById(boxID);
    if (charBox !== null) {
        charBox.remove();
    }
}

function showPracticeOutline() {
    removeCharBox("practiceCharBox");

    var outlinePracCharDivEle = createCharBox();
    outlinePracCharDivEle.id = "practiceCharBox";
    document.getElementById("practice").insertBefore(outlinePracCharDivEle, document.getElementById("clearPractice"));
    

    var inputVal = document.getElementById("search").value;

    propertyDic = {
        width: 250,
        height: 250,
        padding: 5,
        strokeColor: '#FF0000', // red
        highlightOnComplete: true,
        showOutline: false
    };
    
    var checkboxElement = document.getElementById("outlineOrNot");
    if (checkboxElement.checked === true) {
        propertyDic['showOutline'] = true;
    }

    var outline_prac_writer = HanziWriter.create("practiceCharBox", inputVal, propertyDic);
    outline_prac_writer.quiz();
}

function clearPractice() {
    showPracticeOutline();
}


function changeState(state) {
    if (current === state) {
        return;
    }

    document.getElementById("link"+current).classList.toggle("selected");
    document.getElementById("section"+current).classList.toggle("section-not-selected");

    current = state;

    document.getElementById("link"+current).classList.toggle("selected");
    document.getElementById("section"+current).classList.toggle("section-not-selected");

    //hide current section


    if (current === LEARN) {
        learn();
    }
    if (current === TEST) {
        //alert("Test");
    }
}



        