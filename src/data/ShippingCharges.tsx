
const shippingCharge = (wt: any) => {
    let totalShippingCharge: any = 0;
    if (wt <= 0.5) {
        totalShippingCharge = 60;
    } else if (wt > 0.5 && wt <= 1) {
        totalShippingCharge = 100;
    } else if (wt > 1 && wt <= 2) {
        totalShippingCharge = 180;
    } else {
        totalShippingCharge = 250;
    }

    return totalShippingCharge;
}

export default shippingCharge;