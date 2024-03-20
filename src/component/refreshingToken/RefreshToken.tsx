// 'use client'
// import { useEffect, useState } from "react";
// import Cookies from 'js-cookie';
// import { getToken } from "@/getLocalStroageToken";
// import { getUserId } from "@/getLocalStroageUserId";

// const RefreshToken = () => {
//     const [userDetails, setUserDetails] = useState<any>(null);
//     const token = getToken();
//     const userId = getUserId();
//     const fetchUserData = () => {
//         fetch(`${process.env.BASE_URL}/s/user/${userId}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
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
//             })
//             .catch(error => {
//                 console.error('There was a problem fetching the data:', error);
//             });
//     };
//     useEffect(() => {
//         if (!token) return
//         const fetchData = async () => {
//             await fetchUserData();
//         };
//         fetchData();
//         const interval = setInterval(fetchData, 90000);
//         return () => clearInterval(interval);
//     }, []);

//     useEffect(() => {
//         const refreshToken = async () => {
//             const formData = {
//                 loginId: userDetails?.email,
//                 jwtToken: token
//             }
//             const time = userDetails?.updatedAt
//             const currTime = new Date().getTime();
//             if (time && currTime > time + 90000) {
//                 try {
//                     const response = await fetch(`${process.env.BASE_URL}/s/tokenLogin`, {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json'
//                         },
//                         body: JSON.stringify(formData)
//                     });
//                     const data = await response.json();

//                     if ((data.data && Object.keys(data.data).length > 0)) {
//                         Cookies.set('token', data.data.token, { expires: 1 });
//                         Cookies.set('userId', data.data.userId, { expires: 1 });
//                     }
//                 } catch (error) {
//                     console.error('Error refreshing token:', error);
//                 }
//             }
//         };

//         refreshToken();
//     }, [userDetails, token]);

//     return null;
// }

// export default RefreshToken;
