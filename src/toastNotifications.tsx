import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastNotifications = () => {
    return (
        <ToastContainer position="top-right" autoClose={3000} style={{ paddingTop: '105px' }} />
    );
};

export const showSuccessToast = (message: string) => {
    toast.success(message);
};

export const showErrorToast = (message: string) => {
    toast.error(message);
};
