import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

// >>----------------------------->>
// Project Details & Info Component
// >>----------------------------->>

export default function ProjectCard(props) {
  return (
    <Card sx={{ maxWidth: 500, backgroundColor: "var(--ComponentGBColor)" }} raised={'true'}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {props.title}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {props.description}
          </Typography>
          <br />
          <Typography gutterBottom variant="h6" component="div">
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
