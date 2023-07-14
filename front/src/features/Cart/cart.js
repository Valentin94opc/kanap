export class Cart {
  #products = {};

  add(product) {
    if (this.isProductExist(product.id)) {
      this.increaseQuantity(product.id);
      return;
    }

    this.#products = {
      ...this.#products,
      [product.id]: {
        ...product,
        quantity: 1,
      },
    };
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

  remove(productId) {
    this.#products = Object.keys(this.#products).reduce((curr, id) => {
      if (id !== productId) {
        curr[id] = this.#products[id];
      }

      return curr;
    }, {});
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
