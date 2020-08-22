//eg.
/*
var wordsArr = [
    {
        "pinyin": "shén me",
        "def": "what",
        "char": "什么"
    },
    {
        "pinyin": "gōng",
        "def": "to work",
        "char": "工"
    },
    {
        "pinyin": "hǎo", 
        "def": "good",
        "char": "好"
    }
];
*/

var wordsArr;
var hanziWriterObjArr = [];

function learn() {
    if (hanziWriterObjArr.length !== 0) {
        return;
    }

    // get json data
    if (wordsArr === undefined) {
        getWords();
    }
}

function getWords() {
    var xmlhttp = new XMLHttpRequest();
    var url = "https://jamesrocker.github.io/chinese_learner_app/words.json";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            wordsArr = JSON.parse(this.responseText);
            console.log(wordsArr);
            
            // loop over the array and create hanziWriterObjArr
            for (var i=0; i < wordsArr.length; i++ ) {
                var wordObj = wordsArr[i];
        
                var wordContainerEle = createWordContainer(wordObj, i);
                document.querySelector(".all-words-container").appendChild(wordContainerEle);
        
                var charBoxID = "charBox"+i;
                var characters = wordObj['char'];
        
                var charArray = characters.split("");
                
        
                var char = charArray[0];
                var writer = HanziWriter.create(charBoxID, char, {
                    //width: 150,
                    //height: 150,
                    width: 250,
                    height: 250,
                    padding: 5,
                    strokeColor: '#000000', // black
                    delayBetweenLoops: 3000
                });      
        
                hanziWriterObjArr[i] = {
                    "writerObj": writer,
                    "charArr": charArray
                };
             
            }      
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send(); 
}

function createWordContainer(wordObj, indx) {
    // create wordContainer Div
    var wordContainerDivElement = document.createElement("div");
    wordContainerDivElement.className = "word-container";

    var chinese_audio = wordObj["audio_tone"];

  
    // Create audio element
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('type',"audio/mp3")
    audioElement.id = "audioPlayer"+indx;
    audioElement.innerHTML = "You cannot listen to the pronunciation because your browser does not support the <code>audio</code> element.";

    if (chinese_audio.includes("fallback")) {
        audioElement.src = "https://jamesrocker.github.io/chinese_learner_app/mp3/"+ chinese_audio +".mp3";
    }
    else {
        audioElement.src = "https://www.hantrainerpro.de/resources/pronunciations/"+ chinese_audio +".mp3";
    }
 
    // attach audio element to the container
    wordContainerDivElement.appendChild(audioElement);


    var playButtonDiv = document.createElement("div");

    var playButtonElement = document.createElement("button");
    playButtonElement.className = "btn";
    playButtonElement.onclick = function() {
        playAudio(indx);
    };
    playButtonElement.innerHTML = '►';

    playButtonDiv.appendChild(playButtonElement);
    /*
    var text = 'document.getElementById(\'audioPlayer\''+indx+').play()';
    console.log("text");
    playButtonDiv.innerHTML = "<button class='btn' onclick='"+ text +"'>►</button>"
    */

    wordContainerDivElement.appendChild(playButtonDiv);


    

    var keys = Object.keys(wordObj);
    for (var i=0; i < 2; i++) {
        var pElement = document.createElement("p");

        var bElement = document.createElement("b");
        bElement.innerHTML = keys[i] + ": ";
        var spanElement = document.createElement("span");
        spanElement.innerHTML = wordObj[keys[i]];

        pElement.appendChild(bElement);
        pElement.appendChild(spanElement);

        wordContainerDivElement.appendChild(pElement);
    }

    // character box
    var charBoxElement = document.createElement("div");
    charBoxElement.className = "char-box";
    charBoxElement.id = "charBox"+indx;

    wordContainerDivElement.appendChild(charBoxElement);

    // writing option div
    var writingOptionDivEle = document.createElement("div");
    writingOptionDivEle.className = "writing-option";

    // animate button
    var animateButtonEle = document.createElement("button");
    animateButtonEle.className = "btn";
    animateButtonEle.onclick = function() {
        animate(indx);
    };
    animateButtonEle.innerHTML = "Animate";

    // try writing button
    var tryButtonEle = document.createElement("button");
    tryButtonEle.className = "btn";
    tryButtonEle.onclick = function() {
        tryWriting(indx);
    };
    tryButtonEle.innerHTML = "Try";

    // outline checkbox and label
    var outlineDiv = document.createElement("div");

    var checkboxEle = document.createElement("input");
    checkboxEle.setAttribute("type", "checkbox");
    checkboxEle.onchange = function() {
        tryWriting(indx)
    };
    checkboxEle.id = "showOutline"+indx;

    var labelEle = document.createElement("label");
    labelEle.innerHTML = "Show Outline";

    outlineDiv.appendChild(checkboxEle);
    outlineDiv.appendChild(labelEle);

    writingOptionDivEle.appendChild(animateButtonEle);
    writingOptionDivEle.appendChild(tryButtonEle);
    writingOptionDivEle.appendChild(outlineDiv);

    wordContainerDivElement.appendChild(writingOptionDivEle);

    return wordContainerDivElement;
}

function animate(index) {
    
    var animateCharObjs = hanziWriterObjArr[index];

    var animateCharObj = animateCharObjs['writerObj'];

    var charArr = animateCharObjs['charArr'];

    //default character
    animateCharObj.updateColor('strokeColor', '#FF0000');
    animateCharObj.setCharacter(charArr[0]);
    
    if (charArr.length === 1) {
        animateCharObj.updateColor('strokeColor', '#FF0000');
        animateCharObj.animateCharacter({
            onComplete: function() {
                animateCharObj.updateColor('strokeColor', '#000000');
                animateCharObj.setCharacter(charArr[0]);
            }
        });        
    }
    else {
        var i = 0;

        var delayBetweenAnimations = 1000; // milliseconds
        var params = {
            onComplete: function() {
                setTimeout(function() {
                    i += 1;
                    
                    if (i < charArr.length) {
                        var newChar = charArr[i];

                        animateCharObj.setCharacter(newChar);

                        animateCharObj.updateColor('strokeColor', '#FF0000'); //set to red color
                        animateCharObj.animateCharacter(params);
                    }         
                    else {
                        animateCharObj.updateColor('strokeColor', '#000000');
                        animateCharObj.setCharacter(charArr[0]);
                    }           
                }, delayBetweenAnimations);
            }
        };
        animateCharObj.updateColor('strokeColor', '#FF0000');
        animateCharObj.animateCharacter(params);
    }
   
}

function tryWriting(index) {
    var animateCharObjs = hanziWriterObjArr[index];

    var animateCharObj = animateCharObjs['writerObj'];

    var charArr = animateCharObjs['charArr'];

    var delayBetweenAnimations = 1000; // milliseconds

    //default character
    animateCharObj.updateColor('strokeColor', '#FF0000');
    animateCharObj.setCharacter(charArr[0]);

    if (charArr.length === 1) {
        // update color
        animateCharObj.updateColor('strokeColor', '#FF0000');

        if (document.getElementById("showOutline"+index).checked) {
            animateCharObj.showOutline();
        }
        else {
            animateCharObj.hideOutline();
        }

        animateCharObj.quiz({
            onComplete: function() {
                setTimeout(function(){
                    animateCharObj.updateColor('strokeColor', '#000000'); //set to black color
                }, delayBetweenAnimations);
            }
        });
    }
    else {
        var i = 0;

        var params = {
            onComplete: function() {
                setTimeout(function() {
                    i += 1;
                    
                    if (i < charArr.length) {
                        var newChar = charArr[i];

                        animateCharObj.setCharacter(newChar);

                        if (document.getElementById("showOutline"+index).checked) {
                            animateCharObj.showOutline();
                        }
                        else {
                            animateCharObj.hideOutline();
                        }

                        animateCharObj.updateColor('strokeColor', '#FF0000'); //set to red color
                        animateCharObj.quiz(params);
                    }
                    else {
                        animateCharObj.cancelQuiz();

                        animateCharObj.updateColor('strokeColor', '#000000'); //set to black color
                        animateCharObj.setCharacter(charArr[0]);
                    }         
                          
                }, delayBetweenAnimations);
            }
        };

        
        if (document.getElementById("showOutline"+index).checked) {
            animateCharObj.showOutline();
        }
        else {
            animateCharObj.hideOutline();
        }

        animateCharObj.updateColor('strokeColor', '#FF0000');
        animateCharObj.quiz(params);
    }
}

// try all option
function practiceAll() {
    for (var i=0; i < hanziWriterObjArr.length; i++) {
        tryWriting(i);
    }
}

function playAudio(indx) {
    var idText = "audioPlayer"+indx;
    var audioPlayerElement = document.getElementById(idText);
    audioPlayerElement.play();
}