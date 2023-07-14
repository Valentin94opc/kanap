export class RemoveFromCart {
  constructor({ cart, storageGateway }) {
    this.cart = cart;
    this.storageGateway = storageGateway;
  }

  execute(productId) {
    this.cart.remove(productId);
    this.storageGateway.remove(productId);
  }
}
