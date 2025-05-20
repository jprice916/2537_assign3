
let counter = 0;
let time = 0;
let timerInterval = null;
let gameOver = false;
let diffculty = document.getElementById('Diff').innerHTML;
  if (diffculty == "Difficulty: Easy"){
    time = 30
  }
  if (diffculty == "Difficulty: Medium"){
    time = 60
  }
  if (diffculty == "Difficulty: Hard"){
    time = 90
  }

function startTimer() {
  timerInterval = setInterval(() => {
    if (time > 0) {
      time--;
      document.getElementById('timer').textContent = `Time: ${time}s`;
    } else {
      clearInterval(timerInterval); 
      alert("Time's up!");
      gameOver = true;
    }
  }, 1000);
}


function stopTimer() {
  clearInterval(timerInterval);
}

function setup() {
  let firstCard = undefined;
  let secondCard = undefined;
  let cards = document.querySelectorAll('.card'); 
  let Pairs = cards.length / 2;
  let matchedPairs = 0;
  
 
  let start = document.getElementById('startBtn').addEventListener('click', startTimer)
  

  $(".card").on("click", function () {
    if (gameOver){
      return
    }
    if ($(this).hasClass("flip")) return; 

    $(this).toggleClass("flip");

    if (!firstCard) {
      firstCard = $(this).find(".front_face")[0];
    } else {
      secondCard = $(this).find(".front_face")[0];
      console.log(firstCard, secondCard);

      if (firstCard.src === secondCard.src) {
        console.log("match");
        $(`#${firstCard.id}`).parent().off("click");
        $(`#${secondCard.id}`).parent().off("click");

        matchedPairs++;
        firstCard = undefined;
        secondCard = undefined;


        if (matchedPairs === Pairs) {
          setTimeout(() => {
            alert("You won!");

          }, 500);
          stopTimer();
        }

      } else {
        console.log("no match");
        setTimeout(() => {
          $(`#${firstCard.id}`).parent().toggleClass("flip");
          $(`#${secondCard.id}`).parent().toggleClass("flip");
          firstCard = undefined;
          secondCard = undefined;
        }, 1000);
      }
    }
  });
}

function count() {
  counter ++;
  const display = document.getElementById("click_counter")
  display.innerHTML = counter;
  console.log("count")
}
async function pokeList() {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=1500`)
  const pokemon = await response.json();
  const list = []
  for (const num of pokemon.results){
    const pokemonResponse = await fetch(num.url);
   const pokemonData = await pokemonResponse.json();


    const imageUrl = pokemonData.sprites.front_default;
    list.push(imageUrl);
  }
  return list
}

function getRandomImages(urls, count) {
  const shuffled = urls.slice().sort(() => Math.random() - 0.5); 
  const selected = shuffled.slice(0, count); 
  const pairs = [...selected, ...selected]; 
  return pairs.sort(() => Math.random() - 0.5);
}
async function assignImagesToCards() {
  const pokemonImageUrls = await pokeList(); 

  const cards = document.querySelectorAll('.card'); 

  const numberOfPairs = cards.length / 2;
  let selectedImages = pokemonImageUrls.sort(() => Math.random() - 0.5).slice(0, numberOfPairs);

  selectedImages = [...selectedImages, ...selectedImages];
  selectedImages = selectedImages.sort(() => Math.random() - 0.5);

 
  cards.forEach((card, index) => {
    
    const frontFace = card.querySelector('.front_face');
    frontFace.src = selectedImages[index];
    card.addEventListener('click', count)
  });
}

document.getElementById('darkModeBtn').addEventListener('click', () => {
  document.body.style.background = 'black';
  document.body.style.color = 'white';
  console.log("color")
});
document.getElementById('lightModeBtn').addEventListener('click', () => {
  document.body.style.background = 'white';
  document.body.style.color = 'black';
  console.log("color")
});
document.getElementById('revealBtn').addEventListener('click', () => {
  const cards = document.querySelectorAll('.card');
  const button = document.getElementById('revealBtn');

  button.disabled = true;
  cards.forEach(card => card.classList.add('flip'));
  setTimeout(() => {
    cards.forEach(card => card.classList.remove('flip'));
  }, 1000);
});




document.getElementById('reset').addEventListener('click', () => {
  location.reload();
})
assignImagesToCards();


$(document).ready(setup)