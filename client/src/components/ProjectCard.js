import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function ProjectCard(props) {
  return (
    <Card sx={{ maxWidth: 500, backgroundColor: '#000000' }} raised={'true'}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {props.description}
          </Typography>
          <br />
          <Typography gutterBottom variant="body2" component="div">
            Funding Goal: ${props.fundingGoal}
          </Typography> 
          <br />   
          <Button variant="outlined">
            <AutoAwesomeIcon /> Click to discover more
          </Button>      
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
