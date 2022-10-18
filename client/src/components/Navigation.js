import React from 'react'
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';

const drawerWidth = 240;

const navItems = [
    {
        id: 0,
        icon: <HomeIcon />,
        name: 'Home',
        url: '/'
    },
    {
        id: 1,
        icon: <AccountBoxIcon />,
        name: 'Profile',
        url: '/profile'
    },
    {
        id: 2,
        icon: <SearchIcon />,
        name: 'Discover',
        url: '/discover'
    },
    {
        id: 3,
        icon: <LoginIcon />,
        name: 'Login',
        url: '/login'
    }
];

function Navigation(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                FireStarter
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.id} disablePadding>
                        <Link to={`${item.url}`}>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemIcon >
                                    <>{item.icon}</>
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </Link>                
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', margin: 8 }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                    FireStarter
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Link to={`${item.url}`}>
                                <Button key={item.id} sx={{ color: '#fff' }}>
                                        <ListItemButton sx={{ textAlign: 'center' }}>
                                            <ListItemIcon >
                                                <>{item.icon}</>
                                            </ListItemIcon>
                                            <ListItemText primary={item.name} />
                                        </ListItemButton>
                                </Button>
                            </Link>                        
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>      
        </Box>
    );    
};

export default Navigation;