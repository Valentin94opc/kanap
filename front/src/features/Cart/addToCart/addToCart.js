export class AddToCart {
  constructor({ cart, storageGateway }) {
    this.cart = cart;
    this.storageGateway = storageGateway;
  }

  async execute(item) {
    this.cart.add(item);
    this.#addToStorage();
  }

  #addToStorage() {
    const cartProducts = this.cart.getState().products;

    Object.keys(cartProducts).forEach((productId) => {
      this.storageGateway.save(productId, cartProducts[productId]);
    });
  }
}
