import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

function createMarcup(arr){
  return arr.map(({id,webformatURL,largeImageURL,tags,likes,views,comments,downloads})=>
  // webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.

`<li class ="gallery-item">
<div class="photo-card">
<a class ="gallery__link" href = "${largeImageURL}">        
<img class = "gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" "/>
</a>        
<div class="info">
<p class="info-item">
<b>Likes<br>${likes}</br></b>
</p>
<p class="info-item">
<b>Views<br>${views}</br></b>
</p>
<p class="info-item">
<b>Comments<br>${comments}</br></b>
</p>
<p class="info-item">
<b>Downloads<br>${downloads}</br></b>
</p>
</div>
</div>
</li>
`).join("")
}
function handelClickGallery(event) {
  event.preventDefault()
console.log("gallery");
  // if (event.target === event.currentTarget) {
  //     return;
  // };
  const modalImg = event.target.closest(".gallery__link").getAttribute("href");
  console.log(modalImg)
 // gallery.refresh(); // gallery.refresh();
//  -----------------------------------------------------------
let gallery = new SimpleLightbox('.gallery-list a');
 gallery.refresh();
function gh(){
  console.log("gh");
  gallery.on('shown.simplelightbox', function () {
    // Do something…

    console.log("show");
     
      // `<img class="gallery__image" src="${modalImg}" alt="${tags}">
      //   `;
//       <a class ="gallery__link" href = "${largeImageURL}">        
// <img class = "gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
// </a>
    // const modalImg = event.target.closest(".gallery__link").getAttribute("href");
    // console.log(modalImg)     
  });
}
gh()
// -----------------------------------------------------------
    document.addEventListener("keydown", handelKeydown);
  document.removeEventListener("keydown", handelKeydown);

function handelKeydown(event) {

if (event.code === "Escape") {
  // console.log("close");
return gallery.close();
}
return console.log("no close");
};
};
  export {handelClickGallery,createMarcup}