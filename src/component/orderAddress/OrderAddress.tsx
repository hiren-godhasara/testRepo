
import { Suspense, useEffect, useState } from 'react';
import styles from './OrderAddress.module.scss';
import getUserId from '@/getLocalStroageUserId';
import { useRouter, useSearchParams } from 'next/navigation';
import getToken from '@/getLocalStroageToken';
import Image from 'next/image';
import emptyCart from '../../imageFolder/emptyCart1-removebg-preview.png'
import useTokenExpiration from '@/userTokenExpiration';
import { headerCompanyLogo } from '@/S3Images/S3Images';
import { ToastNotifications, showSuccessToast, showErrorToast } from '../../toastNotifications'


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
    addressLine: string;
    state: string;
    country: string;
    addressType: string;
}

interface Address {
    _id: string;
    firstName: string;
    lastName: string;
    mobile: string;
    pincode: string;
    city: string;
    addressLine: string;
    state: string;
    country: string;
    addressType: string;
}

const OrderAddresss = () => {
    const [userData, setUserData] = useState<any>({});
    const [cartProducts, setCartProducts] = useState([]);
    const [orderId, setOrderId] = useState('');
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [address, setAddress] = useState<Address[]>([]);
    const userId = getUserId();
    const paramId = useSearchParams().get('cartProductIds');
    const cartValue = useSearchParams().get('totalCartValue');
    const totalCartValue = Number(cartValue)
    const sCharge = useSearchParams().get('shippingCharge');
    const shippingCharge = Number(sCharge)
    const [editAddressId, setEditAddressId] = useState<string | null>(null);
    const [editFormVisible, setEditFormVisible] = useState(false);
    const token = getToken()
    const router = useRouter();
    useTokenExpiration(token);

    const [editFormData, setEditFormData] = useState<EditFormData>({
        firstName: '',
        lastName: '',
        mobile: '',
        pincode: '',
        city: '',
        addressLine: '',
        state: '',
        country: '',
        addressType: ''
    });

    const [formData, setFormData] = useState({
        userId: userId || '',
        firstName: '',
        lastName: '',
        mobile: '',
        pincode: '',
        city: '',
        addressLine: '',
        state: '',
        country: '',
        addressType: ''

    });

    const handleEditCancel = () => {
        setEditFormData({
            firstName: '',
            lastName: '',
            mobile: '',
            pincode: '',
            city: '',
            addressLine: '',
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
                addressLine: selectedAddress.addressLine,
                state: selectedAddress.state,
                country: selectedAddress.country,
                addressType: selectedAddress.addressType,
            });
            setEditAddressId(addressId);
        }
        setEditFormVisible(true);
    };

    const handleEditChange = (e: any, isEditForm: boolean) => {
        const { name, value, type, checked } = e.target;

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


    const handleEditSubmit = async (e: any) => {
        e.preventDefault();
        try {
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
                console.log('Form data updated successfully');
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


    useEffect(() => {
        if (paramId !== null) {
            const arrayOfIds = JSON.parse(paramId);
            const arrayOfObjects = arrayOfIds.map((id: any) => ({ cartProductId: id, isOrder: true }));
            setCartProducts(arrayOfObjects);
        }
    }, []);


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const fetchAddressData = () => {
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
                console.log(data.data);

                setAddress(data.data)

            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
            });
    };

    useEffect(() => {
        fetchAddressData();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.BASE_URL}/s/address`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                console.log('Form data sent successfully');
            } else {
                console.error('Failed to send form data');
            }
        } catch (error: any) {
            console.error('Error sending form data:', error.message);
        }
        setFormData({
            userId: userId || '',
            firstName: '',
            lastName: '',
            mobile: '',
            pincode: '',
            city: '',
            addressLine: '',
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
            addressLine: '',
            state: '',
            country: '',
            addressType: ''
        });

    };


    const handleCheckboxChange = (addressId: string) => {
        setSelectedAddress((prevSelected) => {
            if (prevSelected === addressId) {
                return null;
            } else {
                return addressId;
            }
        });
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
                console.log('Response:', data);
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
        totalCartValue;
        shippingCharge

        const payload = {
            userId,
            shippingAddressId,
            billingAddressId,
            productList,
            totalCartValue,
            shippingCharge
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
                showErrorToast(`Status Code ${response.status} : ${response.statusText}`)
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {

            setOrderId(data.data.orderData._id)
            console.log(data.data.orderData._id);

            setSelectedAddress(null);
            showSuccessToast(data.message);
            return data.data.orderData._id
        }).catch(error => {
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
                amount: totalCartValue,
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
                console.log('API Response:', data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        const options: any = {
            key: 'rzp_test_i7OU6XSO1iyCX6',
            amount: razorpayData.data.amount,
            currency: razorpayData.data.currency,
            name: 'MY DRY FRUIT',
            image: headerCompanyLogo,
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
                console.log(response);
                if (response) {
                    const res = await handleStatusUpdate(mongoOrderId)
                    router.replace('/orderList');
                }

            },
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
    }

    const handleStatusUpdate = (mongoOrderId: any) => {

        return fetch(`${process.env.BASE_URL}/s/order/${mongoOrderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                status: "paid",
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
                return data;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }

    const orderAndPayment = async () => {
        try {
            const mongoOrderId = await handleOrder();
            console.log(orderId, 'orderId');
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
        }
    };

    const OnShopBtn = () => {
        router.push('/#products')
    }

    const OnSignInBtn = () => {
        router.push('/login')
    }

    const handleRemove = (addressId: any) => {
        DeleteCartAddress(addressId)
    }



    return (

        <div className={styles.CenteredContainer}>
            {token &&
                <div className={styles.selectedAdd}>
                    <div className={styles.grandtotal}>Grand Total<span>{totalCartValue + shippingCharge} INR</span> </div>

                    <div className={styles.deliverAddress}>DELIVERY ADDRESS</div>

                    <div className={styles.preAddress}>
                        {address && address.map((e: any) => (
                            <div className={`${styles.addressCard} ${selectedAddress === e._id ? styles.selectedAddress : ''}`} key={e._id}>
                                <input
                                    type="checkbox"
                                    name="selectedAddress"
                                    onChange={() => handleCheckboxChange(e._id)}
                                    checked={selectedAddress === e._id}
                                />
                                <div className={styles.addressContent}>
                                    <p className={styles.fullName}>
                                        {e.firstName} {e.lastName}, Mo. {e.mobile}
                                    </p>
                                    <p className={styles.addressDetails}>
                                        {e.addressLine}, {e.pincode}
                                    </p>
                                    <p className={styles.addressDetails}>
                                        {e.city}, {e.state}, {e.country}
                                    </p>
                                    <p className={styles.addressType}>Address Type: {e.addressType}</p>
                                </div>
                                <div className={styles.buttons}>
                                    <button className={styles.removeAdd} type="button" onClick={() => handleEdit(e._id)}>Edit</button>
                                    <button className={styles.removeAdd} type="button" onClick={() => handleRemove(e._id)}>Delete</button>
                                </div>
                            </div>


                        ))}
                    </div>



                    {!selectedAddress &&
                        <label>
                            <input
                                type="radio"
                                name="addAddress"
                                checked={showAddressForm}
                                onChange={toggleAddressForm}
                            />
                            <strong>Add New Address</strong>
                        </label>
                    }
                    {showAddressForm && !selectedAddress && (

                        <div className={styles.OrderAddressContainer}>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.firstRow}>
                                    <div>
                                        <label>First Name:</label>
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <label>Last Name:</label>
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className={styles.secondRow}>
                                    <div>
                                        <label>Phone Number:</label>
                                        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <label>Pincode:</label>
                                        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
                                    </div>

                                </div>

                                <div className={styles.row}>
                                    <div>
                                        <label>Address:</label>
                                        <textarea className={styles.addresses} name="addressLine" value={formData.addressLine} onChange={handleChange} required rows={2}></textarea>
                                    </div>
                                </div>

                                <div className={styles.thirdRow}>
                                    <div>
                                        <label>City:</label>
                                        <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <label>State:</label>
                                        <input type="text" name="state" value={formData.state} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <label>Country:</label>
                                        <input type="text" name="country" value={formData.country} onChange={handleChange} required />
                                    </div>

                                </div>

                                <div className={styles.fourthRow}>
                                    <label>Address Type:</label>
                                    <label style={{ marginRight: '20px' }}>
                                        <input type="radio" name="addressType" value="Home" checked={formData.addressType === "Home"} onChange={handleChange} required /> Home
                                    </label>
                                    <label style={{ marginRight: '20px' }}>
                                        <input type="radio" name="addressType" value="Office" checked={formData.addressType === "Office"} onChange={handleChange} required /> Office
                                    </label>
                                </div>
                                <div>
                                    <button type="submit" onClick={handleSubmit}>SAVE ADDRESS</button>
                                    <button type="button" onClick={handleReset}>CANCEL</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Edit address Section */}
                    {editFormVisible && (
                        <div className={styles.OrderAddressContainer}>
                            <form onSubmit={handleEditSubmit}>
                                <div className={styles.firstRow}>
                                    <div>
                                        <label>First Name:</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={editFormData.firstName}
                                            onChange={(e) => handleEditChange(e, true)}
                                            required
                                        />

                                    </div>
                                    <div>
                                        <label>Last Name:</label>
                                        <input type="text" name="lastName" value={editFormData.lastName} onChange={(e) => handleEditChange(e, true)} required />
                                    </div>
                                </div>
                                <div className={styles.secondRow}>
                                    <div>
                                        <label>Phone Number:</label>
                                        <input type="text" name="mobile" value={editFormData.mobile} onChange={(e) => handleEditChange(e, true)} required />
                                    </div>
                                    <div>
                                        <label>Pincode:</label>
                                        <input type="text" name="pincode" value={editFormData.pincode} onChange={(e) => handleEditChange(e, true)} required />
                                    </div>

                                </div>

                                <div className={styles.row}>
                                    <div>
                                        <label>Address:</label>
                                        <textarea className={styles.addresses} name="addressLine" value={editFormData.addressLine} onChange={(e) => handleEditChange(e, true)} required rows={2}></textarea>
                                    </div>
                                </div>

                                <div className={styles.thirdRow}>
                                    <div>
                                        <label>City:</label>
                                        <input type="text" name="city" value={editFormData.city} onChange={(e) => handleEditChange(e, true)} required />
                                    </div>
                                    <div>
                                        <label>State:</label>
                                        <input type="text" name="state" value={editFormData.state} onChange={(e) => handleEditChange(e, true)} required />
                                    </div>
                                    <div>
                                        <label>Country:</label>
                                        <input type="text" name="country" value={editFormData.country} onChange={(e) => handleEditChange(e, true)} required />
                                    </div>

                                </div>
                                <div className={styles.fourthRow}>
                                    <label>Address Type:</label>
                                    <label style={{ marginRight: '20px' }}>
                                        <input type="radio" name="addressType" value="Home" checked={editFormData.addressType === "Home"} onChange={(e) => handleEditChange(e, true)} required /> Home
                                    </label>
                                    <label style={{ marginRight: '20px' }}>
                                        <input type="radio" name="addressType" value="Office" checked={editFormData.addressType === "Office"} onChange={(e) => handleEditChange(e, true)} required /> Office
                                    </label>
                                </div>
                                <div>
                                    <button type="submit">SAVE EDITS</button>
                                    <button type="button" onClick={handleEditCancel}>CANCEL</button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className={styles.orderBtn}>
                        <button type="submit" onClick={orderAndPayment} >PROCEED TO PAYMENT</button>
                        <button type="button" onClick={OnShopBtn}>CANCEL ORDER</button>
                    </div>

                </div>}

            {!token && <div className={styles.main}>
                <Image
                    src={emptyCart}
                    alt='Empty Shopping Bag'
                    width='256'
                    height='256'
                />
                <div className={styles.details}>
                    <div className={styles.heading}>Shopping Cart</div>
                    <div className={styles.emptyCard}>Your Cart Is Currently Empty.</div>

                    <div className={styles.btns}>
                        <button onClick={OnSignInBtn} className={styles.btn}>SIGN IN</button>
                        <button onClick={OnShopBtn} className={styles.btn}>Return To Shop</button>
                    </div>
                </div>
            </div>}
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