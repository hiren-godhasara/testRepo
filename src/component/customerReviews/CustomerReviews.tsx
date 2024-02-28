'use client'
import React from 'react';
import styles from './CustomerReviews.module.scss';
import reviews from '../../data/CustomerReviews';
import ReviewData from './ReviewData';

const ReviewSlider: React.FC = () => {
    return (
        <div className={styles.mainReview}>
            <h3 className={styles.says}>What Our Customer Say</h3>
            <ReviewData reviews={reviews} />
        </div>
    );
};

export default ReviewSlider;