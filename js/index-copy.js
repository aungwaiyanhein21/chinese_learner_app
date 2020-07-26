window.onload = init;

function init() {
    var writer = HanziWriter.create('character-target-div', '什', {
        width: 100,
        height: 100,
        padding: 5
    });

    var writer_1 = HanziWriter.create('character-target-div-1', '几', {
        width: 100,
        height: 100,
        padding: 5,
        showOutline: true
      });
      document.getElementById('animate-button').addEventListener('click', function() {
        writer_1.animateCharacter();
      });

      var writer_2 = HanziWriter.create('character-target-div-2', '几', {
        width: 100,
        height: 100,
        showCharacter: false,
        padding: 5
      });
      writer_2.quiz();

      var writer_3 = HanziWriter.create('character-target-div-3', '几', {
        width: 100,
        height: 100,
        showCharacter: false,
        showOutline: false,
        padding: 5
      });
      writer_3.quiz();
            
            
}



        