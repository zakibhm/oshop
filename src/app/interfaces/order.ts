import { Shipping } from "./shipping";
import { ShoppingCart } from "./shopping-cart";

export class Order {

    datePlaced: number;
    itemsProduct: any[] = [];
    shipping: Shipping;
    constructor(
      public userId:string, 
      shipping: Shipping, 
      shoppingCart: ShoppingCart) 
    {
        this.userId = userId;
        this.datePlaced = new Date().getTime();
        this.shipping = shipping;
        this.itemsProduct = shoppingCart?.items?.map(i => {
          return {
            product: {
              title: i.product.title,
              imageUrl: i.product.imageUrl,
              price: i.product.price
            },
            quantity: i.quantity,
            totalPrice: i.totalPrice
          };
        })
    }
}