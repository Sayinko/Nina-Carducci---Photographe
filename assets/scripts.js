let gallery = [];
let category = [];

const galleryImg = async () => {
  const response = await fetch("./assets/galleryImg.json");
  return await response.json();
};

const categoryImg = async () => {
  const response = await fetch("./assets/tagsImg.json");
  return await response.json();
};

const buttonFilters = (categories) => {
  const containerGallery = document.querySelector(".py-3");
  const containerDiv = document.createElement("div");

  containerDiv.classList.add("container-button");

  // Créer les boutons de filtre
  for (const element of categories) {
    const button = document.createElement("button");
    button.innerText = element.category;
    button.dataset.id = element.categoryId;
    button.classList.add("button-filters");

    containerDiv.appendChild(button);

    // Appliquer les listeners de filtres
    buttonListeners(button);
  }

  containerGallery.appendChild(containerDiv);
};

const buttonListeners = (button) => {
  button.addEventListener("click", (event) => {
    const id = event.target.dataset.id;
    const buttons = document.querySelectorAll(".button-filters");
    buttons.forEach((button) => {
      button.classList.remove("button-filters-active");
    });
    button.classList.add("button-filters-active");
    // Filtrer la galerie en fonction de l'ID du bouton
    const filteredGallery =
      id === "0"
        ? gallery // Si ID = 0, afficher toutes les images
        : gallery.filter((element) => element.tag === id);

    // Mettre à jour la galerie affichée
    updateGallery(filteredGallery);
  });
};

const createGallery = (galleryItems) => {
  const galleryContainer = document.querySelector(".gallery");

  // Vider la galerie existante
  galleryContainer.innerHTML = "";

  // Ajouter les images de la galerie
  for (const element of galleryItems) {
    const images = document.createElement("img");
    const article = document.createElement("article");

    article.classList.add("containerImg");

    images.src = element.image;
    images.alt = element.alt;
    images.dataset.tag = element.tag;

    galleryContainer.appendChild(article);
    article.appendChild(images);

    article.addEventListener("click", () => { createModale(gallery, element.image, element.alt) });
  }
};

// Mettre à jour la galerie avec les éléments filtrés
const updateGallery = (filteredGallery) => {
  const galleryContainer = document.querySelector(".gallery");

  // Masquer la galerie en appliquant `.gallery-hidden`
  galleryContainer.classList.add("gallery-hidden");
  galleryContainer.classList.remove("gallery-transition");

  // Vider le contenu de la galerie et ajouter les nouvelles images
  setTimeout(() => {
    galleryContainer.innerHTML = "";

    filteredGallery.forEach((element) => {
      const images = document.createElement("img");
      const article = document.createElement("article");

      article.classList.add("containerImg");

      images.src = element.image;
      images.alt = element.alt;
      images.dataset.tag = element.tag;

      galleryContainer.appendChild(article);
      article.appendChild(images);
    });

    // Forcer le navigateur à appliquer le changement de style immédiatement
    requestAnimationFrame(() => {
      // Appliquer `.gallery-transition` pour faire réapparaître la galerie
      galleryContainer.classList.remove("gallery-hidden");
      galleryContainer.classList.add("gallery-transition");
    });
  }, 10); // Délai minimal pour permettre le rendu
};

const createModale = (filteredGallery, imgSrc, imgAlt) => {
 const modale = document.querySelector(".modale");
 modale.innerHTML = "";
 const contentModale = `
 <div class="background-modale">
    <div class="box-modale">
      <div class="container-arrow">
        <div class="arrow-left"><</div>
        <div class="arrow-right">></div>
          <div class="container-img">
              <img class="img-modale" src="${imgSrc}" alt="${imgAlt}">
          </div>
      </div>
    </div>
 </div>`

 modale.insertAdjacentHTML("afterbegin", contentModale);

 modale.style.overflow = "visible";
 modale.style.display = "flex";

 const backgroundModale = document.querySelector(".background-modale");
 backgroundModale.addEventListener("click", (e) => {
    e.preventDefault();
    modale.style.display = "none";
 });

  arrowLeftListener(filteredGallery)
}

const arrowLeftListener = (filteredGallery) => {
 const arrowLeft = document.querySelector(".arrow-left");
 arrowLeft.addEventListener("click", (e) => {
    e.preventDefault();
    for (const element of filteredGallery) {
      console.log("ca marche")
 }})
}

const app = async () => {
  gallery = await galleryImg();
  category = await categoryImg();

  if (gallery && category) {
    createGallery(gallery); // Crée la galerie initiale avec toutes les images
    buttonFilters(category); // Crée les boutons de filtre
  }
};

app();


// Lors du clique sur un des éléments de la galerie (containerImg) > afficher une lightbox
// Ajout d'un listener sur les images de la galerie
// Ouverture de la lightbox (balise dialog, ou conception complete de lighbox avec div..)
// Navigation dans la lightbox (boutons précédent/suivant)
// Fermeture de la lightbox (croix)