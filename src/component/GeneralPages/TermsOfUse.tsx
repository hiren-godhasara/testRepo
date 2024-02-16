import styles from './TermsOfUse.module.scss';

const TermsOfUse: React.FC = () => {

    return (
        <div className={styles.privacyPolicyContainer}>

            <div className={styles.detailsContainer}>

                <h1 className={styles.head}>Terms Of Uses</h1>

                <div className={styles.details1}>
                    <div className={styles.p}>Acceptance of Terms:</div>
                    <p>By using MyDryFruit.com, you acknowledge that you have read, understood, and agree to be bound by these terms of use. These terms may be updated from time to time, and your continued use of the website constitutes acceptance of any modifications.</p>
                </div>

                <div className={styles.details1}>
                    <div className={styles.p}>Online Shopping:</div>
                    <p>MyDryFruit.com provides an online platform for users to purchase a variety of dry fruits. By placing an order on our website, you agree to provide accurate and up-to-date information, including payment information.</p>
                </div>

                <div className={styles.details1}>
                    <div className={styles.p}>Razorpay Payment Gateway:</div>
                    <p>MyDryFruit.com uses the Razorpay payment gateway to process online transactions. Your use of the Razorpay service is governed by Razorpay&apos;s terms of service, which can be found on their official website.</p>
                </div>

                <div className={styles.details1}>
                    <div className={styles.p}>User Account:</div>
                    <p>To make a purchase on MyDryFruit.com, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account information, including your username and password. You agree to accept responsibility for all activities that occur under your account.</p>
                </div>

                <div className={styles.details1}>
                    <div className={styles.p}>Product Information:</div>
                    <p>While we strive to provide accurate product information, MyDryFruit.com does not warrant the accuracy, completeness, or reliability of any product descriptions, prices, or other content on the website. If you encounter discrepancies, please contact our customer support team.</p>
                </div>

                <div className={styles.details1}>
                    <div className={styles.p}>Intellectual Property:</div>
                    <p>All content on MyDryFruit.com, including text, graphics, logos, images, and software, is the property of MyDryFruit.com and is protected by intellectual property laws. You may not use, reproduce, distribute, or create derivative works based on this content without explicit permission.</p>
                </div>

                <div className={styles.details1}>
                    <div className={styles.p}>Limitation of Liability:</div>
                    <p>MyDryFruit.com is not liable for any direct, indirect, incidental, consequential, or special damages arising out of or in any way connected with the use of our website or the products purchased through the website.</p>
                </div>

                <div className={styles.details1}>
                    <div className={styles.p}>Privacy Policy:</div>
                    <p>Your use of MyDryFruit.com is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information. Please review our Privacy Policy to understand our practices.</p>
                </div>

                <div className={styles.details1}>
                    <div className={styles.p}>Termination of Access:</div>
                    <p>MyDryFruit.com reserves the right to terminate or suspend your access to the website, without notice, for any reason, including, but not limited to, a breach of these terms of use.</p>
                </div>

                <div className={styles.details1}>
                    <div className={styles.p}>Contact Information:</div>
                    <p>If you have any questions or concerns about these terms of use, please contact us at <strong>mydryfruitinfo@gmail.com.</strong> </p>
                </div>

                <div className={styles.details1}>
                    <div className={styles.strong}>Thank you for choosing MyDryFruit.com! Happy shopping!</div>
                </div>

            </div>

        </div>
    );
};

export default TermsOfUse;
