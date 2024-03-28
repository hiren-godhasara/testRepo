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
                                                placeholder="blur"
                                                blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACJAIkDASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAAIDAQQG/8QAHBABAQEBAQEBAQEAAAAAAAAAAAECEQMSMRMh/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDAAQF/8QAGREBAQEBAQEAAAAAAAAAAAAAAAECERIT/9oADAMBAAIRAxEAPwDzTKfjLHoOZOlqlhbANCmjOGkLRp8qQmYpmAlTQ0ZIeQUqA3g4IdLS09hbGGJUmlNRPUKpE6G1gKLcZYpxliqfUrC2K2EsA8pOGkHDSFGtzFcwmYrmMlqtkPIJDyClazg4fg4JOp2EsVsJYBpUdRPUW1E9QtVzUrGcNYzhVOunjLD8ZYsmlYSxWwlgHhONkBoBqbMVzCZiuYCOjZikjMw8hkbRwcNwcEnU7CaithNQtNKjqJai2ololVzUqU9KVV1lpmVckTpKpU6CkKaFNAGqZVyllbII6UypCZPDIUwAEhanpWp6CmiOktLaR0nVspVjawi0dRa3pbVywtTp9VPVY8Z00qfTZpTWLZq2UM1bNZHS2VIlmnlM59KAvW9EjKTRrU9UtNE9I6V1Ud1Or5iemDVL1Pq0jp6W0v0y6dASDVT1oa0jvbK5h/o2dOb6ps7CmuXZmrZrlxpbOgQ1HTmqSufOlJoeuexbo6nND6HpOGtJqi6T1otppGaqG6fWkN6TtXzGapfpPWy/aV0vMun7JraH3WW2uo0wfW+/hOs6zpLqQ8jejpejqf0FbG+froxtxSqY9Ofp5qVPWOu/OlJpx59FJseue4dU0PpCbH2PSeFbomtJ3aevQtp5g+9Of09OF9PVG22/6lqr4wLbWAJrG6zrAf3Wb1gBO9YABmDesDMaasPPWxIHm6FkronsP7IdHTey+Irfak1u0gLd9GZkAAIYABmAAZgAGYABmAAZgAGYABmAAZgAGYABmf/Z'
                                                style={{ marginRight: '10px' }}
                                            />
                                            <Image
                                                src={gpay}
                                                alt='Bag'
                                                width='48'
                                                height='48'
                                                placeholder="blur"
                                                blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACJAIkDASIAAhEBAxEB/8QAGgAAAwEBAQEAAAAAAAAAAAAAAgMEAQAFBv/EACMQAAMBAQACAgICAwAAAAAAAAABAgMREiEEMUFREyIyYYH/xAAaAQACAwEBAAAAAAAAAAAAAAADBAACBQEG/8QAHREBAQEBAQADAQEAAAAAAAAAAAECEQMSITETBP/aAAwDAQACEQMRAD8A+UKcl6Quc/fsoiTe3+Fd6+joHyKhDpQnspqmSGgJQxCmwK0OEDK6x0yK7q2M9rUjeBJHcFdU/jJbQqkPaF1IHU6bzE1CLKrkntHMj5iPUkf2Xaoipf2Y1imMwBxp3AjvFagbMj/4v9GrI9HXn9SglDZRyzaGTL/QvuF9dckMmenTA+IEvS8cmLWRHByk2ZDUiG6b88cD4neIxSb4i1pvGSHIFSUOQKk4YzlJck+kltyI0kt8ejSPP1kh1XKPU1kh3j8hc5sHwm4ZwNozgTlX497wNUDvE1Sehrz9hSgJQMUhKQGw7kMyNmTpkZKEPR3OXTIxI5INIz901jLEjvENI3gv0znJTkCpHtAUi8HkS3IjSSu0ItBsxeRDpJHtPpnoaIk1kPmCZee0dwZS42DwN8RePo+GpGmpGr156sSCSNSCSBbV45IYkYkGkIeq+Y1INIxBIzfSmcRyRvDUaA6ZzANA0hjAoLkaQi0ItFNk+gxlbiTREmqLNCTUPlaIdF/YEZr9gDEFj6IJAdNTNF50xBIBMNAdoNBoBBIz/Wi5g0EgUamZnpTOIM4HpvQMpjLWLoJsXTD5EgLZPoOtk9sYysRoSalOjJNWMZWiXX7AC0faAGIJHveQSonVhTZp2POdUpjEyeaGyxT0q0OTDTFSw0zN9aNmGJm9A6Z5GX664ZyZ07yF+RnkBzrtGhjoXVAuhdWN4EjbonujbsRpY1lYGlEmtDNLI9b6+B8rQDfWZ0Fs7oT5L9XrYdGnTzJ2T/I7PXjNnceZ+5+vVix00Q5X0pijO9aPlXLDTETQaoy/bQ+Yb5GdF9O6ZW78qPkboF0C6F1RWQSUbsVWgu7E3oNeeuLymXoTaaC9NiTXf8IbzpefZmuxM66A66Z0L2idkF0zoPTunFfkDo3LX3xiOnd4eh1rsY1z16/x9C7OjyPjX1o9LKvRl++uJ5xbNBqieaGyzE9t9vDMhnTmwemNi3F+uqhV0bTEXQTMTobsm00N1sg+Rt4p+xnGOuzbdtvfExDsQ9GwfJ/scmOLX25+H+RnkJ6/2d1lvip/WneR3kJ8md5MnE/oYccYatpZT8V+0erk/R5Pxfv/AKerl9Gb/qrmf1XA6RGY6TF0YgwWaYyqF2ybRlFk2gXLlSb1xM8vevKj0fkfTPM1/wAx/wAoF37AcccHWccccRHHHHER/9k='
                                                style={{ marginRight: '10px' }}
                                            />
                                            <Image
                                                src={phonePe}
                                                alt='Bag'
                                                width='48'
                                                height='48'
                                                placeholder="blur"
                                                blurDataURL='data:image/jpeg;base64,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'
                                                style={{ marginRight: '10px' }}
                                            />
                                            <Image
                                                src={bhim}
                                                alt='Bag'
                                                width='48'
                                                height='48'
                                                placeholder="blur"
                                                blurDataURL='data:image/jpeg;base64,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'
                                                style={{ marginRight: '10px' }}
                                            />
                                            <Image
                                                src={card}
                                                alt='Bag'
                                                width='48'
                                                height='48'
                                                placeholder="blur"
                                                blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACJAIkDASIAAhEBAxEB/8QAGgAAAwEBAQEAAAAAAAAAAAAAAQIDAAQGBf/EACIQAQEBAAMAAgEFAQAAAAAAAAABAgMREjFREwQUIUFhcf/EABkBAQEBAQEBAAAAAAAAAAAAAAIBAwAEBf/EABsRAQEBAQEBAQEAAAAAAAAAAAABEQISAyFB/9oADAMBAAIRAxEAPwDoLVOi2PqPiI6S0vqJaiHEdJ1XUJYhwpoHR5EU2TwuYpI5BYem6cidT0tYlqOKOfbn26dxDcE45tFU1C9ON6jotivRbGuvBqOolqOjUS1HFK59Qli2oSwTlT6NIbo0iFrZh5GzDyOTQ6bo/TWKmpWJajosS1EKVzbjn3HXuIbg05XLqB0rqB0mlr03RbFOgsPXg1HUT1F7EtQilQ1CWLahLBpyp9GkHo0ji1pDyNIeRXaHTdH6axyalYlqL2JaiUpXPuIbjp3ENwKcrn1A6UsDoS16QtOWtHhTqeorpPRRYlqEsPolStIBpAGIR4eQkPCQemotVcSpaVqehqxDaG19obZ04lS9GoCT0QUOwtavGWp6p9VLVIoXVJaOqnaNOGNKn2MqEtDyoynlKOUa0vbWqjWpaptVPVSlEt1HdU3UN1nThLQ7C0O2ZPQdhan6C6ep5cHWktabWktaSlIOtEuia0S7CnIr6NNOf2aaQsdM0eac00eaJMX9NdJem9K7D3SWtBdJ60NWQN6Q3od6Q3sK0kbWi+ktbD2zLHoPZbtH2W7erWHlTW0tbJraOuQSnKmtp3aOuRO8iFOXT7NNuP8AIbPIi+XdNnm3HnkUnIrvLq9t7c823t2u8rXaWtp65Et8iUpybe3NycheTl6cfLz/AEFa88avrlL+Wfbj1u35pe2dsbT5PT/kJeRC7Jrkeh5fK2uRDfKlycvTl5Oa34XDnz1ffNJ/aOv1H0hbb8h2lyN585F/3B888+3J2Pbti3iPoZ5f9Wzyvl53c/FVxzfbsZX5vpTka8jinL/o3lQfLp1yIcnN1PlDfN9Ia1dX+XNOeDcnLdf8RtG0rz99/wAjaTGZmYk+vdJ72NT38PfHnkQ5N23pI2vmlKtZAAQefqqzAIyqIgLaVBls/trq/YMaMWiFZd38WFZmeQmZmc5//9k='
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
                                                placeholder="blur"
                                                blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACJAIkDASIAAhEBAxEB/8QAGgAAAwEBAQEAAAAAAAAAAAAAAQIDAAQFBv/EAB0QAQEAAwEBAQEBAAAAAAAAAAABAhESAxNRMWH/xAAYAQADAQEAAAAAAAAAAAAAAAABAgMABP/EABsRAQEBAQEAAwAAAAAAAAAAAAABEQISAyEx/9oADAMBAAIRAxEAPwDBT6CxN2p0mStieUYEskc18ojnBK5vRxe7u9I5PbHcPyDhz/pFPSJmsc/X6zMxQZmZmZmHW2YGNMR0Gm819rotiui2Ja6UrE8ovYnlG0EMojnHRlEcoMoWubOOb0xdmcQzxPCWvP8AXzc9x09HPDaGfjtWUl+3HptOi+Fb4X8HIXzXPpua6Z4U08Ashpy5pgaYumeMNPGfhLh5JHLy3Ls+TfP/AAo7H1mi2K6LYhp0rE8otYnlB0KhlEco6MojlDQlrnyiWWLoyiVh4Vz3EtwdFxDk8BzfMfm6OB4HRc/zH5r8DwGihw3C/LclBDhuF+W5Bn0GgsMFc6qeUSyWySyEtRySyi2SWRoS1HKJ2K5EsUhSabk2h0cYTk3JpB0JictypptAyfLcqaDRQJyHKmg0wPaCtstrmVLknkfKp5UYWp5JZKZVLI8TtJSU1KrC6wwBhjQZDaCCxm0wsAgAgAAwgAPU2FpOguSCg2p5VrknlRhKGVTyo5VPKqSJ2haXbWl2pCaY0pNjKY0p5R2SUdspKfbbLttgI7DYbDZQNttl2G2B3dBck+guSOKHuRLkW5EuRpCUcqna1yJaeRHqtaGy2l6UkT1TYypdD0bDTpXY9JdD0CsqnTbT6boDapsNk6DorKbDZOm6AHT0HSXTdFxSqXItyJ0FoyJ0bSWhaTKqSIdVssi3ItuwUkc16tN2MzTDY4adWL9D05+jTILFue1um6S6botisqvTdJ9NshlOm6T22wF0bDbMClbYWsAxLoLU8qep5KRzfIACB0ACiAiFDehpWNDyjskMSujkdjsGJVIO22DAL//Z'
                                                style={{ marginLeft: '10px' }}

                                            />
                                            <Image
                                                src={cod2}
                                                alt='Bag'
                                                width='48'
                                                height='48'
                                                placeholder="blur"
                                                blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACJAIkDASIAAhEBAxEB/8QAGwAAAwEBAQEBAAAAAAAAAAAAAQIDBAAFBgf/xAAfEAEBAQEBAAIDAQEAAAAAAAAAAQIRAxITIUFRBDH/xAAYAQEBAQEBAAAAAAAAAAAAAAACAQMABP/EABoRAQEBAQADAAAAAAAAAAAAAAABEQISEzH/2gAMAwEAAhEDEQA/ANBNHpdKiG2fbTtn3HDWbaa24nx1E2GjzQzF/MLGvLT5tOGbzaMI1i+VIlmqSucYK7oWlAoVOmtJaUZ0KAWu6TN1Lo5aDZDcQ3GnUR3CCs2onxfUTsXADMWwnIrkbGnNXwvioYWzRxrKtmnlSlN1FU6FpPkW6Uaa6Tug1pPWijKnug+SV2HzIGwtinC2M26OolqNGolqHArPqJ2L6hLDjKpyKZDhpHWFzT5VzUoeULG0qso/JPrvkJnui3RLpPW3JTa2nrZNbR16FGPSt2H2M2vXn7L90/p4xvT6LgWH4Wxg9adieotYnqNIFR1E7F7E7GkZVPjuGsdxVjoPQcNaQ3S3QWltCtI7WktbHVQ3pHV29s3p68d6bYvX1/J8xj2rfQPsZL7X9B9taMvW++4Fh+BY8z1J2J2K2EsKDUrCWK2EsaQLE7A4awOLrpCgbgVKcJSaUqegpxLdZ/Sr7Z/SITJ7a5K8/eu6rd/on4rz9/inLkDqB13QcG0X6PwKYKikqdUpKrk6SqUlXUwlKegurheFsPx3HaUidieotYWxFZtxn9MtmsobyivP9sdef645XsemGP28urq/Xm2cBp35WX/hPrv8EfB+hhTBVBOkqlT0ip0lPolTSkLQFyaWBweDB4uuwnAsU4FiohrKO8tVynrLnMW8Ib827eUdYRzBryL9TZcB8E0n1RaYK0YJ6T0ppPQ04npOn0SsrWkgOgDB08NDSBDQ5RruOsNx3Dg1KwmotYTUVGbWUtZadRLUSuZ7kPitYHBV75aYtbME9J6U0npnWkS0nVNJ1j02gDAGCR4eEh40g00EIJwKWk0ekpIlpPUV0loa5OwOGoIr/9k='
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