import styles from './BestSellingProducts.module.scss';

const BestSelling = () => {
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <p className={styles.head}>Our Best Selling Products</p>
                <p className={styles.description}>Indulge in exquisite luxury with our best-selling dry fruit medley, a harmonious blend of premium nuts and dried fruits. Elevate your snacking experience with a delectable combination thats rich in flavor and packed with wholesome goodness.</p>
            </div>
        </div>
    );
};
export default BestSelling;
