import { useEffect, useState } from 'react';
import styles from './OrderList.module.scss';
import getUserId from '@/getLocalStroageUserId';

interface OrderData {
    _id: string;
}
const OrderList = () => {
    const [orderList, setOrderList] = useState<OrderData[]>([]);
    const userId = getUserId();




    const fetchAddressData = () => {
        fetch(`${process.env.BASE_URL}/s/order/orderList/${userId}`, {
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
                console.log(data.data);
                setOrderList(data.data)

            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
            });
    };

    useEffect(() => {
        fetchAddressData();
    }, []);





    return (

        <div className={styles.CenteredContainer}>
            <div className={styles.selectedAdd}>
                <div className={styles.deliverAddress}>YOUR ORDERS</div>
                <div className={styles.preAddress}>
                    {orderList && orderList.length > 0 && orderList.map((e: OrderData) => (
                        <div className={styles.addressCard} key={e._id}>
                            {/* Render your order data here */}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default OrderList;



