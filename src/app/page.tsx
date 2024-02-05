import BestSelling from "../component/bestSellingSection/BestSellingProducts";
import Header from "../component/headerSection/Header";
import HomePage from "../component/homePageSection/HomePage";
import products from '../data/CardData'
import cardStyles from '../component/card/Card.module.scss'
import Card from "../component/card/Card";
import AllProductSlider from "../component/allProductsSlider/AllProductsSlider";
import Storing from "../component/storeDetails/StoreDetails";
import Info from "../component/outletInfo/OutletInfo";
import ReviewSlider from "@/component/customerReviews/CustomerReviews";
import GiftCombo from "@/component/giftCombos/GiftCombo";

export default function Home() {
  return (
    <div>
      <div id='header'><Header /></div>
      <HomePage />
      <div id='products'><BestSelling /></div>

      <div className={cardStyles.cardConatiner}>
        {products.map((products) => (
          <Card
            key={products.id}
            image={products.image}
            name={products.name}
            grade={products.grade}
            displayname={products.displayname}
          />
        ))}
      </div>

      <AllProductSlider />
      <div id='about'><Info /></div>

      <div id='store'>
        <Storing />
      </div>

      <div id='reviews'><ReviewSlider /></div>
      <div id='gifting'> <GiftCombo /></div>



    </div>
  );
}
