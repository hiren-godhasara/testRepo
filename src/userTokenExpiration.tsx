// import { useState, useEffect } from 'react';

// const useTokenExpiration = (token: any) => {
//     const [tokenExpired, setTokenExpired] = useState(false);

//     useEffect(() => {
//         const checkTokenExpiration = () => {
//             const expirationTime = 86400000;
//             const tokenExpirationTimer = setTimeout(() => {
//                 setTokenExpired(true);
//             }, expirationTime);

//             return () => clearTimeout(tokenExpirationTimer);
//         };

//         if (token) {
//             checkTokenExpiration();
//         }

//         return () => { };
//     }, [token]);

//     useEffect(() => {
//         if (tokenExpired) {
//             window.location.reload();
//         }
//     }, [tokenExpired]);

//     return tokenExpired;
// };

// export default useTokenExpiration;
