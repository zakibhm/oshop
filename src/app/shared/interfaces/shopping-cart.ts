import { Product } from "./product";
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {

  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      // we can use Object.assign() to copy all the properties of item to x
      // Object.assign(x, item);
      this.items.push(new ShoppingCartItem(item.product, item.quantity));
    }
  }

  get productIds(): string[] {
    return Object.keys(this.items);
  }

  get totalItemsCount() {
    let count = 0;
    for (let item of this.items) {
      count += item.quantity;
    }
    return count;
  }
  get totalPrice() {
    let sum = 0;
    for (let item of this.items) {
      sum += item.totalPrice;
    }
    return sum;
  }
  getQuantity(product: Product) {
    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

}