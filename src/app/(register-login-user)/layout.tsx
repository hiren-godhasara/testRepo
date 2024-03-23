import React from 'react';
import styles from './lays.module.scss'

export default function RegLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className={styles.backImg}>
                {children}
            </div>
        </div>
    );
}