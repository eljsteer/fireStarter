import {Button, Paper} from '@mui/material';
import CarouselData from "../utils/carouselData"

function CarouselItem() {

      return (
          <Paper>
              <img className="resumeIcon" src={process.env.PUBLIC_URL + "/" + CarouselData.imageSrc} style={{width:"100%", height:"400px"}} alt={CarouselData.title}/>
              <Button className="CheckButton">
                  Check it out!
              </Button>
          </Paper>
      )
}

export default CarouselItem;