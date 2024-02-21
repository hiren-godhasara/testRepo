import { useState, useEffect, Key } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './Card.module.scss';
import { useRouter } from 'next/navigation';
import { Carousel } from 'antd';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Cookies from 'js-cookie';
import { getToken } from '@/getLocalStroageToken';
import i from '../../imageFolder/SAVE_20240209_093303 (1).jpg'
import i1 from '../../imageFolder/SAVE_20240209_093303 (2).jpg'

interface Product {
    mrp: any;
    _id: any;
    imageUrl: any | string | StaticImageData;
    name: string;
    grade: string;
    displayName: string;
    price: number
    discount: any
    prod: any
}

const Card: React.FC = () => {
    const token = getToken()
    const router = useRouter();
    const imageWidth = 300;
    const imageHeight = 200;
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch(`${process.env.BASE_URL}/s/productList`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({}),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.data.productData);
                // const comboProducts = data.data.productData.filter((product: { isCombo: boolean; }) => product.isCombo !== true);
                // console.log(comboProducts);
                setProducts(data.data.productData);

            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
            });
    }, []);

    const onBtnClick = (id: number, displayname: string) => {
        router.push(`/products/${displayname}?id=${id}`);
    };
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleMouseEnter = (index: any) => {
        setHoveredCard(index);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };


    return (
        <div className={styles.cardContainer}>
            {products.map((product, index) => (
                <div key={product._id} className={styles.card}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}>

                    <div className={styles.cardImg}>
                        <div className={styles.image}>
                            <Image
                                key={product._id}
                                src={hoveredCard === index ? product.imageUrl[1].location : product.imageUrl[0].location}
                                alt={"alt"}
                                width={imageWidth}
                                height={imageHeight}
                                className={styles.img}
                            />
                        </div>

                        {(product.discount !== 0) &&
                            <div className={styles.discount}>
                                <p>{product.discount}% Off</p>
                            </div>
                        }
                    </div>

                    <div className={styles.cardInfo}>
                        <h2 className={styles.productName}>
                            {product.name.split(',').map((part, index) => (
                                <span key={index} style={{ fontWeight: index === 1 ? '700' : 'inherit' }}>
                                    {part}
                                    {index !== 1 && ','}
                                </span>
                            ))}
                        </h2>
                        <h2 className={styles.prod}>{product.prod}</h2>
                        {(product.discount !== 0) && <del> <p className={styles.mrp}>MRP: {product.mrp} INR</p></del>}
                        <p className={`${styles.price} ${product.prod ? styles.prodPrice : ''}`}>Price: <b className={styles.grade}>{product.price} INR</b></p>

                        <button
                            onClick={() => onBtnClick(product._id, product.displayName)}
                            className={`${styles.button} ${product.discount === 0 ? styles.withMargin : ''} ${product.prod ? styles.prodMargin : ''}`}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;

