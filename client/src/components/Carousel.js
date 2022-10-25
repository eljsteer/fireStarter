import { Container } from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel'
import carouselData from "../utils/carouselData.json";
import CarouselItem from "./CarouselItem"

// >>------------------------------------->>
// Container for Container
// >>------------------------------------->>

function CarouselHome(item) {

    return (
        <Carousel>
            {
                carouselData.map( item => <CarouselItem key={item.id} item={item} /> )
            }
        </Carousel>
    )
};

export default CarouselHome;