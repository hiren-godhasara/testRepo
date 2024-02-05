import React from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from '../allProductsSlider/AllProductsDescription.module.scss';

interface Product {
    id: number;
    name: string;
    description: string;
    image: StaticImageData;
}

interface ProductDetailProps {
    product: Product;
}

const Detail: React.FC<ProductDetailProps> = ({ product }) => {
    const { name, description } = product;
    const imageWidth = 465;
    const imageHeight = 362;

    return (
        <div className={styles.product}>
            <div className={styles.productContainer}>
                <div className={styles.backgroundLayer}></div>
                <div className={styles.imageContainer}>
                    <Image src={product.image} alt={`${name} Image`} width={imageWidth} height={imageHeight} />
                </div>
                <div className={styles.detailsContainer}>
                    <div className={styles.details}>
                        <h2 className={styles.h2}>{name}</h2>
                        <p className={styles.description}>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
