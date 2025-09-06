let bagItems;
onLoad();
function onLoad(){
  let bagItemString=localStorage.getItem('bagItmes');
  bagItems=bagItemString ? JSON.parse(bagItemString):[];
  displayItemsOnScreen();
  showBagCount();
}

function addToBag(itemID){
  bagItems.push(itemID);
  localStorage.setItem("bagItmes",JSON.stringify(bagItems));
  showBagCount();
}
function showBagCount(){
  let bagCountElement=document.querySelector(".bag-count");
  if(bagItems.length>0){
  bagCountElement.innerText=bagItems.length;
  bagCountElement.style.visibility='visible';
  }else{
    bagCountElement.style.visibility='hidden';
  }

}
function displayItemsOnScreen(){
let itemsContainerElement=document.querySelector(".items-container");
if(!itemsContainerElement){ return;}
let innerHtml='';
items.forEach(item=>{
  innerHtml +=`<div class="item-container">
  <img class="item-image" src="${item.item_image}" alt="item images">
    <div class="${item.rating.stars}">4.5 ⭐ | ${item.rating.review}k</div>
      <div class="company-name">${item.company_name}</div>
        <div class="item-name">${item.item_name}</div>
          <div class="price">
            <span class="current-price">RS ${item.current_price}</span>
            <span class="original-price">Rs ${item.orignal_price}
            <span class="discount">(${item.discountOnItem}% OFF)</span>
          </div>
      <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to bag</button>
            </div>`
});
itemsContainerElement.innerHTML=innerHtml;
}

