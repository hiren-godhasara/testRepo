'use client'

import React, { useEffect, useState } from 'react';
import styles from './UserData.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getUserId } from '@/getLocalStroageUserId';
import RegistrationForm from '../registrationUser/Register';
import UpdateUser from './UpdateUser';
import { getToken } from '@/getLocalStroageToken';

const UserDetails = ({ onClose }: any) => {
    const handleClose = () => {
        onClose();
    };
    const [userDetails, setUserDetails] = useState<any>(null);

    const userId = getUserId();
    const [formattedDate, setFormattedDate] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const token = getToken()
    const fetchUserData = () => {
        fetch(`${process.env.BASE_URL}/s/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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
                        <table className={styles.userTable}>
                            <thead>
                                <tr>
                                    <th colSpan={2} className={styles.heading}>User Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Name</strong></td>
                                    <td>{userDetails.firstName} {userDetails.lastName}</td>
                                </tr>
                                <tr>
                                    <td><strong>Mobile</strong></td>
                                    <td>
                                        {userDetails.mobile ? `${userDetails.countryCode} ${userDetails.mobile}` : 'Not Available'}
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Email</strong></td>
                                    <td>{userDetails.email}</td>
                                </tr>
                                <tr>
                                    <td><strong>Registered on</strong></td>
                                    <td>{formattedDate}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className={styles.btn}>
                            <button className={styles.closeButton} onClick={handleClose}>
                                Close
                            </button>
                            <button className={styles.editButton} onClick={handleEditClick}>
                                Edit Details
                            </button>
                        </div>
                    </div>

                    // <div className={styles.mainSection}>
                    //     <p className={styles.heading} >User Details</p>
                    //     <div className={styles.section}>
                    //         <p><strong>Name: </strong>{userDetails.firstName} {userDetails.lastName}</p>
                    //         <p><strong>Mobile: </strong>{userDetails.countryCode} {userDetails.mobile}</p>
                    //         <p><strong>Email: </strong>{userDetails.email}</p>
                    //         <p><strong>Registered on: </strong>{formattedDate}</p>
                    //     </div>

                    //     <div className={styles.btn}>
                    //         <button className={styles.closeButton} onClick={handleClose}>
                    //             Close
                    //         </button>
                    //         <button className={styles.editButton} onClick={handleEditClick}>
                    //             Edit Details
                    //         </button>
                    //     </div>
                    // </div>
                )
            )}
        </div>
    );
};

export default UserDetails;



