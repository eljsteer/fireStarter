import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Button, Paper} from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function CarouselComponent(props) {

  function Project(props)
{
    return (
        <Paper>
            <img className="resumeIcon" src={process.env.PUBLIC_URL + "/" + hotProjects.imageSrc} alt={hotProjects.title}/>
            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}

    var hotProjects = [
      {
        "title": "Idle Hands",
        "description": "An application aimed at those within the underworld of society who possess a certain set of skills, where the user can advertise their skills for \"Hire\" or locate and connect with any type of lackey they require",
        "gitRepo": "idleHands",
        "fundingGoal": "32500",
        "currentFunds": "31000",
        "imageSrc": "assets/images/carousel/pexels-cottonbro-IdleHands2.jpg"
      }, {
        "title": "Racetrack Book-A-Thon",
        "description": "Make searching and connecting with racetrack bookies easy with our simple Racetrack bookies application. At the click of a button search race events near you.",
        "gitRepo": "garrisonpub",
        "fundingGoal": "23500",
        "currentFunds": "795",
        "imageSrc": "assets/images/carousel/pexels-martin-damboldt-Book-A-Thon.jpg"
      }, {
        "title": "Bottle Clink",
        "description": "Online e-commerce application to search, purchase and deliver your favourite spirit products straight to your door with Bottle Clink.",
        "gitRepo": "clinkclink888",
        "fundingGoal": "13500",
        "currentFunds": "1250",
        "imageSrc": "assets\images\carousel\pexels-elevate-BottleClink.jpg"
      }
    ]

    return (
        <Carousel
        NextIcon={<ArrowForwardRoundedIcon/>}
        PrevIcon={<ArrowBackRoundedIcon/>}
        >
            {
                hotProjects.map( (hotProj, i) => <Project key={i} item={hotProj} /> )
            }
        </Carousel>
    )
};

export default CarouselComponent;