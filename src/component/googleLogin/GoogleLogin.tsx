// 'use client'
// import React, { useState, useEffect } from 'react';
// import { useGoogleOneTapLogin } from "react-google-one-tap-login"
// import styles from './GoogleLogin.module.scss'
// import { getToken } from '@/getLocalStroageToken';
// import Cookies from 'js-cookie';

// function GoogleLogin() {
//     const [name, setName] = useState('');
//     const [fname, setFname] = useState('');
//     const [email, setEmail] = useState('');

//     const [showPopup, setShowPopup] = useState(true);
//     const token = getToken()


//     useEffect(() => {
//         const handleClickOutside = (event: any) => {
//             if (showPopup && !event.target.closest('.google-one-tap-login-popup')) {
//                 setShowPopup(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [showPopup]);


//     // if (!token) {
//     useGoogleOneTapLogin({
//         onSuccess: async (response) => {
//             setName(response.given_name);
//             setFname(response.family_name);
//             setEmail(response.email);

//             setShowPopup(true);
//             if (response) {
//                 console.log(response);

//                 const responses = await fetch(`${process.env.BASE_URL}/s/register`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: await JSON.stringify({
//                         firstName: response.given_name,
//                         lastName: response.family_name,
//                         email: response.email
//                     })
//                 });
//                 console.log(responses);

//                 if (responses) {
//                     if (responses.ok) {
//                         const data = await responses.json();

//                         Cookies.set('token', data.data.token, { expires: 1 });
//                         Cookies.set('userId', data.data.userId, { expires: 1 });
//                         // if (typeof window !== 'undefined') {
//                         //     window.location.reload()
//                         // }

//                     } else {
//                         const data = await responses.json();
//                         console.log(data);
//                     }
//                 }
//             }

//         },
//         onError: (error) => console.log(error),
//         googleAccountConfigs: {
//             client_id: "1027485564712-nm6m9eifqopa3eqq2pnmj83vljb0e74c.apps.googleusercontent.com",
//             // showPrompt: showPopup
//         },
//     });
//     // }


//     return (
//         <div>
//             {!token && (
//                 <>
//                     <div className={styles.box}></div>
//                     <div className={styles.box1}></div>
//                 </>
//             )}

//         </div>
//     );
// }


// export default GoogleLogin;



'use client'
import React, { useState, useEffect } from 'react';
import { useGoogleOneTapLogin } from "react-google-one-tap-login"

function GoogleLogin() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [showPopup, setShowPopup] = useState(true);

    // Handle click outside the popup
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            console.log(event.target);

            if (showPopup && !event.target.closest('.google-one-tap-login-popup')) {
                setShowPopup(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPopup]);

    // Use the custom hook for Google One Tap login
    useGoogleOneTapLogin({
        onSuccess: (response) => {
            setName(response.given_name);
            setEmail(response.email);
            setShowPopup(true);
            console.log("User email:", response.email);
        },
        onError: (error) => console.log(error),
        googleAccountConfigs: {
            client_id: "1027485564712-nm6m9eifqopa3eqq2pnmj83vljb0e74c.apps.googleusercontent.com",
        },
    });

    return (
        <div>
            {/* Render your component using name, email, showPopup */}
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            {/* Add logic to conditionally render the popup based on showPopup state */}
            {showPopup && (
                <div className="google-one-tap-login-popup">
                    {/* Your popup content */}
                </div>
            )}
        </div>
    );
}

export default GoogleLogin;