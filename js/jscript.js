var tileCounter = 1;
function loadBoardImages(){
    $(".double-word-square").append('<img id="double-word-image" class="board-images" src="./Scrabble_Board_Double_Word_Square.png"/>');
    $(".empty-word-square").append('<img id="empty-square-image" class="board-images" src="./Scrabble_Board_Empty_Square.png"/>');
    $(".double-letter-square").append('<img id="double-letter-image"  src="./Scrabble_Board_Double_Letter_Square.png"/>');
}

var startPos;

var boardLine =  [ 
  {"letterMultiplier": 1, "wordMultiplier": 2, "image": "./graphics_data/Scrabble_Board_Empty_Square.png"},
  { "letterMultiplier": 1, "wordMultiplier": 2, "image": "./graphics_data/Scrabble_Board_Double_Word_Square.png"},
  { "letterMultiplier": 1, "wordMultiplier": 1, "image": "./graphics_data/Scrabble_Board_Empty_Square.png"},
  { "letterMultiplier": 2, "wordMultiplier": 1, "image": "./graphics_data/Scrabble_Board_Double_Letter_Square.png"},
  { "letterMultiplier": 1, "wordMultiplier": 1, "image": "./graphics_data/Scrabble_Board_Empty_Square.png"},
  { "letterMultiplier": 1, "wordMultiplier": 2, "image": "./graphics_data/Scrabble_Board_Double_Word_Square.png"},
  { "letterMultiplier": 1, "wordMultiplier": 1, "image": "./graphics_data/Scrabble_Board_Empty_Square.png"}

];

var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;


var curScrabbleTiles = ScrabbleTiles;

var origPieces = [
	{"letter":"A", "value":1, "amount":9},
	{"letter":"B", "value":3, "amount":2},
	{"letter":"C", "value":3, "amount":2},
	{"letter":"D", "value":2, "amount":4},
	{"letter":"E", "value":1, "amount":12},
	{"letter":"F", "value":4, "amount":2},
	{"letter":"G", "value":2, "amount":3},
	{"letter":"H", "value":4, "amount":2},
	{"letter":"I", "value":1, "amount":9},
	{"letter":"J", "value":8, "amount":1},
	{"letter":"K", "value":5, "amount":1},
	{"letter":"L", "value":1, "amount":4},
	{"letter":"M", "value":3, "amount":2},
	{"letter":"N", "value":1, "amount":5},
	{"letter":"O", "value":1, "amount":8},
	{"letter":"P", "value":3, "amount":2},
	{"letter":"Q", "value":10, "amount":1},
	{"letter":"R", "value":1, "amount":6},
	{"letter":"S", "value":1, "amount":4},
	{"letter":"T", "value":1, "amount":6},
	{"letter":"U", "value":1, "amount":4},
	{"letter":"V", "value":4, "amount":2},
	{"letter":"W", "value":4, "amount":2},
	{"letter":"X", "value":8, "amount":1},
	{"letter":"Y", "value":4, "amount":2},
	{"letter":"Z", "value":10, "amount":1}
];
var curPieces = origPieces;
function totalRemTiles(){
  //returns remaining tiles in play and removes letters no longer in bag
  var totN = 0;
  for(var x in curPieces){
    totN += curPieces[x].amount;
    if(curPieces[x].amount == 0){
      curPieces.splice(x,1);
    }
    console.log(totN);
  }
}



// Source: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nextWord(){
  var lettersSubmitted = 0;var incScore = 0;
  for(let i =1; i < 8; i++){
    var cPos = $("#rack-tile-"+ i +" > img").position();
    var lettersOnBoard= [];
    if (cPos.top != 0){
      let l = $("#rack-tile-"+ i +"> img").attr("id").slice(-1);


      incScore += curScrabbleTiles[l].value;
      console.log(curScrabbleTiles[l].value)
      curScrabbleTiles[l].original-distribution--;
      lettersSubmitted++;
    }
  }  
  if (lettersSubmitted > 1){
    nextTiles();
  }else{
    alert("Need letters on the Board");
  }

}

function nextTiles(){
  for(let i =1; i < 8; i++){
    $("#rack-tile-"+ i).empty(); //remove children for next group of letters
  }
  tileCounter = 1;
  while(tileCounter < 8){
    if(curPieces.length == 0){
      console.log("GAME OVER");
    }
    var rand = getRandInt(0,curPieces.length-1);
    console.log(rand); 
    var tileLetter = curPieces[rand].letter;

    $("#rack-tile-"+ tileCounter).append('<img id=rack-tiles-img-'+ tileLetter + ' class="rack-tiles-img ' + tileLetter + '" src="/graphics_data/Scrabble_Tiles/Scrabble_Tile_' + tileLetter+ '.jpg"/>');
    tileCounter++;
  }
}




function loadTileImages(){
  tileCounter = 1;
  while(tileCounter < 8){
    //inline style for height style="height: 68px;"
  console.log("#rack-tile-"+ tileCounter.toString());
  if(curPieces.length == 0){
    console.log("GAME OVER");
  }
  var rand = getRandInt(0,curPieces.length-1);
  console.log(rand);
  var tileLetter = curPieces[rand].letter;
  $("#rack-tile-"+ tileCounter).append('<img id=rack-tiles-img-'+ tileLetter + ' class="rack-tiles-img ' + tileLetter + '" src="/graphics_data/Scrabble_Tiles/Scrabble_Tile_' + tileLetter+ '.jpg"/>');
  tileCounter++;
  }
  $(".rack-tiles-img").draggable({
    revert: "invalid", // when not dropped, the item will revert back to its initial position
    containment: "document",
    cursor: "move",
    start: function(ev, ui) {

    },
    
    stop: function() {
      $(this).draggable('option','revert','invalid');
    }
  });
}
jQuery.fn.swap = function(b){ 
  // method from: http://blog.pengoworks.com/index.cfm/2008/9/24/A-quick-and-dirty-swap-method-for-jQuery
  b = jQuery(b)[0]; 
  var a = this[0]; 
  var t = a.parentNode.insertBefore(document.createTextNode(''), a); 
  b.parentNode.insertBefore(a, b); 
  t.parentNode.insertBefore(b, t); 
  t.parentNode.removeChild(t); 
  return this; 
};
emptySlots= [true,true,true,true,true,true,true];

function acceptFuncCheck (){
    
  
  if($(this).attr("class") == "rack-tiles-img"){
    var lastNum = parseInt($(this).attr("id").slice(-1));
    if (emptySlots){
      emptySlots[lastNum] = false;
      return true;
    }
    
    

  }
}


(function($) { //centering function from stackoverflow https://stackoverflow.com/questions/26746823/jquery-ui-drag-and-drop-snap-to-center
  $.fn.centerOnDrop = function(ui) {
    ui.draggable.position({
      my: 'center',
      at: 'center',
      of: this,
      using: function(pos) {
        $(this).animate(pos, 200, 'linear');
      }
    });
  };
})(jQuery);
// (function($) { //centering function from stackoverflow https://stackoverflow.com/questions/26746823/jquery-ui-drag-and-drop-snap-to-center
//   $.fn.centerOnDropinRack = function(ui) {
//     ui.draggable.position({
//       my: 'bottom',
//       at: 'left +' + (12*parseInt($(this).attr("id").slice(-1))).toString(),
//       of: this,
//       using: function(pos) {
//         $(this).animate(pos, 300, 'linear');
//         console.log(parseInt($(this).attr("id").slice(-1)));
//       }
//     });
//   };
// })(jQuery);


function makeBoardImagesDroppable(){
  $("#board-row > div > img").droppable({
    accept: ".rack-tiles-img",
    classes:  {
     "ui-droppable-active": "ui-state-active",
     "ui-droppable-hover": "ui-state-hover"
    },
    drop: function(event, ui) {
      // var draggableID = ui.draggable.attr("id");    // The current Scrabble tile ID
      // var droppableID = $(this).attr("id");         // The current spot on the game board ID
      // var gameboard_length = 0;         // The length of the game board array (global array).
      // var draggable = ui.draggable, droppable = $(this),
      // dragPos = draggable.position(), dropPos = droppable.position();

      
        $(this).centerOnDrop(ui);
      // var targetPos =  $(this).position();
      // console.log(targetPos);
      // if($(this.parentNode).attr("id") !== "slot1"){
      //   // $(ui.draggable).css('top', -116);
      //   $(ui.draggable).css('top', -116);
      //   $(ui.draggable).css('left', -56 + 10);
      // }else{
      //   $(ui.draggable).css('top', -targetPos.top);
      //   $(ui.draggable).css('left', -targetPos.left);
      // }
      // $(ui.draggable).css("top", 0);
      // $(ui.draggable).css("left", 0);

      // $(ui.draggable).css('top', $(droppable).position().top);
      // console.log($(this).position().top);
      // $(ui.draggable).css('left', 0);

  }
}
  //  drop: function(ev, ui) {  //change html to add droppable into target html
  //   $(ui.draggable).detach().css({top: 0,left: 0}).appendTo(this);
  //  } 
);
 }

// var request = new XMLHttpRequest();
// request.open('GET');
function makeRackDroppable(){
 $("#rack").droppable({
  accept: ".rack-tiles-img",
  classes:  {
    "ui-droppable-active": "ui-state-active",
    "ui-droppable-hover": "ui-state-hover"
  }
  ,
  drop: function(event, ui) {
    // $(this).centerOnDropinRack(ui);
    $(ui.draggable).css('top', $(this).position().top -157.5);
    $(ui.draggable).css('left', $(this).position().left - 8);
}
 });
}




$(function () {
    //Load Game
    loadBoardImages();
    loadTileImages();
    makeBoardImagesDroppable();
    makeRackDroppable();
 });

