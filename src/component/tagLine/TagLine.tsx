import { useEffect, useState } from 'react';
import styles from './TagLine.module.scss';



const TagLine = () => {
    const [tagLineList, setTagLineList] = useState<any>([]);
    const [currentTagLineIndex, setCurrentTagLineIndex] = useState(0);

    const fetchTagLineData = () => {
        fetch(`${process.env.BASE_URL}/s/tagLine`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // console.log(data.data);
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
        <>
            <div className={styles.container}>
                {tagLineList.length > 0 && (
                    <p className={styles.p}>
                        {(tagLineList[currentTagLineIndex].tagLine)}
                    </p>
                )}
            </div>
        </>
    );
};

export default TagLine;
