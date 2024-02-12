const getUserId = (): string | null => {
    if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('userId');
    } else {
        console.error('localStorage is not available.');
        return null;
    }
};

export default getUserId;
