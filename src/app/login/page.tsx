import GoogleLogin from '@/component/googleLogin/GoogleLogin';
import LoginForm from '@/component/registrationUser/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';

export const metadata = {
    title: "My Dry Fruit-Login",
    keywords: "dry fruits online, online shopping, online shopping sites, online shopping india, shopping, dry fruits, online shoping, shop, almonds, cashews, pistachios, online shopping websites, online shopping sites in india, online shopping in india, online dry fruit shopping, dry fruit store, buy dry fruits online, online dry fruit shop, dry fruit delivery, dry fruit offers, best online shopping sites",
    description: "MyDryFruit.com is your premier destination for online shopping of dry fruits including almonds, cashews, and pistachios. We offer a wide range of high-quality dry fruits sourced from trusted suppliers. Enjoy the convenience of shopping online for your favorite dry fruits with free cash on delivery and free shipping options available. Explore our extensive selection today and experience the goodness of premium dry fruits delivered straight to your doorstep.",
};
export default function Cart() {
    return (
        <div>
            <GoogleOAuthProvider clientId="1027485564712-nm6m9eifqopa3eqq2pnmj83vljb0e74c.apps.googleusercontent.com">
                <GoogleLogin />
                <LoginForm />
            </GoogleOAuthProvider>
        </div>
    );
}



