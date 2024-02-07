import { useState } from 'react';
import styles from './OrderAddress.module.scss';


const OrderAddress = () => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        pincode: '',
        city: '',
        address: '',
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

    // const handleSubmit = (e: any) => {
    //     e.preventDefault();
    //     setFormData({
    //         name: '',
    //         phoneNumber: '',
    //         pincode: '',
    //         city: '',
    //         address: '',
    //         state: '',
    //         country: '',
    //     });
    // };


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3333/deliveryAddress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include'
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
            name: '',
            phoneNumber: '',
            pincode: '',
            city: '',
            address: '',
            state: '',
            country: '',


        });
    };

    const handleReset = () => {
        setFormData({
            name: '',
            phoneNumber: '',
            pincode: '',
            city: '',
            address: '',
            state: '',
            country: '',


        });
    };

    return (
        <div className={styles.OrderAddressContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.deliverAddress}>DELIVERY ADDRESS</div>
                <div className={styles.firstRow}>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Phone Number:</label>
                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                    </div>
                </div>


                <div className={styles.secondRow}>
                    <div>
                        <label>Pincode:</label>
                        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>City:</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                    </div>
                </div>

                <div className={styles.row}>
                    <div>
                        <label>Address:</label>
                        <textarea className={styles.address} name="address" value={formData.address} onChange={handleChange} required rows={2}></textarea>
                    </div>
                </div>

                <div className={styles.thirdRow}>
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
                    <button type="submit" onClick={handleSubmit}>SAVE AND DELIVER HERE</button>
                    <button type="button" onClick={handleReset}>CANCEL</button>
                </div>
            </form>

        </div>
    );
};

export default OrderAddress;


// import React, { useEffect, useState } from 'react';
// import styles from './OrderAddress.module.scss';

// interface AddressData {
//     name: string;
//     phoneNumber: string;
//     address: string;
//     city: string;
//     state: string;
//     pincode: string;
// }
// const OrderAddress = () => {
//     const [responseData, setResponseData] = useState<{ data: AddressData[] } | null>(null); // State to hold response data

//     useEffect(() => {
//         // const userId = localStorage.getItem('userId');
//         // if (userId) {
//         //     handleGet(userId);
//         // }
//         const userId = '1'
//         if (userId) {
//             handleGet(userId);
//         }
//     }, []);

//     const handleGet = async (userId: string) => {
//         try {
//             const response = await fetch('http://localhost:3333/deliveryAddressByUser', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ userId }),
//                 credentials: 'include'
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 setResponseData(data);
//             } else {
//                 console.error('Failed to send form data');
//             }
//         } catch (error: any) {
//             console.error('Error sending form data:', error.message);
//         }
//     };

//     return (
//         <div className={styles.OrderAddressContainer}>
//             {responseData && responseData.data && responseData.data.length > 0 && (
//                 <div className={styles.mainData}>

//                     {responseData.data.map((addressData: any, index: any) => (
//                         <div key={index} className={styles.addressContainer}>

//                             <div className={styles.addressItem}>
//                                 <div className={styles.name}>
//                                     {addressData.name}</div>
//                                 <div className={styles.phoneNumber}>
//                                     <strong>Mo.</strong> {addressData.phoneNumber}
//                                 </div>
//                             </div>

//                             <div className={styles.addressItem}>
//                                 <div className={styles.address}>{addressData.address},</div>
//                                 <div className={styles.city}>{addressData.city},</div>
//                                 <div className={styles.state}>{addressData.state},</div>
//                                 <div className={styles.pincode}><strong>{addressData.pincode}</strong></div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );


// };

// export default OrderAddress;


