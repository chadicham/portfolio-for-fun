// Variable pour check si le slider est sur pause ou non
let onPause = false;
// typing animation
const text = document.querySelector(".sec-text")
const textLoad = () =>{
  setTimeout(()=>{
    text.textContent ="a Web developer"
  }, 0)
  setTimeout(()=>{
    text.textContent ="Swiss"
  }, 4000)
  setTimeout(()=>{
    text.textContent ="a passionate"
  }, 8000)
}
textLoad()
setInterval(textLoad, 12000)

// Aside
const nav = document.querySelector(".nav"),
      navList = nav.querySelectorAll("li"),
      totalNavList = navList.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length //Sélectionne les éléments tels que la barre de navigation, les éléments de la liste de navigation et toutes les sections sur la page
      for (let i = 0; i < totalNavList; i++) {
        const a = navList[i].querySelector('a');
        a.addEventListener('click', function() {
          // Gestion des événements de clic sur les éléments de la liste de navigation
      
          // Supprimer la classe "back-section" de toutes les sections
          for (let i = 0; i < totalSection; i++) {
            allSection[i].classList.remove("back-section");
          }
      
          // Parcourir tous les éléments de la liste de navigation
          for (let j = 0; j < totalNavList; j++) {
            // Vérifier si l'élément de navigation contient déjà la classe "active"
            if (navList[j].querySelector("a").classList.contains("active")) {
              // Ajouter la classe "back-section" à la section correspondante
              allSection[j].classList.add("back-section");
            }
            // Supprimer la classe "active" de tous les éléments de navigation
            navList[j].querySelector("a").classList.remove("active");
          }
      
          // Ajouter la classe "active" à l'élément de navigation cliqué
          this.classList.add("active");
      
          // Afficher la section correspondante
          showSection(this);
      
          // Masquer la navigation automatiquement lorsqu'on clic sur un élément de la navigation
          if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
          }
        });
      }
      
      function showSection(element) {
        // Supprimer la classe "active" de toutes les sections
        for (let i = 0; i < totalSection; i++) {
          allSection[i].classList.remove("active");
        }
      
        // Récupérer l'ID de la section cible depuis l'attribut "href" de l'élément
        const target = element.getAttribute("href").split("#")[1];
      
        // Ajouter la classe "active" à la section cible
        document.querySelector("#" + target).classList.add("active");
      }
      
      function updateNav(element) {
        for (let i = 0; i < totalNavList; i++) {
          // Supprimer la classe "active" de tous les éléments de navigation
          navList[i].querySelector("a").classList.remove("active");
          
          // Récupérer l'ID de la section cible depuis l'attribut "href" de l'élément
          const target = element.getAttribute("href").split("#")[1];
        }
      }
      
      document.querySelector(".hire-me").addEventListener("click", function() {
        // Appeler la fonction showSection en passant "this" en tant qu'argument
        showSection(this);
      
        // Appeler la fonction updateNav en passant "this" en tant qu'argument
        updateNav(this);
      });
      
      const navTogglerBtn = document.querySelector(".nav-toggler");
      const aside = document.querySelector(".aside");
      
      navTogglerBtn.addEventListener("click", () => {
        asideSectionTogglerBtn();
      });
      
      function asideSectionTogglerBtn() {
        // Ajouter/Supprimer la classe "open" à l'élément aside
        aside.classList.toggle("open");
      
        // Ajouter/Supprimer la classe "open" à l'élément navTogglerBtn
        navTogglerBtn.classList.toggle("open");
      
        // Ajouter/Supprimer la classe "open" à toutes les sections
        for (let i = 0; i < totalSection; i++) {
          allSection[i].classList.toggle("open");
        }
      }
      


//Slider 
// Sélectionne tous les éléments ayant la classe "carousel"
document.querySelectorAll(".carousel").forEach(carousel => {
  // Sélectionne tous les éléments enfants ayant la classe "portfolio-item-inner"
  const items = carousel.querySelectorAll(".portfolio-item-inner");

  // Génère du code HTML pour les boutons de navigation à partir des éléments
  const btnHtml = Array.from(items, () => {
    return `<span class="carousel-btn"></span>`;
  });

  // Insère le code HTML des boutons de navigation à la fin de l'élément "carousel"
  carousel.insertAdjacentHTML(
    "beforeend",
    `<div class="carousel-nav">${btnHtml.join("")}</div>`
  );

  // Sélectionne tous les boutons de navigation nouvellement créés
  const buttons = carousel.querySelectorAll(".carousel-btn");

  // Associe un événement de clic à chaque bouton de navigation
  buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
      // Retire la classe "portfolio-item-inner-active" de tous les items
      items.forEach(item => item.classList.remove("portfolio-item-inner-active"));
      buttons.forEach(button => button.classList.remove("carousel-btn-selected"));

      // Ajoute la classe "portfolio-item-inner-active" à l'item cliqué et la classe "carousel-btn-selected" au bouton cliqué
      items[i].classList.add("portfolio-item-inner-active");
      button.classList.add("carousel-btn-selected");
    });
  });

  let currentIndex = 0;
  const autoplayInterval = 1500; // Intervalle en millisecondes entre chaque transition
  let timer;

  // Fonction pour afficher le diapositive suivante
  const showNextSlide = () => {
    if (onPause){return}
    items[currentIndex].classList.remove("portfolio-item-inner-active");
    buttons[currentIndex].classList.remove("carousel-btn-selected");

    currentIndex = (currentIndex + 1) % items.length;

    items[currentIndex].classList.add("portfolio-item-inner-active");
    buttons[currentIndex].classList.add("carousel-btn-selected");
  };

  // Fonction pour démarrer le mode de lecture automatique
  const startAutoplay = () => {
    timer = setInterval(showNextSlide, autoplayInterval);
  };

  // Fonction pour arrêter le mode de lecture automatique
  const stopAutoplay = () => {
    clearInterval(timer);
  };

  // Associe les événements de souris pour arrêter et démarrer le mode de lecture automatique
  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);

  // Démarre le mode de lecture automatique au chargement de la page
  startAutoplay();
});

//bouton Next
function next() {
  const carousel = document.querySelector(".carousel");
  const items = carousel.querySelectorAll(".portfolio-item-inner");
  const buttons = carousel.querySelectorAll(".carousel-btn");

  // Recherche de l'index de l'image active actuelle
  let currentIndex = Array.from(items).findIndex(item => item.classList.contains("portfolio-item-inner-active"));

  // Supprime la classe "portfolio-item-inner-active" de l'image actuelle et du bouton correspondant
  items[currentIndex].classList.remove("portfolio-item-inner-active");
  buttons[currentIndex].classList.remove("carousel-btn-selected");

  // Calcule l'index de l'image suivante
  const nextIndex = (currentIndex + 1) % items.length;

  // Ajoute la classe "portfolio-item-inner-active" à l'image suivante et au bouton correspondant
  items[nextIndex].classList.add("portfolio-item-inner-active");
  buttons[nextIndex].classList.add("carousel-btn-selected");
}

//bouton previous
function previous() {
  const carousel = document.querySelector(".carousel");
  const items = carousel.querySelectorAll(".portfolio-item-inner");
  const buttons = carousel.querySelectorAll(".carousel-btn");

  // Recherche de l'index de l'image active actuelle
  let currentIndex = Array.from(items).findIndex(item => item.classList.contains("portfolio-item-inner-active"));

  // Supprime la classe "portfolio-item-inner-active" de l'image actuelle et du bouton correspondant
  items[currentIndex].classList.remove("portfolio-item-inner-active");
  buttons[currentIndex].classList.remove("carousel-btn-selected");

  // Calcule l'index de l'image précédente
  const previousIndex = (currentIndex - 1 + items.length) % items.length;

  // Ajoute la classe "portfolio-item-inner-active" à l'image précédente et au bouton correspondant
  items[previousIndex].classList.add("portfolio-item-inner-active");
  buttons[previousIndex].classList.add("carousel-btn-selected");
}

const carousel = document.querySelector('.carousel');
const playBtn = document.querySelector('.auto-btn');
let autoplayInterval;
let isPlaying = false;
let lastScroll = 0;
const firstItem = carousel.querySelector('.portfolio-item-inner');
const firstImgWidth = firstItem.offsetWidth;
lastScroll = lastScroll - firstImgWidth; // Définit la limite du dernier scroll pour recommencer l'autoplay

function toggleAutoplay() {
  if (onPause){
    onPause = false;
    playBtn.textContent = 'Pause';
  } else {
    onPause = true;
    playBtn.textContent = 'Play';
  }
  // if (isPlaying) {
  //   stopAutoplay();
  //   playBtn.textContent = 'Play';
  //   isPlaying = false;
  // } else {
  //   startAutoplay()
    // autoplayInterval = setInterval(() => {
    //   carousel.scrollLeft += firstImgWidth;

    //   if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth) {
    //     // La position du scroll a atteint la dernière image
    //     carousel.scrollLeft = 0;
    //   }
    // }, 2000);
  //   playBtn.textContent = 'Pause';
  //   isPlaying = true;
  // }
}

// playBtn.addEventListener('click', toggleAutoplay);


//Form

const regExEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const regExName = /^[A-Za-z\s]{1,20}$/
const regExPhone = /^(\+41|0)( ?( |-)?\d{2,3}){3,4}$/
const regExMessage = /^[a-zA-Z0-9\s]{1,200}$/;
const regExSubject = /^.{1,40}$/;




const inputEmail = document.getElementById('email')
const inputName = document.getElementById('name')
const inputSurname = document.getElementById('surename')
const inputPhone = document.getElementById('phone')
const inputSubject = document.getElementById('subject')
const inputMessage = document.getElementById('message')

inputName.addEventListener('blur', name)
inputSurname.addEventListener('blur', surename)
inputEmail.addEventListener('blur', email)
inputPhone.addEventListener('blur', phone)
inputSubject.addEventListener('blur', subject)
inputMessage.addEventListener('blur', message)



//fonction pour mettre une bordure verte sur l'input si les conditions sont remplis et rouge si c'est faux lorsqu'on sort de la case.
function email(){
    if(regExEmail.test(inputEmail.value)){
        inputEmail.style.border ='2px solid green'
    } else {
        inputEmail.style.border ='2px solid red'
    }
}

function name(){
    if(regExName.test(inputName.value)){
        inputName.style.border ='2px solid green'
    } else {
        inputName.style.border ='2px solid red'
    }
}


function surename (){
    if(regExName.test(inputSurname.value)){
        inputSurname.style.border ='2px solid green'
    } else {
        inputSurname.style.border ='2px solid red'
    }
}

function phone(){
    if(regExPhone.test(inputPhone.value)){
        inputPhone.style.border ='2px solid green'
    } else {
        inputPhone.style.border ='2px solid red'
    }
}

function subject(){
  if(regExSubject.test(inputSubject.value)){
      inputSubject.style.border ='2px solid green'
  } else {
      inputSubject.style.border ='2px solid red'
  }
}

function message(){
  if(regExMessage.test(inputMessage.value)){
      inputMessage.style.border ='2px solid green'
  } else {
      inputMessage.style.border ='2px solid red'
  }
}

function checkForm() {
    if (
        regExName.test(inputName.value) &&
        regExName.test(inputSurname.value) &&
        regExMessage.test(inputMessage.value) &&
        regExEmail.test(inputEmail.value) &&
        regExSubject.test(inputSubject.value)
    ) {
        alert('Merci pour votre message. Le formulaire a été rempli correctement.');
    } else {
        alert('Formulaire incorrect. Veuillez vérifier que tous les champs soient remplis.');
    }
}
