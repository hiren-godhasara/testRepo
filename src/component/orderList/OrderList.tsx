'use client'
import { useEffect, useState } from 'react';
import styles from './OrderList.module.scss';
import { getUserId } from '@/getLocalStroageUserId';
import Image from 'next/image';
import { getToken } from '@/getLocalStroageToken';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';
import emptyCart from '../../imageFolder/emptyCart1-removebg-preview.png'
import Loader from '../loader/Loader';

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
    const [tokenData, setTokenData] = useState(false);
    const userId = getUserId();

    const token = getToken();
    useEffect(() => {
        if (token) {
            setTokenData(true);
        } else {
            router.push('/aaaaa/log');
        }
    }, [router]);



    const fetchAddressData = () => {
        setLoading(true);
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
                console.log(data);

                setUserList(data.data.userData)
                setOrderList(data.data.orderListData)
                setLoading(false);


            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
            }).finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (!userId) return
        fetchAddressData();
    }, []);

    const reversedOrderList = [...orderList].reverse();
    console.log(reversedOrderList);


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
                    {/* <Spin size="large" /> */}
                    <Loader />
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
                                    <p>Order Date : <strong> {new Date(e.createdAt).toLocaleDateString('en-GB')}</strong></p>
                                    <p>ORDER Status : <strong style={{ color: 'green' }}>{e.status.toUpperCase()}</strong></p>
                                    <p>Total Order Value : <strong> {e.totalOrderValue} ₹</strong></p>
                                </div>

                                <div className={styles.row2}>
                                    <p><strong>Shipping Address</strong>:</p>
                                    <div className={styles.addressLines}>
                                        <p>{e.shippingAddressId.addressLine1}</p>
                                        {e.shippingAddressId.addressLine2 && <p>{e.shippingAddressId.addressLine2}</p>}
                                        <p>{e.shippingAddressId.city}, {e.shippingAddressId.state}, {e.shippingAddressId.pincode}</p>
                                    </div>
                                </div>


                                <div className={styles.payment}>Payment Method : <strong> UPI Payment</strong></div>

                                <div className={styles.mainRow}>

                                    <div className={styles.row3}>
                                        {e.productList.map((cartProduct: any) => (
                                            <div key={cartProduct.cartProductId._id} className={styles.prod}>
                                                {/* <div className={styles.prodImg}> */}
                                                <Image
                                                    src={cartProduct.cartProductId.productId?.imageUrl[0].location}
                                                    alt={cartProduct.cartProductId.productId?.name}
                                                    width={120}
                                                    height={120}
                                                    className={styles.img}
                                                />
                                                {/* </div> */}
                                                <div className={styles.prodDet}>
                                                    <p>{cartProduct.cartProductId.productId?.name}</p>
                                                    {cartProduct.cartProductId.productId?.isCombo === true && <p> <span style={{ fontWeight: '650' }}>  Total Combo Weight : </span>  {cartProduct.cartProductId.productId?.weight} g</p>}
                                                    {cartProduct.cartProductId.productId?.isCombo !== true && <p> <span style={{ fontWeight: '650' }}> Weight : </span>{cartProduct.cartProductId.productId?.weight} g</p>}
                                                    {/* <p>Weight : {cartProduct.cartProductId.productId?.weight} g</p> */}
                                                    <p><span style={{ fontWeight: '650' }}> Price : </span>{cartProduct.cartProductId.productId?.price} ₹</p>
                                                    <p><span style={{ fontWeight: '650' }}>Qty :</span> {cartProduct.cartProductId.qty}</p>
                                                </div>

                                            </div>


                                        ))}
                                    </div>

                                    <div className={styles.rows}>

                                        <p className={styles.head}>Order Summary</p>

                                        <div className={styles.value}>
                                            <p>Total Cart Value : </p>
                                            <div> {e.totalCartValue} ₹ </div>
                                        </div>
                                        <div className={styles.value}>
                                            <p>Total Discount : </p>
                                            <strong style={{ color: 'green' }}> {e.totalDiscount} ₹ </strong>
                                        </div>
                                        <div className={styles.value}>
                                            <p>Total Shipping Charge : </p>
                                            {e.shippingCharge} ₹
                                        </div>
                                        <div className={styles.value}>
                                            <p>Total Order Value : </p>
                                            <strong> {e.totalOrderValue} ₹ </strong>
                                        </div>
                                    </div>

                                </div >


                            </div>
                        ))}
                    </div>



                    {!reversedOrderList.length &&
                        <div className={styles.shoppingCartMainContainer}>
                            <div className={styles.shoppingCartWrapper}>
                                <Image
                                    src={emptyCart}
                                    alt='Empty Shopping Bag'
                                    // objectFit='cover'
                                    // fill
                                    className={styles.image}
                                ></Image>
                                <div>
                                    <div className={styles.heading}>Your Orders</div>
                                    <div className={styles.emptyCard}>There are no any orders.</div>

                                    <div className={styles.btns}>
                                        <button onClick={OnShopBtn} className={styles.btn}>Return To Shop</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }


                </>
            )}
        </div >




    );
};

export default OrderList;



