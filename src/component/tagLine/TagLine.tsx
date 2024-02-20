import { useEffect, useState } from 'react';
import { getUserId } from '@/getLocalStroageUserId';
import styles from './TagLine.module.scss';
import { getToken } from '@/getLocalStroageToken';
import { useRouter } from 'next/navigation';

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
                'Authorization': `Bearer ${token}`,
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

    return (
        <div className={styles.container}>
            {tagLineList.length > 0 && (
                <div>
                    <p className={styles.p}>{tagLineList[currentTagLineIndex].tagLine}</p>
                </div>
            )}
        </div>
    );
};

export default TagLine;

