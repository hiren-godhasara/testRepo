'use client'

import { useState, useEffect, Key } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './GiftCombo.module.scss';
import { useRouter } from 'next/navigation';
import { Carousel } from 'antd';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Cookies from 'js-cookie';
import { getToken } from '@/getLocalStroageToken';
import i from '../../imageFolder/SAVE_20240209_093303 (1).jpg'
import i1 from '../../imageFolder/SAVE_20240209_093303 (2).jpg'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Loader from '../loader/Loader';
import Link from 'next/link';
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
    hsncode: any
    variantName: string
    details: string
}

const GiftCombo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const token = getToken()
    const router = useRouter();
    const imageWidth = 300;
    const imageHeight = 200;
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        setIsLoading(true);
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
                // console.log(data.data.productData);
                const comboProducts = data.data.productData.filter((product: { isCombo: boolean; }) => product.isCombo === true);
                // console.log(comboProducts);
                setProducts(comboProducts);

            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
            }).finally(() => {
                setIsLoading(false);
            });
    }, []);

    const onBtnClick = (id: any, displayname: string, variantName: string) => {
        setIsLoading(true);
        localStorage.setItem('variantName', variantName);
        localStorage.setItem('productId', id);
        router.push(`/products/${displayname}`);
        setIsLoading(false);
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
            <p className={styles.comboHead}>Gift Combos</p>
            <div className={`${styles.cardContainer} maxScreenWidth`}>
                {isLoading && (
                    <div className={styles.overlay}>
                        <div className={styles.loader}>
                            {/* <Spin size="large" /> */}
                            <Loader />
                        </div>
                    </div>
                )}

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
                                    className={hoveredCard === index ? styles.img1 : styles.img}
                                />
                            </div>

                            {(product.discount !== 0) &&
                                <div className={styles.discount}>
                                    <p>{product.discount}% Off</p>
                                </div>
                            }
                        </div>


                        <div className={styles.cardInfo}>
                            {/* <h2 className={styles.productName1}>
                            {product.name}
                        </h2> */}

                            <Link href={product.displayName} className={styles.con}>
                                <h2 className={styles.productName1}>
                                    <span className={styles.ellipsis1}>{product.name}</span>
                                </h2>
                            </Link>

                            <Link href={product.displayName}>
                                <div className={`${styles.con} ${product.name.length < 30 ? styles.con1 : ''}`}>
                                    <h2 className={styles.productName}>
                                        <span className={styles.ellipsis}>{product.details}</span>
                                    </h2>
                                </div>
                            </Link>


                            {/* <h2 className={styles.details}>{product.details}</h2> */}
                            {(product.discount !== 0) && <del> <p className={`${styles.mrp} ${product.name.length < 30 ? styles.mrp1 : ''}`}>MRP: {product.mrp} ₹</p></del>}
                            <p className={`${styles.price}  ${product.name.length < 30 ? styles.price1 : ''} ${product.details ? styles.prodPrice : ''}`}>Price: <b className={styles.grade}>{product.price} ₹</b></p>

                            <Link href={product.displayName}>
                                <button
                                    onClick={() => onBtnClick(product._id, product.displayName, product.variantName)}
                                    className={`${styles.button}  ${product.name.length < 30 ? styles.newBtn : ''} ${product.discount === 0 ? styles.withMargin : ''} ${product.prod ? styles.prodMargin : ''}`}
                                >
                                    Buy Now
                                </button>
                            </Link>
                        </div>
                    </div>
                ))
                }
            </div >
        </>
    );
};

export default GiftCombo;











// const GiftCombo = () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const token = getToken()
//     const router = useRouter();
//     const [pageNo, setPageNo] = useState(1);
//     const [pageLimit] = useState(12);
//     const imageWidth = 300;
//     const imageHeight = 200;
//     const [products, setProducts] = useState<Product[]>([]);

//     useEffect(() => {
//         setIsLoading(true);
//         fetch(`${process.env.BASE_URL}/s/productList`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // 'Authorization': `Bearer ${token}`,
//             },
//             body: JSON.stringify({}),
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log(data.data.productData);
//                 const comboProducts = data.data.productData.filter((product: { isCombo: boolean; }) => product.isCombo === true);
//                 console.log(comboProducts);
//                 setProducts(comboProducts);

//             })
//             .catch(error => {
//                 console.error('There was a problem fetching the data:', error);
//             }).finally(() => {
//                 setIsLoading(false);
//             });
//     }, [pageNo, pageLimit]);

//     const handlePageChange = (newPageNo: number) => {
//         setPageNo(newPageNo);
//     };
//     const onBtnClick = (id: any, displayname: string, variantName: string) => {
//         setIsLoading(true);
//         localStorage.setItem('variantName', variantName);
//         localStorage.setItem('productId', id);
//         router.push(`/products/${displayname}`);
//         setIsLoading(false);
//     };

//     const [hoveredCard, setHoveredCard] = useState(null);

//     const handleMouseEnter = (index: any) => {
//         setHoveredCard(index);
//     };

//     const handleMouseLeave = () => {
//         setHoveredCard(null);
//     };
//     const totalPages = Math.ceil(products.length / pageLimit);
//     const startIndex = (pageNo - 1) * pageLimit;
//     const endIndex = startIndex + pageLimit;
//     const displayedProducts = products.slice(startIndex, endIndex);

//     return (
//         <>
//             <p className={styles.comboHead}>Gift Combos</p>
//             <div className={`${styles.cardContainer} maxScreenWidth`}>
//                 {isLoading && (
//                     <div className={styles.overlay}>
//                         <div className={styles.loader}>
//                             {/* <Spin size="large" /> */}
//                             <Loader />
//                         </div>
//                     </div>
//                 )}

//                 {displayedProducts.map((product, index) => (
//                     <div key={product._id} className={styles.card}
//                         onMouseEnter={() => handleMouseEnter(index)}
//                         onMouseLeave={handleMouseLeave}>

//                         <div className={styles.cardImg}>
//                             <div className={styles.image}>
//                                 <Image
//                                     key={product._id}
//                                     src={hoveredCard === index ? product.imageUrl[1].location : product.imageUrl[0].location}
//                                     alt={"alt"}
//                                     width={imageWidth}
//                                     height={imageHeight}
//                                     className={hoveredCard === index ? styles.img1 : styles.img}
//                                 />
//                             </div>

//                             {(product.discount !== 0) &&
//                                 <div className={styles.discount}>
//                                     <p>{product.discount}% Off</p>
//                                 </div>
//                             }
//                         </div>


//                         <div className={styles.cardInfo}>
//                             {/* <h2 className={styles.productName1}>
//                             {product.name}
//                         </h2> */}

//                             <Link href={product.name} className={styles.con}>
//                                 <h2 className={styles.productName1}>
//                                     <span className={styles.ellipsis1}>{product.name}</span>
//                                 </h2>
//                             </Link>

//                             <div className={`${styles.con} ${product.name.length < 30 ? styles.con1 : ''}`}>
//                                 <h2 className={styles.productName}>
//                                     <span className={styles.ellipsis}>{product.details}</span>
//                                 </h2>
//                             </div>


//                             {/* <h2 className={styles.details}>{product.details}</h2> */}
//                             {(product.discount !== 0) && <del> <p className={`${styles.mrp} ${product.name.length < 30 ? styles.mrp1 : ''}`}>MRP: {product.mrp} ₹</p></del>}
//                             <p className={`${styles.price}  ${product.name.length < 30 ? styles.price1 : ''} ${product.details ? styles.prodPrice : ''}`}>Price: <b className={styles.grade}>{product.price} ₹</b></p>

//                             <button
//                                 onClick={() => onBtnClick(product._id, product.displayName, product.variantName)}
//                                 className={`${styles.button}  ${product.name.length < 30 ? styles.newBtn : ''} ${product.discount === 0 ? styles.withMargin : ''} ${product.prod ? styles.prodMargin : ''}`}
//                             >
//                                 Buy Now
//                             </button>
//                         </div>
//                     </div>
//                 ))
//                 }
//                 {totalPages > 1 && (
//                     <div className={`${styles.paginations}`}>
//                         <div className={`${styles.pagination}`}>
//                             <button
//                                 className={styles.b1}
//                                 disabled={pageNo === 1}
//                                 onClick={() => handlePageChange(pageNo - 1)}
//                             >
//                                 <span className={styles.rotate180}>➤</span>
//                             </button>
//                             {[...Array(totalPages)].map((_, i) => (
//                                 <button
//                                     key={i + 1}
//                                     onClick={() => handlePageChange(i + 1)}
//                                     className={pageNo === i + 1 ? styles.activePage : styles.b1}
//                                 >
//                                     {i + 1}
//                                 </button>
//                             ))}
//                             <button
//                                 className={styles.b1}
//                                 disabled={pageNo === totalPages}
//                                 onClick={() => handlePageChange(pageNo + 1)}
//                             >
//                                 <span> ➤</span>
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div >
//         </>
//     );
// };

// export default GiftCombo;

