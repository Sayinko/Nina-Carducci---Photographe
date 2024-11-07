let gallery = [];
let category = [];
let currentIndex = 0;

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

  for (const element of categories) {
    const button = document.createElement("button");
    button.innerText = element.category;
    button.dataset.id = element.categoryId;
    button.classList.add("button-filters");

    containerDiv.appendChild(button);

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

    const filteredGallery = id === "0" ? gallery : gallery.filter((element) => element.tag === id);
    updateGallery(filteredGallery);
  });
};

const createGallery = (galleryItems) => {
  const galleryContainer = document.querySelector(".gallery");
  galleryContainer.innerHTML = "";

  galleryItems.forEach((element, index) => {
    const images = document.createElement("img");
    const article = document.createElement("article");

    article.classList.add("containerImg");
    images.src = element.image;
    images.alt = element.alt;
    images.dataset.tag = element.tag;

    galleryContainer.appendChild(article);
    article.appendChild(images);

    article.addEventListener("click", () => {
      currentIndex = index;
      createModale(galleryItems, element.image, element.alt);
    });
  });
};

const updateGallery = (filteredGallery) => {
  const galleryContainer = document.querySelector(".gallery");
  galleryContainer.classList.add("gallery-hidden");
  galleryContainer.classList.remove("gallery-transition");

  setTimeout(() => {
    galleryContainer.innerHTML = "";

    filteredGallery.forEach((element, index) => {
      const images = document.createElement("img");
      const article = document.createElement("article");

      article.classList.add("containerImg");
      images.src = element.image;
      images.alt = element.alt;
      images.dataset.tag = element.tag;

      galleryContainer.appendChild(article);
      article.appendChild(images);

      article.addEventListener("click", () => {
        currentIndex = index;
        createModale(filteredGallery, element.image, element.alt);
      });
    });

    requestAnimationFrame(() => {
      galleryContainer.classList.remove("gallery-hidden");
      galleryContainer.classList.add("gallery-transition");
    });
  }, 10);
};

const createModale = (galleryItems, imgSrc, imgAlt) => {
  const modale = document.querySelector(".modale");
  modale.innerHTML = "";
  const contentModale = `
    <div class="background-modale"></div>
    <div class="box-modale">
      <div class="container-arrow">
        <div class="arrow-left"><</div>
        <div class="arrow-right">></div>
        <div class="container-img">
          <img class="img-modale" src="${imgSrc}" alt="${imgAlt}">
        </div>
      </div>
    </div>`;

  modale.insertAdjacentHTML("afterbegin", contentModale);
  modale.style.overflow = "visible";
  modale.style.display = "flex";

  const backgroundModale = document.querySelector(".background-modale");
  backgroundModale.addEventListener("click", () => {
    modale.style.display = "none";
  });

  arrowLeftListener(galleryItems);
  arrowRightListener(galleryItems);
};

const arrowLeftListener = (galleryItems) => {
  const arrowLeft = document.querySelector(".arrow-left");
  arrowLeft.addEventListener("click", () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryItems.length - 1;
    updateModaleImg(galleryItems[currentIndex]);
  });
};

const arrowRightListener = (galleryItems) => {
  const arrowRight = document.querySelector(".arrow-right");
  arrowRight.addEventListener("click", () => {
    currentIndex = (currentIndex < galleryItems.length - 1) ? currentIndex + 1 : 0;
    updateModaleImg(galleryItems[currentIndex]);
  });
};

const updateModaleImg = (element) => {
  const modaleImg = document.querySelector(".img-modale");
  modaleImg.src = element.image;
  modaleImg.alt = element.alt;
};

const app = async () => {
  gallery = await galleryImg();
  category = await categoryImg();

  if (gallery && category) {
    createGallery(gallery);
    buttonFilters(category);
  }
};

app();