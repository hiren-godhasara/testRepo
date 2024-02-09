// import React, { useState, ChangeEvent } from 'react';
// import Image from 'next/image';
// import { Carousel } from 'antd';
// import styles from './OrderingDryFruits.module.scss';
// import { Product } from '@/app/products/[product]/page';

// interface DryFruitSliderForOrderProps {
//     data: Product | null;
// }

// export const DryFruitSliderForOrder: React.FC<DryFruitSliderForOrderProps> = (props: any) => {

//     const [selectedButton, setSelectedButton] = useState<string>('');
//     const [quantity, setQuantity] = useState<number>(0);
//     const [totalQuantity, setTotalQuantity] = useState<number>(0);
//     const [packetWeight, setPacketWeight] = useState('');
//     const [totalQuantityMessage, setTotalQuantityMessage] = useState('');


//     const buttonClick = (value: React.SetStateAction<string>) => {
//         setPacketWeight(value);
//         setSelectedButton(value);
//         setQuantity(0);
//         setTotalQuantity(0);
//         setTotalQuantityMessage("");

//     };

//     const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const newQuantity = parseInt(e.target.value);

//         if (isNaN(newQuantity) || newQuantity < 0) {
//             return;
//         }

//         if (!packetWeight) {
//             setTotalQuantityMessage("Please select a weight packet first");
//         } else {
//             setTotalQuantityMessage("");
//             const valueMultiplier = parseInt(packetWeight) || 1;
//             const newTotalQuantity = (newQuantity * valueMultiplier) / 1000;
//             setQuantity(newQuantity);
//             setTotalQuantity(newTotalQuantity);
//         }
//     };

//     const updateTotalQuantity = (newQuantity: number, packetWeight: string) => {
//         const valueMultiplier = parseInt(packetWeight) || 1;
//         const newTotalQuantity = (newQuantity * valueMultiplier) / 1000;
//         setTotalQuantity(newTotalQuantity);
//     };
//     const price = props.data.price
//     const total = price * totalQuantity;
//     const roundedTotal = total.toFixed(2);

//     const addToCart = () => {
//         const productData = {
//             product: props.data.name,
//             productId: 1,
//             pricePerKg: price,
//             quantity: quantity,
//             totalPrice: total,
//             packetWeight: packetWeight
//         };
//         console.log(productData);
//     };
//     const reset = () => {
//         setSelectedButton('');
//         setQuantity(0);
//         setTotalQuantity(0);
//         setPacketWeight('');
//         setTotalQuantityMessage('');
//     };


//     const handleAddToCart = () => {
//         addToCart();
//         reset();
//     };


//     return (
//         <div className={styles.mainDiv} >

//             <div className={styles.leftSection}>

//                 <Carousel slidesToShow={1} autoplay autoplaySpeed={4500} speed={2000} style={{ width: '475px', height: '350px', margin: '0 auto' }} >
//                     {props.data.images.map((image: any) => (
//                         <Image src={image.image} alt={`Image`} width={475} height={350} className={styles.image} />
//                     ))}
//                 </Carousel>

//                 <div className={styles.description}>
//                     <p className={styles.price}>Price : {price} Rs./KG</p>

//                     <div className={styles.buttonwrapper}>
//                         <button onClick={() => buttonClick('100')} className={`${styles.packet} ${selectedButton === '100' ? styles.selected : ''}`}>100 Gram</button>
//                         <button onClick={() => buttonClick('250')} className={`${styles.packet} ${selectedButton === '250' ? styles.selected : ''}`}>250 Gram</button>
//                         <button onClick={() => buttonClick('500')} className={`${styles.packet} ${selectedButton === '500' ? styles.selected : ''}`}>500 Gram</button>
//                         <button onClick={() => buttonClick('1000')} className={`${styles.packet} ${selectedButton === '1000' ? styles.selected : ''}`}>1 KG</button>
//                     </div>
//                     {totalQuantityMessage && <p className={styles.errorMessage}>{totalQuantityMessage}</p>}

//                     <div className={styles.qty}>
//                         <label htmlFor="quantity">Qty :</label>
//                         <input type="number" id="quantity" name="quantity" value={quantity} className={styles.clickable} onChange={handleQuantityChange} />
//                     </div>
//                     <div className={styles.qtyWrapper}>
//                         <div className={styles.totalQty}>
//                             <label htmlFor="totalQuantity">Total Qty in Kilogram  :  </label>
//                             <strong><span id="totalQuantity" className={styles.clickableInput}>{totalQuantity}</span></strong>
//                         </div>
//                         <div className={styles.total}>
//                             <label htmlFor="total">Total Price  : </label>
//                             <strong><span id="total" className={styles.clickableInput}>{roundedTotal} Rs.</span></strong>

//                         </div>
//                     </div>
//                     <div className={styles.orderButton}>
//                         {/* <button onClick={handleAddToCart} className={styles.btnOrder}>Add To Cart</button>
//                         <button onClick={handleAddToCart} className={styles.btnOrder}>Place Order</button> */}
//                         <button onClick={handleAddToCart} className={styles.btnOrder} disabled={quantity < 1}>Add To Cart</button>
//                         <button onClick={handleAddToCart} className={styles.btnOrder} disabled={quantity < 1}>Place Order</button>

//                     </div>
//                 </div>
//             </div>


//             <div className={styles.rightSection}>

//                 <div className={styles.main}>

//                     <div className={styles.details}>
//                         <div className={styles.heading}>{props.data.name}</div>
//                         <div className={styles.insidedetails1}>
//                             <b className={styles.boldHeading}>Description:</b>
//                             <ul>
//                                 <li>{props.data.description}</li>
//                             </ul>
//                             <b className={styles.boldHeading}>Origin:</b>
//                             <ul>
//                                 {props.data.origin.map((item: any, index: any) => (
//                                     <li key={index}>
//                                         {Object.values(item)[0] as React.ReactNode}
//                                     </li>
//                                 ))}
//                             </ul>

//                             <b className={styles.boldHeading}>Unique Characteristic:</b>
//                             <ul>
//                                 {props.data.uniqueCharacteristic.map((item: any, index: any) => (
//                                     <li key={index}>
//                                         {Object.values(item)[0] as React.ReactNode}
//                                     </li>
//                                 ))}
//                             </ul>
//                             <b className={styles.boldHeading}>Nutritional Benefits:</b>
//                             <ul>
//                                 {props.data.nutritionalBenefits.map((item: any, index: any) => (
//                                     <li key={index}>
//                                         {Object.values(item)[0] as React.ReactNode}
//                                     </li>
//                                 ))}
//                             </ul>
//                             <b className={styles.boldHeading}>Distinct Qualities:</b>
//                             <ul>
//                                 {props.data.distinctQualities.map((item: any, index: any) => (
//                                     <li key={index}>
//                                         {Object.values(item)[0] as React.ReactNode}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </div>
//                 </div >
//             </div>

//         </div>
//     );
// };






import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { Carousel } from 'antd';
import styles from './OrderingDryFruits.module.scss';
import { Product } from '@/app/products/[product]/page';
import { useSearchParams } from 'next/navigation';

interface DryFruitSliderForOrderProps {
    data: Product | null;
}

export const DryFruitSliderForOrder: React.FC<DryFruitSliderForOrderProps> = (props: any) => {
    const [quantity, setQuantity] = useState<number>(0);
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const params = useSearchParams().get('id')
    console.log(params);


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
            // name: props.data.name,
            // productId: 1,
            // price: price,
            productId: params,
            qty: quantity,
        };
        console.log(productData);
    };
    const reset = () => {
        setQuantity(0);
        setTotalQuantity(0);
    };


    const handleAddToCart = () => {
        addToCart();
        reset();
    };


    return (
        <div className={styles.mainDiv} >

            <div className={styles.leftSection}>

                <Carousel slidesToShow={1} autoplay autoplaySpeed={4500} speed={2000} style={{ width: '475px', height: '350px', margin: '0 auto' }} >
                    {props.data.images.map((image: any) => (
                        <Image src={image.image} alt={`Image`} width={475} height={350} className={styles.image} />
                    ))}
                </Carousel>

                <div className={styles.description}>
                    <p className={styles.price}>Price : {price} INR</p>

                    <div className={styles.qty}>
                        <label htmlFor="quantity">Qty :</label>
                        <input type="number" id="quantity" name="quantity" value={quantity} className={styles.clickable} onChange={handleQuantityChange} />
                    </div>
                    <div className={styles.qtyWrapper}>

                        <div className={styles.total}>
                            <label htmlFor="total">Total Price  : </label>
                            <strong><span id="total" className={styles.clickableInput}>{roundedTotal} Rs.</span></strong>

                        </div>
                    </div>
                    <div className={styles.orderButton}>
                        <button onClick={handleAddToCart} className={styles.btnOrder}>Add To Cart</button>
                        <button onClick={handleAddToCart} className={styles.btnOrder}>Place Order</button>
                    </div>
                </div>
            </div>


            <div className={styles.rightSection}>

                <div className={styles.main}>

                    <div className={styles.details}>
                        <div className={styles.heading}>{props.data.name}</div>
                        <div className={styles.insidedetails1}>
                            <b className={styles.boldHeading}>Description:</b>
                            <ul>
                                <li>{props.data.description}</li>
                            </ul>
                            <b className={styles.boldHeading}>Origin:</b>
                            <ul>
                                {props.data.origin.map((item: any, index: any) => (
                                    <li key={index}>
                                        {Object.values(item)[0] as React.ReactNode}
                                    </li>
                                ))}
                            </ul>

                            <b className={styles.boldHeading}>Unique Characteristic:</b>
                            <ul>
                                {props.data.uniqueCharacteristic.map((item: any, index: any) => (
                                    <li key={index}>
                                        {Object.values(item)[0] as React.ReactNode}
                                    </li>
                                ))}
                            </ul>
                            <b className={styles.boldHeading}>Nutritional Benefits:</b>
                            <ul>
                                {props.data.nutritionalBenefits.map((item: any, index: any) => (
                                    <li key={index}>
                                        {Object.values(item)[0] as React.ReactNode}
                                    </li>
                                ))}
                            </ul>
                            <b className={styles.boldHeading}>Distinct Qualities:</b>
                            <ul>
                                {props.data.distinctQualities.map((item: any, index: any) => (
                                    <li key={index}>
                                        {Object.values(item)[0] as React.ReactNode}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div >
            </div>

        </div>
    );
};

