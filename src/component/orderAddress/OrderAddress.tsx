'use client'
import { Suspense, useEffect, useState } from 'react';
import styles from './OrderAddress.module.scss';
import { getUserId } from '@/getLocalStroageUserId';
import { useRouter, useSearchParams } from 'next/navigation';
import { getToken } from '@/getLocalStroageToken';
// import useTokenExpiration from '@/userTokenExpiration';
import headerCompanyLogo from '../../imageFolder/mdfLogo.png';
import { ToastNotifications, showSuccessToast, showErrorToast } from '../../toastNotifications'
import Loader from '../loader/Loader';
import Image from 'next/image';
import paytm from '../../imageFolder/paytm.png'
import gpay from '../../imageFolder/googlePay.png'
import bhim from '../../imageFolder/bhim.png'
import card from '../../imageFolder/debitCard.png'
import phonePe from '../../imageFolder/phonePe.png'
import cod1 from '../../imageFolder/cod1.png'
import cod2 from '../../imageFolder/cod2.png'

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
    countryCode: any
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
    countryCode: any;
    addressType: string;
}

const OrderAddresss = () => {
    const [userData, setUserData] = useState<any>({});
    const [cartProducts, setCartProducts] = useState<any>([]);
    const [orderId, setOrderId] = useState('');
    const [selectedAddress, setSelectedAddress] = useState<string | null>();
    const [paymentMethod, setPaymentMethod] = useState('online');
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [address, setAddress] = useState<Address[]>([]);
    const [cartData, setCartData] = useState<any>('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [addressIdToDelete, setAddressIdToDelete] = useState(null);
    const userId = getUserId();
    const [editAddressId, setEditAddressId] = useState<string | null>(null);
    const [editFormVisible, setEditFormVisible] = useState(false);
    const [tokenData, setTokenData] = useState(false);
    const [cart, setCart] = useState(false);


    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const token = getToken();
    useEffect(() => {
        if (token) {
            setTokenData(true);
        } else {
            router.push('/login');
        }
    }, [router]);

    useEffect(() => {
        setLoading(true)
        if (cartData === undefined) {
            setCart(true);
            router.push("/")
        }
    }, [router])

    const fetchCartData = () => {
        fetch(`${process.env.BASE_URL}/s/cartProduct/cartProductList/${userId}`, {
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
            .then(async data => {
                await setCartData(data.data);

                const cartProductIds = data.data.productList.map((item: any) => {
                    return { "cartProductId": item.cartProductId };
                });

                setCartProducts(cartProductIds);
            })
            .catch(error => {
                router.push("/")
                console.error('There was a problem fetching the data:', error);
            });
    };

    useEffect(() => {
        fetchCartData();
    }, []);

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
                addressLine2: selectedAddress.addressLine2,
                state: selectedAddress.state,
                country: selectedAddress.country,
                addressType: selectedAddress.addressType,
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
            return 'valid';
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
            setLoading(true)
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
        } finally {
            setLoading(false)
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
        setLoading(true)
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

            const pincodeCheckResult = await handleCheckPincode();
            if (pincodeCheckResult === 'invalid') {
                return;
            }
            if (!handleCheckMobile()) {
                return;
            }
            setLoading(true)
            const response = await fetch(`${process.env.BASE_URL}/s/address`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                showSuccessToast('Address add successfully')

            } else {
                showErrorToast('Failed to add address')
                console.error('Failed to send form data');
            }
        } catch (error: any) {
            console.error('Error sending form data:', error.message);
        } finally {
            setLoading(false)
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
            state: '',
            countryCode: '+91',
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
            countryCode: '+91',
            city: '',
            addressLine1: '',
            addressLine2: '',
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

    const handleNewAddress = () => {
        setShowAddressForm(true)
    }

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



    const handleOrder = () => {
        const userId = getUserId();
        const shippingAddressId = selectedAddress;
        const billingAddressId = selectedAddress;
        const productList = cartProducts;
        const totalCartValue = cartData.totalCartValue;
        const shippingCharge = cartData.shippingCharge || 0;
        const codCharge = paymentMethod === 'cod' ? val2 : 0;


        const payload = {
            userId,
            shippingAddressId,
            billingAddressId,
            productList,
            totalCartValue,
            shippingCharge,
            codCharge
        };

        return fetch(`${process.env.BASE_URL}/s/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        }).then(async response => {
            if (!response.ok) {
                showErrorToast(`Select all mandetory field.`)
                // showErrorToast(`Status Code ${response.status} : ${response.statusText}`)
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {

            setOrderId(data.data.orderData._id)

            setSelectedAddress(null);
            // showSuccessToast(data.message);
            return data.data.orderData._id
        }).catch(error => {

            // not updating status for isOrder=true
            fetch(`${process.env.BASE_URL}/s/cartProduct/${cartProducts[0].cartProductId}`, {
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
            console.error('There was a problem with the fetch operation:', error);
        });
    }


    const handlePayment = async () => {
        return fetch(`${process.env.BASE_URL}/s/order/payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                amount: cartData.totalCartValue + cartData.shippingCharge,
                currency: 'INR'

            }),
        }).then(async response => {
            if (response.ok) {
                const responseData = await response.json();
                return responseData
            }
        })

    };

    const openPaymentGateway = (razorpayData: any, mongoOrderId: any) => {

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
                    console.log(response);
                    const success = await handleSuccess(response, mongoOrderId)

                    // const res = await handleStatusUpdate(mongoOrderId, response.razorpay_order_id)
                    // router.replace('/orderList');
                    router.push('/orderList');
                    // window.location.href = '/orderList'


                }
            },
            modal: {
                ondismiss: async function () {
                    const orderData = await handleIsOrderUpdate(mongoOrderId)

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

    const handleIsOrderUpdate = (mongoOrderId: any) => {


        return fetch(`${process.env.BASE_URL}/s/order/${mongoOrderId}`, {
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



    const handleStatusUpdate = (mongoOrderId: any, id: any) => {
        console.log(id, 'id');

        return fetch(`${process.env.BASE_URL}/s/order/${mongoOrderId}`, {
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
        setLoading(true)
        try {
            const mongoOrderId = await handleOrder();
            if (!mongoOrderId) {
                throw new Error('orderId not found.')
            }

            const razorpayResponse = await handlePayment();
            if (!razorpayResponse.data.id) {
                throw new Error('please try adain later.')
            }
            openPaymentGateway(razorpayResponse, mongoOrderId)
        } catch (error) {
            console.error('Order and payment process failed:', error);
        } finally {
            setLoading(false)

        }
    };


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
                // router.replace('/orderList');
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
            if (!orderId) {
                throw new Error('orderId not found.')
            }
            const statusCod = await handleStatusCOD(orderId);
            // router.replace('/orderList');
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

    const handleCheckbox = (method: any) => {
        setPaymentMethod(method);
    };


    const indianStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
        'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
        'Lakshadweep', 'Delhi', 'Puducherry'
    ];

    const val1 = parseFloat(cartData?.totalCartValue + cartData?.shippingCharge)
    const val2 = parseFloat("35")

    const handleClick = paymentMethod === 'online' ? orderAndPayment : OnShopBtn;
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
                            {cartData && (paymentMethod === 'online') && <div className={styles.grandtotal}>Total Order Value<span>₹{cartData.totalCartValue + cartData.shippingCharge}</span> </div>}

                            {cartData && (paymentMethod === 'cod') && < div className={styles.ttl}>
                                <p>Total Cart Value<span>₹{val1}</span></p>
                                <p>COD Charge<span>₹{val2}</span></p>
                                <div>Total Order Value<span>₹{val1 + val2}</span></div>
                            </div>
                            }

                            <div className={styles.deliverAddress1}>Payment Method</div>
                            <div className={styles.radioInputs}>
                                <label>
                                    <input className={styles.radioInput} checked={paymentMethod === 'online'} onChange={() => handleCheckbox('online')} type="radio" name="engine" />
                                    <span className={styles.radioTile}>
                                        <span className={styles.imgSpan}>
                                            <Image
                                                src={paytm}
                                                alt='Bag'
                                                width='48'
                                                height='48'
                                                style={{ marginRight: '10px' }}
                                            />
                                            <Image
                                                src={gpay}
                                                alt='Bag'
                                                width='48'
                                                height='48'
                                                style={{ marginRight: '10px' }}
                                            />
                                            <Image
                                                src={phonePe}
                                                alt='Bag'
                                                width='48'
                                                height='48'
                                                style={{ marginRight: '10px' }}
                                            />
                                            <Image
                                                src={bhim}
                                                alt='Bag'
                                                width='48'
                                                height='48'
                                                style={{ marginRight: '10px' }}
                                            />
                                            <Image
                                                src={card}
                                                alt='Bag'
                                                width='48'
                                                height='48'
                                                style={{ marginRight: '10px' }}
                                            />
                                        </span>
                                        <span className={styles.radioLabel}>Online Payment</span>
                                        <span className={styles.radioIcon}>Card payment, UPI payment, and Net banking are available.
                                        </span>
                                    </span>
                                </label>
                                <label>
                                    <input checked={paymentMethod === 'cod'} onChange={() => handleCheckbox('cod')} className={styles.radioInput} type="radio" name="engine" />
                                    <span className={styles.radioTile}>
                                        <span className={styles.imgSpan}>
                                            <Image
                                                src={cod1}
                                                alt='Bag'
                                                width='48'
                                                height='48'
                                                style={{ marginLeft: '10px' }}

                                            />
                                            <Image
                                                src={cod2}
                                                alt='Bag'
                                                width='48'
                                                height='48'
                                                style={{ marginLeft: '20px' }}
                                            />
                                        </span>
                                        <span className={styles.radioLabel}>Cash On Delivery</span>
                                        <span className={styles.radioIcon}>Note:Additional ₹35/- COD charge will be applied for this option.
                                        </span>
                                    </span>
                                </label>
                            </div>

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

                            {/* <p className={styles.toggleP} onClick={() => handleNewAddress()}>+ Add New Address</p> */}
                            {(showAddressForm || (address === undefined)) && (

                                <div className={`${styles.overlay} ${styles.OrderAddressContainer}`}>
                                    <div className={styles.popup}>
                                        <h1 className={styles.h1}>Address details</h1>

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
                                                            readOnly
                                                            required
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
                                                    <input maxLength={6} type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
                                                </div>
                                                <div>
                                                    <label>City: <span style={{ color: 'red' }}>*</span></label>
                                                    <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                                                </div>
                                                <div>
                                                    <label>State: <span style={{ color: 'red' }}>*</span></label>
                                                    <select name="state" value={formData.state} onChange={handleChange} required>
                                                        <option value="" disabled>State</option>
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
                                                <button className={styles.bt} type="button" onClick={() => setShowAddressForm(false)}>Cancel</button>
                                                <button className={styles.bt1} type="submit" onClick={handleSubmit}>Save Address</button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            )}

                            {/* Edit address Section */}
                            {editFormVisible && (
                                <div className={`${styles.overlay} ${styles.OrderAddressContainer}`}>
                                    <div className={styles.popup}>
                                        <h1 className={styles.h1}>Address details</h1>

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
                                                            readOnly
                                                            // onChange={(e) => handleEditChange(e, true)}
                                                            required
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
                                                <button type="button" onClick={handleEditCancel}>Cancel</button>
                                                <button type="submit">Save Edits</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                            <div className={`${styles.orderBtn} ${(!selectedAddress) ? styles.selectedAddressPayment : ''}`}>
                                {/* <button type="submit" onClick={handleClick}>PROCEED TO PAYMENT</button> */}
                                <button type="submit" onClick={handleClick}>
                                    {paymentMethod === 'online' ? 'Proceed To Payment' : 'Place Order'}
                                </button>

                            </div>

                        </div>}

                </>
            )
            }

        </div >

    );
};

const OrderAddress = () => {
    return (
        <Suspense>
            <OrderAddresss />
            <ToastNotifications />

        </Suspense>
    )
};

export default OrderAddress;