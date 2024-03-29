'use client'

import { useState, useEffect, Key, useLayoutEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './Card.module.scss';
import { useRouter } from 'next/navigation';
import { getToken } from '@/getLocalStroageToken';
import Loader from '../loader/Loader';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import LoginForm from '../registrationUser/Login';

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

const Card = () => {
    const [isLoading, setIsLoading] = useState(false);
    const token = getToken()
    const router = useRouter();
    const imageWidth = 300;
    const imageHeight = 200;
    const [products, setProducts] = useState<Product[]>([]);
    const [otherCom, setOtherCom] = useState(true);


    useLayoutEffect(() => {
        // setIsLoading(true);
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
                setProducts(data.data.productData);
            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
            })
    }, []);

    const onBtnClick = (id: any, displayname: string, variantName: string) => {
        // setIsLoading(true);
        // localStorage.setItem('variantName', variantName);
        localStorage.setItem('productId', id);
        // router.push(`/products/${displayname}`);
        // setIsLoading(false);
    };

    const [hoveredCard, setHoveredCard] = useState(null);

    const handleMouseEnter = (index: any) => {
        setHoveredCard(index);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };


    return (
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
                    // onClick={() => onBtnClick(product._id, product.displayName, product.variantName)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}>

                    <div className={styles.cardImg}>
                        <div className={styles.image} >
                            <Link href={`/products/${product.displayName}`}>
                                <Image
                                    key={product._id}
                                    src={hoveredCard === index ? product.imageUrl[1].location : product.imageUrl[0].location}
                                    alt={"alt"}
                                    width={imageWidth}
                                    height={imageHeight}
                                    className={hoveredCard === index ? styles.img1 : styles.img}
                                    onClick={() => onBtnClick(product._id, product.displayName, product.variantName)}
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACqAKoDASIAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAECAwQG/8QAFxABAQEBAAAAAAAAAAAAAAAAABEBEv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEpQUZqUGxip0g6DnToHQY6KDYxVoNDNKDQxSg2lZqUG6VilBqpWKUG6lYqUG6nTG6nQN9J0x0nQOnR059HQOvR05dL0Dp0vTl0vQOnRXPo6B0qVipQdKlYqUHTornSg3UrNSg1UrNTdBrdSs7rO6DdSsVKDp0VzpQdOlrlVoOlWudKDpSsUoN0rFSg3SsVKDdKxSg61KlQF3U3U1N0DdTdTU0CpUSg1Ss0oNVaxVoN1axVoNUrNKDVKyAtKzQFpUAdgARnWmdBNZ1rWdBNRdQEABQAVUUBUUEAARUAAB6EaQGU1uM7gMamt7ibgMRI1EgMwjUICQWLARVhAQahAZGoQGUahAZhGoQHcjUSAzEjcSAxuMxvcSAxCNQgMQjUIDMWNQgJCLFgMxYsICRI1CAzCNQgMwjUIDsjSKIkaRBmJGkBmEaQGYRoBmLFASEVQSEUBIRQEiRoBmEaAdAFBFRBEVAQVAQVAUAAFAAAAAABBQH//Z"
                                />
                            </Link>
                        </div>

                        {(product.discount !== 0) &&
                            <div className={styles.discount}>
                                <p>{product.discount}% Off</p>
                            </div>
                        }
                    </div>


                    <div className={styles.cardInfo}>

                        <Link
                            href={`/products/${product.displayName}`}
                            onClick={() => onBtnClick(product._id, product.displayName, product.variantName)}
                            className={styles.con}>
                            <h2 className={styles.productName1}>
                                <span className={styles.ellipsis1}>{product.name}</span>
                            </h2>
                        </Link>


                        <Link
                            href={`/products/${product.displayName}`}>
                            <div
                                onClick={() => onBtnClick(product._id, product.displayName, product.variantName)}
                                className={`${styles.con} ${product.name.length < 30 ? styles.con1 : ''}`}>
                                <h2 className={styles.productName}>
                                    <span className={styles.ellipsis}>{product.details}</span>
                                </h2>
                            </div>
                        </Link>


                        {/* <h2 className={styles.prod}>{product.hsncode}</h2> */}
                        {/* <p className={styles.price1} >Free Shipping Available</p> */}
                        {(product.discount !== 0) && <del> <p className={styles.mrp}>MRP: ₹{product.mrp} </p></del>}
                        <p className={styles.price} >Price: <b className={styles.grade}>₹{product.price} </b></p>



                        <Link href={`/products/${product.displayName}`}>
                            <button
                                onClick={() => onBtnClick(product._id, product.displayName, product.variantName)}
                                className={styles.button}
                            >
                                Buy Now
                            </button>
                        </Link>
                    </div>
                </div>
            ))
            }
        </div >
    );
};

export default dynamic(() => Promise.resolve(Card), { ssr: false });





// const Card = () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [pageNo, setPageNo] = useState(1);
//     const [pageLimit] = useState(12);
//     const token = getToken();
//     const router = useRouter();
//     const imageWidth = 300;
//     const imageHeight = 200;
//     const [products, setProducts] = useState<Product[]>([]);

//     useEffect(() => {
//         setIsLoading(true);
//         fetch(`${process.env.BASE_URL}/s/productList`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',

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
//                 setProducts(data.data.productData);
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
//         <div className={`${styles.cardContainer} maxScreenWidth`}>

//             {isLoading && (
//                 <div className={styles.overlay}>
//                     <div className={styles.loader}>
//                         {/* <Spin size="large" /> */}
//                         <Loader />
//                     </div>
//                 </div>
//             )}
//             {displayedProducts.map((product, index) => (
//                 <div key={product._id} className={styles.card}
//                     onClick={() => onBtnClick(product._id, product.displayName, product.variantName)}
//                     onMouseEnter={() => handleMouseEnter(index)}
//                     onMouseLeave={handleMouseLeave}>

//                     <div className={styles.cardImg}>
//                         <div className={styles.image}>
//                             <Image
//                                 key={product._id}
//                                 src={hoveredCard === index ? product.imageUrl[1].location : product.imageUrl[0].location}
//                                 alt={"alt"}
//                                 width={imageWidth}
//                                 height={imageHeight}
//                                 className={hoveredCard === index ? styles.img1 : styles.img}
//                             />
//                         </div>

//                         {(product.discount !== 0) &&
//                             <div className={styles.discount}>
//                                 <p>{product.discount}% Off</p>
//                             </div>
//                         }
//                     </div>


//                     <div className={styles.cardInfo}>
//                         {/* <h2 className={styles.productName1}>
//                             {product.name}
//                         </h2> */}

//                         <Link href={product.name} className={styles.con}>
//                             <h2 className={styles.productName1}>
//                                 <span className={styles.ellipsis1}>{product.name}</span>
//                             </h2>
//                         </Link>

//                         <div className={`${styles.con} ${product.name.length < 30 ? styles.con1 : ''}`}>
//                             <h2 className={styles.productName}>
//                                 <span className={styles.ellipsis}>{product.details}</span>
//                             </h2>
//                         </div>


//                         {/* <h2 className={styles.prod}>{product.hsncode}</h2> */}
//                         {(product.discount !== 0) && <del> <p className={styles.mrp}>MRP: {product.mrp} ₹</p></del>}
//                         <p className={styles.price} >Price: <b className={styles.grade}>{product.price} ₹</b></p>

//                         <button
//                             onClick={() => onBtnClick(product._id, product.displayName, product.variantName)}
//                             className={styles.button}
//                         >
//                             Buy Now
//                         </button>
//                     </div>
//                 </div>
//             ))
//             }
//             {totalPages > 1 && (
//                 <div className={`${styles.paginations}`}>
//                     <div className={`${styles.pagination}`}>
//                         <button
//                             className={styles.b1}
//                             disabled={pageNo === 1}
//                             onClick={() => handlePageChange(pageNo - 1)}
//                         >
//                             <span className={styles.rotate180}>➤</span>
//                         </button>
//                         {[...Array(totalPages)].map((_, i) => (
//                             <button
//                                 key={i + 1}
//                                 onClick={() => handlePageChange(i + 1)}
//                                 className={pageNo === i + 1 ? styles.activePage : styles.b1}
//                             >
//                                 {i + 1}
//                             </button>
//                         ))}
//                         <button
//                             className={styles.b1}
//                             disabled={pageNo === totalPages}
//                             onClick={() => handlePageChange(pageNo + 1)}
//                         >
//                             <span> ➤</span>
//                         </button>
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// };

// export default Card;