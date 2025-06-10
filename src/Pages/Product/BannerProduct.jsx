import React, { useEffect, useRef, useState } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BannerProduct() {
    const [photoData, setPhotoData] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const mobileImages = [
        'https://firebasestorage.googleapis.com/v0/b/e-com-ff1ce.appspot.com/o/mauryagourav82%40gmail.com%2Fbanner%2Fimg1_mobile.jpg?alt=media&token=7875c5ce-fb3b-4839-8a38-06c51398a679',
        'https://firebasestorage.googleapis.com/v0/b/e-com-ff1ce.appspot.com/o/mauryagourav82%40gmail.com%2Fbanner%2Fimg2_mobile.webp?alt=media&token=58202c8a-ee28-4ae2-b048-aab40621693a',
        'https://firebasestorage.googleapis.com/v0/b/e-com-ff1ce.appspot.com/o/mauryagourav82%40gmail.com%2Fbanner%2Fimg3_mobile.jpg?alt=media&token=93da5b7e-5470-42f1-8f93-0849455a0de3',
        'https://firebasestorage.googleapis.com/v0/b/e-com-ff1ce.appspot.com/o/mauryagourav82%40gmail.com%2Fbanner%2Fimg4_mobile.jpg?alt=media&token=abced1cc-ff3d-473e-a19e-bd518819783d',
        'https://firebasestorage.googleapis.com/v0/b/e-com-ff1ce.appspot.com/o/mauryagourav82%40gmail.com%2Fbanner%2Fimg5_mobile.png?alt=media&token=1bc54dd5-2881-4a5d-9ce0-cce4d57e58ae',
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/categories');
                const filteredCategories = response.data.categories.filter((photo) => photo.bannerPhoto !== null);
                setPhotoData(filteredCategories);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const progressCircle = useRef(null);
    const progressContent = useRef(null);

    const onAutoplayTimeLeft = (swiper, time, progress) => {
        if (progressCircle.current && progressContent.current) {
            progressCircle.current.style.setProperty('--progress', 1 - progress);
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        }
    };

    return (
        <div className='w-full h-[20rem] flex items-center relative rounded-2xl overflow-hidden'>
            <Swiper
                modules={[ Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{ type: 'progressbar' }}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="swiper1"
            >
                {photoData.map((photo, index) => (
                    <SwiperSlide key={index} className='rounded-2xl'>
                        <Link to={`/product-category?category=${photo._id}`} className='w-full h-full'>
                            {isMobile ? (
                                <img src={mobileImages[index]} alt={photo.name} className="w-full h-full object-contain rounded-2xl" />
                            ) : (
                                <img src={photo.bannerPhoto} alt={photo.name} className="w-full h-full object-cover rounded-2xl" />
                            )}
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

            
        </div>
    );
}

export default BannerProduct;
