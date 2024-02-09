// import React, { useState, ChangeEvent } from 'react';
// import Image from 'next/image';
// import { Carousel } from 'antd';
// import styles from './OrderingDryFruits.module.scss';
// import { Product } from '@/app/products/[product]/page';
// import { useSearchParams } from 'next/navigation';

// interface DryFruitSliderForOrderProps {
//     data: Product | any;
// }

// export const DryFruitSliderForOrder: React.FC<DryFruitSliderForOrderProps> = (props: any) => {
//     const [quantity, setQuantity] = useState<number>(0);
//     const [totalQuantity, setTotalQuantity] = useState<number>(0);
//     const params = useSearchParams().get('id')

//     const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const newQuantity = parseInt(e.target.value);

//         if (isNaN(newQuantity) || newQuantity < 0) {
//             return;
//         }
//         setQuantity(newQuantity);
//     };

//     const price = props.data.price
//     const total = price * quantity;
//     const roundedTotal = total.toFixed(2);

//     const addToCart = () => {
//         const productData = {
//             productId: params,
//             qty: quantity,
//         };
//         console.log(productData);
//     };
//     const reset = () => {
//         setQuantity(0);
//         setTotalQuantity(0);
//     };


//     const handleAddToCart = () => {
//         addToCart();
//         reset();
//     };


//     return (
//         <div className={styles.mainDiv} >

//             <div className={styles.carousel}>
//                 <Carousel slidesToShow={1} autoplay autoplaySpeed={4500} speed={2000} style={{ width: '475px', height: '600px', margin: '0 auto' }} >
//                     {props.data.imageUrl.map((image: any) => (
//                         <Image src={image.location} alt={`Image`} width={475} height={350} className={styles.image} />
//                     ))}
//                 </Carousel>
//             </div>

//             <div className={styles.description}>
//                 <p className={styles.des}>{props.data.productDescription}</p>
//                 <p className={styles.price}>Price : {price} INR</p>

//                 <div className={styles.qty}>
//                     <label htmlFor="quantity">Qty :</label>
//                     <input type="number" id="quantity" name="quantity" value={quantity} className={styles.clickable} onChange={handleQuantityChange} />
//                 </div>

//                 <div className={styles.total}>
//                     <label htmlFor="total">Total Price  : </label>
//                     <strong><span id="total" className={styles.clickableInput}>{roundedTotal} Rs.</span></strong>

//                 </div>
//                 <div className={styles.orderButton}>
//                     <button onClick={handleAddToCart} className={styles.btnOrder}>Add To Cart</button>
//                     <button onClick={handleAddToCart} className={styles.btnOrder}>Place Order</button>
//                 </div>
//             </div>

//         </div>
//     );
// };




import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { Carousel } from 'antd';
import styles from './OrderingDryFruits.module.scss';
import { Product } from '@/app/products/[product]/page';
import { useSearchParams } from 'next/navigation';

interface DryFruitSliderForOrderProps {
    data: Product | any;
}

export const DryFruitSliderForOrder: React.FC<DryFruitSliderForOrderProps> = (props: any) => {
    const [quantity, setQuantity] = useState<number>(0);
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const params = useSearchParams().get('id')

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value);

        if (isNaN(newQuantity) || newQuantity < 0) {
            return;
        }
        setQuantity(newQuantity);
    };

    const price = props.data.price
    const total = price * quantity;
    const roundedTotal = total.toFixed(2);

    const addToCart = () => {
        const productData = {
            userId: "65c5eb2445227242a3b1a99b",
            productId: params,
            qty: quantity,
        };

        fetch('http://localhost:3001/s/cartProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })
            .then(response => {
                console.log(response);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Cart updated successfully:', data);
            })
            .catch(error => {
                console.error('There was a problem adding to the cart:', error);
            });
    };

    const reset = () => {
        setQuantity(0);
        setTotalQuantity(0);
    };


    const handleAddToCart = () => {
        addToCart();
        reset();
    };


    return (
        <div className={styles.mainDiv} >

            <div className={styles.carousel}>
                <Carousel slidesToShow={1} autoplay autoplaySpeed={4500} speed={2000} style={{ width: '475px', height: '600px', margin: '0 auto' }} >
                    {props.data.imageUrl.map((image: any) => (
                        <Image src={image.location} alt={`Image`} width={475} height={350} className={styles.image} />
                    ))}
                </Carousel>
            </div>

            <div className={styles.description}>
                <p className={styles.des}>{props.data.productDescription}</p>
                <p className={styles.price}>Price : {price} INR</p>

                <div className={styles.qty}>
                    <label htmlFor="quantity">Qty :</label>
                    <input type="number" id="quantity" name="quantity" value={quantity} className={styles.clickable} onChange={handleQuantityChange} />
                </div>

                <div className={styles.total}>
                    <label htmlFor="total">Total Price  : </label>
                    <strong><span id="total" className={styles.clickableInput}>{roundedTotal} Rs.</span></strong>

                </div>
                <div className={styles.orderButton}>
                    <button onClick={handleAddToCart} className={styles.btnOrder}>Add To Cart</button>
                    <button onClick={handleAddToCart} className={styles.btnOrder}>Place Order</button>
                </div>
            </div>

        </div>
    );
};


