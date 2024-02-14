import Cookies from 'js-cookie';

const getUserId = () => {
    if (typeof Cookies !== 'undefined') {
        return Cookies.get('userId');
    } else {
        return null;
    }
};

export default getUserId;