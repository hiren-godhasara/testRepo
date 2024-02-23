import React, { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { Carousel, Spin } from 'antd';
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
import Loader from '../loader/Loader';
// import { usePathname } from 'next/navigation'
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
    const [loading, setLoading] = useState(true)

    const token = getToken();
    const userId = getUserId();

    // const pathname = usePathname()


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

    var productIdFromLocal = localStorage.getItem('productId');


    const addToCart = () => {

        const productData = {
            userId: userId,
            productId: productIdFromLocal,
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
        setTotalQuantity(1);
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
            router.push('/cart')
        } else {
            // localStorage.setItem('returnURL', pathname);
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
    const [selectedImage, setSelectedImage] = useState(
        props.data.imageUrl.length > 0 ? props.data.imageUrl[0].location : null
    );

    const handleImageClick = (imageUrl: any) => {
        setSelectedImage(imageUrl);
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);


    return (
        <>
            {loading ? (
                <div className={styles.loaderContainer}>
                    <Loader />
                </div>
            ) : (
                <div className={styles.mainDiv} style={shouldRenderRegisterForm ? { filter: "blur(2px)", pointerEvents: 'none' } : {}}>

                    <div className={styles.mainImg} >
                        <div className={styles.sideImg}>
                            {props.data.imageUrl.map((image: any, index: any) => (
                                <Image
                                    key={index}
                                    src={image.location}
                                    alt={`Image`}
                                    width={205}
                                    height={85}
                                    // className={styles.image1}
                                    className={`${styles.image1} ${shouldRenderRegisterForm ? styles.blurImage : ''}`}
                                    onMouseEnter={() => handleImageClick(image.location)}
                                />
                            ))}
                        </div>
                        <div className={styles.largeImageContainer}>
                            {selectedImage && (
                                <Image
                                    src={selectedImage}
                                    width={555}
                                    height={505}
                                    alt={`Large Image`}
                                    className={`${styles.largeImage} ${shouldRenderRegisterForm ? styles.blurImage : ''}`}
                                // className={styles.largeImage}
                                />
                            )}
                        </div>
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

                </div>
            )}
            <div className={styles.reg}>
                {shouldRenderRegisterForm && <NewLoginForm />}
            </div>
            <ToastNotifications />
        </>
    );
};



