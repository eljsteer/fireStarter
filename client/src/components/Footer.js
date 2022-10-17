import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {

  return (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Typography variant="overline" display="block" gutterBottom>
        Footer Text
      </Typography>
    </Box>
  );
};

export default Footer;