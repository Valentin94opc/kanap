import { CartFixture } from "../cartFixture";
import { Fixture, DATA } from "./fixture";

describe("addToCart usecase", () => {
  let _ = new Fixture(new CartFixture());

  it("should add a item to cart given a empty cart", () => {
    _.givenAnEmptyCart();

    _.whenUserAddToCart(DATA.PRODUCT);

    _.thenTheProductShouldBeAddedToCart();
  });
  it("should add a quantity to a product given a cart with existing product and same color", () => {
    _.givenACartWithAlreadyAddedItem();

    _.whenUserAddTheSameItemToCart();

    _.thenTheProductQuantityShouldIncrease();
  });
});
