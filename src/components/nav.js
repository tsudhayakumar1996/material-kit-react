import { Avatar, Drawer, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system"
import { alpha } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import { navConfig } from "../config/navConfig";
import { NAV_WIDTH } from "../consts/consts";
import { useResponsive } from "../hooks/useResponsive"
import { styled } from '@mui/material/styles';
import { storageGet } from "../helpers/storageHelpers";

const NavItem = ({onClose}) => { 

    const Main = styled('div')(({ theme }) => ({
        height: '100vh',
        overflowY: 'auto',
        padding: theme.spacing(1)
    }));

    const StyledNavItem = styled(ListItemButton)(({ theme }) => ({
        ...theme.typography.body2,
        height: 48,
        position: 'relative',
        textTransform: 'capitalize',
        color: theme.palette.text.secondary,
        borderRadius: theme.shape.borderRadius,
    }));

    const StyledNavItemIcon = styled(ListItemIcon)({
        width: 22,
        height: 22,
        color: 'inherit',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    });

    const StyledAccount = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2, 2.5),
        borderRadius: Number(theme.shape.borderRadius) * 1.5,
        backgroundColor: alpha(theme.palette.grey[500], 0.12),
    }));

    return(
        <Main>        
            <StyledAccount sx={{
                mt: 2,
                mb: 2
            }}>
                <Avatar src={'/assets/avatar_default.jpg'} alt="photoURL" />
                <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                    {storageGet('email')}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {storageGet('user')}
                </Typography>
                </Box>
            </StyledAccount>
            {navConfig.map((item, idx) => {
                return(
                    <StyledNavItem
                        component={NavLink}
                        to={item?.path}
                        key={idx} 
                        onClick={() => onClose()}
                        sx={{
                            '&.active': {
                                color: 'text.primary',
                                bgcolor: 'action.selected',
                                fontWeight: 'fontWeightBold',
                            },
                        }}
                    >
                        <StyledNavItemIcon>{item?.icon}</StyledNavItemIcon>
                        <ListItemText disableTypography primary={item?.title} />
                    </StyledNavItem>
                )
            })}            
        </Main>
    )
}

export const Nav = ({openNav, onCloseNav}) => {

    const isDeskTop = useResponsive('up','lg');

    return(
        <Box>
            {isDeskTop ?
                <Drawer
                    open
                    variant="permanent"
                    PaperProps={{
                        sx: {
                          width: NAV_WIDTH,
                          bgcolor: 'background.default',
                          borderRightStyle: 'dashed',
                        },
                    }}
                >
                    <NavItem onClose={onCloseNav} />
                </Drawer> :
                <Drawer
                    open={openNav}
                    onClose={onCloseNav}
                    PaperProps={{
                        sx: {
                          width: NAV_WIDTH - 50,
                          bgcolor: 'background.default',                          
                        },
                    }}
                >
                    <NavItem onClose={onCloseNav} />
                </Drawer>
            }
        </Box>
    )
}