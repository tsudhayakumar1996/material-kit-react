import { AppBar, Avatar, IconButton, ListItemButton, ListItemIcon, ListItemText, Popover, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { storageClear } from '../helpers/storageHelpers';
import { logOutUser } from '../redux/slices/authSlice';
import { bgBlur } from '../stylingHelpers/bgBlur';
import MenuIcon from '@mui/icons-material/Menu';
import { APP_BAR_DESKTOP, APP_BAR_MOBILE, NAV_WIDTH } from '../consts/consts';
import { useState } from 'react';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { clearDashBoardState } from '../redux/slices/dashBoardSlice';

const StyledRoot = styled(AppBar)(({theme}) => ({
    ...bgBlur({color: theme.palette.background.default, blur: 6, opacity: 0.8}),
    boxShadow: 'none',
    [theme.breakpoints.up("lg")]: {
        width: `calc(100% - ${NAV_WIDTH}px)`
    }
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    minHeight: APP_BAR_MOBILE,
    justifyContent: 'space-between',
    [theme.breakpoints.up('lg')]: {
      minHeight: APP_BAR_DESKTOP,
      padding: theme.spacing(0, 5),
      justifyContent: 'end!important',
    },
}));

export const Header = ({onOpenNav}) => {

    const dispatch = useDispatch();

    const logOutClickHandler = () => {               
        storageClear();
        dispatch(logOutUser());
        dispatch(clearDashBoardState());
    };

    const [open, setopen] = useState(false);
    const [anchorEl, setanchorEl] = useState(null);

    const handleClose = () => {
        setanchorEl(null);
        setopen(false);
    };

    const handleOpen = (e) => {
        setopen(true);
        setanchorEl(e.currentTarget);        
    }

    const PoperBox = styled(ListItemButton)(({ theme }) => ({
        ...theme.typography.body2,
        height: 48,
        position: 'relative',
        textTransform: 'capitalize',
        color: theme.palette.text.secondary,
        borderRadius: theme.shape.borderRadius,
    }));

    const PoperBoxIcon = styled(ListItemIcon)({
        width: 22,
        height: 22,
        color: 'inherit',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    });

    return(
        <StyledRoot>
            <StyledToolbar>
                <IconButton
                    onClick={onOpenNav}
                    sx={{
                        mr: 1,
                        color: 'text.primary',
                        display: { lg: 'none' },
                    }}
                    >
                    <MenuIcon />                
                </IconButton>
                <IconButton
                    onClick={handleOpen}
                    sx={{
                        p: 0,                    
                    }}
                >
                    <Avatar src={'/assets/avatar_default.jpg'} alt="photoURL" />
                </IconButton>
                <Popover
                    open={open}
                    anchorEl={anchorEl}                    
                    onClose={handleClose}                    
                    anchorOrigin={{ vertical: 50, horizontal: 'right' }}                    
                >
                    <PoperBox onClick={logOutClickHandler}>
                        <PoperBoxIcon>
                            <LogoutRoundedIcon />
                        </PoperBoxIcon>
                        <ListItemText disableTypography primary={'Logout'} />
                    </PoperBox>    
                </Popover>                            
            </StyledToolbar>
        </StyledRoot>
    )
}