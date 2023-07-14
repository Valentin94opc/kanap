import { AddToCart } from "./addToCart";

export const DATA = {
  PRODUCT: {
    id: "1",
    color: "red",
  },
};

export class Fixture {
  constructor(cartFixture) {
    this.cartFixture = cartFixture;
  }

  givenAnEmptyCart() {
    const { cart, storageGateway } = this.cartFixture.init().build();
    this.#defineDependencies({ cart, storageGateway });
  }

  givenACartWithAlreadyAddedItem() {
    const { cart, storageGateway } = this.cartFixture
      .init()
      .withProducts(DATA.PRODUCT)
      .build();

    this.#defineDependencies({ cart, storageGateway });
  }

  whenUserAddToCart(product) {
    this.addToCart.execute(product);
  }

  whenUserAddTheSameItemToCart() {
    this.whenUserAddToCart(DATA.PRODUCT);
  }

  thenTheProductQuantityShouldIncrease() {
    expect(this.cart.getState()).toStrictEqual({
      products: {
        [DATA.PRODUCT.id]: {
          ...DATA.PRODUCT,
          quantity: 2,
        },
      },
    });
  }

  thenTheProductShouldBeAddedToCart() {
    expect(this.storageGateway.getById(DATA.PRODUCT.id)).toStrictEqual({
      ...DATA.PRODUCT,
      quantity: 1,
    });

    expect(this.cart.getState()).toStrictEqual({
      products: {
        [DATA.PRODUCT.id]: { ...DATA.PRODUCT, quantity: 1 },
      },
    });
  }

  #defineDependencies({ cart, storageGateway }) {
    this.cart = cart;
    this.storageGateway = storageGateway;
    this.addToCart = new AddToCart({ cart, storageGateway });
  }
}
