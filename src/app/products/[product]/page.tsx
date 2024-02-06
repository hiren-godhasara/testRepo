'use client'
import CartAlmond from '@/component/cartAlmond/CartAlmomd';
import CartCashew from '@/component/cartCashew/CartCashew';
import CartFardDates from '@/component/cartFardDates/CartFard';
import CartFigs from '@/component/cartFigs/CartFigs';
import CartKhalasDates from '@/component/cartKhalasDates/CartKhalasDates';
import CartMazafatDates from '@/component/cartMazafatiDates/CartMazafatiDates';
import CartMedjoolDates from '@/component/cartMedjoolDates/CartMedjool';
import CartPistachio from '@/component/cartPistachio/CartPistachio';
import CopyRight from '@/component/copyRight/CopyRight';
import Footer from '@/component/footer/Footer';
import Header from '@/component/headerSection/Header';

import React from 'react';

interface CartProps {
    params: any;
    key: any;
}

const Cart: React.FC<CartProps> = (key) => {
    return (
        <div>
            <div id='header'><Header /></div>
            {key.params.product === 'almond' && <CartAlmond />}
            {key.params.product === 'cashew' && <CartCashew />}
            {key.params.product === 'pistachio' && <CartPistachio />}
            {key.params.product === 'figs' && <CartFigs />}
            {key.params.product === 'mazafatiDates' && <CartMazafatDates />}
            {key.params.product === 'khalasDates' && <CartKhalasDates />}
            {key.params.product === 'fardDates' && <CartFardDates />}
            {key.params.product === 'medjoolDates' && <CartMedjoolDates />}
            <Footer />
            <CopyRight />
        </div>
    );
}

export default Cart;




