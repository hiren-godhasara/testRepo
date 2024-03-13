
const shippingCharge = (wt: any) => {
    let totalShippingCharge: any = 0;
    if (wt <= 0.5) {
        totalShippingCharge = 60;
    } else if (wt > 0.5 && wt <= 1) {
        totalShippingCharge = 100;
    } else {
        totalShippingCharge = 150;
    }

    return totalShippingCharge;
}

export default shippingCharge;