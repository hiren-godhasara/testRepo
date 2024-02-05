import Image from 'next/image';
import styles from './StoreDetails.module.scss';
import image from '../../imageFolder/Union.png'

const Storing: React.FC = () => {
    const imageWidth = 519
    const imageHeight = 556
    return (
        <div className={styles.home}>

            <div className={styles.main}>

                <div className={styles.left}>
                    <p className={styles.p}>Storing Your Favourite Dates,Dry Fruits And Nuts</p>
                    <ul>
                        <li>For immediate usage, store these products in airtight containers at cool, dark spot reducing the exposure of light, oxygen and moisture</li>
                        <li>Do not expose to heat as it may go rancid or create grounds for soft bodied animals</li>
                        <li>For longer user, keep it refrigerated giving it the right taste and more flavourful vibrant to these tasteful Products.</li>
                    </ul>
                </div>

                <div className={styles.right}>
                    <div className={styles.layer}>
                        <p className={styles.layerText}>Dry Fruits And Nuts</p>
                    </div>
                    <Image src={image} alt='' width={imageWidth} height={imageHeight} className={styles.image} />

                </div>


            </div>

        </div>
    );
};

export default Storing;





