const getUserId = (): string | null => {
    if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('userId');
    } else {
        return null;
    }
};

export default getUserId;
