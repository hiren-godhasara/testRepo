import React, { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { Carousel, Spin } from 'antd';
import styles from './OrderingDryFruits.module.scss';
import Carts, { Product } from '@/app/products/[product]/page';
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
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const [variantData, setVariantData] = useState([])
    const [selectedVariant, setSelectedVariant] = useState<any>(localStorage.getItem("productId"));

    const token = getToken();
    const userId = getUserId();

    // const pathname = usePathname()


    useTokenExpiration(token);

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value);

        if (isNaN(newQuantity) || newQuantity < 1) {
            return;
        }
        setQuantity(newQuantity);
    };


    const variantProducts = () => {

        const variantName = localStorage.getItem('variantName')
        const name = { variantName: variantName }

        setLoading(true)
        fetch(`${process.env.BASE_URL}/s/productListByVariant`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(name),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setVariantData(data.data.productData);
                setLoading(false)

            })
            .catch(error => {
                showErrorToast('Failed to loadData');
            });
    };


    useEffect(() => {
        variantProducts();
    }, []);

    const price = (data.length === 0) ? props.data.price : data.price
    const discount = (data.length === 0) ? props.data.discount : data.discount

    const total = price * quantity;
    const roundedTotal = total.toFixed(2);

    var productIdFromLocal = localStorage.getItem('productId');


    const addToCart = () => {
        setLoading(true)
        const productData = {
            userId: userId,
            productId: productIdFromLocal,
            qty: quantity,
            token: token,
            discount: discount
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
                setLoading(false)

            })
            .catch(error => {
                console.error('There was a problem adding to the cart:', error);
                showErrorToast('Failed to add to cart');
            });
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
            setShouldRenderRegisterForm(true);
        }
    };

    const handleCancelClick = () => {
        setShouldRenderRegisterForm(false);
    };

    const handleRouting = () => {

        const token = getToken()
        if (token) {
            const productId = productIdFromLocal;
            const qtys: any = quantity;
            const totalOrderCartValue: any = total;
            console.log(productId, qtys, totalOrderCartValue);
            localStorage.setItem('qtys', qtys)
            localStorage.setItem('totalOrderCartValue', totalOrderCartValue)
            // router.push(`/placeOrder?productId=${productId}&qtys=${qtys}&totalOrderCartValue=${totalOrderCartValue}`);
            router.push(`/placeOrder`);


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
        }, 1500);
    }, []);


    const handleVariantClick = async (id: any, displayname: string, variantName: string) => {
        setSelectedVariant(id);
        localStorage.setItem('variantName', variantName);
        localStorage.setItem('productId', id);



        // router.push(`/products/${displayname}`);
        try {
            const response = await fetch(`${process.env.BASE_URL}/s/product/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setData(data.data)

            // window.location.reload();
        } catch (error) {
            console.error('There was a problem fetching the data:', error);
        }

    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
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
                            {(data.length === 0) ? (
                                props.data.imageUrl.map((image: any, index: any) => (
                                    <Image
                                        key={index}
                                        src={image.location}
                                        alt={`Image`}
                                        width={205}
                                        height={85}
                                        className={`${styles.image1} ${shouldRenderRegisterForm ? styles.blurImage : ''}`}
                                        onMouseEnter={() => handleImageClick(image.location)}
                                    />
                                ))
                            ) : (
                                (data.length != 0) &&
                                data.imageUrl.map((image: any, index: any) => (
                                    <Image
                                        key={index}
                                        src={image.location}
                                        alt={`Image`}
                                        width={205}
                                        height={85}
                                        className={`${styles.image1} ${shouldRenderRegisterForm ? styles.blurImage : ''}`}
                                        onMouseEnter={() => handleImageClick(image.location)}
                                    />
                                ))
                            )}
                        </div>
                        <div className={styles.largeImageContainer}>
                            {selectedImage && (
                                <Image
                                    src={selectedImage}
                                    width={655}
                                    height={505}
                                    alt={`Large Image`}
                                    className={`${styles.largeImage} ${shouldRenderRegisterForm ? styles.blurImage : ''}`}
                                />
                            )}
                            <div className={styles.variantCard} >
                                {variantData.map((e: any) => (
                                    <div
                                        // className={styles.variantSubCard}
                                        className={`${styles.variantSubCard} ${selectedVariant === e._id ? styles.selectedVariant : ''}`}
                                        key={e._id}
                                        onClick={() => handleVariantClick(e._id, e.displayName, e.variantName)}>
                                        <p>{e.weight}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>



                    <div className={styles.description}>
                        <p className={styles.name}>{(data.length === 0) ? props.data.name : data.name}</p>
                        <p className={styles.des}>{(data.length === 0) ? props.data.productDescription : data.productDescription}</p>
                        <p className={styles.weight}>Weight : <strong> {(data.length === 0) ? props.data.weight : data.weight}</strong></p>

                        <del> <p className={styles.mrp}>MRP : {(data.length === 0) ? props.data.mrp : data.mrp} INR</p></del>
                        <p className={styles.discount}>Discount : {(data.length === 0) ? props.data.discount : data.discount} %</p>
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



