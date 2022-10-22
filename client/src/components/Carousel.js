import React from 'react';
import Carousel from 'react-material-ui-carousel'
import carouselData from "../utils/carouselData";
import CarouselItem from "./CarouselItem"

function CarouselHome(item) {

    return (
      <div>
        <Carousel
          navButtonsAlwaysVisible={true}
        >
            {
                carouselData.map( item => <CarouselItem key={item.id} item={item} /> )
            }
        </Carousel>
      </div>
    )
};

export default CarouselHome;