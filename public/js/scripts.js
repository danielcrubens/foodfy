/* $(document).ready(function () {
  $("#toggle").click(function () {
    $(this).toggleClass("active");
    $("#overlay").toggleClass("open");
  });
}); */
// ano automatico
const ano = document.querySelector("#ano");
const anoAtual = new Date();
/* ano.innerHTML = anoAtual.getFullYear(); */

const currentPage = location.pathname;
const menuItens = document.querySelectorAll("header .links a");

// Active menu
for (let item of menuItens) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");
  }
}

// Redirect to recipe/chef //
function redirectTo(collection) {
  for (let item of collection) {
    item.addEventListener("click", function () {
      const id = item.dataset.id;
      if (collection == recipes) {
        window.location.href = `/recipes/${id}`;
      } else {
        window.location.href = `/chefs/${id}`;
      }
    });
  }
}

const recipes = document.querySelectorAll(".recipe-container .recipe");
const chefs = document.querySelectorAll(".chef-container .chef");

redirectTo(recipes);
redirectTo(chefs);

// Hide recipe content //
const recipeWrapers = document.querySelectorAll(".recipe-hide");

for (let wraper of recipeWrapers) {
  const hide = wraper.querySelector(".hide");

  hide.addEventListener("click", function () {
    wraper.querySelector(".content").classList.toggle("hidden");
    if (hide.innerHTML == "ESCONDER") {
      hide.innerHTML = "MOSTRAR";
    } else {
      hide.innerHTML = "ESCONDER";
    }
  });
}

// Confirm recipe/chef deletion //
function confirmDelete(formDelete) {
  formDelete.addEventListener("submit", function (event) {
    // Confirm chef has recipes //
    const totalRecipes = document.querySelector(".total-recipes");
    if (totalRecipes) {
      const total = +totalRecipes.dataset.total;
      if (total) {
        event.preventDefault();
        alert("Não é possivel deletar chefs que possuem receitas!");
      } else {
        const confirmation = confirm("Deseja Deletar?");
        if (!confirmation) {
          event.preventDefault();
        }
      }
      // Confirm recipe deletion //
    } else {
      const confirmation = confirm("Deseja Deletar?");
      if (!confirmation) {
        event.preventDefault();
      }
    }
  });
}

const formDelete = document.querySelector("#form-delete");

if (formDelete) {
  confirmDelete(formDelete);
}

/* LÓGICA LIMITE MAXIMO DE ENVIO DE FOTOS */
const PhotosUpload = {
  input: '',
  preview: document.querySelector('#photos-preview'),
  uploadLimit: 6,
  files: [],
  handleFileInput(event) {
      const { files: fileList } = event.target;
      PhotosUpload.input = event.target;

      if (PhotosUpload.hasLimit(event)) return;

      Array.from(fileList).forEach(file => {
          PhotosUpload.files.push(file);
          const reader = new FileReader();

          reader.onload = () => {
              const image = new Image();
              image.src = String(reader.result);

              const div = PhotosUpload.getContainer(image);
              PhotosUpload.preview.appendChild(div);
          };

          reader.readAsDataURL(file);
      });

      PhotosUpload.input.files = PhotosUpload.getAllFiles();
  },
  hasLimit(event) {
      const { uploadLimit, input, preview } = PhotosUpload;
      const { files: fileList } = input;

      if (fileList.length > uploadLimit) {
          alert(`Envie no máximo ${uploadLimit} fotos.`);
          event.preventDefault();

          return true;
      }

      const photosDiv = [];
      preview.childNodes.forEach(item => {
          if (item.classList && item.classList.value == 'photo')
              photosDiv.push(item);
      });

      const totalPhotos = fileList.length + photosDiv.length;
      if (totalPhotos > uploadLimit) {
          alert(`Você atingiu o limite máximo de ${uploadLimit} fotos.`);
          event.preventDefault();
          return true;
      }

      return false;
  },
  getAllFiles() {
      const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();
      PhotosUpload.files.forEach(file => dataTransfer.items.add(file));

      return dataTransfer.files;
  },
  getContainer(image) {
      const div = document.createElement('div');
      div.classList.add('photo');
      div.onclick = PhotosUpload.removePhoto;
      div.appendChild(image);
      div.appendChild(PhotosUpload.getRemoveButton());

      return div;
  },
  getRemoveButton() {
      const button = document.createElement('i');
      button.classList.add('material-icons');
      button.innerHTML = 'close';

      return button;
  },
  removePhoto(event) {
      const photoDiv = event.target.parentNode; // <div class="photo">
      const photosArray = Array.from(PhotosUpload.preview.children);
      const index = photosArray.indexOf(photoDiv);

      PhotosUpload.files.splice(index, 1);
      PhotosUpload.input.files = PhotosUpload.getAllFiles();

      photoDiv.remove();
  },
  removeOldPhoto(event) {
      const photoDiv = event.target.parentNode
      if (photoDiv.id) {
          const removedFiles = document.querySelector('input[name="removed_files"]');
          if (removedFiles) {
              removedFiles.value += `${photoDiv.id},`
          }
      }
      photoDiv.remove();
  }
};


/* FUNCIONALIDADE DA GALERIA DE IMAGENS */
const ImageGallery ={
  highlight: document.querySelector('.gallery .highlight > img'),
  previews: document.querySelectorAll('gallery-preview img'),
  setImage(e){
      const {target}= e
      ImageGallery.previews.forEach(preview => preview.classList.remove('active'))
      target.classList.add('active')
      ImageGallery.highlight.src = target.src
      Lightbox.image.src = target.src
  }
}
/* ABRI E FECHAR LIGHTBOX */
const Lightbox = {
  target: document.querySelector('.lightbox-target'),
  image: document.querySelector('.lightbox-target img'),
  closeButton: document.querySelector('.lightbox-target a.lightbox-close'),
  open() {
    Lightbox.target.style.opacity = 1;
    Lightbox.target.style.top = 0;
    Lightbox.target.style.bottom = 0;
    Lightbox.closeButton.style.top = 0;
  },
  close() {
    Lightbox.target.style.opacity = 0;
    Lightbox.target.style.top = '-100%';
    Lightbox.target.style.bottom = 'initial';
    Lightbox.closeButton.style.top = '-80px';
  }
};