import React from 'react';
import styles from './Card.module.scss';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import products from '@/data/CardData';


interface Product {
    id: number;
    image: string | StaticImageData;
    name: string;
    grade: string;
    displayname: string;

}

const Card = () => {

    const router = useRouter()
    const imageWidth = 150;
    const imageHeight = 150;

    const onBtnClick = (id: number, displayname: string) => {
        router.push(`/products/${displayname}?id=${id}`)
    }

    return (
        <div className={styles.cardContainer}>
            {products.map((product) => (
                <div key={product.id} className={styles.card}>
                    <div className={styles.image}>
                        {product.images && product.images.length > 0 && (
                            <Image src={product.images[0].image} alt={product.name} width={imageWidth} height={imageHeight} />
                        )}
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
                        <button onClick={() => onBtnClick(product.id, product.displayname)} className={styles.button}>Buy Now</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;




// import React, { useState, useEffect } from 'react';
// import styles from './Card.module.scss';
// import { StaticImageData } from 'next/image';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';

// interface Product {
//     id: number;
//     image: string | StaticImageData;
//     name: string;
//     grade: string;
//     displayname: string;
// }

// const Card: React.FC = () => {
//     const router = useRouter();
//     const imageWidth = 150;
//     const imageHeight = 150;
//     const [products, setProducts] = useState<Product[]>([]);

//     useEffect(() => {
//         // Fetch data from the API
//         fetch('http://localhost:3001/s/addProduct')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 setProducts(data);
//                 console.log(data);

//             })
//             .catch(error => {
//                 console.error('There was a problem fetching the data:', error);
//             });
//     }, []);

//     const onBtnClick = (id: number, displayname: string) => {
//         router.push(`/products/${displayname}?id=${id}`);
//     };

//     return (
//         <div className={styles.cardContainer}>
//             {products.map(product => (
//                 <div key={product.id} className={styles.card}>
//                     <div className={styles.image}>
//                         {product.image && (
//                             <Image src={product.image} alt={product.name} width={imageWidth} height={imageHeight} />
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
//                         <p className={styles.price}>Price: <b className={styles.grade}>{product.grade} INR</b></p>
//                         <button onClick={() => onBtnClick(product.id, product.displayname)} className={styles.button}>Buy Now</button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Card;
