import React, { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { Carousel } from 'antd';
import styles from './OrderingDryFruits.module.scss';
import { Product } from '@/app/products/[product]/page';
import { useRouter, useSearchParams } from 'next/navigation';

interface DryFruitSliderForOrderProps {
    data: Product | any;
}

export const DryFruitSliderForOrder: React.FC<DryFruitSliderForOrderProps> = (props: any) => {
    const router = useRouter();
    const [quantity, setQuantity] = useState<number>(1);
    const [message, setMessage] = useState('');
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const params = useSearchParams().get('id')

    useEffect(() => {
        let timer: any;
        if (message) {
            timer = setTimeout(() => {
                setMessage('');
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [message]);

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
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const addToCart = () => {
        const productData = {
            userId: userId,
            productId: params,
            qty: quantity,
            token: token,
            // discount: 10
        };

        fetch(`${process.env.BASE_URL}/s/cartProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMessage(data.message);
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


    const handleRouting = () => {
        router.push('/cartList');
    };
    console.log(props.data);


    return (
        <div className={styles.mainDiv} >

            <div className={styles.carousel}>
                <Carousel slidesToShow={1} autoplay autoplaySpeed={4500} speed={2000} style={{ width: '475px', height: '600px', margin: '0 auto' }} >
                    {props.data.imageUrl.map((image: any) => (
                        <Image key={props.data._id} src={image.location} alt={`Image`} width={475} height={350} className={styles.image} />
                    ))}
                </Carousel>
            </div>

            <div className={styles.description}>
                <p className={styles.name}>{props.data.name}</p>
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
                    <button onClick={handleRouting} className={styles.btnOrder}>Place Order</button>
                    {/* {message && <div className={styles.message}>{message}</div>} */}

                </div>
            </div>

        </div>
    );
};


