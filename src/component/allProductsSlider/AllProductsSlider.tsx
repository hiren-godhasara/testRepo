import React from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './AllProductsSlider.module.scss'
import vector from '../../imageFolder/Vector.png'
import vector1 from '../../imageFolder/vector1.png'
import infoProductsData from '../../data/allProductsSliderData';
import { Carousel } from 'antd';
import Detail from '../../component/allProductsSlider/AllProductsDescription';



const AllProductSlider: React.FC = () => {


    return (

        <div className={styles.main}>

            <Image src={vector} alt={` Image`} width={175} height={250} className={styles.vector} />
            <Image src={vector1} alt={` Image`} width={155} height={220} className={styles.vector1} />

            <div className={styles.productSliderWrapper}>
                <Carousel slidesToShow={1} autoplay autoplaySpeed={4500} speed={2000} className='productCarousel'>
                    {infoProductsData.map((product) => (
                        <div key={product.id}>
                            <Detail product={product} />
                        </div>
                    ))}
                </Carousel>
            </div>

        </div>
    );
};

export default AllProductSlider;
