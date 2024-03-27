'use client'
import { Suspense, useEffect, useState } from 'react';
import styles from './OrderAddress.module.scss';
import { getUserId } from '@/getLocalStroageUserId';
import { useRouter, useSearchParams } from 'next/navigation';
import { getToken } from '@/getLocalStroageToken';
import Image from 'next/image';
import emptyCart from '../../imageFolder/emptyCart1-removebg-preview.png'
// import useTokenExpiration from '@/userTokenExpiration';
import headerCompanyLogo from '../../imageFolder/mdfLogo.png';
import { ToastNotifications, showSuccessToast, showErrorToast } from '../../toastNotifications'
import { Spin } from 'antd';
import Loader from '../loader/Loader';


declare global {
    interface Window {
        Razorpay: any;
    }
}
interface EditFormData {
    firstName: string;
    lastName: string;
    mobile: string;
    pincode: string;
    city: string;
    addressLine1: string;
    addressLine2: string;
    state: string;
    country: string;
    addressType: string;
    countryCode: any;
}

interface Address {
    _id: string;
    firstName: string;
    lastName: string;
    mobile: string;
    pincode: string;
    city: string;
    addressLine1: string;
    addressLine2: string;
    state: string;
    country: string;
    addressType: string;
    countryCode: any;
}

const PlaceOrders = () => {
    const [userData, setUserData] = useState<any>({});
    const [cartProducts, setCartProducts] = useState([]);
    const [orderId, setOrderId] = useState('');
    const [orderAmount, setOrderAmount] = useState();
    const [paymentMethod, setPaymentMethod] = useState('online');
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [address, setAddress] = useState<Address[]>([]);
    const [cartData, setCartData] = useState<any>('');
    const userId = getUserId();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [addressIdToDelete, setAddressIdToDelete] = useState(null);
    // const prodId = useSearchParams().get('productId');
    // const qtys = useSearchParams().get('qtys');
    // const totalOrderCartValue = useSearchParams().get('totalOrderCartValue');
    const [editAddressId, setEditAddressId] = useState<string | null>(null);
    const [editFormVisible, setEditFormVisible] = useState(false);
    const router = useRouter();
    // useTokenExpiration(token);
    const [loading, setLoading] = useState(true);
    const [tokenData, setTokenData] = useState(false);
    const [TotalOrderCartValue, setTotalOrderCartValue] = useState(false);
    const [formShow, setFormShow] = useState<any>();

    const token = getToken();

    useEffect(() => {
        if (token) {
            setTokenData(true);
        } else {
            router.push('/login');
        }
    }, [router]);

    const prodId = typeof window !== 'undefined' ? localStorage.getItem('productId') : null;
    const qtys = typeof window !== 'undefined' ? localStorage.getItem('qtys') : null;
    const totalOrderCartValue: any = typeof window !== 'undefined' ? localStorage.getItem('totalOrderCartValue') : null;
    useEffect(() => {
        const storedTotalOrderCartValue = typeof window !== 'undefined' ? localStorage.getItem('totalOrderCartValue') : null;
        if (!totalOrderCartValue) {
            setTotalOrderCartValue(storedTotalOrderCartValue !== null);
        }
    }, [totalOrderCartValue]);


    useEffect(() => {
        if (!totalOrderCartValue) {
            router.push("/");
        }
    }, [totalOrderCartValue, router]);

    const totalShippingCharge: any = typeof window !== 'undefined' ? localStorage.getItem('totalShippingCharge') : null;
    const val1 = parseFloat(totalOrderCartValue)
    const val2 = parseFloat(totalShippingCharge)
    const val3 = parseFloat("35")

    const [editFormData, setEditFormData] = useState<EditFormData>({
        firstName: '',
        lastName: '',
        mobile: '',
        pincode: '',
        city: '',
        addressLine1: '',
        addressLine2: '',
        countryCode: '+91',
        state: '',
        country: '',
        addressType: ''
    });

    const userDatas: any = typeof window !== 'undefined' ? localStorage.getItem('userData') : null;
    const userDetails = JSON.parse(userDatas)

    const [formData, setFormData] = useState({
        userId: userId || '',
        firstName: userDetails ? userDetails.firstName : '',
        lastName: userDetails ? userDetails.lastName : '',
        // mobile: userDetails ? userDetails.mobile : '',
        mobile: userDetails && userDetails.mobile ? userDetails.mobile : '',
        pincode: '',
        city: '',
        addressLine1: '',
        addressLine2: '',
        countryCode: '+91',
        state: '',
        country: '',
        addressType: 'Home'

    });

    const handleEditCancel = () => {
        setEditFormData({
            firstName: '',
            lastName: '',
            mobile: '',
            pincode: '',
            city: '',
            addressLine1: '',
            addressLine2: '',
            countryCode: '+91',
            state: '',
            country: '',
            addressType: ''
        });
        setEditFormVisible(false);
    };

    const handleEdit = (addressId: any) => {
        const selectedAddress = address.find((e: any) => e._id === addressId);
        if (selectedAddress) {
            setEditFormData({
                firstName: selectedAddress.firstName,
                lastName: selectedAddress.lastName,
                mobile: selectedAddress.mobile,
                pincode: selectedAddress.pincode,
                city: selectedAddress.city,
                addressLine1: selectedAddress.addressLine1,
                state: selectedAddress.state,
                country: selectedAddress.country,
                addressType: selectedAddress.addressType,
                addressLine2: selectedAddress.addressLine2,
                countryCode: selectedAddress.countryCode,
            });
            setEditAddressId(addressId);
        }
        setEditFormVisible(true);
    };

    const handleEditChange = (e: any, isEditForm: boolean) => {
        const { name, value, type, checked } = e.target;
        if (name === 'mobile' && isNaN(value)) {
            return;
        }
        if (name === 'pincode' && isNaN(value)) {
            return;
        }
        if (isEditForm) {
            setEditFormData((prevEditFormData: any) => ({
                ...prevEditFormData,
                [name]: type === 'radio' ? (checked ? value : prevEditFormData[name]) : value,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleCheckMobile: any = () => {
        const mobileRegex = /^[1-9]\d{9}$/;
        const mobile = mobileRegex.test(formData.mobile);
        if (mobile === false) {
            showErrorToast('Invalid mobile number');
            return false
        }
        return true
    }
    const handleCheckPincode: any = async () => {
        const response = await fetch(`https://api.postalpincode.in/pincode/${formData.pincode}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data[0].Status === "Error") {
            showErrorToast('Invalid pinCode numbers');
            return 'invalid';
        }
        if (data[0].Status === "Success") {
            return 'valid';
        }
    }
    const handleEditCheckMobile: any = () => {
        const mobileRegex = /^[1-9]\d{9}$/;
        const mobile = mobileRegex.test(editFormData.mobile);
        if (mobile === false) {
            showErrorToast('Invalid mobile number');
            return false
        }
        return true
    }

    const handleEditCheckPincode: any = async () => {
        const response = await fetch(`https://api.postalpincode.in/pincode/${editFormData.pincode}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data[0].Status === "Error") {
            showErrorToast('Invalid pinCode numbers');
            return 'invalid';
        }
        if (data[0].Status === "Success") {
            return 'valid';
        }
    }


    const handleEditSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (!handleEditCheckMobile()) {
                return;
            }
            const pincodeCheckResult = await handleEditCheckPincode();
            if (pincodeCheckResult === 'invalid') {
                return;
            }
            if (!editAddressId) {
                console.error('No addressId found for edit.');
                return;
            }
            const response = await fetch(`${process.env.BASE_URL}/s/address/${editAddressId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,

                },
                body: JSON.stringify(editFormData),
            });

            if (response.ok) {

            } else {
                console.error('Failed to update form data');
            }
        } catch (error: any) {
            console.error('Error updating form data:', error.message);
        }
        fetchAddressData();
        setEditFormVisible(false);
        setEditAddressId(null);
    };



    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (name === 'mobile' && isNaN(value)) {
            return;
        }
        if (name === 'pincode' && isNaN(value)) {
            return;
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const fetchAddressData = () => {
        setLoading(true);

        fetch(`${process.env.BASE_URL}/s/address/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({}),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.length !== 0) {
                    setShowAddressForm(false)
                } else {
                    setShowAddressForm(true)
                }
                setAddress(data.data)

            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
            }).finally(() => {
                setLoading(false);

            });
    };

    useEffect(() => {
        fetchAddressData();
    }, []);
    console.log(address?.length);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (
            formData.firstName.trim() === '' ||
            formData.lastName.trim() === '' ||
            // formData.pincode.trim() === '' ||
            formData.countryCode.trim() === '' ||
            // formData.mobile.trim() === '' ||
            formData.state.trim() === '' ||
            formData.addressLine1.trim() === '' ||
            formData.city.trim() === '' ||
            formData.addressType.trim() === ''
        ) {
            showErrorToast("Fill all mandetory field")
            return;
        }
        try {
            if (!handleCheckMobile()) {
                return;
            }
            const pincodeCheckResult = await handleCheckPincode();
            if (pincodeCheckResult === 'invalid') {
                return;
            }
            setLoading(true);
            const response = await fetch(`${process.env.BASE_URL}/s/address`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {

            } else {
                console.error('Failed to send form data');
            }
        } catch (error: any) {
            console.error('Error sending form data:', error.message);
        } finally {
            setLoading(false);
        }
        setFormData({
            userId: userId || '',
            firstName: '',
            lastName: '',
            mobile: '',
            pincode: '',
            city: '',
            addressLine1: '',
            addressLine2: '',
            countryCode: '+91',
            state: '',
            country: '',
            addressType: ''
        });
        fetchAddressData();
        toggleAddressForm()

    };

    const handleReset = () => {
        setFormData({
            userId: '',
            firstName: '',
            lastName: '',
            mobile: '',
            pincode: '',
            city: '',
            addressLine1: '',
            addressLine2: '',
            countryCode: '+91',
            state: '',
            country: '',
            addressType: ''
        });

    };


    // const handleCheckboxChange = (addressId: string) => {
    //     setSelectedAddress((prevSelected) => {
    //         if (prevSelected === addressId) {
    //             return null;
    //         } else {
    //             return addressId;
    //         }
    //     });
    // };

    // useEffect(() => {
    //     // Set the selected address to the first address in the array if it exists
    //     if (address && address.length > 0) {
    //         setSelectedAddress(address[0]._id);
    //     }
    // }, [address]);

    useEffect(() => {
        if (address && address.length > 0) {
            setSelectedAddress(address[address.length - 1]._id);
        }
    }, [address]);

    const handleCheckboxChange = (addressId: any) => {
        setSelectedAddress(prevSelected => (prevSelected === addressId ? null : addressId));
    };

    const toggleAddressForm = () => {
        setShowAddressForm(!showAddressForm);
    };

    const DeleteCartAddress = (addressId: any) => {
        fetch(`${process.env.BASE_URL}/s/address/${addressId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({}),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                fetchAddressData();
                return response.json();
            })
            .then(data => {

            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const codCharge = paymentMethod === 'cod' ? val3 : 0;
    const handleOrder = () => {
        const obj = {
            userId,
            productId: prodId,
            qty: qtys,
            shippingAddressId: selectedAddress,
            billingAddressId: selectedAddress,
            totalCartValue: totalOrderCartValue,
            shippingCharge: 0,
            codCharge

        };

        return fetch(`${process.env.BASE_URL}/s/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(obj),
        }).then(async response => {
            if (!response.ok) {
                showErrorToast(`Status Code ${response.status} : ${response.statusText}`)
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            setOrderAmount(data.data.orderData.orderAmount)

            setOrderId(data.data.orderData._id)


            setSelectedAddress(null);
            // showSuccessToast(data.message);
            return data.data.orderData
        }).catch(error => {
            console.error('There was a problem with the fetch operation:', error);

        });
    }


    const handlePayment = async (e: any) => {
        setLoading(true);

        return fetch(`${process.env.BASE_URL}/s/order/payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                amount: e,
                currency: 'INR'

            }),
        }).then(async response => {
            if (response.ok) {
                const responseData = await response.json();
                return responseData
            }
        }).finally(() => {
            setLoading(false);

        })

    };

    const openPaymentGateway = (razorpayData: any, _ID: any) => {

        fetch(`${process.env.BASE_URL}/s/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(data => {
                setUserData(data.data)

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        const options: any = {
            key: process.env.RAZOR_PAY_KEYID,
            amount: razorpayData.data.amount,
            currency: razorpayData.data.currency,
            name: 'MY DRY FRUIT',
            image: 'https://mydryfruit.s3.ap-northeast-1.amazonaws.com/mdfLogo.png',
            description: 'Payment for Order',
            order_id: razorpayData.data.id,
            prefill: {
                name: userData.firstName + userData.lastName,
                email: userData.email,
                contact: userData.mobile,
            },
            notes: {
                address: 'User Address',
            },
            theme: {
                color: '#144950',
            },
            handler: async function (response: any) {

                if (response) {
                    // const res = await handleStatusUpdate(_ID)
                    const success = await handleSuccess(response, _ID)

                    router.push('/orderList');
                    // window.location.href = '/orderList'

                    localStorage.removeItem("productId")
                    localStorage.removeItem("qtys")
                    localStorage.removeItem("totalOrderCartValue")
                    localStorage.removeItem("totalShippingCharge")

                }

            },
            modal: {
                ondismiss: async function () {

                    router.push('/');
                    localStorage.removeItem("productId")
                    localStorage.removeItem("qtys")
                    localStorage.removeItem("totalOrderCartValue")
                    localStorage.removeItem("totalShippingCharge")
                    const orderData = await handleIsOrderUpdate(_ID)


                    if (!orderData) return;
                    await updateCartStatus(orderData)

                }
            }
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();

        razorpayInstance.on('payment.failed', function (e: any) {
            showErrorToast(e.error.description)
        })
    }
    const updateCartStatus = (orderData: any) => {
        for (let i = 0; i < orderData.data.productList.length; i++) {
            const cartId = orderData.data.productList[i].cartProductId._id

            return fetch(`${process.env.BASE_URL}/s/cartProduct/${cartId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    isOrder: false,

                }),
            })
                .then(async response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {

                    return data;
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });

        }
    }
    const handleIsOrderUpdate = (_ID: any) => {



        return fetch(`${process.env.BASE_URL}/s/order/${_ID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {

                return data;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
    const handleStatusUpdate = (_ID: any, id: any) => {

        return fetch(`${process.env.BASE_URL}/s/order/${_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                paymentStatus: "paid",
                trackingStatus: "pending",
                razorpay_order_id: id,
            }),
        })
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {

                return data;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }




    const handleSuccess = (response: any, mongoOrderId: any) => {
        console.log(response, 'response');
        console.log(mongoOrderId, 'mongoOrderId');


        return fetch(`${process.env.BASE_URL}/s/order/payment-success/${mongoOrderId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                "razorpay_payment_id": response.razorpay_payment_id,
                "razorpay_order_id": response.razorpay_order_id,
                "razorpay_signature": response.razorpay_signature
            }),
        })
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                handleStatusUpdate(mongoOrderId, data.data.razorpay_order_id)

                return data;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }

    const orderAndPayment = async () => {
        try {
            setLoading(true);

            const mongoOrderId = await handleOrder();
            const _ID = await mongoOrderId._id

            if (!_ID) {
                throw new Error('orderId not found.')
            }

            const razorpayResponse = await handlePayment(mongoOrderId.totalOrderValue);
            if (!razorpayResponse.data.id) {
                throw new Error('please try adain later.')
            }
            openPaymentGateway(razorpayResponse, _ID)

        } catch (error) {
            console.error('Order and payment process failed:', error);
        } finally {
            setLoading(false);

        }
    };

    const handleRemove = (addressId: any) => {
        DeleteCartAddress(addressId);
        setShowConfirmation(false);
    };

    const showConfirmationDialog = (addressId: any) => {
        setAddressIdToDelete(addressId);
        setShowConfirmation(true);
    };

    const closeConfirmationDialog = () => {
        setShowConfirmation(false);
    };

    const handleNewAddress = () => {
        setShowAddressForm(true)
    }
    const handleStatusCOD = (mongoOrderId: any,) => {
        console.log(mongoOrderId, 'mongoOrderId');

        return fetch(`${process.env.BASE_URL}/s/order/${mongoOrderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                paymentStatus: "cod",
                trackingStatus: "pending",
            }),
        })
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                router.push('/orderList');
                return data;

            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }

    const OnShopBtn = async () => {
        console.log(orderId);
        setLoading(true)
        try {
            const orderId = await handleOrder();
            console.log(orderId);
            if (!orderId._id) {
                throw new Error('orderId not found.')
            }
            localStorage.removeItem("productId")
            localStorage.removeItem("qtys")
            localStorage.removeItem("totalOrderCartValue")
            localStorage.removeItem("totalShippingCharge")
            const statusCod = await handleStatusCOD(orderId._id);

            router.push('/orderList');
            if (!statusCod) {
                throw new Error('please try adain later.')
            }

        } catch (error) {
            console.error('Order  failed:', error);
        } finally {
            setLoading(false)
        }

    }

    const handleCheckbox = (method: any) => {
        setPaymentMethod(method);
    };

    const handleClick = paymentMethod === 'online' ? orderAndPayment : OnShopBtn;



    const indianStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
        'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
        'Lakshadweep', 'Delhi', 'Puducherry'
    ];

    return (

        <div className={styles.CenteredContainer}>
            {loading ? (
                <div className={styles.loaderContainer}>
                    {/* <Spin size="large" /> */}
                    <Loader />
                </div>
            ) : (
                <>
                    {token &&
                        <div className={styles.selectedAdd}>
                            {/* <div className={styles.grandtotal}>Total<span>{totalOrderCartValue} ₹</span> </div>
                                <div className={styles.grandtotal1}>Shipping Charge<span>{totalShippingCharge} ₹</span> </div> */}

                            {(paymentMethod === 'online') && <div className={styles.ttl11}>
                                <p>Total Order Value<span>₹{totalOrderCartValue} </span></p>
                                <p>Shipping Charge<span>₹{totalShippingCharge} </span></p>
                                <div>Total Order Value<span>₹{val1 + val2} </span></div>
                            </div>
                            }

                            {(paymentMethod === 'cod') && < div className={styles.ttl}>
                                <p>Total Order Value<span>₹{totalOrderCartValue} </span></p>
                                <p>Shipping Charge<span>₹{totalShippingCharge} </span></p>
                                <p>COD Charge<span>₹{val3} </span></p>
                                <div>Total Order Value<span> ₹{val1 + val2 + val3} </span></div>
                            </div>
                            }
                            <div className={styles.deliverAddress1}>Payment Method</div>
                            <div className={styles.radioInputs}>
                                <label>
                                    <input className={styles.radioInput} checked={paymentMethod === 'online'} onChange={() => handleCheckbox('online')} type="radio" name="engine" />
                                    <span className={styles.radioTile}>
                                        <span className={styles.radioLabel}>Online Payment</span>
                                        <span className={styles.radioIcon}>Card payment, UPI payment, and Net banking are available.
                                        </span>
                                    </span>
                                </label>
                                <label>
                                    <input checked={paymentMethod === 'cod'} onChange={() => handleCheckbox('cod')} className={styles.radioInput} type="radio" name="engine" />
                                    <span className={styles.radioTile}>
                                        <span className={styles.radioLabel}>
                                            Cash On Delivery

                                        </span>
                                        <span className={styles.radioIcon}>Note:Additional ₹35/- COD charge will be applied for this option.
                                        </span>
                                    </span>
                                </label>
                            </div>
                            {/* <div className={styles.deliverAddress}>PAYMENT METHOD</div>
                            <div className={styles.cod}>
                                <p>
                                    <input
                                        type="checkbox"
                                        checked={paymentMethod === 'online'}
                                        onChange={() => handleCheckbox('online')}
                                        style={{ cursor: 'pointer' }}
                                    />Online Payment
                                </p>
                                <p>
                                    <input
                                        type="checkbox"
                                        checked={paymentMethod === 'cod'}
                                        onChange={() => handleCheckbox('cod')}
                            
                                        style={{ cursor: 'pointer' }}
                                    />
                                    Cash On Delivery
                                    <span>(Note:Additional ₹35/- COD charge will be applied for this option.) </span>
                                </p>
                            
                            </div> */}


                            <div className={styles.deliverAddress}>Delivery Address</div>

                            <div className={styles.preAddress}>
                                {address && address.map((e: any) => (
                                    <div className={`${styles.addressCard} ${selectedAddress === e._id ? styles.selectedAddress : ''}`} key={e._id}>
                                        <label className={styles.container}>
                                            <input
                                                type="checkbox"
                                                name="selectedAddress"
                                                checked={selectedAddress === e._id}
                                                onChange={() => handleCheckboxChange(e._id)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                            <span className={styles.checkmark}></span>
                                        </label>

                                        <div className={styles.addressContent}>
                                            <p className={styles.fullName}>
                                                {e.firstName} {e.lastName}, Mo. {e.mobile}
                                            </p>
                                            <p className={styles.addressDetails}>
                                                {e.addressLine1}{e.addressLine2}, {e.pincode}
                                            </p>
                                            <p className={styles.addressDetails}>
                                                {e.city}, {e.state}, {e.country}
                                            </p>
                                            <p className={styles.addressType}>Address Type: {e.addressType}</p>
                                        </div>
                                        <div className={styles.buttons}>
                                            <button className={styles.removeAdd} type="button" onClick={() => handleEdit(e._id)}>Edit</button>
                                            <button
                                                className={styles.removeAdd}
                                                type="button"
                                                onClick={() => showConfirmationDialog(e._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>


                                ))}
                            </div>
                            <p className={styles.toggleP} onClick={() => handleNewAddress()}>+ Add New Address</p>
                            {showConfirmation && (
                                <>
                                    <div className={styles.over}>
                                        <div className={styles.modalDel}>
                                            <p>Are you sure to delete the address?</p>
                                            <div className={styles.btns}>
                                                <button onClick={() => handleRemove(addressIdToDelete)}>Yes</button>
                                                <button onClick={closeConfirmationDialog}>No</button>
                                            </div>
                                        </div>
                                    </div>
                                </>

                            )}




                            {(showAddressForm || (address === undefined)) && (
                                <div className={`${styles.overlay} ${styles.OrderAddressContainer}`}>
                                    <div className={styles.popup}>
                                        <h1 className={styles.h1}>ADDRESS DETAILS</h1>

                                        <form onSubmit={handleSubmit}>
                                            <div className={styles.firstRow}>
                                                <div>
                                                    <label>First Name: <span style={{ color: 'red' }}>*</span></label>
                                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                                                </div>
                                                <div>
                                                    <label>Last Name: <span style={{ color: 'red' }}>*</span></label>
                                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className={styles.secondRow}>
                                                <div>
                                                    <label>Phone Number: <span style={{ color: 'red' }}>*</span></label>
                                                    <div className={styles.num}>
                                                        <input
                                                            className={styles.code}
                                                            maxLength={6}
                                                            type="tel"
                                                            name="countryCode"
                                                            value={`+${formData.countryCode.slice(1, 3)}`}
                                                            required
                                                            readOnly
                                                        />

                                                        <input
                                                            type="tel"
                                                            name="mobile"
                                                            placeholder="Enter Phone"
                                                            value={formData.mobile}
                                                            onChange={handleChange}
                                                            maxLength={10}
                                                            required
                                                        />


                                                    </div>

                                                </div>
                                            </div>

                                            <div className={styles.row}>
                                                <div>
                                                    <label>Address1: <span style={{ color: 'red' }}>*</span></label>
                                                    <input className={styles.addresses} name="addressLine1" value={formData.addressLine1} onChange={handleChange} required ></input>
                                                </div>
                                            </div>
                                            <div className={styles.row}>
                                                <div>
                                                    <label>Address2:</label>
                                                    <input className={styles.addresses} name="addressLine2" value={formData.addressLine2} onChange={handleChange} required ></input>
                                                </div>
                                            </div>

                                            <div className={styles.thirdRow}>
                                                <div>
                                                    <label>Pincode: <span style={{ color: 'red' }}>*</span></label>
                                                    <input type="text" name="pincode" maxLength={6} value={formData.pincode} onChange={handleChange} required />
                                                </div>
                                                <div>
                                                    <label>City: <span style={{ color: 'red' }}>*</span></label>
                                                    <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                                                </div>
                                                <div>
                                                    <label>State: <span style={{ color: 'red' }}>*</span></label>
                                                    <select name="state" value={formData.state} onChange={handleChange} required>
                                                        <option value="" disabled>Select your state</option>
                                                        {indianStates.map((state, index) => (
                                                            <option key={index} value={state}>{state}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                            </div>

                                            <div className={styles.fourthRow}>
                                                <label>Address Type: <span style={{ color: 'red' }}>*</span></label>
                                                <label className={`${styles.label1} ${formData.addressType === "Home" ? styles.label11 : ''}`}>
                                                    <input
                                                        type="radio"
                                                        name="addressType"
                                                        value="Home"
                                                        checked={formData.addressType === "Home"}
                                                        onChange={handleChange}
                                                        required
                                                    /> Home
                                                </label>
                                                <label className={`${styles.label2} ${formData.addressType === "Office" ? styles.label22 : ''}`}>
                                                    <input type="radio" name="addressType" value="Office" checked={formData.addressType === "Office"} onChange={handleChange} required /> Office
                                                </label>
                                            </div>

                                            <div className={styles.bts}>
                                                <button className={styles.bt1} type="button" onClick={() => setShowAddressForm(false)}>CANCEL</button>
                                                <button className={styles.bt2} type="submit" onClick={handleSubmit}>SAVE ADDRESS</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                            {/* Edit address Section */}
                            {editFormVisible && (
                                <div className={`${styles.overlay} ${styles.OrderAddressContainer}`}>
                                    <div className={styles.popup}>
                                        <h1 className={styles.h1}>ADDRESS DETAILS</h1>
                                        <form onSubmit={handleEditSubmit}>
                                            <div className={styles.firstRow}>
                                                <div>
                                                    <label>First Name: <span style={{ color: 'red' }}>*</span></label>
                                                    <input type="text" name="firstName" value={editFormData.firstName} onChange={(e) => handleEditChange(e, true)} required />
                                                </div>
                                                <div>
                                                    <label>Last Name: <span style={{ color: 'red' }}>*</span></label>
                                                    <input type="text" name="lastName" value={editFormData.lastName} onChange={(e) => handleEditChange(e, true)} required />
                                                </div>
                                            </div>
                                            <div className={styles.secondRow}>
                                                <div>
                                                    <label>Phone Number: <span style={{ color: 'red' }}>*</span></label>
                                                    <div className={styles.num}>
                                                        <input
                                                            className={styles.code}
                                                            maxLength={6}
                                                            type="tel"
                                                            name="countryCode"
                                                            value='+91'
                                                            // onChange={(e) => handleEditChange(e, true)}
                                                            required
                                                            readOnly

                                                        />

                                                        <input
                                                            type="tel"
                                                            name="mobile"
                                                            placeholder="Enter Phone"
                                                            value={editFormData.mobile}
                                                            onChange={(e) => handleEditChange(e, true)}
                                                            maxLength={10}
                                                            required
                                                        />


                                                    </div>

                                                </div>
                                            </div>

                                            <div className={styles.row}>
                                                <div>
                                                    <label>Address1: <span style={{ color: 'red' }}>*</span></label>
                                                    <input className={styles.addresses} name="addressLine1" value={editFormData.addressLine1} onChange={(e) => handleEditChange(e, true)} required ></input>
                                                </div>
                                            </div>
                                            <div className={styles.row}>
                                                <div>
                                                    <label>Address2:</label>
                                                    <input className={styles.addresses} name="addressLine2" value={editFormData.addressLine2} onChange={(e) => handleEditChange(e, true)} required ></input>
                                                </div>
                                            </div>

                                            <div className={styles.thirdRow}>
                                                <div>
                                                    <label>Pincode: <span style={{ color: 'red' }}>*</span></label>
                                                    <input type="text" maxLength={6} name="pincode" value={editFormData.pincode} onChange={(e) => handleEditChange(e, true)} required />
                                                </div>
                                                <div>
                                                    <label>City: <span style={{ color: 'red' }}>*</span></label>
                                                    <input type="text" name="city" value={editFormData.city} onChange={(e) => handleEditChange(e, true)} required />
                                                </div>
                                                <div>
                                                    <label>State: <span style={{ color: 'red' }}>*</span></label>
                                                    <select name="state" value={editFormData.state} onChange={(e) => handleEditChange(e, true)} required>
                                                        <option value="" disabled>Select your state</option>
                                                        {indianStates.map((state, index) => (
                                                            <option key={index} value={state}>{state}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className={styles.fourthRow}>
                                                <label>Address Type: <span style={{ color: 'red' }}>*</span></label>
                                                <label className={`${styles.label1} ${editFormData.addressType === "Home" ? styles.label11 : ''}`}>
                                                    <input
                                                        type="radio"
                                                        name="addressType"
                                                        value="Home"
                                                        checked={editFormData.addressType === "Home"}
                                                        onChange={(e) => handleEditChange(e, true)}
                                                        required
                                                    /> Home
                                                </label>
                                                <label className={`${styles.label2} ${editFormData.addressType === "Office" ? styles.label22 : ''}`}>
                                                    <input type="radio" name="addressType" value="Office" checked={editFormData.addressType === "Office"} onChange={(e) => handleEditChange(e, true)} required /> Office
                                                </label>
                                            </div>
                                            <div>
                                                <button type="button" onClick={handleEditCancel}>CANCEL</button>
                                                <button type="submit">SAVE EDITS</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                            <div className={`${styles.orderBtn} ${!selectedAddress ? styles.selectedAddressPayment : ''}`}>

                                {/* <button type="submit" onClick={handleClick}>PROCEED TO PAYMENT</button> */}
                                <button type="submit" onClick={handleClick}>
                                    {paymentMethod === 'online' ? 'PROCEED TO PAYMENT' : 'PLACE ORDER'}
                                </button>
                                {/* <button type="submit" onClick={orderAndPayment} >PROCEED TO PAYMENT</button> */}
                            </div>

                        </div>}

                    {/* {!token && <div className={styles.main}>
                        <Image
                            src={emptyCart}
                            alt='Empty Shopping Bag'
                            width='256'
                            height='256'
                        />
                        <div className={styles.details}>
                            <div className={styles.heading}>Shopping Cart</div>
                            <div className={styles.emptyCard}>Your Cart Is Currently Empty.</div>

                            <div className={styles.btns1}>
                                <button onClick={OnSignInBtn} className={styles.btn}>SIGN IN</button>
                                <button onClick={OnShopBtn} className={styles.btn}>Return To Shop</button>
                            </div>
                        </div>
                    </div>} */}
                    {/* {!token && router.push('/login')} */}
                    {/* {TotalOrderCartValue && router.push("/")} */}
                </>
            )}
        </div >

    );
};

const PlaceOrder = () => {
    return (
        <Suspense>
            <PlaceOrders />
            <ToastNotifications />
        </Suspense>
    )
};

export default PlaceOrder;