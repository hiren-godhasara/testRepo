import { useEffect, useState } from 'react';
import styles from './OrderAddress.module.scss';
import getUserId from '@/getLocalStroageUserId';
import { Product } from '@/app/products/[product]/page';
import { useSearchParams } from 'next/navigation';

const OrderAddress = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const paramId = useSearchParams().get('cartProductIds');
    const cartValue = useSearchParams().get('totalCartValue');
    const totalCartValue = Number(cartValue)
    const sCharge = useSearchParams().get('shippingCharge');
    const shippingCharge = Number(sCharge)

    useEffect(() => {
        if (paramId !== null) {
            const arrayOfIds = JSON.parse(paramId);
            const arrayOfObjects = arrayOfIds.map((id: any) => ({ cartProductId: id }));
            setCartProducts(arrayOfObjects);
        }
    }, []);

    const [address, setAddress] = useState([]);
    const userId = getUserId();
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

    });

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
        });

    };

    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
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

    const handleRemove = (addressId: any) => {
        DeleteCartAddress(addressId)
    }

    const handleOrder = () => {
        const userId = getUserId();
        const shippingAddressId = selectedAddress;
        const billingAddressId = selectedAddress;
        const productList = cartProducts;
        totalCartValue; shippingCharge

        const payload = {
            userId,
            shippingAddressId,
            billingAddressId,
            productList, totalCartValue, shippingCharge
        };
        console.log(payload);


        fetch(`${process.env.BASE_URL}/s/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Response:', data);
                setSelectedAddress(null);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    return (

        <div className={styles.CenteredContainer}>

            <div className={styles.selectedAdd}>
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
                                    {e.state}, {e.country}
                                </p>
                                <p className={styles.addressType}>Address Type: {e.addressType}</p>
                            </div>
                            <div className={styles.buttons}>
                                <button className={styles.removeAdd} type="button">Edit</button>
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

                            <div>
                                <button type="submit" onClick={handleSubmit}>SAVE ADDRESS</button>
                                <button type="button" onClick={handleReset}>CANCEL</button>
                            </div>
                        </form>
                    </div>
                )}
                <div className={styles.orderBtn}>
                    <button type="submit" onClick={handleOrder} >PROCEED TO PAYMENT</button>
                    <button type="button" >CANCEL ORDER</button>
                </div>

            </div>
        </div >

    );
};

export default OrderAddress;
