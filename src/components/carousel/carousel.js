import './carousel.css';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import left from '../../img/icons8-left-chevron-25.png';
import right from '../../img/icons8-right-chevron-25.png';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import slide_image_1 from '../../img/image1.jpg';
import slide_image_2 from '../../img/image2.jpg';
import slide_image_3 from '../../img/image3.jpg';
import slide_image_4 from '../../img/image1.jpg';
import slide_image_5 from '../../img/image2.jpg';
import slide_image_6 from '../../img/image3.jpg';

function Carousel() {

    const images =[
        slide_image_1,
        slide_image_2,
        slide_image_3,
        slide_image_5,
        slide_image_6,
        slide_image_4,
        slide_image_1,
        slide_image_2,
        slide_image_3,
    ]

    const middleIndex = Math.floor(images.length / 2);

    return (
        <div className="container">
            <h1 className="heading">GALERII</h1>
            <Swiper
                effect={'coverflow'}
                grabCursor={false}
                centeredSlides={true}
                loop={false}
                slidesPerView={'auto'}
                initialSlide={middleIndex}
                coverflowEffect={{
                    rotate: 15,
                    stretch: 0,
                    depth: 300,
                    modifier: 1,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true,  }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container"
            >
                {
                    images.map((image,index) => (
                        <SwiperSlide key={index}>
                            <img src={image}  alt="slide_image" />
                        </SwiperSlide>
                    ))
                }

                <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow">
                        <img src={left} alt=""/>
                    </div>
                    <div className="swiper-button-next slider-arrow">
                        <img src={right} alt=""/>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </Swiper>
        </div>
    );
}

export default Carousel;