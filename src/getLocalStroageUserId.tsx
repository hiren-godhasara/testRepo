import Cookies from 'js-cookie';

const getUserId = () => {
    if (typeof Cookies !== 'undefined') {
        return Cookies.get('userId');
    } else {
        return null;
    }
};

const removeUserId = () => {
    if (typeof Cookies !== 'undefined') {
        Cookies.remove('userId');
    }
};
const runEvery24Hours = () => {
    setInterval(removeUserId, 24 * 60 * 60 * 1000);
};

runEvery24Hours();

export { getUserId, removeUserId };