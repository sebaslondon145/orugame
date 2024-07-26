/* Itachi Uchiha designed by Sujindran on dribbble - https://dribbble.com/shots/14069724-Itachi-Uchiha */

const itachi = document.querySelector(".itachi");
const eyeOne = document.querySelector(".eye__one");
const eyeTwo = document.querySelector(".eye__two");
const body = document.querySelector("body");

itachi.addEventListener("click", () => {
  body.classList.toggle("dark");
  itachi.classList.toggle("dark");
  eyeOne.classList.toggle("rage");
  eyeTwo.classList.toggle("rage");
  let audio = new Audio('naruto1.wav');

  let audio2 = new Audio('naruto2.wav');
  let audio3 = new Audio('naruto3.wav');

  //Reproducir sonidos uno detras de otro
  audio.play();
  audio.onended = function() {
      audio2.play();
      audio2.onended = function() {
          audio3.play();
      };
  };

  //Evitar que el usuario haga clic otra vez
    itachi.style.pointerEvents = 'none';
    

  
});
