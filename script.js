var promoArray = null;

function SetConstsAndListeners(){

  document.getElementById('category-filter').addEventListener("change", (event) => {
    UpdatePromoElements();
  });

  document.getElementById('location-filter').addEventListener("change", (event) => {
    UpdatePromoElements();
  });

  fetch("./sample.json")
              .then((res) => {
                  if (!res.ok) {
                      throw new Error
                          (`HTTP error! Status: ${res.status}`);
                  }
                  return res.json();
              })
              .then((data) => {
                    console.log(data);
                    promoArray = data.oferty;
              })
              .catch((error) => 
                     console.error("Unable to fetch data:", error));
  
  console.log("SetCalled");
}

function UpdatePromoElements(){
  console.log("UpdatePromoElCalled");
  
  removePromotions();
  var filteredPromoArray = promoArray;
  var categoryFilter = document.getElementById('category-filter').value;
  var locationFilter = document.getElementById('location-filter').value;
  
  if(categoryFilter != "all"){
    filteredPromoArray = filteredPromoArray.filter(item => (item.kategoria == categoryFilter));
  }
  if(locationFilter != "all"){
    filteredPromoArray = filteredPromoArray.filter(item => (item.sklep == locationFilter));
  }
  
  filteredPromoArray.forEach((item) => {
    addPromotion(item.kategoria,"smrt-tv.jpg",item.produkt,"opis produktu",item.cena,item.sklep);
  });
  
}


function addPromotion(category, imageSrc, productName, description, price, shopName) {
    // Create list item
    var li = document.createElement("li");
    li.className = category; // Set category as class name

    // Create promotion item container
    var promotionItem = document.createElement("div");
    promotionItem.className = "promotion-item";

    // Create image element
    var img = document.createElement("img");
    img.src = imageSrc;
    img.alt = productName;
    img.className = "product-image";

    // Create promotion details container
    var promotionDetails = document.createElement("div");
    promotionDetails.className = "promotion-details";

    // Create heading for product name
    var heading = document.createElement("h3");
    heading.textContent = productName;

    // Create paragraph for description
    var descParagraph = document.createElement("p");
    descParagraph.textContent = description;

    // Create paragraph for price
    var priceParagraph = document.createElement("p");
    priceParagraph.textContent = price;
    priceParagraph.classList.add("price"); // Add class for styling

    // Create paragraph for shop name
    var shopParagraph = document.createElement("p");
    shopParagraph.textContent = shopName;
    shopParagraph.classList.add("shop"); // Add class for styling

    // Append elements
    promotionDetails.appendChild(heading);
    promotionDetails.appendChild(descParagraph);
    promotionDetails.appendChild(priceParagraph);
    promotionDetails.appendChild(shopParagraph);

    promotionItem.appendChild(img);
    promotionItem.appendChild(promotionDetails);

    li.appendChild(promotionItem);

    // Append list item to promotions list
    document.querySelector(".promotions ul").appendChild(li);
}

function removePromotions() {
document.querySelector(".promotions ul").innerHTML = '';
}

function addNewPromotion() {
    // Get values from input fields or dropdowns (if any)
    var category = "inne"; // Example category
    var imageSrc = "smrt-tv.jpg"; // Example image source
    var productName = "New Product"; // Example product name
    var description = "Description of the new product"; // Example description
    var price = "$99.99"; // Example price
    var shopName = "lidl"; // Example shop name

    // Call addPromotion function with provided details
    addPromotion(category, imageSrc, productName, description, price, shopName);
}
