import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';

const Footer = () => {

  return (
    <Box sx={{ backgroundColor: '#0c1012', width: '100%', maxWidth: 'auto', display: 'flex', justifyContent: 'center', position: 'fixed', bottom: 0 }}>
      <LocalFireDepartmentOutlinedIcon /> 
      <Typography sx={{alignItems: 'center'}} variant="overline" display="block" gutterBottom>
        Created by Jason Steer and Mackenzie Gray
      </Typography>
      <LocalFireDepartmentOutlinedIcon />
    </Box>
  );
};

export default Footer;