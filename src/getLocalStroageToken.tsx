import Cookies from 'js-cookie';

const getToken = () => {
    if (typeof Cookies !== 'undefined') {
        return Cookies.get('token');
    } else {
        return null;
    }
};

const removeToken = () => {
    if (typeof Cookies !== 'undefined') {
        Cookies.remove('token');
    }
};

export { getToken, removeToken };
