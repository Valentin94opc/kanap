import { RemoveFromCart } from "./removeFromCart";

export const DATA = {
  FIRST_ITEM: {
    id: "1",
    color: "red",
  },
  SECOND_ITEM: {
    id: "2",
    color: "blue",
  },
};

export class Fixture {
  constructor(cartFixture) {
    this.cartFixture = cartFixture;
  }

  givenACartWithAlreadyAddedItem() {
    const { cart, storageGateway } = this.cartFixture
      .init()
      .withProducts(DATA.FIRST_ITEM, DATA.SECOND_ITEM)
      .build();

    this.#defineDependencies({ cart, storageGateway });
  }

  whenUserRemoveTheProductFromCart(productId) {
    this.removeFromCart.execute(productId);
  }

  thenTheProductShouldBeRemoved() {
    expect(this.storageGateway.getById(DATA.FIRST_ITEM.id)).toStrictEqual(
      undefined
    );
    expect(this.cart.getState()).toStrictEqual({
      products: {
        [DATA.SECOND_ITEM.id]: {
          ...DATA.SECOND_ITEM,
          quantity: 1,
        },
      },
    });
  }

  #defineDependencies({ cart, storageGateway }) {
    this.cart = cart;
    this.storageGateway = storageGateway;
    this.removeFromCart = new RemoveFromCart({ cart, storageGateway });
  }
}
