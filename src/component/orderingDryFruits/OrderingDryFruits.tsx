import React, { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { Carousel } from 'antd';
import styles from './OrderingDryFruits.module.scss';
import { Product } from '@/app/products/[product]/page';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { getToken } from '@/getLocalStroageToken';
import { getUserId } from '@/getLocalStroageUserId';
import RegisterForm from '../registrationUser/Register';
import LoginForm from '../registrationUser/Login';
import emptyCart from '../../imageFolder/emptyCart1-removebg-preview.png'
import useTokenExpiration from '@/userTokenExpiration';
import { ToastNotifications, showSuccessToast, showErrorToast } from '../../toastNotifications'
import NewLoginForm from '../registrationUser/NewLogin';

interface DryFruitSliderForOrderProps {
    data: Product | any;
}

export const DryFruitSliderForOrder: React.FC<DryFruitSliderForOrderProps> = (props: any) => {
    const router = useRouter();
    const [quantity, setQuantity] = useState<number>(1);
    const [shouldRenderRegisterForm, setShouldRenderRegisterForm] = useState(false);
    const [message, setMessage] = useState('');
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const params = useSearchParams().get('id')
    const [id, setId] = useState('')

    const token = getToken();
    const userId = getUserId();


    useTokenExpiration(token);

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
                'Authorization': `Bearer ${token}`,
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
                showSuccessToast(data.message);
            })
            .catch(error => {
                console.error('There was a problem adding to the cart:', error);
                showErrorToast('Failed to add to cart');
            })
            ;
    };

    const reset = () => {
        setQuantity(1);
        setTotalQuantity(0);
    };

    const handleAddToCart = () => {
        addToCart();
        reset();
    };


    const handleClick = () => {
        const token = getToken()
        console.log(token);
        if (token) {
            handleAddToCart();
            router.push('/cartList')
        } else {
            setShouldRenderRegisterForm(true);
        }
    };

    const handleCancelClick = () => {
        setShouldRenderRegisterForm(false);
    };

    const handleRouting = () => {

        const token = getToken()
        if (token) {
            const productId = params;
            const qtys = quantity;
            const totalOrderCartValue = total;
            console.log(productId, qtys, totalOrderCartValue);
            router.push(`/placeOrder?productId=${productId}&qtys=${qtys}&totalOrderCartValue=${totalOrderCartValue}`);

        } else {
            setShouldRenderRegisterForm(true);
        }
    };


    return (
        // <div className={styles.mainDiv} >
        <div className={styles.mainDiv} style={shouldRenderRegisterForm ? { background: 'rgba(0, 0, 0, 0.6)' } : {}}>
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
                <del> <p className={styles.mrp}>MRP : {props.data.mrp} INR</p></del>
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
                    <button onClick={handleClick} className={styles.btnOrder}>Add To Cart</button>
                    <button onClick={handleRouting} className={styles.btnOrder}>Place Order</button>

                </div>
            </div>

            <div className={styles.reg}>
                {shouldRenderRegisterForm && <NewLoginForm />}
            </div>
            <ToastNotifications />
        </div>
    );
};



