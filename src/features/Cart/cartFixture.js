import { InMemoryStorageGateway } from "../../gateways/StorageGateway/InMemoryStorageGateway";
import { AddToCart } from "./addToCart/addToCart";
import { Cart } from "./cart";

export class CartFixture {
  cart;
  storageGateway;
  addToCart;

  init() {
    this.cart = new Cart();
    this.storageGateway = new InMemoryStorageGateway();
    this.addToCart = new AddToCart({
      storageGateway: this.storageGateway,
      cart: this.cart,
    });
    return this;
  }

  withProducts(...products) {
    products.forEach((product) => {
      this.addToCart.execute(product);
    });
    return this;
  }

  build() {
    return {
      storageGateway: this.storageGateway,
      cart: this.cart,
    };
  }
}
