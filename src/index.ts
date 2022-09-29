import "./utilities.css";
import "./style.css";

interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  name: string;
  price: number;
  rating: number;
}

const listMap = document.querySelector(".list-map");
const onClickList = document.querySelector(".header-icon-list");
const closeListMap = document.querySelector(".list-map-close");

const activeClassMap = "is-show";

onClickList.addEventListener("click", () => {
  listMap.classList.add(activeClassMap);
});
closeListMap.addEventListener("click", () => {
  listMap.classList.remove(activeClassMap);
});

const getTemplateProduct = (product: Product) => {
  return `<a href='detail.html#${product.id}' class='link_item'>
            <div class="product_item-img" id="${product.id}">
              <img src=${product.image} alt="abc" />
            </div>
            <h3>
              ${product.name}
            </h3>
            <h1>${product.price}</h1>
            <span class="product_description">${product.description}</span>
            <div class="product_item-evaluate">
            <div class="product_item-vote">
              <div class="product_item-rating">
                <img src="./image/star.svg" alt="" srcset="" />
                <img src="./image/star.svg" alt="" srcset="" />
                <img src="./image/star.svg" alt="" srcset="" />
                <img src="./image/star.svg" alt="" srcset="" />
                <img
                  class="star"
                  src="./image/star1.svg"
                  alt=""
                  srcset=""
                />
              </div>
              <span>${product.rating}</span>
            </div>
            <div class="product_item-watch btn btn-blue">
              <img src="./image/heart.svg" alt="" />
              <span>Watch</span>
            </div>
            </div>
      </a>`;
};

const getProducts = async (search = "/Product") => {
  const URL = "https://utc2ranking.azurewebsites.net/api";
  const response = await fetch(`${URL}${search}`);
  const data: Product[] = await response.json();

  console.log(data);

  const containerProducts = document.querySelector(".container_products");

  if (containerProducts) {
    containerProducts.innerHTML = "";
    data.forEach((item: any) => {
      const newDiv = document.createElement("div");
      const element = getTemplateProduct(item);
      newDiv.classList.add("product_item");
      newDiv.innerHTML = element;

      containerProducts.appendChild(newDiv);
    });
  }
};

const registerEvents = (
  element: string,
  event: string,
  callback: EventListenerOrEventListenerObject
) => {
  const elementDOM = document.querySelector(element);

  elementDOM.addEventListener(event, callback);
};

function changeProductList(type: string, element: HTMLElement) {
  const tabs: NodeListOf<HTMLElement> = document.querySelectorAll(".tab");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].style.backgroundColor = "#fff";
  }
  element.style.backgroundColor = "#ebf2ff";

  getProducts(`/Product/Category?category=${type}`);
}

window.onload = () => {
  getProducts();
  registerEvents(".navbar_input input", "input", (e: any) => {
    let search = e.target.value.trim().toLowerCase();
    getProducts(`/Product/Search?keysearch=${search}`);
  });

  const elements = document.querySelectorAll(".right_top-show-item > a");
  for (let i = 0; i <= 2; i++) {
    switch (i) {
      case 0:
        elements[i].addEventListener("click", (e: any) => {
          changeProductList("", e.target.closest(".tab"));
        });
        break;
      case 1: {
        console.log(i);
        elements[i].addEventListener("click", (e: any) => {
          changeProductList("Vintage", e.target.closest(".tab"));
        });
        break;
      }
      case 2: {
        elements[i].addEventListener("click", (e: any) => {
          changeProductList("Premium", e.target.closest(".tab"));
        });
        break;
      }
      default:
        break;
    }
  }
};
