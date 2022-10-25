import {Paper} from '@mui/material';

////// TODO: To add dynamic display and retrieval of "Hot Projects" with highest votes or funding ///////////
////// TODO: Also to add links to projects from Hot-Projects image to Project details page ///////////

// import { useQuery } from '@apollo/client';
// import { QUERY_PROJECTS } from '../utils/queries';

// >>---------------------------------->>
// Carousel Inner Content Component
// >>---------------------------------->>

function CarouselItem({item}) {
  // const {loading, data} = useQuery(QUERY_PROJECTS);
  // const allProjects = data?.userProjects || [];

      return (
          <Paper>
            {/* <Link 
              // to={`/project/${project._id}`}
              // underline="none"> */}
              <img src={item.imageSrc} sx={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', flexGrow: 1,   width: '100%', height: 'auto', }} style={{width: '100%', height: 'auto', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',backgroundPosition: 'center'}} alt={item.title}/>
            {/* </Link> */}
          </Paper>
      )
}

export default CarouselItem;