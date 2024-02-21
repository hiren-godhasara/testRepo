import { useEffect, useState } from 'react';
import { getUserId } from '@/getLocalStroageUserId';
import styles from './TagLine.module.scss';
import { getToken } from '@/getLocalStroageToken';

interface TagLineItem {
    _id: string;
    tagLine: string;
}

const TagLine = () => {
    const [tagLineList, setTagLineList] = useState<TagLineItem[]>([]);
    const [currentTagLineIndex, setCurrentTagLineIndex] = useState(0);

    const userId = getUserId();
    const token = getToken();

    const fetchTagLineData = () => {
        fetch(`${process.env.BASE_URL}/s/tagLine`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.data);
                setTagLineList(data.data);
            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
            });
    };

    useEffect(() => {
        fetchTagLineData();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTagLineIndex(prevIndex => (prevIndex + 1) % tagLineList.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [tagLineList]);

    const parseTagLine = (tagLine: string) => {
        const regex = /(\d+%)/;
        const match = tagLine.match(regex);

        if (match) {
            const numberAndPercentage = match[1];
            const color = getColorForNumberAndPercentage(numberAndPercentage);
            const parts = tagLine.split(numberAndPercentage);

            const numberAndPercentageWithStyle = (
                <span className={styles.whiteBackground}>
                    {numberAndPercentage.split('').map((char, index) => (
                        <span key={index} className={styles.star}>{char}</span>
                    ))}
                </span>
            );

            return (
                <p className={styles.blinkingtext}>
                    {parts[0]}
                    <span style={{ color }}>{numberAndPercentageWithStyle}</span>
                    {parts[1]}
                </p>
            );
        }

        return <p className={styles.p}>{tagLine}</p>;
    };


    const getColorForNumberAndPercentage = (numberAndPercentage: string) => {
        const percentageMatch = numberAndPercentage.match(/(\d+)%/);

        if (percentageMatch) {
            const percentageValue = parseInt(percentageMatch[1], 10);

            if (percentageValue >= 0 && percentageValue < 10) {
                return 'green';
            }

            if (percentageValue >= 10 && percentageValue <= 20) {
                return 'red';
            }

            if (percentageValue >= 21 && percentageValue <= 30) {
                return 'blue';
            }

            if (percentageValue >= 31 && percentageValue <= 40) {
                return 'violet';
            }
            if (percentageValue >= 41 && percentageValue <= 50) {
                return 'purple';
            }
        }

        return '#144950';
    };


    return (
        <div className={styles.container}>
            {tagLineList.length > 0 && (
                <div className={styles.p}>
                    {parseTagLine(tagLineList[currentTagLineIndex].tagLine)}
                </div>
            )}
        </div>
    );
};

export default TagLine;
