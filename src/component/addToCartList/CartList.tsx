import { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './CartList.module.scss';
import { useRouter } from 'next/navigation';

interface Product {
    totalCartValue: any;
    userData: any;
    map(arg0: (data: any) => import("react").JSX.Element): import("react").ReactNode;
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

    const userId = "65c4afc25938e4bfeab6fef4"

    useEffect(() => {
        fetch('http://localhost:3001/s/cartProduct/cartProductList/65c4afc25938e4bfeab6fef4', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),

        })
            .then(response => {
                console.log(response);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.data);
                setProductDetails(data.data);
            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
            });
    }, []);




    return (
        <div className={styles.cardContainer}>
            {productDetails && productDetails.productList.map((item: any, index: any) => {
                return (
                    <div key={index} className={styles.productCard}>
                        <img
                            src={item.product.imageUrl[0].location}
                            alt={item.product.name}
                            width={imageWidth}
                            height={imageHeight}
                        />
                        <div className={styles.productInfo}>
                            <h3>{item.product.name}</h3>
                            <p>Weight: {item.product.weight}</p>
                            <p>Price: ${item.product.price}</p>
                            <p>Quantity: {item.qty}</p>
                        </div>
                    </div>
                );
            })}
            {productDetails && <div>  total :<strong>{productDetails.totalCartValue}</strong> </div>}
        </div>
    );

};

export default CartList;
