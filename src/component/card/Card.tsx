// import React from 'react';
// import styles from './Card.module.scss';
// import { StaticImageData } from 'next/image';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import products from '@/data/CardData';


// interface Product {
//     id: number;
//     image: string | StaticImageData;
//     name: string;
//     grade: string;
//     displayname: string;

// }

// const Card = () => {

//     const router = useRouter()
//     const imageWidth = 150;
//     const imageHeight = 150;

//     const onBtnClick = (id: number, displayname: string) => {
//         router.push(`/products/${displayname}?id=${id}`)
//     }

//     return (
//         <div className={styles.cardContainer}>
//             {products.map((product) => (
//                 <div key={product.id} className={styles.card}>
//                     <div className={styles.image}>
//                         {product.images && product.images.length > 0 && (
//                             <Image src={product.images[0].image} alt={product.name} width={imageWidth} height={imageHeight} />
//                         )}
//                     </div>
//                     <p className={styles.orgName}>My Dryfruit</p>
//                     <div className={styles.cardInfo}>
//                         <h2 className={styles.productName}>
//                             {product.name.split(',').map((part, index) => (
//                                 <span key={index} style={{ fontWeight: index === 1 ? '700' : 'inherit' }}>
//                                     {part}
//                                     {index !== 1 && ','}
//                                 </span>
//                             ))}
//                         </h2>

//                         <p className={styles.price}>Price: <b className={styles.grade}>{product.price} INR</b></p>
//                         <button onClick={() => onBtnClick(product.id, product.displayname)} className={styles.button}>Buy Now</button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Card;




import { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './Card.module.scss';
import { useRouter } from 'next/navigation';

interface Product {
    _id: any;
    imageUrl: any | string | StaticImageData;
    name: string;
    grade: string;
    displayName: string;
    price: number
}

const Card: React.FC = () => {
    const router = useRouter();
    const imageWidth = 150;
    const imageHeight = 150;
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch(`${process.env.BASE_URL}/s/productList`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
                setProducts(data.data.productData);

            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
            });
    }, []);

    const onBtnClick = (id: number, displayname: string) => {
        router.push(`/products/${displayname}?id=${id}`);
    };

    return (
        <div className={styles.cardContainer}>
            {products.map(product => (
                <div key={product._id} className={styles.card}>
                    <div className={styles.image}>
                        <Image src={product.imageUrl[0].location} alt={product.name} width={imageWidth} height={imageHeight} />
                    </div>

                    <p className={styles.orgName}>My Dryfruit</p>
                    <div className={styles.cardInfo}>
                        <h2 className={styles.productName}>
                            {product.name.split(',').map((part, index) => (
                                <span key={index} style={{ fontWeight: index === 1 ? '700' : 'inherit' }}>
                                    {part}
                                    {index !== 1 && ','}
                                </span>
                            ))}
                        </h2>
                        <p className={styles.price}>Price: <b className={styles.grade}>{product.price} INR</b></p>
                        <button onClick={() => onBtnClick(product._id, product.displayName)} className={styles.button}>Buy Now</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;

