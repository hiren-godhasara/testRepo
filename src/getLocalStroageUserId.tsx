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

export { getUserId, removeUserId };