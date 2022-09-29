const id = window.location.hash.slice(1);

const callApiFunction = (link) => {
  fetch(link)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      var productDetall: any = document.querySelector(".detail__container");
      productDetall.innerHTML = "";
      var newProduct = document.createElement("div");
      newProduct.classList.add("detail_item");
      newProduct.innerHTML = `<div class="detail__main-first">
        <div class="detail__main-img">
            <img src="${data.image}" alt="">
        </div>
    </div>
    <div class="detail__main-left">
    <h2 class="detail__main-left-title">
        ${data.name}
    </h2>
    <div class="detail__main-star">
        <div class="detail__main-star-first">
        </div>
        <div class="detail__main-star-review">
            ${data.rating}
        </div>
        </div>
        <div class="detail__main-price">
        ${data.price}
      </div>
      <span class="detail__main-desc">
        ${data.description}
      </span>
      <div class="detail__main-category">
          Category: <p>${data.category}</p>
      </div>

      <div class="detail__main-share">
        Shares:
        <i class="fab fa-twitter-square"></i>
        <i class="fab fa-facebook-square"></i>
        <i class="fab fa-github"></i>
      </div>`;
      productDetall.appendChild(newProduct);
    });
};

var detail = callApiFunction(
  `https://utc2ranking.azurewebsites.net/api/Product/GetById?id=${id}`
);
