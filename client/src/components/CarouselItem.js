import {Paper} from '@mui/material';
// import {Button} from '@mui/material';
// import { Link } from "react-router-dom";

// import { useQuery } from '@apollo/client';
// import { QUERY_PROJECTS } from '../utils/queries';

function CarouselItem({item}) {
  // const {loading, data} = useQuery(QUERY_PROJECTS);
  // const allProjects = data?.userProjects || [];

      return (
          <Paper>
            {/* <Link 
              // to={`/project/${project._id}`}
              // underline="none"> */}
              <img src={item.imageSrc} style={{width:"auto", height:"65vh"}} alt={item.title}/>
            {/* </Link> */}
          </Paper>
      )
}

export default CarouselItem;