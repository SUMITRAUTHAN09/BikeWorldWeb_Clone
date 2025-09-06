const CONVENENCE_FEE=99;
let bagItemObjects;

onload();
function onload(){
  loadBagItemsObjects();
  displayBagItems();
  displayBagSummary();
}

function loadBagItemsObjects(){
  console.log(bagItems);
  bagItemObjects=bagItems.map(itemID=>{
    for(let i=0;i<items.length;i++){
      if(itemID==items[i].id){
        return items[i];
      }
    }
    return null;
  });
  console.log(bagItemObjects);
}

function displayBagItems(){
  let containerElement=document.querySelector(".bag-items-container");
  let innerHTML='';
  bagItemObjects.forEach(bagItem=>{
      if(bagItem) {innerHTML+=generateItemHTML(bagItem);}
  });
  containerElement.innerHTML=innerHTML;
}

function removeFromBag(itemId) {
  bagItems=bagItems.filter(bagItemId=>bagItemId!= itemId);
  localStorage.setItem("bagItmes",JSON.stringify(bagItems));
  loadBagItemsObjects();
  showBagCount();
  displayBagItems();
  displayBagSummary();
}


function generateItemHTML(item) {
  return `
    <div class="bag-item-container">
      <div class="item-left-part">
        <img class="bag-item-img" src="../${item.item_image}">
      </div>
      <div class="item-right-part">
        <div class="company">${item.company_name}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price-container">
          <span class="current-price">Rs ${item.current_price}</span>
          <span class="original-price">Rs ${item.orignal_price}</span>
          <span class="discount-percentage">(${item.discountOnItem}% OFF)</span>
        </div>
        <div class="delivery-details">
          Delivery by
          <span class="delivery-details-days">${new Date()}</span>
        </div>
      </div>
      <div class="remove-from-cart" onclick="removeFromBag('${item.id}')">X</div>
    </div>`;
}

function displayBagSummary(){
  let bagSummaryElement=document.querySelector(".bag-summary");
  let totalItem=bagItemObjects.length;;
  let totalMRP=0;
  let totalDiscount=0;

  bagItemObjects.forEach(Items=>{
    totalMRP+=Items.orignal_price;
    totalDiscount+=Items.orignal_price - Items. current_price;
  })
  let finalAmout=totalMRP - totalDiscount + CONVENENCE_FEE;

  bagSummaryElement.innerHTML=`
  <div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">Rs ${totalMRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-Rs ${totalDiscount}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">Rs 99</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">Rs ${finalAmout}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>`

}