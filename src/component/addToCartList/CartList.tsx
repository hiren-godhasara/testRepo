import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './CartList.module.scss';
import { useRouter } from 'next/navigation';
import getUserId from '../../getLocalStroageUserId'
import url from 'url';


interface Product {
    length: number;
    totalShippingValue: number;
    totalCartValue: any;
    userData: any;
    _id: any;
    grade: string;
    displayName: string;
    imageUrl: any;
    name: string;
    weight: string;
    price: number;
    message: string;
    data: any;
    productList: any;
}


const CartList: React.FC = () => {
    const router = useRouter();
    const imageWidth = 150;
    const imageHeight = 150;
    const [productDetails, setProductDetails] = useState<Product | null>(null);
    const userId = getUserId();

    const fetchCartData = () => {
        fetch(`${process.env.BASE_URL}/s/cartProduct/cartProductList/${userId}`, {
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
                setProductDetails(data.data);
            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
            });
    };

    useEffect(() => {
        fetchCartData();
    }, []);



    const handleQuantityChange = (index: number, newQuantity: number) => {
        if (productDetails) {
            const updatedProductList = [...productDetails.productList];
            updatedProductList[index].qty = newQuantity;
            setProductDetails({ ...productDetails, productList: updatedProductList });
        }
    };



    const UpdateCartData = (cartProductId: any, qty: number) => {
        fetch(`${process.env.BASE_URL}/s/cartProduct/${cartProductId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ qty }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Response:', data);
                fetchCartData();
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };


    const DeleteCartData = (cartProductId: any) => {
        fetch(`${process.env.BASE_URL}/s/cartProduct/${cartProductId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                fetchCartData();
                return response.json();
            })
            .then(data => {
                console.log('Response:', data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const handleSave = (cartProductId: any, qty: number) => {
        // fetchCartData();
        UpdateCartData(cartProductId, qty);
    };

    const handleRemove = (cartProductId: any) => {
        DeleteCartData(cartProductId)

    }

    const onBtnClick = () => {
        if (productDetails && productDetails.productList) {
            console.log(productDetails);

            const cartProductIds = productDetails.productList.map((item: { cartProductId: any }) => item.cartProductId);

            const destinationUrl = url.format({
                pathname: '/orderAddress',
                query: { cartProductIds: JSON.stringify(cartProductIds), totalCartValue: productDetails.totalCartValue, shippingCharge: 0, },
            });

            router.push(destinationUrl);
        } else {
            console.error('Product details or product list is not available.');
        }
    };




    return (
        <div className={styles.cardContainer}>
            <div className={styles.leftContainer}>
                {productDetails && productDetails.productList && (
                    productDetails.productList.map((item: any, index: number) => (
                        <div key={index} className={styles.productCard}>
                            <div className={styles.image}>
                                <Image
                                    src={item.product.imageUrl[0].location}
                                    alt={item.product.name}
                                    width={imageWidth}
                                    height={imageHeight}
                                />
                            </div>
                            <div className={styles.productInfo}>
                                <h3><strong>{item.product.name}</strong></h3>
                                <p>Weight: <strong>{item.product.weight}</strong></p>
                                <p>Price: <strong>{item.product.price} INR</strong></p>
                                <div className={styles.quantityControls}>

                                    <button className={styles.dec} onClick={() => handleQuantityChange(index, item.qty - 1)}>-</button>
                                    <input
                                        className={styles.quantityInput}
                                        value={item.qty}
                                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                    />
                                    <button className={styles.inc} onClick={() => handleQuantityChange(index, item.qty + 1)}>+</button>

                                </div>

                                <div className={styles.edit}>
                                    <button className={styles.editBtn}>EDIT QTY</button>
                                    <button className={styles.editBtn} onClick={() => handleSave(item.cartProductId, item.qty)}>SAVE</button>
                                    <div className={styles.delete}>
                                        <button className={styles.editBtn} onClick={() => handleRemove(item.cartProductId)}>REMOVE</button>

                                    </div>
                                </div>

                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className={styles.rightContainer}>
                <div className={styles.calc}>
                    {productDetails && (
                        <div className={styles.row}>
                            <div className={styles.label}>Total Cart Value:</div>
                            <div className={styles.value}>{productDetails.totalCartValue} INR</div>
                        </div>
                    )}
                    {productDetails && (
                        <div className={styles.row}>
                            <div className={styles.label}>Total Shipping Value:</div>
                            <div className={styles.value}>{productDetails.totalShippingValue || 0} INR</div>
                        </div>
                    )}
                    {productDetails && (
                        <div className={styles.row}>
                            <div className={styles.label}>Total Grand Value:</div>
                            <div className={styles.value}>
                                <strong>
                                    {isNaN(productDetails.totalCartValue + (productDetails.totalShippingValue || 0))
                                        ? "0 INR"
                                        : `${productDetails.totalCartValue + (productDetails.totalShippingValue || 0)} INR`}
                                </strong>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.placeOrder}>
                    <button onClick={onBtnClick} className={styles.button}>PLACE ORDER</button>
                </div>
            </div>

        </div>
    );
};

export default CartList;
