import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './CartList.module.scss';
import { useRouter } from 'next/navigation';
import { getUserId } from '../../getLocalStroageUserId'
import url from 'url';
import emptyCart from '../../imageFolder/emptyCart1-removebg-preview.png'
import { getToken } from '@/getLocalStroageToken';
import useTokenExpiration from '@/userTokenExpiration';
import { Spin } from 'antd';
import badam from '../../imageFolder/badam.jpg'
import useWindowSize from '../hooks/useWindowsize';
import { SP } from 'next/dist/shared/lib/utils';
import Loader from '../loader/Loader';

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

const dummayData = [

]
const CartList: React.FC = () => {
    const router = useRouter();
    const [productDetails, setProductDetails] = useState<Product | null>(null);
    const [editableQuantities, setEditableQuantities] = useState<boolean[]>([]);
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const isSmallScreen = useWindowSize().smallScreen
    const [loading, setLoading] = useState(true);
    const userId = getUserId();
    const token = getToken()
    useTokenExpiration(token);

    useEffect(() => {
        fetchCartData();
    }, [userId]);

    useEffect(() => {
        if (productDetails && productDetails.productList) {
            const initialQuantities: { [key: string]: number } = {};
            productDetails.productList.forEach((item: any, index: number) => {
                initialQuantities[item.cartProductId] = item.qty;
            });
            setQuantities(initialQuantities);
        }
    }, [productDetails]);

    const fetchCartData = () => {
        setLoading(true)
        fetch(`${process.env.BASE_URL}/s/cartProduct/cartProductList/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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
            })
            .finally(() => {
                setLoading(false)
            });
    };

    const handleQuantityChange = (cartItemId: number, newQuantity: number) => {
        if (productDetails) {
            const updatedProductList = [...productDetails.productList];
            // updatedProductList[cartItemId].qty = newQuantity;
            setProductDetails({ ...productDetails, productList: updatedProductList });
        }
    };

    const UpdateCartData = (cartProductId: any, qty: any) => {
        fetch(`${process.env.BASE_URL}/s/cartProduct/${cartProductId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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
                'Authorization': `Bearer ${token}`,
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

    const onBtnClick = () => {
        setLoading(true);
        if (productDetails && productDetails.productList) {
            const cartProductIds = productDetails.productList.map((item: { cartProductId: any }) => item.cartProductId);
            router.push('/orderAddress');
        } else {
            console.error('Product details or product list is not available.');
        }
    };


    const OnShopBtn = () => {
        router.push('/#products')
    }

    const OnSignInBtn = () => {
        router.push('/login')
    }

    const handleIncrement = (cartProductId: number) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [cartProductId]: (prevQuantities[cartProductId] || 0) + 1,
        }));
        handleQuantityChange(cartProductId, quantities[cartProductId] + 1);
        const qty = quantities[cartProductId] + 1
        UpdateCartData(cartProductId, qty)
    };

    const handleDecrement = (cartProductId: number) => {
        if (quantities[cartProductId] > 1) {
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [cartProductId]: (prevQuantities[cartProductId] || 0) - 1,
            }));
            handleQuantityChange(cartProductId, quantities[cartProductId] - 1);
            const qty = quantities[cartProductId] - 1
            UpdateCartData(cartProductId, qty)
        }
    };

    const quantityInput = ({ cartProductId }: { cartProductId: number }) => {
        return (
            <div className={styles.cartItemCount}>
                <div><button onClick={() => handleDecrement(cartProductId)}>-</button></div>
                <div><p>{quantities[cartProductId] || 0}</p></div>
                <div><button onClick={() => handleIncrement(cartProductId)}>+</button></div>
            </div>
        );
    };

    const handleCartItemRemove = (cartProductId: any) => {
        DeleteCartData(cartProductId);
    }
    const calculateTotalCartValue = (): number => {
        if (productDetails) {
            return productDetails.productList.reduce((total: any, item: any) => {
                const itemQuantity = quantities[item.cartProductId] || 0;
                return total + itemQuantity * item.product.mrp;
            }, 0);
        }
        return 0;
    };

    const calculateTotalCost = (): number => {
        if (productDetails) {
            return productDetails.productList.reduce((total: any, item: any) => {
                const itemQuantity = quantities[item.cartProductId] || 0;
                return total + itemQuantity * item.product.price;
            }, 0);
        }
        return 0;
    };

    return (
        <div style={{ background: '#FFFFFF' }}>
            <div className={styles.cartHeding}>
                <p>CART DETAILS</p>
            </div>
            {loading ?
                <div className={styles.loaderContainer}>
                    <Loader />
                </div>
                :
                isSmallScreen ?
                    <>
                        <div className={styles.mediumScreenCartItemList}>
                            {productDetails &&
                                productDetails.productList.map((item: any, index: number) => {
                                    return (
                                        <>
                                            <div className={styles.cartItemWrapper}>
                                                <div className={styles.cartItemRemove} onClick={() => handleCartItemRemove(item.cartProductId)}>
                                                    <svg width={10} height={10} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8.64341 6.99901L13.6552 1.99813C13.8747 1.77862 13.998 1.48091 13.998 1.17048C13.998 0.860046 13.8747 0.562331 13.6552 0.342824C13.4358 0.123318 13.1381 0 12.8277 0C12.5173 0 12.2196 0.123318 12.0002 0.342824L7 5.35536L1.99983 0.342824C1.78036 0.123318 1.48268 -2.31288e-09 1.1723 0C0.861913 2.31288e-09 0.56424 0.123318 0.344765 0.342824C0.125289 0.562331 0.00198911 0.860046 0.00198911 1.17048C0.00198911 1.48091 0.125289 1.77862 0.344765 1.99813L5.35659 6.99901L0.344765 11.9999C0.235521 12.1083 0.148811 12.2372 0.0896384 12.3792C0.0304655 12.5213 0 12.6736 0 12.8275C0 12.9814 0.0304655 13.1338 0.0896384 13.2758C0.148811 13.4179 0.235521 13.5468 0.344765 13.6552C0.453117 13.7644 0.582027 13.8512 0.724059 13.9103C0.866091 13.9695 1.01843 14 1.1723 14C1.32616 14 1.47851 13.9695 1.62054 13.9103C1.76257 13.8512 1.89148 13.7644 1.99983 13.6552L7 8.64265L12.0002 13.6552C12.1085 13.7644 12.2374 13.8512 12.3795 13.9103C12.5215 13.9695 12.6738 14 12.8277 14C12.9816 14 13.1339 13.9695 13.2759 13.9103C13.418 13.8512 13.5469 13.7644 13.6552 13.6552C13.7645 13.5468 13.8512 13.4179 13.9104 13.2758C13.9695 13.1338 14 12.9814 14 12.8275C14 12.6736 13.9695 12.5213 13.9104 12.3792C13.8512 12.2372 13.7645 12.1083 13.6552 11.9999L8.64341 6.99901Z" fill={'#000000'} />
                                                    </svg>
                                                </div>
                                                <div className={styles.mediumScreenCartContainer}>
                                                    <div className={styles.mediumScreenProductDetails}>
                                                        <Image
                                                            src={item.product.imageUrl[0].location}
                                                            alt={item.product.name}
                                                            width={70}
                                                            height={70}
                                                        />
                                                        <div style={{ fontSize: '0.8rem' }}>
                                                            <p>{item.product.name.length > 30 ? (
                                                                <span>{item.product.name.slice(0, 30)}...</span>
                                                            ) :
                                                                <span>{item.product.name}</span>
                                                            }
                                                            </p>
                                                            <p><b>WEIGHT : </b>{item.product.weight}</p>
                                                            <del> <p>MRP :{item.product.mrp} INR</p></del>
                                                            <p className={styles.discount}>Discount :{item.product.discount}%</p>
                                                            <p><b>PRICE : </b>{item.product.price}  INR</p>
                                                        </div>
                                                    </div>
                                                    <div className={styles.mediumScreenTotalItemPrice}>
                                                        <div className={styles.mediumScreenTotalItem}>
                                                            {quantityInput({ cartProductId: item.cartProductId })}
                                                        </div>
                                                        <div className={styles.mediumScreenTotal}>
                                                            <p><b>{quantities[item.cartProductId] * item.product.price} INR</b></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                        </div>
                        {productDetails &&
                            <div className={styles.placeOrderContainer}>
                                <p className={styles.orderSummaryLabel}>ORDER SUMMARY</p>
                                <div className={styles.orderSummaryDetails}>
                                    <div className={styles.totalPriceArea}>
                                        <div className={styles.label}>Cart Value:</div>
                                        <div className={styles.value}>{calculateTotalCartValue()} INR</div>
                                    </div>
                                    <div className={styles.totalPriceArea}>
                                        <div className={styles.label}>Total Discount:</div>
                                        <div className={styles.valueDiscount}>{calculateTotalCost() - calculateTotalCartValue()} INR</div>
                                    </div>
                                    <div className={styles.totalPriceArea}>
                                        <div className={styles.label}>Total Shipping Charge:</div>
                                        <div className={styles.shipValue}>{productDetails.totalShippingValue || "Free"} </div>

                                    </div>
                                </div>
                                <div className={styles.totalValueContainer}>
                                    <div className={styles.label}><b>Total Amount:</b></div>
                                    {isNaN(calculateTotalCost())
                                        ? "0 INR"
                                        : <b>{`${calculateTotalCost()} INR`}</b>}
                                </div>
                                <div className={styles.disSen}>You will save {-calculateTotalCost() + calculateTotalCartValue()} INR on this order.</div>
                                <div className={styles.placeOrderBtn}>
                                    <button onClick={onBtnClick} className={styles.button}>PLACE ORDER</button>
                                </div>
                            </div>
                        }
                    </>
                    :
                    (productDetails && productDetails.productList.length > 0) &&
                    <div className={styles.cartContainer}>
                        <div className={styles.tablefixHeightContainer}>
                            <table className={styles.tableContainer}>
                                <thead className={styles.tableHeaderArea}>
                                    <tr>
                                        <th className={styles.tableHeading1}>PRODUCT</th>
                                        <th className={styles.tableHeading2}>PRICE</th>
                                        <th className={styles.tableHeading3}>QUNTITY</th>
                                        <th className={styles.tableHeading4}>TOTAL</th>
                                        <th className={styles.tableHeading5}></th>
                                    </tr>
                                </thead>
                                <tbody style={{ width: '100%' }}>
                                    {productDetails.productList.map((item: any, index: number) => {
                                        return (
                                            <tr key={`product${index}`} className={styles.tableRow}>
                                                <td className={styles.productDetailsItem}>
                                                    <div className={styles.cartItemDetails}>
                                                        <Image
                                                            src={item.product.imageUrl[0].location}
                                                            alt={item.product.name}
                                                            width={180}
                                                            height={180}
                                                            className={styles.productImage}
                                                        />
                                                        <div style={{ fontSize: '0.9rem' }}>
                                                            <p>{item.product.name.length > 30 ? (
                                                                <span>{item.product.name.slice(0, 30)}...</span>
                                                            ) :
                                                                <span>{item.product.name}   </span>
                                                            }
                                                            </p>
                                                            <p><b>WEIGHT :</b>{item.product.weight}</p>
                                                            <del> <p>MRP :{item.product.mrp} INR</p></del>
                                                            <p className={styles.discount}>Discount :{item.product.discount}%</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{item.product.price}  INR</td>
                                                <td>{quantityInput({ cartProductId: item.cartProductId })}</td>
                                                <td><b>{quantities[item.cartProductId] * item.product.price}  INR</b></td>
                                                <td>
                                                    <div className={styles.closeIconWrapper} onClick={() => handleCartItemRemove(item.cartProductId)}>
                                                        <svg width={10} height={10} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.64341 6.99901L13.6552 1.99813C13.8747 1.77862 13.998 1.48091 13.998 1.17048C13.998 0.860046 13.8747 0.562331 13.6552 0.342824C13.4358 0.123318 13.1381 0 12.8277 0C12.5173 0 12.2196 0.123318 12.0002 0.342824L7 5.35536L1.99983 0.342824C1.78036 0.123318 1.48268 -2.31288e-09 1.1723 0C0.861913 2.31288e-09 0.56424 0.123318 0.344765 0.342824C0.125289 0.562331 0.00198911 0.860046 0.00198911 1.17048C0.00198911 1.48091 0.125289 1.77862 0.344765 1.99813L5.35659 6.99901L0.344765 11.9999C0.235521 12.1083 0.148811 12.2372 0.0896384 12.3792C0.0304655 12.5213 0 12.6736 0 12.8275C0 12.9814 0.0304655 13.1338 0.0896384 13.2758C0.148811 13.4179 0.235521 13.5468 0.344765 13.6552C0.453117 13.7644 0.582027 13.8512 0.724059 13.9103C0.866091 13.9695 1.01843 14 1.1723 14C1.32616 14 1.47851 13.9695 1.62054 13.9103C1.76257 13.8512 1.89148 13.7644 1.99983 13.6552L7 8.64265L12.0002 13.6552C12.1085 13.7644 12.2374 13.8512 12.3795 13.9103C12.5215 13.9695 12.6738 14 12.8277 14C12.9816 14 13.1339 13.9695 13.2759 13.9103C13.418 13.8512 13.5469 13.7644 13.6552 13.6552C13.7645 13.5468 13.8512 13.4179 13.9104 13.2758C13.9695 13.1338 14 12.9814 14 12.8275C14 12.6736 13.9695 12.5213 13.9104 12.3792C13.8512 12.2372 13.7645 12.1083 13.6552 11.9999L8.64341 6.99901Z" fill={'#000000'} />
                                                        </svg>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {productDetails &&
                            <div className={styles.placeOrderContainer}>
                                <p className={styles.orderSummaryLabel}>ORDER SUMMARY</p>
                                <div className={styles.orderSummaryDetails}>
                                    <div className={styles.totalPriceArea}>
                                        <div className={styles.label}>Cart Value:</div>
                                        <div className={styles.value}>{calculateTotalCartValue()} INR</div>
                                    </div>

                                    <div className={styles.totalPriceArea}>
                                        <div className={styles.label}>Total Discount:</div>
                                        <div className={styles.valueDiscount}>{calculateTotalCost() - calculateTotalCartValue()} INR</div>
                                    </div>

                                    <div className={styles.totalPriceArea}>
                                        <div className={styles.label}>Total Shipping Charge:</div>
                                        <div className={styles.shipValue}>{productDetails.totalShippingValue || "Free"} </div>
                                    </div>
                                </div>
                                <div className={styles.totalValueContainer}>
                                    <div className={styles.label}><b> Total Amount:</b></div>
                                    {isNaN(calculateTotalCost())
                                        ? "0 INR"
                                        : <b>{`${calculateTotalCost()} INR`}</b>}
                                </div>
                                <div className={styles.disSen}>You will save {-calculateTotalCost() + calculateTotalCartValue()} INR on this order.</div>
                                <div className={styles.placeOrderBtn}>
                                    <button onClick={onBtnClick} className={styles.button}>PLACE ORDER</button>
                                </div>
                            </div>
                        }
                    </div>
            }
            {(!productDetails && !loading) &&
                <div className={styles.emptyCardContainer}>
                    <div className={styles.emptyCardWrapper}>
                        <div>
                            <Image
                                src={emptyCart}
                                alt='Empty Shopping Bag'
                                className={styles.image}
                            />
                        </div>
                        <div>
                            <div className={styles.heading}>Shopping Cart</div>
                            <div className={styles.emptyCard}>Your Cart Is Currently Empty.</div>
                            <div className={styles.btns}>
                                {!token && <button onClick={OnSignInBtn} className={styles.btn}>SIGN IN</button>}
                                <button onClick={OnShopBtn} className={styles.btn}>Return To Shop</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default CartList;