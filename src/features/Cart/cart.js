export class Cart {
  #products = {};

  add(product) {
    if (this.isProductExist(product.id)) {
      this.increaseQuantity(product.id);
      return;
    }

    this.#products = { ...this.#products, [product.id]: product };
  }

  increaseQuantity(productId) {
    this.#products = {
      ...this.#products,
      [productId]: {
        ...this.#products[productId],
        quantity: (this.#products[productId].quantity += 1),
      },
    };
  }

  isProductExist(productId) {
    return Object.keys(this.#products).some((product) => product === productId);
  }

  getState() {
    return {
      products: this.#products,
    };
  }
}
