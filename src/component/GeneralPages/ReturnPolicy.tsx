'use client'
import styles from './ReturnPolicy.module.scss';

const ReturnPolicy: React.FC = () => {

    return (
        <div className={styles.returnPolicyContainer}>
            <div className={styles.detailsContainer}>
                <h1 className={styles.head}>Return Policy</h1>

                <div className={styles.details1}>
                    <div className={styles.p}>1. Return Process:</div> <br />
                    <h2>1.1 Initiating a Return:</h2>
                    <p>If you wish to return your order, please send an email to our customer service at <strong> mydryfruitinfo@gmail.com </strong> within 7 days of receiving the product. Include your order number, reason for return, and any relevant details.</p>
                    <br />
                    <h2>1.2 Courier Arrangement:</h2>
                    <p>Customers are responsible for arranging and covering the cost of the return courier. The returned product must be in its original condition.</p>
                </div>
                <div className={styles.details1}>
                    <div className={styles.p}>2. Return Criteria:</div> <br />
                    <h2>2.1 Time Frame:</h2>
                    <p>Returns must be initiated within 7 days of receiving the product. Any requests beyond this period will not be accepted.</p>
                </div>
                <div className={styles.details1}>
                    <div className={styles.p}>3. Refund Process:</div> <br />
                    <h2>3.1 Verification:</h2>
                    <p>Upon successful receipt of the returned product, we will verify its condition.</p>
                    <br />
                    <h2>3.2 Refund Initiation:</h2>
                    <p>If the return is approved, we will initiate the refund process. Refunds will be processed within 14 days of receiving the returned product.</p>
                </div>

                <div className={styles.details1}>
                    <div className={styles.p}>4. Unacceptable Return Methods:</div> <br />
                    <h2>4.1 WhatsApp and Phone Calls:</h2>
                    <p>Returns initiated through WhatsApp or phone calls will not be accepted. Customers must follow the specified email process for return requests.</p>
                </div>

                <div className={styles.details1}>
                    <div className={styles.p}>5. Policy Changes:</div> <br />
                    <p>Bitsshadow LLP reserves the right to update this Return Policy. Any changes will be communicated through our website or other appropriate channels.</p>
                </div>

            </div>
        </div>
    );
};

export default ReturnPolicy;
