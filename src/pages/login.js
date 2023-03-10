import { updateDocTitle } from "../helpers/updateDocTitle";
import { styled } from '@mui/material/styles';
import { Container, Divider, Typography } from "@mui/material";
import { useResponsive } from "../hooks/useResponsive";
import { LoginForm } from "../components/loginForm";
import { storageGet } from "../helpers/storageHelpers";

export const Login = () => {

    updateDocTitle('Login');
    const mdUp = useResponsive('up', 'md');

    const StyledRoot = styled('div')(({ theme }) => ({
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
    }));

    const StyledSection = styled('div')(({ theme }) => ({
        width: '100%',
        maxWidth: 480,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxShadow: theme.customShadows.card,
        backgroundColor: theme.palette.background.default,
    }));

    const StyledContent = styled('div')(({ theme }) => ({
        maxWidth: 480,
        margin: 'auto',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    }));

    const isLoggedIn = storageGet("isLoggedIn");

    return(
        <>
            {!isLoggedIn &&
                <StyledRoot>
                    {mdUp && 
                        <StyledSection>
                            <Typography 
                                variant="h3" 
                                sx={{ 
                                    px: 5, mt: 10, mb: 5 
                                }}
                            >
                                Hi, Welcome Back
                            </Typography>
                            <img src="/assets/illustration_login.png" alt="login" />
                        </StyledSection>
                    }
                    <Container maxWidth="sm">
                        <StyledContent>
                            <Typography variant="h4" gutterBottom>
                                Sign in
                            </Typography>

                            <Divider sx={{ my: 3 }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                OR
                            </Typography>
                            </Divider>

                            <LoginForm />
                        </StyledContent>
                    </Container>
                </StyledRoot>
            }
        </>
    )
}