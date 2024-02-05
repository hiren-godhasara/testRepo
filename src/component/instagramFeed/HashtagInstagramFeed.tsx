import React, { useEffect, useState } from 'react';
import styles from './HashtagInstagramFeed.module.scss';
import axios from 'axios';
import { Carousel } from 'antd';
import Image from 'next/image';
import companyLogo from '../../imageFolder/companyLogo.png'
import like from '../../imageFolder/heart.png'
import comment from '../../imageFolder/comment.png'
import share from '../../imageFolder/share.png'
import save from '../../imageFolder/saveIcon.png'
import dots from '../../imageFolder/dots.png'
import { defaultFeedDataArray, hashtag } from '../../data/DefaultInstagramFeedData'

interface InstagramFeed {
    id: string;
    media_type: 'IMAGE' | 'VIDEO';
    media_url: string;
    permalink: string;
    caption: string;
    timestamp: string;
}

const fetchInstagramFeeds = async (accessToken: string, count: Number) => {
    try {
        const response = await axios.get(
            `https://graph.instagram.com/v12.0/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${accessToken}&limit=${count}`
        );
        return response.data.data;
    } catch (error) {
        console.error('Error fetching Instagram feeds:', error);
        return [];
    }
};

const HashtagInstagramFeeds: React.FC = () => {
    const [feeds, setFeeds] = useState<InstagramFeed[]>([]);
    const accessToken = 'IGQWRPSTB3bk96cTl6N0VyeDVuMjVpdk1LdktzQVZAKdF9CSS02bVNrVktEcXNfOTJpS3ZAnc0tlVktkVXk2cDJTYXVEdU53WEQxVDV0YXJ6UUFxcVVKWXBycENYUUxhX01jV3loZAFpUSGM2M1pmWTdhenBtWUxrRFEZD';

    useEffect(() => {
        fetchInstagramFeeds(accessToken, 10)
            .then((data) => setFeeds(data))
            .catch((error) => console.error('Error setting Instagram feeds:', error));
    }, []);

    const filteredArray = feeds.filter(item => item.caption && item.caption.includes(hashtag));
    const defaultCount = Math.max(0, 4 - filteredArray.length);
    const defaultImages = Array.from({ length: defaultCount }, (_, index) => {
        const defaultFeedData = defaultFeedDataArray[index % defaultFeedDataArray.length];
        return {
            id: `default-${index + 1}`,
            media_url: defaultFeedData.src,
            permalink: 'https://www.instagram.com/mydryfruit_com/',
            caption: ''
        };
    });
    const finalArray = [...filteredArray, ...defaultImages];

    return (
        <div className={styles.carouselWrapper}>
            <h1 className={styles.h1}>Instagram Customers Feeds</h1>
            <Carousel slidesToShow={4} autoplay autoplaySpeed={3500} speed={1500} dots={false} className={styles.card} >
                {finalArray.map((feed) => (
                    <div key={feed.id}>
                        <a href={feed.permalink} target="_blank" rel="noopener noreferrer">
                            <div className={styles.separateCard}>
                                <div className={styles.mainFlex}>
                                    <div className={styles.flex}>
                                        <Image src={companyLogo} alt={` Image`} width={100} height={100} className={styles.companyLogo} />
                                        <p className={styles.userName}>mydryfruit_com</p>
                                    </div>
                                    <div className={styles.dots}>
                                        <Image src={dots} alt={` Image`} width={25} height={25} className={styles.dots} />
                                    </div>
                                </div>
                                <div className={styles.imageFlex}>
                                    <Image src={feed.media_url} width={205} height={205} alt={feed.caption} className={styles.image} />
                                </div>
                                <div className={styles.mainIcon}>
                                    <div className={styles.icons}>
                                        <Image src={like} alt={` Image`} width={28} height={28} className={styles.like} />
                                        <Image src={comment} alt={` Image`} width={25} height={25} className={styles.comment} />
                                        <Image src={share} alt={` Image`} width={25} height={25} className={styles.share} />
                                    </div>
                                    <div className={styles.saveIcon}>
                                        <Image src={save} alt={` Image`} width={28} height={28} className={styles.save} />
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </Carousel >
        </div >
    );
};

export default HashtagInstagramFeeds;





