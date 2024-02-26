// import Image from 'next/image';
// import styles from './GiftCombo.module.scss';
// import image from '../../imageFolder/image 8.png';
// import { giftComboAlmond, giftComboBackground, giftComboCashew, giftComboDates1, giftComboDates2 } from '@/S3Images/S3Images';

// const GiftCombo: React.FC = () => {

//     return (
//         <div className={styles.giftComboContainer}>
//             <div className={styles.backgroundImageContainer}>
//                 <Image src={giftComboBackground} alt='Home Page' width={1870} height={751} className={styles.backgroundImage} />
//             </div>

//             <div className={styles.contentContainer}>
//                 <h1 className={styles.h1}>Gift Combos</h1>

//                 <div className={styles.cardsContainer}>

//                     <div className={styles.cardRow}>
//                         <div className={styles.card}>
//                             <div className={styles.left}>
//                                 <h3>Premium Dates</h3>
//                                 <h4>Grade: A+</h4>
//                                 <div className={styles.h5}><h5>10% Off</h5></div>
//                             </div>
//                             <div className={styles.right}>
//                                 <Image src={giftComboDates1} alt='' width={118} height={118} className={styles.rightImage} />
//                             </div>
//                         </div>

//                         <div className={styles.card}>
//                             <div className={styles.left}>
//                                 <h3>Premium Dates</h3>
//                                 <h4>Grade: A+</h4>
//                                 <div className={styles.h5}><h5>10% Off</h5></div>
//                             </div>
//                             <div className={styles.right}>
//                                 <Image src={giftComboDates2} alt='' width={118} height={118} className={styles.rightImage} />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Second Row of Cards */}
//                     <div className={styles.cardRow}>
//                         <div className={styles.card}>
//                             <div className={styles.left}>
//                                 <h3>Premium Almond</h3>
//                                 <h4>Grade: A+</h4>
//                                 <div className={styles.h5}><h5>10% Off</h5></div>
//                             </div>
//                             <div className={styles.right}>
//                                 <Image src={giftComboAlmond} alt='' width={118} height={118} className={styles.rightImage} />
//                             </div>
//                         </div>

//                         <div className={styles.card}>
//                             <div className={styles.left}>
//                                 <h3>Premium Cashew</h3>
//                                 <h4>Grade: A+</h4>
//                                 <div className={styles.h5}><h5>10% Off</h5></div>
//                             </div>
//                             <div className={styles.right}>
//                                 <Image src={giftComboCashew} alt='' width={118} height={118} className={styles.rightImage} />
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default GiftCombo;









import { useState, useEffect, Key } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './GiftCombo.module.scss';
import { useRouter } from 'next/navigation';
import { getToken } from '@/getLocalStroageToken';

interface Product {
    prod: any
    mrp: any;
    _id: any;
    imageUrl: any | string | StaticImageData;
    name: string;
    grade: string;
    displayName: string;
    price: number
    discount: any
}

const GiftCombo = () => {
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
                console.log(data, 'data');
                console.log(data.data.productData);
                const comboProducts = data.data.productData.filter((product: { isCombo: boolean; }) => product.isCombo === true);
                console.log(comboProducts);
                setProducts(comboProducts);
            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
            });
    }, []);

    const onBtnClick = (id: any, displayname: string) => {
        localStorage.setItem('productId', id);
        router.push(`/products/${displayname}`);
        // router.push(`/products/${displayname}?id=${id}`);
    };
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleMouseEnter = (index: any) => {
        setHoveredCard(index);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };


    return (
        <>
            <h1 className={styles.giftHead}>Gift Combos</h1>
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
                            <p className={styles.price}>Price: <b className={styles.grade}>{product.price} INR</b></p>

                            <button
                                onClick={() => onBtnClick(product._id, product.displayName)}
                                className={`${styles.button} ${product.discount === 0 ? styles.withMargin : ''}`}
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default GiftCombo;

