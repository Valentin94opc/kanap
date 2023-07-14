import { CartFixture } from "../cartFixture";
import { Fixture, DATA } from "./fixture";

describe("remove from cart usecase", () => {
  const _ = new Fixture(new CartFixture());
  it("should remove the product from cart given a valid product id", () => {
    _.givenACartWithAlreadyAddedItem();

    _.whenUserRemoveTheProductFromCart(DATA.FIRST_ITEM.id);

    _.thenTheProductShouldBeRemoved();
  });
});
