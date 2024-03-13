'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import styles from './OrderingDryFruits.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { getToken } from '@/getLocalStroageToken';
import { getUserId } from '@/getLocalStroageUserId';
import useTokenExpiration from '@/userTokenExpiration';
import { ToastNotifications, showSuccessToast, showErrorToast } from '../../toastNotifications'
import Loader from '../loader/Loader';
import dynamic from 'next/dynamic';
import shippingCharge from '@/data/ShippingCharges';

const DryFruitSliderForOrder: any = () => {
    const desiredPart = usePathname();
    const parts = desiredPart.split('/products/');
    const paramId = parts[1];
    const router = useRouter();
    const [quantity, setQuantity] = useState<number>(1);
    const [shouldRenderRegisterForm, setShouldRenderRegisterForm] = useState(false);
    const [id, setId] = useState<any>()
    const [loading, setLoading] = useState(false)
    const [variantData, setVariantData] = useState([])
    const [selectedVariant, setSelectedVariant] = useState<any>(id);
    const [productDetails, setProductDetails] = useState<any>(null);
    const token = getToken();
    const userId = getUserId();
    const [selectedImage, setSelectedImage] = useState(null)
    useTokenExpiration(token);

    useEffect(() => {
        getProductDetails(paramId);
    }, [paramId]);

    const getProductDetails = async (paramId: string) => {
        setLoading(true)
        const isOrderRedirecting = typeof window !== 'undefined' ? localStorage.getItem("isOrderRedirecting") : null;
        if (isOrderRedirecting === "true") {
            window.location.reload()
            localStorage.removeItem("isOrderRedirecting")
        }
        if (!paramId) return;
        try {
            const response = await fetch(`${process.env.BASE_URL}/s/product/${paramId}`, {
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
            setProductDetails(data.data[0]);
            await variantProducts(data.data[0].variantName);
            setSelectedImage(data.data[0].imageUrl[0].location)
            setId(data.data[0]._id)
            setSelectedVariant(data.data[0]._id)
            setLoading(false)
        } catch (error) {
            console.error('There was a problem fetching the data:', error);
        }
    };

    const variantProducts = async (e: any) => {
        setLoading(true)
        fetch(`${process.env.BASE_URL}/s/productListByVariant`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ "variantName": e }),
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

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputText = e.target.value;

        if (/^\d*$/.test(inputText)) {
            const newQuantity = parseInt(inputText, 10);
            setQuantity(isNaN(newQuantity) ? 0 : newQuantity);
        }
    };

    const price = productDetails?.price
    const discount = productDetails?.discount
    const convertedWeight = productDetails?.weight
    let weight;
    if (convertedWeight >= 1000) {
        weight = convertedWeight / 1000 + 'Kg';
    } else {
        weight = convertedWeight + 'g';
    }
    const total = price * quantity;

    const wt = (convertedWeight * quantity) / 1000
    console.log(wt);

    // let totalShippingCharge: any = 0;
    // if (wt <= 0.5) {
    //     totalShippingCharge = 60;
    // } else if (wt > 0.5 && wt <= 1) {
    //     totalShippingCharge = 100;
    // } else if (wt > 1 && wt <= 2) {
    //     totalShippingCharge = 180;
    // } else {
    //     totalShippingCharge = 250;
    // }


    const totalShippingCharge = shippingCharge(wt)
    console.log(totalShippingCharge);


    const addToCart = () => {
        setLoading(true)
        const productData = {
            userId: userId,
            productId: id,
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
    };

    const handleAddToCart = () => {
        addToCart();
        reset();
    };

    const handleClick = () => {
        const token = getToken()
        console.log(token);
        if (token) {
            // localStorage.setItem("addToCart", "true");
            handleAddToCart();
            router.push('/cart')
        } else {
            localStorage.setItem('isOrderRedirecting', "true");
            setShouldRenderRegisterForm(true);
            router.push('/login')
        }
    };

    const handleRouting = () => {
        const token = getToken()
        if (token) {
            const productId = id;
            const qtys: any = quantity;
            const totalOrderCartValue: any = total;
            console.log(productId, qtys, totalOrderCartValue);
            localStorage.setItem('qtys', qtys)
            localStorage.setItem('totalOrderCartValue', totalOrderCartValue)
            localStorage.setItem('totalShippingCharge', totalShippingCharge)

            router.push(`/placeOrder`);
        } else {
            localStorage.setItem('isOrderRedirecting', "true");
            setShouldRenderRegisterForm(true);
            router.push('/login')
        }
    };

    const handleImageClick = (imageUrl: any) => {
        setSelectedImage(imageUrl);
    };

    const handleVariantClick = async (id: any, displayname: string, variantName: string) => {
        setSelectedVariant(id);
        window.history.pushState({ path: displayname }, '', displayname);

        try {
            const response = await fetch(`${process.env.BASE_URL}/s/product/${displayname}`, {
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
            setProductDetails(data.data[0])
            setSelectedVariant(data.data[0]._id);
        } catch (error) {
            console.error('There was a problem fetching the data:', error);
        }

    };

    const isButtonDisabled = (productDetails?.isAvailable === false)
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
                            {(
                                productDetails?.imageUrl.map((image: any, index: any) => (
                                    <Image
                                        key={index}
                                        src={image.location}
                                        alt="Image"
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
                            <div className={styles.variantCard}>
                                {variantData.map((e: any) => {
                                    const weightDisplay = e.weight >= 1000 ? `${(e.weight / 1000)}Kg` : `${e.weight}g`;

                                    return (
                                        <div
                                            className={`${styles.variantSubCard} ${selectedVariant === e._id ? styles.selectedVariant : ''}`}
                                            key={e._id}
                                            onClick={() => handleVariantClick(e._id, e.displayName, e.variantName)}>
                                            <p>{weightDisplay}</p>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    </div>



                    <div className={styles.description}>
                        <p className={styles.name}>{productDetails?.name}</p>
                        <p className={styles.des}>{productDetails?.productDescription}</p>
                        <p className={styles.weight}>Weight : <strong> {weight}</strong></p>


                        <div className={styles.mobileOrder}>
                            <div className={styles.priceAndStock}>
                                <p className={styles.price}>{price} ₹</p>
                                <p className={styles.discount}>{productDetails?.discount}% Off</p>
                                <del> <p className={styles.mrp}>MRP : {productDetails?.mrp} ₹</p></del>
                            </div>

                            <div className={styles.qty}>
                                <label htmlFor="quantity">Quantity :</label>
                                <input type="number" id="quantity" name="quantity" value={quantity} className={styles.clickable} onChange={handleQuantityChange} />
                            </div>

                            {isButtonDisabled && <div className={styles.outOfStock}>This Item is currently out of stock !</div>}

                            <div className={styles.orderButton}>
                                <button
                                    onClick={handleClick}
                                    className={`${isButtonDisabled ? styles.notbtnOrder : styles.btnOrder} ${quantity === 0 ? styles.disablebtnOrder : styles.btnOrder}`}
                                    disabled={isButtonDisabled}
                                >
                                    Add To Cart
                                </button>
                                <button
                                    onClick={handleRouting}
                                    className={`${isButtonDisabled ? styles.notbtnOrder : styles.btnOrder} ${quantity === 0 ? styles.disablebtnOrder : styles.btnOrder}`}
                                    disabled={isButtonDisabled}
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div >
            )}
            <ToastNotifications />
        </>

    );
};

export default DryFruitSliderForOrder

