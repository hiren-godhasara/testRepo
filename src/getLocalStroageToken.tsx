const getToken = (): string | null => {
    if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('token');
    } else {
        return null;
    }
};

export default getToken;
