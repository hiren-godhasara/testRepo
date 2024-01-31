import BestSelling from "../component/bestSellingSection/BestSellingProducts";
import Header from "../component/headerSection/Header";
import HomePage from "../component/homePageSection/HomePage";
import products from '../data/CardData'
import cardStyles from '../component/card/Card.module.scss'
import Card from "../component/card/Card";

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

    </div>
  );
}
