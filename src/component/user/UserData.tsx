// import React, { useEffect, useState } from 'react';
// import styles from './UserData.module.scss';
// import Image from 'next/image';
// import { useRouter } from 'next/router'; // Correct the import
// import getUserId from '@/getLocalStroageUserId';

// const UserDetails = ({ onClose }: any) => {
//     const handleClose = () => {
//         onClose();
//     };
//     const [userDetails, setUserDetails] = useState<any>(null);
//     const userId = getUserId();
//     const [formattedDate, setFormattedDate] = useState<string | null>(null);

//     const fetchUserData = () => {
//         fetch(`${process.env.BASE_URL}/s/user/${userId}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log(data.data);
//                 setUserDetails(data.data);

//                 // Format the date here
//                 const timestamp = data.data.createdAt;
//                 const date = new Date(timestamp);
//                 const formatted = date.toLocaleDateString('en-GB');
//                 setFormattedDate(formatted);
//             })
//             .catch(error => {
//                 console.error('There was a problem fetching the data:', error);
//             });
//     };

//     useEffect(() => {
//         fetchUserData();
//     }, []);

//     return (
//         <div className={styles.userData}>
//             {userDetails &&
//                 <div className={styles.mainSection}>
//                     <div className={styles.section}>
//                         <p>Name: {userDetails.firstName} {userDetails.lastName}</p>
//                         <p>Mobile: {userDetails.countryCode} {userDetails.mobile}</p>
//                         <p>Email: {userDetails.email}</p>
//                         <p>Registered on: {formattedDate}</p>
//                     </div>

//                     <div className={styles.btn}>
//                         <button className={styles.editButton}>Edit Details</button>
//                         <button className={styles.closeButton} onClick={handleClose}>Close</button>
//                     </div>


//                 </div>
//             }
//         </div>
//     );
// };

// export default UserDetails;




import React, { useEffect, useState } from 'react';
import styles from './UserData.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import getUserId from '@/getLocalStroageUserId';
import RegistrationForm from '../registrationUser/Register';
import UpdateUser from './UpdateUser';

const UserDetails = ({ onClose }: any) => {
    const handleClose = () => {
        onClose();
    };
    const [userDetails, setUserDetails] = useState<any>(null);
    console.log(userDetails);

    const userId = getUserId();
    const [formattedDate, setFormattedDate] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchUserData = () => {
        fetch(`${process.env.BASE_URL}/s/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.data);
                setUserDetails(data.data);

                const timestamp = data.data.createdAt;
                const date = new Date(timestamp);
                const formatted = date.toLocaleDateString('en-GB');
                setFormattedDate(formatted);
            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
            });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleUserUpdate = () => {
        fetchUserData();
    };

    useEffect(() => {
        console.log('userDetails in UserDetails:', userDetails);
    }, [userDetails]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    return (
        <div className={styles.userData}>
            {isEditing ? (
                <UpdateUser
                    userDetails={userDetails}
                    onFormSubmit={handleUserUpdate}
                    onClose={() => setIsEditing(false)}
                />
            ) : (
                userDetails && (
                    <div className={styles.mainSection}>
                        <p className={styles.heading} >User Details</p>
                        <div className={styles.section}>
                            <p>Name: {userDetails.firstName} {userDetails.lastName}</p>
                            <p>Mobile: {userDetails.countryCode} {userDetails.mobile}</p>
                            <p>Email: {userDetails.email}</p>
                            <p>Registered on: {formattedDate}</p>
                        </div>

                        <div className={styles.btn}>
                            <button className={styles.editButton} onClick={handleEditClick}>
                                Edit Details
                            </button>
                            <button className={styles.closeButton} onClick={handleClose}>
                                Close
                            </button>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default UserDetails;



