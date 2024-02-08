import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { Carousel } from 'antd';
import styles from './CartSlider.module.scss';

import mazafati1 from '../../imageFolder/newM1.jpg';
import mazafati2 from '../../imageFolder/newM2.jpg';
import mazafati3 from '../../imageFolder/newM3.jpg';
import mazafati4 from '../../imageFolder/newM4.jpg';

import khalas1 from '../../imageFolder/newK1.jpg';
import khalas2 from '../../imageFolder/newK2.jpg';
import khalas3 from '../../imageFolder/newK3.jpg';
import khalas4 from '../../imageFolder/newK4.jpeg';

import medjool1 from '../../imageFolder/newM3.jpg';
import medjool2 from '../../imageFolder/newM3.jpg';
import medjool3 from '../../imageFolder/newM3.jpg';
import medjool4 from '../../imageFolder/newMD4.jpg';

import fard1 from '../../imageFolder/newFD1.jpg';
import fard2 from '../../imageFolder/newFD2.jpg';
import fard3 from '../../imageFolder/newFD3.jpg';
import fard4 from '../../imageFolder/newFD4.jpg';

import almond1 from '../../imageFolder/newA1.jpg';
import almond2 from '../../imageFolder/newA2.jpg';
import almond3 from '../../imageFolder/newA3.jpg';
import almond4 from '../../imageFolder/newA4.jpg';

import cashew1 from '../../imageFolder/newC1.jpg';
import cashew2 from '../../imageFolder/newC2.jpg';
import cashew3 from '../../imageFolder/newC3.jpg';
import cashew4 from '../../imageFolder/newC4.jpg';

import pista1 from '../../imageFolder/newp1.jpg';
import pista2 from '../../imageFolder/newP2.jpg';
import pista3 from '../../imageFolder/newP3.jpg';
import pista4 from '../../imageFolder/newP4.jpg';

import figs1 from '../../imageFolder/newF1.jpg';
import figs2 from '../../imageFolder/newF2.jpg';
import figs3 from '../../imageFolder/newF3.webp';
import figs4 from '../../imageFolder/newF4.jpg';
import { khalsDatesPrice, mazafatiDatesPrice, fardDatesPrice, medjoolDatesPrice, almondPrice, cahsewPrice, pistachioPrice, figsPrice } from '../../data/Prices';

const imageWidth = 475;
const imageHeight = 475;


const MazafatiSlider: React.FC = () => {
    const [selectedButton, setSelectedButton] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [packetWeight, setPacketWeight] = useState('');
    const [totalQuantityMessage, setTotalQuantityMessage] = useState('');
    const [productName, setProductName] = useState('mazafatiDates');

    const buttonClick = (value: React.SetStateAction<string>) => {
        setPacketWeight(value);
        setSelectedButton(value);
        setQuantity(0);
        setTotalQuantity(0);
        setTotalQuantityMessage("");

    };


    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value);
        console.log(newQuantity);

        if (isNaN(newQuantity) || newQuantity < 0) {
            return
        }

        if (!packetWeight) {
            setTotalQuantityMessage("Please select a weight packet first");
            return;
        }
        else {
            setTotalQuantityMessage("");
            setQuantity(newQuantity);
            updateTotalQuantity(newQuantity, packetWeight);
        }
    };


    const updateTotalQuantity = (newQuantity: number, packetWeight: string) => {
        const valueMultiplier = parseInt(packetWeight) || 1;
        const newTotalQuantity = (newQuantity * valueMultiplier) / 1000;
        setTotalQuantity(newTotalQuantity);
    };
    const total = mazafatiDatesPrice * totalQuantity;
    const roundedTotal = total.toFixed(2);

    const addToCart = () => {
        const productData = {
            product: productName,
            productId: 1,
            pricePerKg: mazafatiDatesPrice,
            quantity: quantity,
            totalPrice: total,
            packetWeight: packetWeight
        };
        console.log(productData);
    };
    const reset = () => {
        setSelectedButton('');
        setQuantity(0);
        setTotalQuantity(0);
        setPacketWeight('');
        setTotalQuantityMessage('');
        setProductName('mazafatiDates');
    };

    const handleAddToCart = () => {
        addToCart();
        reset();
    };


    return (
        <div className={styles.mainDiv} >
            <div>
                <Carousel slidesToShow={1} autoplay autoplaySpeed={4500} speed={2000} className='productCarousel'>
                    <Image src={mazafati1} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={mazafati2} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={mazafati3} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={mazafati4} alt={`Image`} width={475} height={475} className={styles.image} />
                </Carousel>
            </div>
            <div className={styles.description}>
                <p className={styles.price}>Price : {mazafatiDatesPrice} Rs./KG</p>
                <div className={styles.buttonwrapper}>
                    <button onClick={() => buttonClick('100')} className={`${styles.packet} ${selectedButton === '100' ? styles.selected : ''}`}>100 Gram</button>
                    <button onClick={() => buttonClick('250')} className={`${styles.packet} ${selectedButton === '250' ? styles.selected : ''}`}>250 Gram</button>
                    <button onClick={() => buttonClick('500')} className={`${styles.packet} ${selectedButton === '500' ? styles.selected : ''}`}>500 Gram</button>
                    <button onClick={() => buttonClick('1000')} className={`${styles.packet} ${selectedButton === '1000' ? styles.selected : ''}`}>1 KG</button>
                </div>
                {totalQuantityMessage && <p className={styles.errorMessage}>{totalQuantityMessage}</p>}

                <div className={styles.qty}>
                    <label htmlFor="quantity">Qty :</label>
                    <input type="number" id="quantity" name="quantity" value={quantity} className={styles.clickable} onChange={handleQuantityChange} />
                </div>

                <div className={styles.qtyWrapper}>

                    <div className={styles.totalQty}>
                        <label htmlFor="totalQuantity">Total Qty in Kilogram  :  </label>
                        <strong><span id="totalQuantity" className={styles.clickableInput}>{totalQuantity}</span></strong>
                    </div>
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
    );
};

const KhalasSlider: React.FC = () => {
    const [selectedButton, setSelectedButton] = useState<string>('');
    const [quantity, setQuantity] = useState<number>();
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [packetWeight, setPacketWeight] = useState('');

    const buttonClick = (value: React.SetStateAction<string>) => {
        setPacketWeight(value);
        setSelectedButton(value);
        setQuantity(0);
        setTotalQuantity(0);
    };

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity);
        updateTotalQuantity(newQuantity, packetWeight);
    };

    const updateTotalQuantity = (newQuantity: number, packetWeight: string) => {
        const valueMultiplier = parseInt(packetWeight) || 1;
        const newTotalQuantity = (newQuantity * valueMultiplier) / 1000;
        setTotalQuantity(newTotalQuantity);
    };
    const total = khalsDatesPrice * totalQuantity;
    return (
        <div className={styles.mainDiv}   >
            <div>
                <Carousel slidesToShow={1} autoplay autoplaySpeed={4500} speed={2000} className='productCarousel'>
                    <Image src={khalas1} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={khalas2} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={khalas3} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={khalas4} alt={`Image`} width={475} height={475} className={styles.image} />
                </Carousel>
            </div>
            <div className={styles.description}>
                <p className={styles.price}>Price : {khalsDatesPrice} Rs./KG</p>
                <div className={styles.buttonwrapper}>

                    <button onClick={() => buttonClick('250')} className={`${styles.packet} ${selectedButton === '250' ? styles.selected : ''}`}>250 Gram</button>
                    <button onClick={() => buttonClick('500')} className={`${styles.packet} ${selectedButton === '500' ? styles.selected : ''}`}>500 Gram</button>
                    <button onClick={() => buttonClick('1000')} className={`${styles.packet} ${selectedButton === '1000' ? styles.selected : ''}`}>1 KG</button>
                </div>

                <div className={styles.qty}>
                    <label htmlFor="quantity">Qty : </label>
                    <input type="number" id="quantity" name="quantity" value={quantity} onChange={handleQuantityChange} />
                </div>

                <div className={styles.totalQty}>
                    <label htmlFor="totalQuantity">Total Qty in Kilogram : </label>
                    <input type="number" id="totalQuantity" name="totalQuantity" value={totalQuantity} readOnly />
                </div>


                <div className={styles.total}>
                    <label htmlFor="total">Total Price : </label>
                    <input type="number" id="total" name="total" value={total} readOnly />
                </div>

                <div className={styles.orderButton}>
                    <button className={styles.btnOrder}>Add To Cart</button>
                    <button className={styles.btnOrder}>Place Order</button>
                </div>

            </div>
        </div>
    );
};

const FigsSlider: React.FC = () => {
    const [selectedButton, setSelectedButton] = useState<string>('');
    const [quantity, setQuantity] = useState<number>();
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [packetWeight, setPacketWeight] = useState('');

    const buttonClick = (value: React.SetStateAction<string>) => {
        setPacketWeight(value);
        setSelectedButton(value);
        setQuantity(0);
        setTotalQuantity(0);
        // console.log(`Selected value: ${value}`);
    };

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity);
        updateTotalQuantity(newQuantity, packetWeight);
        // console.log('Quantity:', newQuantity);
    };

    const updateTotalQuantity = (newQuantity: number, packetWeight: string) => {
        const valueMultiplier = parseInt(packetWeight) || 1;
        const newTotalQuantity = (newQuantity * valueMultiplier) / 1000;
        setTotalQuantity(newTotalQuantity);
    };
    const total = figsPrice * totalQuantity;
    return (
        <div className={styles.mainDiv}   >
            <div>
                <Carousel slidesToShow={1} autoplay autoplaySpeed={4500} speed={2000} className='productCarousel'>
                    <Image src={figs1} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={figs2} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={figs3} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={figs4} alt={`Image`} width={475} height={475} className={styles.image} />
                </Carousel>
            </div>
            <div className={styles.description}>
                <p className={styles.price}>Price : {figsPrice} Rs./KG</p>
                <div className={styles.buttonwrapper}>

                    <button onClick={() => buttonClick('250')} className={`${styles.packet} ${selectedButton === '250' ? styles.selected : ''}`}>250 Gram</button>
                    <button onClick={() => buttonClick('500')} className={`${styles.packet} ${selectedButton === '500' ? styles.selected : ''}`}>500 Gram</button>
                    <button onClick={() => buttonClick('1000')} className={`${styles.packet} ${selectedButton === '1000' ? styles.selected : ''}`}>1 KG</button>
                </div>

                <div className={styles.qty}>
                    <label htmlFor="quantity">Qty : </label>
                    <input type="number" id="quantity" name="quantity" value={quantity} onChange={handleQuantityChange} />
                </div>

                <div className={styles.totalQty}>
                    <label htmlFor="totalQuantity">Total Qty in Kilogram : </label>
                    <input type="number" id="totalQuantity" name="totalQuantity" value={totalQuantity} readOnly />
                </div>


                <div className={styles.total}>
                    <label htmlFor="total">Total Price : </label>
                    <input type="number" id="total" name="total" value={total} readOnly />
                </div>
                <div className={styles.orderButton}>
                    <button className={styles.btnOrder}>Add To Cart</button>
                    <button className={styles.btnOrder}>Place Order</button>
                </div>

            </div>
        </div>
    );
};

const PistachioSlider: React.FC = () => {
    const [selectedButton, setSelectedButton] = useState<string>('');
    const [quantity, setQuantity] = useState<number>();
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [packetWeight, setPacketWeight] = useState('');

    const buttonClick = (value: React.SetStateAction<string>) => {
        setPacketWeight(value);
        setSelectedButton(value);
        setQuantity(0);
        setTotalQuantity(0);
        // console.log(`Selected value: ${value}`);
    };

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity);
        updateTotalQuantity(newQuantity, packetWeight);
        // console.log('Quantity:', newQuantity);
    };

    const updateTotalQuantity = (newQuantity: number, packetWeight: string) => {
        const valueMultiplier = parseInt(packetWeight) || 1;
        const newTotalQuantity = (newQuantity * valueMultiplier) / 1000;
        setTotalQuantity(newTotalQuantity);
    };
    const total = pistachioPrice * totalQuantity;
    return (
        <div className={styles.mainDiv}   >
            <div>
                <Carousel slidesToShow={1} autoplay autoplaySpeed={4500} speed={2000} className='productCarousel'>
                    <Image src={pista1} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={pista2} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={pista3} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={pista4} alt={`Image`} width={475} height={475} className={styles.image} />
                </Carousel>
            </div>
            <div className={styles.description}>
                <p className={styles.price}>Price : {pistachioPrice} Rs./KG</p>
                <div className={styles.buttonwrapper}>

                    <button onClick={() => buttonClick('250')} className={`${styles.packet} ${selectedButton === '250' ? styles.selected : ''}`}>250 Gram</button>
                    <button onClick={() => buttonClick('500')} className={`${styles.packet} ${selectedButton === '500' ? styles.selected : ''}`}>500 Gram</button>
                    <button onClick={() => buttonClick('1000')} className={`${styles.packet} ${selectedButton === '1000' ? styles.selected : ''}`}>1 KG</button>
                </div>

                <div className={styles.qty}>
                    <label htmlFor="quantity">Qty : </label>
                    <input type="number" id="quantity" name="quantity" value={quantity} onChange={handleQuantityChange} />
                </div>

                <div className={styles.totalQty}>
                    <label htmlFor="totalQuantity">Total Qty in Kilogram : </label>
                    <input type="number" id="totalQuantity" name="totalQuantity" value={totalQuantity} readOnly />
                </div>


                <div className={styles.total}>
                    <label htmlFor="total">Total Price : </label>
                    <input type="number" id="total" name="total" value={total} readOnly />
                </div>
                <div className={styles.orderButton}>
                    <button className={styles.btnOrder}>Add To Cart</button>
                    <button className={styles.btnOrder}>Place Order</button>
                </div>

            </div>
        </div>
    );
};

const CashewSlider: React.FC = () => {
    const [selectedButton, setSelectedButton] = useState<string>('');
    const [quantity, setQuantity] = useState<number>();
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [packetWeight, setPacketWeight] = useState('');

    const buttonClick = (value: React.SetStateAction<string>) => {
        setPacketWeight(value);
        setSelectedButton(value);
        setQuantity(0);
        setTotalQuantity(0);
        // console.log(`Selected value: ${value}`);
    };

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity);
        updateTotalQuantity(newQuantity, packetWeight);
        // console.log('Quantity:', newQuantity);
    };

    const updateTotalQuantity = (newQuantity: number, packetWeight: string) => {
        const valueMultiplier = parseInt(packetWeight) || 1;
        const newTotalQuantity = (newQuantity * valueMultiplier) / 1000;
        setTotalQuantity(newTotalQuantity);
    };
    const total = cahsewPrice * totalQuantity;
    return (
        <div className={styles.mainDiv}   >
            <div>
                <Carousel slidesToShow={1} autoplay autoplaySpeed={4500} speed={2000} className='productCarousel'>
                    <Image src={cashew1} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={cashew2} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={cashew3} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={cashew4} alt={`Image`} width={475} height={475} className={styles.image} />
                </Carousel>
            </div>
            <div className={styles.description}>
                <p className={styles.price}>Price : {cahsewPrice} Rs./KG</p>
                <div className={styles.buttonwrapper}>

                    <button onClick={() => buttonClick('250')} className={`${styles.packet} ${selectedButton === '250' ? styles.selected : ''}`}>250 Gram</button>
                    <button onClick={() => buttonClick('500')} className={`${styles.packet} ${selectedButton === '500' ? styles.selected : ''}`}>500 Gram</button>
                    <button onClick={() => buttonClick('1000')} className={`${styles.packet} ${selectedButton === '1000' ? styles.selected : ''}`}>1 KG</button>
                </div>

                <div className={styles.qty}>
                    <label htmlFor="quantity">Qty : </label>
                    <input type="number" id="quantity" name="quantity" value={quantity} onChange={handleQuantityChange} />
                </div>

                <div className={styles.totalQty}>
                    <label htmlFor="totalQuantity">Total Qty in Kilogram : </label>
                    <input type="number" id="totalQuantity" name="totalQuantity" value={totalQuantity} readOnly />
                </div>


                <div className={styles.total}>
                    <label htmlFor="total">Total Price : </label>
                    <input type="number" id="total" name="total" value={total} readOnly />
                </div>
                <div className={styles.orderButton}>
                    <button className={styles.btnOrder}>Add To Cart</button>
                    <button className={styles.btnOrder}>Place Order</button>
                </div>

            </div>
        </div>
    );
};


const AlmondSlider: React.FC = () => {
    const [selectedButton, setSelectedButton] = useState<string>('');
    const [quantity, setQuantity] = useState<number>();
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [packetWeight, setPacketWeight] = useState('');

    const buttonClick = (value: React.SetStateAction<string>) => {
        setPacketWeight(value);
        setSelectedButton(value);
        setQuantity(0);
        setTotalQuantity(0);
        // console.log(`Selected value: ${value}`);
    };

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity);
        updateTotalQuantity(newQuantity, packetWeight);
        // console.log('Quantity:', newQuantity);
    };

    const updateTotalQuantity = (newQuantity: number, packetWeight: string) => {
        const valueMultiplier = parseInt(packetWeight) || 1;
        const newTotalQuantity = (newQuantity * valueMultiplier) / 1000;
        setTotalQuantity(newTotalQuantity);
    };
    const total = almondPrice * totalQuantity;
    return (
        <div className={styles.mainDiv}   >
            <div>
                <Carousel slidesToShow={1} autoplay autoplaySpeed={4500} speed={2000} className='productCarousel'>
                    <Image src={almond1} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={almond2} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={almond1} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={almond4} alt={`Image`} width={475} height={475} className={styles.image} />
                </Carousel>
            </div>
            <div className={styles.description}>
                <p className={styles.price}>Price : {almondPrice} Rs./KG</p>
                <div className={styles.buttonwrapper}>

                    <button onClick={() => buttonClick('250')} className={`${styles.packet} ${selectedButton === '250' ? styles.selected : ''}`}>250 Gram</button>
                    <button onClick={() => buttonClick('500')} className={`${styles.packet} ${selectedButton === '500' ? styles.selected : ''}`}>500 Gram</button>
                    <button onClick={() => buttonClick('1000')} className={`${styles.packet} ${selectedButton === '1000' ? styles.selected : ''}`}>1 KG</button>
                </div>

                <div className={styles.qty}>
                    <label htmlFor="quantity">Qty : </label>
                    <input type="number" id="quantity" name="quantity" value={quantity} onChange={handleQuantityChange} />
                </div>

                <div className={styles.totalQty}>
                    <label htmlFor="totalQuantity">Total Qty in Kilogram : </label>
                    <input type="number" id="totalQuantity" name="totalQuantity" value={totalQuantity} readOnly />
                </div>


                <div className={styles.total}>
                    <label htmlFor="total">Total Price : </label>
                    <input type="number" id="total" name="total" value={total} readOnly />
                </div>
                <div className={styles.orderButton}>
                    <button className={styles.btnOrder}>Add To Cart</button>
                    <button className={styles.btnOrder}>Place Order</button>
                </div>

            </div>
        </div>
    );
};

const MedjoolSlider: React.FC = () => {
    const [selectedButton, setSelectedButton] = useState<string>('');
    const [quantity, setQuantity] = useState<number>();
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [packetWeight, setPacketWeight] = useState('');

    const buttonClick = (value: React.SetStateAction<string>) => {
        setPacketWeight(value);
        setSelectedButton(value);
        setQuantity(0);
        setTotalQuantity(0);
        // console.log(`Selected value: ${value}`);
    };

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity);
        updateTotalQuantity(newQuantity, packetWeight);
        // console.log('Quantity:', newQuantity);
    };

    const updateTotalQuantity = (newQuantity: number, packetWeight: string) => {
        const valueMultiplier = parseInt(packetWeight) || 1;
        const newTotalQuantity = (newQuantity * valueMultiplier) / 1000;
        setTotalQuantity(newTotalQuantity);
    };
    const total = medjoolDatesPrice * totalQuantity;
    return (
        <div className={styles.mainDiv}   >
            <div>
                <Carousel slidesToShow={1} autoplay autoplaySpeed={4500} speed={2000} className='productCarousel'>
                    <Image src={medjool1} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={medjool2} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={medjool3} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={medjool4} alt={`Image`} width={475} height={475} className={styles.image} />
                </Carousel>
            </div>
            <div className={styles.description}>
                <p className={styles.price}>Price : {medjoolDatesPrice} Rs./KG</p>
                <div className={styles.buttonwrapper}>

                    <button onClick={() => buttonClick('250')} className={`${styles.packet} ${selectedButton === '250' ? styles.selected : ''}`}>250 Gram</button>
                    <button onClick={() => buttonClick('500')} className={`${styles.packet} ${selectedButton === '500' ? styles.selected : ''}`}>500 Gram</button>
                    <button onClick={() => buttonClick('1000')} className={`${styles.packet} ${selectedButton === '1000' ? styles.selected : ''}`}>1 KG</button>
                </div>

                <div className={styles.qty}>
                    <label htmlFor="quantity">Qty : </label>
                    <input type="number" id="quantity" name="quantity" value={quantity} onChange={handleQuantityChange} />
                </div>

                <div className={styles.totalQty}>
                    <label htmlFor="totalQuantity">Total Qty in Kilogram : </label>
                    <input type="number" id="totalQuantity" name="totalQuantity" value={totalQuantity} readOnly />
                </div>


                <div className={styles.total}>
                    <label htmlFor="total">Total Price : </label>
                    <input type="number" id="total" name="total" value={total} readOnly />
                </div>
                <div className={styles.orderButton}>
                    <button className={styles.btnOrder}>Add To Cart</button>
                    <button className={styles.btnOrder}>Place Order</button>
                </div>

            </div>
        </div>
    );
};


const FardSlider: React.FC = () => {
    const [selectedButton, setSelectedButton] = useState<string>('');
    const [quantity, setQuantity] = useState<number>();
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [packetWeight, setPacketWeight] = useState('');

    const buttonClick = (value: React.SetStateAction<string>) => {
        setPacketWeight(value);
        setSelectedButton(value);
        setQuantity(0);
        setTotalQuantity(0);
        // console.log(`Selected value: ${value}`);
    };

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity);
        updateTotalQuantity(newQuantity, packetWeight);
        // console.log('Quantity:', newQuantity);
    };

    const updateTotalQuantity = (newQuantity: number, packetWeight: string) => {
        const valueMultiplier = parseInt(packetWeight) || 1;
        const newTotalQuantity = (newQuantity * valueMultiplier) / 1000;
        setTotalQuantity(newTotalQuantity);
    };
    const total = fardDatesPrice * totalQuantity;
    return (
        <div className={styles.mainDiv}   >
            <div>
                <Carousel slidesToShow={1} autoplay autoplaySpeed={4500} speed={2000} className='productCarousel'>
                    <Image src={fard1} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={fard2} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={fard3} alt={`Image`} width={475} height={475} className={styles.image} />
                    <Image src={fard3} alt={`Image`} width={475} height={475} className={styles.image} />
                </Carousel>
            </div>
            <div className={styles.description}>
                <p className={styles.price}>Price : {fardDatesPrice} Rs./KG</p>
                <div className={styles.buttonwrapper}>

                    <button onClick={() => buttonClick('250')} className={`${styles.packet} ${selectedButton === '250' ? styles.selected : ''}`}>250 Gram</button>
                    <button onClick={() => buttonClick('500')} className={`${styles.packet} ${selectedButton === '500' ? styles.selected : ''}`}>500 Gram</button>
                    <button onClick={() => buttonClick('1000')} className={`${styles.packet} ${selectedButton === '1000' ? styles.selected : ''}`}>1 KG</button>
                </div>

                <div className={styles.qty}>
                    <label htmlFor="quantity">Qty : </label>
                    <input type="number" id="quantity" name="quantity" value={quantity} onChange={handleQuantityChange} />
                </div>

                <div className={styles.totalQty}>
                    <label htmlFor="totalQuantity">Total Qty in Kilogram : </label>
                    <input type="number" id="totalQuantity" name="totalQuantity" value={totalQuantity} readOnly />
                </div>


                <div className={styles.total}>
                    <label htmlFor="total">Total Price : </label>
                    <input type="number" id="total" name="total" value={total} readOnly />
                </div>
                <div className={styles.orderButton}>
                    <button className={styles.btnOrder}>Add To Cart</button>
                    <button className={styles.btnOrder}>Place Order</button>
                </div>

            </div>
        </div>
    );
};





export { MazafatiSlider, KhalasSlider, FigsSlider, PistachioSlider, CashewSlider, AlmondSlider, MedjoolSlider, FardSlider };
