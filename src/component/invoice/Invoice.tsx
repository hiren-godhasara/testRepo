import React, { useRef } from 'react';
import styles from '../invoice/Invoice.module.scss';
import Image from 'next/image';
import headerCompanyLogo from '../../imageFolder/mdfLogo.png';




const apiResponse = [
    {
        "id": 1,
        "product": "Cashew",
        "productId": 1,
        "pricePerKg": 885,
        "quantity": 7,
        "totalPrice": 3097.5,
        "packetWeight": "500"
    }

];

const totalSum = apiResponse.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.totalPrice;
}, 0);

const totalWeight = apiResponse.reduce((acc, item) => {
    const packetWeightInGrams = parseFloat(item.packetWeight) / 1000;
    return acc + (packetWeightInGrams * item.quantity);
}, 0);


let shippingCharge: any;

if (totalWeight < 1) {
    shippingCharge = 100;
} else if (totalWeight >= 1 && totalWeight <= 3) {
    shippingCharge = 200;
} else if (totalWeight > 3 && totalWeight <= 5) {
    shippingCharge = 400;
} else if (totalWeight > 5 && totalWeight <= 8) {
    shippingCharge = 700;
} else if (totalWeight > 8 && totalWeight <= 12) {
    shippingCharge = 1200;
} else if (totalWeight > 12 && totalWeight <= 15) {
    shippingCharge = 1600;
} else if (totalWeight > 15 && totalWeight <= 25) {
    shippingCharge = 2800;
} else if (totalWeight > 25 && totalWeight <= 30) {
    shippingCharge = 3400;
} else if (totalWeight > 30 && totalWeight <= 35) {
    shippingCharge = 220;
} else if (totalWeight > 35 && totalWeight <= 40) {
    shippingCharge = 5000;
} else if (totalWeight > 40 && totalWeight <= 45) {
    shippingCharge = 5800;
} else if (totalWeight > 45 && totalWeight <= 50) {
    shippingCharge = 6000;
} else {
    shippingCharge = 10000;
}

const Invoices = () => {

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.centeredContent}>
                <div className={styles.companyDetails}>
                    <div className={styles.logoContainer}>
                        <Image className={styles.image} src={headerCompanyLogo} alt={`logo`} width={70} height={70} />
                        <div className={styles.name}>MY DRY FRUIT</div>
                    </div>
                    <div className={styles.contactDetails}>
                        <div className="number">Contact us : +91 9157059719 || www.mydryfruit.com</div>
                        <div className="address">519-522  Meridian Business Center At Lajamani Chowk, Mota Varachha Surat-395006, Gujarat, INDIA</div>
                    </div>
                </div >

                <div className={styles.orderSummary}>

                    <div className={styles.orderDetails}>
                        <ul className={styles.order}>
                            <li> <strong> ORDER ID:12365478</strong></li>
                            <li> <strong> ORDER DATE:</strong>18-04-2023</li>
                            <li> <strong> INVOIVE NO:</strong>ELPO85856521</li>
                            <li> <strong> INVOIVE DATE:</strong>18-04-2023</li>
                            <li> <strong> VAT/TIN:</strong>07852490954</li>
                        </ul>


                        <div className={styles.order}>
                            <strong><p>Billing Address</p></strong>
                            <p>Jinesh Vachhani</p>
                            <div className={styles.billAddress}>519-522  Meridian Business Center At Lajamani Chowk, Mota Varachha Surat-395006, Gujarat, INDIA</div>
                        </div>


                        <div className={styles.order}>
                            <strong><p>Shipping Address</p></strong>
                            <strong><p>Jinesh Vachhani</p></strong>
                            <div className={styles.billAddress}>519-522  Meridian Business Center At Lajamani Chowk, Mota Varachha Surat-395006, Gujarat, INDIA</div>
                        </div>
                    </div>
                </div>

                <div className={styles.tableWrapper}>
                    <div className={styles.columnWrapper}>
                        <div className={styles.column}><strong>Product</strong></div>
                        <div className={styles.column}><strong>Packet Weight</strong></div>
                        <div className={styles.column}><strong>Quantity</strong></div>
                        <div className={styles.column}><strong>Price per Kg</strong></div>
                        <div className={styles.column}><strong>Total Price</strong></div>
                    </div>
                    {apiResponse.map(item => (
                        <div key={item.id} className={styles.columnWrapper}>
                            <div className={styles.column}>{item.product}</div>
                            <div className={styles.column}>{item.packetWeight}</div>
                            <div className={styles.column}>{item.quantity}</div>
                            <div className={styles.column}>{item.pricePerKg} ₹</div>
                            <div className={styles.column}>{item.totalPrice} ₹</div>
                        </div>
                    ))}
                </div>

                <div className={styles.grandTotal}>
                    <div className={styles.total}>Total: <strong>{totalSum} ₹</strong></div>
                    <div className={styles.shippingCharge}>Shipping Charges: <del>{shippingCharge} ₹</del> <strong>FREE</strong></div>
                    <div className={styles.billTotal}>Grand Total: <strong>{totalSum}₹</strong></div>
                </div >

                <div className={styles.horizontalLine}></div>
                <div className={styles.message}>
                    This is computer generated invoice. No signature required.
                </div>

            </div>
        </div >



    );
};

export default Invoices;
