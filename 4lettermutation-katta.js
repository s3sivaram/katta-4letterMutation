// -------solved by s3sivaram@gmail.com----on 30-Jul-21----------------

/* 4 letter mutation - Katta 
alice = plat,rend,bear,soar,mare,pare,flap,neat,clan,pore

bob = boar,clap,farm,lend,near,peat,pure,more,plan,soap

In the case of word = "send" and first = 0:
Alice responds to send with rend
Bob responds to rend with lend
Alice has no valid response to lend
Bob wins the game.
In the case of word = "flip" and first = 1:
Bob has no valid response to flip
Alice responds to flip with flap
Alice wins the game.
In the case of word = "maze" and first = 0:
Alice responds to maze with mare
Bob responds to mare with more
Alice responds to more with pore
Bob responds to pore with pure
Alice responds to pure with pare
Bob has no valid response to pare
Alice wins the game.
In the case of word = "calm" and first = 1:
Bob has no valid response to calm
Alice has no valid response to calm
Neither wins the game.


*/

// --------------------------------------------------

function stringdiff(string1, string2) {
  /*
    
    This function will return True if there is only one difference in the same position 
    between 2 strings , else false.
    Input: string1- "flip",string2-"flap"
    Output:true,
    Input: string1- "mare",string2-"pire"
    Output:false,
  
    */
  let diff = 0;
  for (let i = 0; i <= string1.length - 1; i++) {
    if (string1[i] != string2[i]) {
      diff = diff + 1;
    }
  }
  if (diff > 1) {
    // console.log("string differnce between",string1,string2)
    return true;
  } else {
    return false;
  }
}

// --------------------------------------------------
function getreturnword(source, word) {
  /*
    This function returns 
     -a matching word if it's found.
     -"Not Found" if it's not found.
     -Source array after replacing the found word in the array to "@".
  
    */
  let returnword = "NOT FOUND";

  for (let i = 0; i <= source.length - 1; i++) {
    if (!stringdiff(word, source[i])) {
      returnword = source[i];
      source[i] = "@";
      break;
    }
  }
  return [returnword, source];
}
// ---------------------------------------------------

function mutations(alice, bob, word, first) {
  //

  function changeplayerdetails() {
    lastplayedword = word;
    word = nextword;
    first = !first;
    playtimes = playtimes + 1;
  }
  // ----primary func------
  let winner;
  let nextword;
  let lastplayedword;
  let sourcearray;
  let playtimes = 0;
  let alicewin;
  let bobwin;
  let firstgame = true;

  do {
    if (first == 0) {
      // Alice's turn
      // console.log("Alice enteres the game");
      // console.log("lastplayed word=", lastplayedword);
      sourcearray = alice;
      [nextword, sourcearray] = getreturnword(sourcearray, word);
      changeplayerdetails();
      // console.log("alice last played word", lastplayedword);

      if (nextword != "NOT FOUND") {
        alicewin = 1;
        bobwin = 0;
        alice = [...sourcearray];
        console.log("Alice's response =", word);
        firstgame = false;
      }
    } else {
      //
      // Bob's turn
      // console.log("Bob enteres the game");
      sourcearray = bob;
      [nextword, sourcearray] = getreturnword(sourcearray, word);
      changeplayerdetails();
      // console.log("bobs last played word", lastplayedword);

      if (nextword != "NOT FOUND") {
        bobwin = 1;
        alicewin = 0;
        bob = [...sourcearray];
        console.log("Bob's response =", word);
        firstgame = false;
      }
    }
    if (nextword == "NOT FOUND" && firstgame == true) {
      // console.log("first game NOT FOUND in first attempt");
      console.log("response is", word);
      break;
    }
  } while (nextword !== "NOT FOUND" || playtimes < 2);

  // FIRST GAME NOT FOUND case...

  if (firstgame == true) {
    first == 0 ? (sourcearray = alice) : (sourcearray = bob);
    // console.log("entering first game exit");
    // console.log("word seached is ", word);
    // console.log("last played word", lastplayedword);
    // console.log("source", sourcearray);
    word = lastplayedword;
    [nextword, sourcearray] = getreturnword(sourcearray, word);
    if (nextword != "NOT FOUND") {
      if (first == 0) {
        alicewin = 1;
        bobwin = 0;
        console.log("Alice response is ", nextword);
      } else {
        bobwin = 1;
        alicewin = 0;
        console.log("Bob's response is ", nextword);
      }
      console.log("Gameover in the first attempt - winner is", first);
      firstgame = false;
    } else {
      alicewin = 0;
      bobwin = 0;
    }
  }

  //  The winner....
  // console.log("alicewin=", alicewin);
  // console.log("bobwin=", bobwin);
  if (alicewin > bobwin) {
    winner = 0;
    console.log("Alice wins");
  }
  if (bobwin > alicewin) {
    console.log("bob wins");
    winner = 1;
  }
  if (alicewin == bobwin) {
    winner = -1;
    console.log("Neither wins");
  }
  return winner;

  // ----/primary func------
}

// -------------main flow-------------------

let alice = "plat,rend,bear,soar,mare,pare,flap,neat,clan,pore";
let bob = "boar,clap,farm,lend,near,peat,pure,more,plan,soap";

alice = alice.split(",");
bob = bob.split(",");

let word = "neat";
let first = 1;

console.log("first word=", word);
let res = mutations(alice, bob, word, first);

console.log("Result is ", res);
