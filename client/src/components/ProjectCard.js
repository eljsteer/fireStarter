import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function ProjectCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {props.description}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            Funding Goal: ${props.fundingGoal}
          </Typography>          
          <Typography variant="subtitle1" color="text.secondary">
            <AutoAwesomeIcon /> Click to discover more
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}