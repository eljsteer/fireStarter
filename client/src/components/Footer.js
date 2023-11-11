import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';

// >>---------------------->>
// Footer Component
// >>---------------------->>

const Footer = () => {

  return (
    <Box sx={{ backgroundColor: "#dddcdc", width: '100%', maxwidth: 'auto', display: 'flex', justifyContent: 'center', position: 'fixed', bottom: 0, height: 30 }}>
      <LocalFireDepartmentOutlinedIcon sx={{color: "#000000"}} /> 
      <Typography sx={{alignItems: 'center', color: "#000000"}} variant="overline" display="block" gutterBottom>
        Created by Jason Steer and Mackenzie Gray
      </Typography>
      <LocalFireDepartmentOutlinedIcon sx={{color: "#000000"}} />
    </Box>
  );
};

export default Footer;