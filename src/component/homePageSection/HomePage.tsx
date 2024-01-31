import styles from './HomePage.module.scss';
import HomePageSlider from './HomePageSlider';

const whatsappLink = 'https://wa.me/+919157059719';
const HomePage = () => {

    return (
        <div className={styles.home}>
            <HomePageSlider />
            <div className={styles.p}>
                <p className={styles.p1}>Start Your Dry With Our </p>
                <p className={styles.p2}> Fresh Dryfruits....</p>
            </div>

            <a href={whatsappLink}><button className={styles.rightSection}><span>Chat with us</span></button></a>
        </div>
    );
};

export default HomePage;




