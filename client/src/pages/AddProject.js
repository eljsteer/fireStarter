import React from 'react';
import { Link } from 'react-router-dom';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddIcon from '@mui/icons-material/Add';

let theme = createTheme();
theme = responsiveFontSizes(theme);

theme.typography.h3 = {
    fontSize: '2rem',
    '@media (min-width:600px)': {
        fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
    },
};

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 25
}));

export default function AddProject() {
    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <>
            <Item>  
                <ThemeProvider theme={theme}>
                    <Typography variant="h3">Add a Project</Typography>
                </ThemeProvider>
            </Item>

            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch',  },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <div>
                            <TextField
                            id="outlined-textarea"
                            label="Title"
                            placeholder="Enter project title"
                            multiline
                            />
                            <TextField
                            id="outlined-textarea"
                            label="Description"
                            placeholder="Enter project description"
                            multiline
                            />
                            <TextField
                            id="outlined-textarea"
                            label="Github Repository"
                            placeholder="Enter repository name"
                            multiline
                            />
                            <TextField
                            id="outlined-textarea"
                            label="Funding Goal"
                            placeholder="Enter funding goal"
                            multiline
                            />
                        </div>                       
                    </Box>
                </CardContent>
                <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                margin={2}
                >
                    <Button variant="contained" color="success">
                        <AddIcon /> Add project
                    </Button>
                    <Link to='/profile'>
                        <Button variant="contained">
                            <ChevronLeftIcon /> Go Back
                        </Button>
                    </Link>                
                </Stack>                
            </Card>
        </>
    )
}