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

const runEvery24Hours = () => {
    setInterval(removeToken, 24 * 60 * 60 * 1000);
};

runEvery24Hours();

export { getToken, removeToken };
