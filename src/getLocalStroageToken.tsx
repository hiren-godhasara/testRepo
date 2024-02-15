import Cookies from 'js-cookie';

const getToken = () => {
    if (typeof Cookies !== 'undefined') {
        return Cookies.get('token');
    } else {
        return null;
    }
};

export default getToken;
