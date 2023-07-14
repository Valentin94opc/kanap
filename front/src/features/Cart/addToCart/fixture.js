import { AddToCart } from "./addToCart";

export const DATA = {
  ITEM: {
    id: "1",
    quantity: 1,
    color: "red",
    price: 10,
  },
};

export class Fixture {
  constructor(cartFixture) {
    this.cartFixture = cartFixture;
  }

  #initUsecase({ cart, storageGateway }) {
    this.addToCart = new AddToCart({ cart, storageGateway });
  }

  givenAnEmptyCart() {
    const { cart, storageGateway } = this.cartFixture.init().build();
    this.cart = cart;
    this.storageGateway = storageGateway;
    this.#initUsecase({ cart, storageGateway });
  }

  givenACartWithAlreadyAddedItem() {
    const { cart, storageGateway } = this.cartFixture
      .init()
      .withProducts(DATA.ITEM)
      .build();

    this.#initUsecase({ cart, storageGateway });
  }

  whenUserAddToCart(product) {
    this.addToCart.execute(product);
  }

  whenUserAddTheSameItemToCart() {
    this.whenUserAddToCart(DATA.ITEM);
  }

  thenTheProductQuantityShouldIncrease() {
    expect(this.cart.getState()).toStrictEqual({
      products: {
        [DATA.ITEM.id]: {
          ...DATA.ITEM,
          quantity: 2,
        },
      },
    });
  }

  thenTheProductShouldBeAddedToCart() {
    expect(this.storageGateway.getById(DATA.ITEM.id)).toStrictEqual(DATA.ITEM);

    expect(this.cart.getState()).toStrictEqual({
      products: {
        [DATA.ITEM.id]: DATA.ITEM,
      },
    });
  }
}
