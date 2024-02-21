import { useEffect, useState } from 'react';
import styles from './OrderList.module.scss';
import { getUserId } from '@/getLocalStroageUserId';
import Image from 'next/image';
import { getToken } from '@/getLocalStroageToken';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';
import emptyCart from '../../imageFolder/emptyCart1-removebg-preview.png'

interface OrderData {
    productList: any;
    shippingAddressId: any;
    orderNumber: any;
    userData: any;
    _id: string;
    orderListData: any
}
const OrderList = () => {
    const router = useRouter();
    const [orderList, setOrderList] = useState<[]>([]);
    const [userList, setUserList] = useState<[]>([]);
    const [loading, setLoading] = useState(true);


    const userId = getUserId();
    const token = getToken()



    const fetchAddressData = () => {
        fetch(`${process.env.BASE_URL}/s/order/orderList/${userId}`, {
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
                setUserList(data.data.userData)
                setOrderList(data.data.orderListData)

            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
            });
    };

    useEffect(() => {
        fetchAddressData();
    }, []);


    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    const reversedOrderList = [...orderList].reverse();
    const OnShopBtn = () => {
        router.push('/#products')
    }

    const OnSignInBtn = () => {
        router.push('/login')
    }
    return (

        <div className={styles.CenteredContainer}>
            {loading ? (
                <div className={styles.loaderContainer}>
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <div className={styles.deliverAddress}>YOUR ORDERS</div>
                    <div className={styles.mainDiv}>
                        {/* {orderList && orderList.length > 0 && orderList.map((e: any) => ( */}
                        {reversedOrderList && reversedOrderList.length > 0 && reversedOrderList.map((e: any) => (
                            <div className={styles.addressCard} key={e._id}>
                                <div className={styles.row1}>
                                    <p>ORDER No : <strong> {e.orderNumber}</strong></p>
                                    <p>ORDER Status : <strong style={{ color: 'green' }}>{e.status.toUpperCase()}</strong></p>
                                    <p>Total Order Value : <strong> {e.totalOrderValue} INR</strong></p>
                                </div>

                                <div className={styles.row2}>
                                    <p>Shipping Address : {e.shippingAddressId.addressLine},{e.shippingAddressId.city}-{e.shippingAddressId.pincode},{e.shippingAddressId.state},{e.shippingAddressId.country}</p>
                                    <p>Billing Address : {e.billingAddressId.addressLine},{e.billingAddressId.city}-{e.billingAddressId.pincode},{e.billingAddressId.state},{e.billingAddressId.country}</p>
                                </div>

                                <div className={styles.payment}>Payment Method : <strong> UPI Payment</strong></div>

                                <div className={styles.mainRow}>

                                    <div className={styles.row3}>
                                        {e.productList.map((cartProduct: any) => (
                                            <div key={cartProduct.cartProductId._id} className={styles.prod}>
                                                <div className={styles.prodImg}>
                                                    <Image
                                                        src={cartProduct.cartProductId.productId.imageUrl[0].location}
                                                        alt={cartProduct.cartProductId.productId.name}
                                                        width={100}
                                                        height={100}
                                                        className={styles.img}
                                                    />
                                                </div>
                                                <div className={styles.prodDet}>
                                                    <p>{cartProduct.cartProductId.productId.name}</p>
                                                    <p>Weight : {cartProduct.cartProductId.productId.weight}</p>
                                                    <p>Price : {cartProduct.cartProductId.productId.price} INR</p>
                                                    <p>Qty : {cartProduct.cartProductId.qty}</p>
                                                </div>

                                            </div>


                                        ))}
                                    </div>

                                    <div className={styles.rows}>
                                        <p className={styles.head}>Order Summary</p>

                                        <div className={styles.value}>
                                            <p>Total Cart Value : </p>
                                            <strong> {e.totalCartValue} INR </strong>
                                        </div>
                                        <div className={styles.value}>
                                            <p>Total Shipping Charge : </p>
                                            <strong> {e.shippingCharge} INR </strong>
                                        </div>
                                        <div className={styles.value}>
                                            <p>Total Order Value : </p>
                                            <strong> {e.totalOrderValue} INR </strong>
                                        </div>
                                    </div>

                                </div >


                            </div>
                        ))}
                    </div>

                </>
            )}

            {!reversedOrderList.length &&
                <div className={styles.shoppingCartMainContainer}>
                    <div className={styles.shoppingCartWrapper}>
                        <Image
                            src={emptyCart}
                            alt='Empty Shopping Bag'
                            // width='256'
                            // height='256'
                            className={styles.image}
                        ></Image>
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
        </div >




    );
};

export default OrderList;



