'use client'
import styles from './PrivacyPolicy.module.scss';

const PrivacyPolicy: React.FC = () => {

    return (
        <div className={styles.privacyPolicyContainer}>

            <div className={styles.detailsContainer}>

                <h1 className={styles.head}>Privacy Policy</h1>
                <div className={styles.details1}>
                    <div className={styles.p}>1. INFORMATION WE COLLECT:</div> <br />

                    <h2>1.1 Personal Information:</h2>
                    <p>When you create an account or make a purchase, we may collect your name, email address, phone number, and billing/shipping address.</p>
                    <br />
                    <h2>1.2 Payment Information:</h2>
                    <p>  To process your orders, we collect payment information, including credit card details. This information is securely processed through our payment gateway partners.</p>
                    <br />
                    <h2> 1.3 Communication Data:</h2>
                    <p>We may collect information when you communicate with us, such as through customer support, email, or chat. This may include records of your interactions and correspondence with us.</p>
                    <br />
                    <h2>1.4 Website Usage Information:</h2>
                    <p>We gather information about how you navigate and use our website, including IP addresses, browser types, and device information. This helps us enhance your user experience and improve our services.</p>
                </div>


                <div className={styles.details1}>
                    <div className={styles.p}>2. How We Use Your Information:</div> <br />

                    <h2>2.1 Order Processing:</h2>
                    <p>We use your personal and payment information to process and fulfill your orders. This includes shipping, tracking, and communicating with you regarding your purchase.</p>
                    <br />
                    <h2>2.2 Customer Support:</h2>
                    <p> The information you provide helps us address your inquiries, resolve issues, and offer customer support services 24/7.</p>
                    <br />
                    <h2>2.3 Marketing and Promotions:</h2>
                    <p>With your consent, we may use your email address to send you promotional materials, newsletters, or updates about our products and services.</p>
                    <br />
                    <h2>2.4 Security and Fraud Prevention:</h2>
                    <p>We employ industry-standard security measures to protect your information from unauthorized access, and we may use your data to detect and prevent fraudulent activities.</p>
                </div>


                <div className={styles.details1}>
                    <div className={styles.p}>3. Third-Party Services:</div> <br />
                    <h2>3.1 Payment Gateways:</h2>
                    <p>Your payment information is securely processed by reputable third-party payment gateways. We do not store or have direct access to your credit card details.</p>
                    <br />
                    <h2>3.2 Analytics:</h2>
                    <p>We may use analytics services to understand how users interact with our website. These services may collect and analyze data to improve our site functionality.</p>
                </div>


                <div className={styles.details1}>
                    <div className={styles.p}>4. Your Choices and Rights:</div> <br />
                    <h2>4.1 Opt-Out:</h2>
                    <p>You can opt-out of receiving promotional emails by following the instructions in the emails or contacting us directly.</p>
                    <br />
                    <h2>4.2 Access and Correction:</h2>
                    <p>You have the right to access and correct your personal information. You can update your account details or contact us for assistance.</p>
                </div>

                <div className={styles.details1}>
                    <div className={styles.p}>5. Security:</div> <br />
                    <p>We prioritize the security of your information and employ industry-standard measures to protect it from unauthorized access, disclosure, alteration, and destruction.</p>
                </div>

                <div className={styles.details1}>
                    <div className={styles.p}>6. Changes to the Privacy Policy:</div> <br />
                    <p>You can opt-out of receiving promotional emails by following the instructions in the emails or contacting us directly.</p>
                </div>

                <div className={styles.details1}>
                    <div className={styles.p}>7. Contact Us:</div> <br />
                    <p>If you have any questions or concerns about this Privacy Policy, please contact us at +91 9157059719.</p>
                </div>


            </div>

        </div>
    );
};

export default PrivacyPolicy;
