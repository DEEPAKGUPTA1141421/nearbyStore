import React from "react";

const HomeMain = () => {
  const handleShopNow = () => {};
  return (
    <div>
      <div className="pageImage">
        <h1>
          Best Collection For Home Decoration and Grocery ,Cloths ,Accessories
        </h1>
        <p>
          Empowering Small Businesses: By supporting independent sellers and
          local artisans, we contribute to the growth and sustainability of
          small businesses worldwide.
        </p>
        <p>
          Curated Collections: Discover curated collections curated by experts
          and influencers, showcasing the latest trends and must-have products.
        </p>
        <p>
          Social Impact: We are committed to making a positive social impact by
          promoting ethical and sustainable practices among our sellers and
          partners.
        </p>
        <p>
          Exclusive Deals and Discounts: Enjoy exclusive deals, discounts, and
          promotions available only to our loyal customers, making your shopping
          experience even more rewarding.
        </p>
        <h1>
          <button onClick={handleShopNow}>Shop Now</button>
        </h1>
      </div>
    </div>
  );
};

export default HomeMain;
