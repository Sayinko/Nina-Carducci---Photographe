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
  }
};

// Mettre à jour la galerie avec les éléments filtrés
const updateGallery = (filteredGallery) => {
  const galleryContainer = document.querySelector(".gallery");
  galleryContainer.innerHTML = ""; // Vider l'ancienne galerie

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
};

const app = async () => {
  gallery = await galleryImg();
  category = await categoryImg();

  if (gallery && category) {
    createGallery(gallery); // Crée la galerie initiale avec toutes les images
    buttonFilters(category); // Crée les boutons de filtre
  }
};

app();

// (function ($) {
//   $.fn.mauGallery = function (options) {
//     options = $.extend($.fn.mauGallery.defaults, options);
//     const tagsCollection = [];
//     return this.each(function () {
//       $.fn.mauGallery.methods.createRowWrapper($(this));
//       if (options.lightBox) {
//         $.fn.mauGallery.methods.createLightBox(
//           $(this),
//           options.lightboxId,
//           options.navigation
//         );
//       }
//       $.fn.mauGallery.listeners(options);

//       $(this)
//         .children(".gallery-item")
//         .each(function (index) {
//           $.fn.mauGallery.methods.responsiveImageItem($(this));
//           $.fn.mauGallery.methods.moveItemInRowWrapper($(this));
//           $.fn.mauGallery.methods.wrapItemInColumn($(this), options.columns);
//           const theTag = $(this).data("gallery-tag");
//           if (
//             options.showTags &&
//             theTag !== undefined &&
//             tagsCollection.indexOf(theTag) === -1
//           ) {
//             tagsCollection.push(theTag);
//           }
//         });

//       if (options.showTags) {
//         $.fn.mauGallery.methods.showItemTags(
//           $(this),
//           options.tagsPosition,
//           tagsCollection
//         );
//       }

//       $(this).fadeIn(500);
//     });
//   };
//   $.fn.mauGallery.defaults = {
//     columns: 3,
//     lightBox: true,
//     lightboxId: null,
//     showTags: true,
//     tagsPosition: "bottom",
//     navigation: true,
//   };
//   $.fn.mauGallery.listeners = function (options) {
//     $(".gallery-item").on("click", function () {
//       if (options.lightBox && $(this).prop("tagName") === "IMG") {
//         $.fn.mauGallery.methods.openLightBox($(this), options.lightboxId);
//       } else {
//         return;
//       }
//     });

//     $(".gallery").on("click", ".nav-link", $.fn.mauGallery.methods.filterByTag);
//     $(".gallery").on("click", ".mg-prev", () =>
//       $.fn.mauGallery.methods.prevImage(options.lightboxId)
//     );
//     $(".gallery").on("click", ".mg-next", () =>
//       $.fn.mauGallery.methods.nextImage(options.lightboxId)
//     );
//   };
//   $.fn.mauGallery.methods = {
//     createRowWrapper(element) {
//       if (!element.children().first().hasClass("row")) {
//         element.append('<div class="gallery-items-row row"></div>');
//       }
//     },
//     wrapItemInColumn(element, columns) {
//       if (columns.constructor === Number) {
//         element.wrap(
//           `<div class='item-column mb-4 col-${Math.ceil(12 / columns)}'></div>`
//         );
//       } else if (columns.constructor === Object) {
//         let columnClasses = "";
//         if (columns.xs) {
//           columnClasses += ` col-${Math.ceil(12 / columns.xs)}`;
//         }
//         if (columns.sm) {
//           columnClasses += ` col-sm-${Math.ceil(12 / columns.sm)}`;
//         }
//         if (columns.md) {
//           columnClasses += ` col-md-${Math.ceil(12 / columns.md)}`;
//         }
//         if (columns.lg) {
//           columnClasses += ` col-lg-${Math.ceil(12 / columns.lg)}`;
//         }
//         if (columns.xl) {
//           columnClasses += ` col-xl-${Math.ceil(12 / columns.xl)}`;
//         }
//         element.wrap(`<div class='item-column mb-4${columnClasses}'></div>`);
//       } else {
//         console.error(
//           `Columns should be defined as numbers or objects. ${typeof columns} is not supported.`
//         );
//       }
//     },
//     moveItemInRowWrapper(element) {
//       element.appendTo(".gallery-items-row");
//     },
//     responsiveImageItem(element) {
//       if (element.prop("tagName") === "IMG") {
//         element.addClass("img-fluid");
//       }
//     },
//     openLightBox(element, lightboxId) {
//       $(`#${lightboxId}`)
//         .find(".lightboxImage")
//         .attr("src", element.attr("src"));
//       $(`#${lightboxId}`).modal("toggle");
//     },
//     prevImage() {
//       let activeImage = null;
//       $("img.gallery-item").each(function () {
//         if ($(this).attr("src") === $(".lightboxImage").attr("src")) {
//           activeImage = $(this);
//         }
//       });
//       const activeTag = $(".tags-bar span.active-tag").data("images-toggle");
//       const imagesCollection = [];
//       if (activeTag === "all") {
//         $(".item-column").each(function () {
//           if ($(this).children("img").length) {
//             imagesCollection.push($(this).children("img"));
//           }
//         });
//       } else {
//         $(".item-column").each(function () {
//           if ($(this).children("img").data("gallery-tag") === activeTag) {
//             imagesCollection.push($(this).children("img"));
//           }
//         });
//       }
//       let index = 0;
//       let next = null;

//       $(imagesCollection).each(function (i) {
//         if ($(activeImage).attr("src") === $(this).attr("src")) {
//           index = i - 1;
//         }
//       });
//       next =
//         imagesCollection[index] ||
//         imagesCollection[imagesCollection.length - 1];
//       $(".lightboxImage").attr("src", $(next).attr("src"));
//     },
//     nextImage() {
//       let activeImage = null;
//       $("img.gallery-item").each(function () {
//         if ($(this).attr("src") === $(".lightboxImage").attr("src")) {
//           activeImage = $(this);
//         }
//       });
//       let activeTag = $(".tags-bar span.active-tag").data("images-toggle");
//       let imagesCollection = [];
//       if (activeTag === "all") {
//         $(".item-column").each(function () {
//           if ($(this).children("img").length) {
//             imagesCollection.push($(this).children("img"));
//           }
//         });
//       } else {
//         $(".item-column").each(function () {
//           if ($(this).children("img").data("gallery-tag") === activeTag) {
//             imagesCollection.push($(this).children("img"));
//           }
//         });
//       }
//       let index = 0,
//         next = null;

//       $(imagesCollection).each(function (i) {
//         if ($(activeImage).attr("src") === $(this).attr("src")) {
//           index = i + 1;
//         }
//       });
//       next = imagesCollection[index] || imagesCollection[0];
//       $(".lightboxImage").attr("src", $(next).attr("src"));
//     },
//     createLightBox(gallery, lightboxId, navigation) {
//       gallery.append(`<div class="modal fade" id="${
//         lightboxId ?? "galleryLightbox"
//       }" tabindex="-1" role="dialog" aria-hidden="true">
//                 <div class="modal-dialog" role="document">
//                     <div class="modal-content">
//                         <div class="modal-body">
//                             ${
//                               navigation
//                                 ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>'
//                                 : '<span style="display:none;" />'
//                             }
//                             <img class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clique"/>
//                             ${
//                               navigation
//                                 ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>'
//                                 : '<span style="display:none;" />'
//                             }
//                         </div>
//                     </div>
//                 </div>
//             </div>`);
//     },
//     showItemTags(gallery, position, tags) {
//       let tagItems =
//         '<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>';
//       $.each(tags, function (index, value) {
//         tagItems += `<li class="nav-item active">
//                 <span class="nav-link"  data-images-toggle="${value}">${value}</span></li>`;
//       });
//       const tagsRow = `<ul class="my-4 tags-bar nav nav-pills">${tagItems}</ul>`;

//       if (position === "bottom") {
//         gallery.append(tagsRow);
//       } else if (position === "top") {
//         gallery.prepend(tagsRow);
//       } else {
//         console.error(`Unknown tags position: ${position}`);
//       }
//     },
//     filterByTag() {
//       if ($(this).hasClass("active-tag")) {
//         return;
//       }
//       $(".active.active-tag").removeClass("active active-tag");
//       $(this).addClass("active-tag active");

//       const tag = $(this).data("images-toggle");

//       $(".gallery-item").each(function () {
//         $(this).parents(".item-column").hide();
//         if (tag === "all" || $(this).data("gallery-tag") === tag) {
//           $(this).parents(".item-column").show(300);
//         }
//       });
//     },
//   };
// })(jQuery);
