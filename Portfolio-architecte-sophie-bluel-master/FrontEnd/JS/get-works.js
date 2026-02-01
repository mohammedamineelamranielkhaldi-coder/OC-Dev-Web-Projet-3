export function afficherWorks(categoryId = null) {
  fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(data => {
      if( categoryId != null ) {
         data = data.filter(work => work.categoryId === categoryId ) ;
      }
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = "";

      data.forEach(work => {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;

        const caption = document.createElement("figcaption");
        caption.textContent = work.title;

        figure.appendChild(img);
        figure.appendChild(caption);
        gallery.appendChild(figure);
      });
    });
}