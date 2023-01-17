import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/system';
import { AppWidgetSummary } from '../components/appWidgetSummary';
import { APP_BAR_DESKTOP, APP_BAR_MOBILE } from '../consts/consts';
import { updateDocTitle } from "../helpers/updateDocTitle";
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import AccessibleRoundedIcon from '@mui/icons-material/AccessibleRounded';
import NoAccountsRoundedIcon from '@mui/icons-material/NoAccountsRounded';
import { useDispatch, useSelector } from 'react-redux';
import { statsGet } from '../redux/actions/dashBoardActions';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { AppUsersListChart } from '../components/appUsersListChart';

export const Home = () => {

    updateDocTitle('Home'); 
    const theme = useTheme();
              
    const Main = styled('div')(({ theme }) => ({
        flexGrow: 1,
        overflow: 'auto',
        minHeight: '100%',
        paddingTop: APP_BAR_MOBILE,
        paddingBottom: APP_BAR_DESKTOP,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
          paddingTop: APP_BAR_DESKTOP,          
          marginLeft: 280,
        },
    }));

    const dispatch = useDispatch();
    const { stats } = useSelector((state) => state.dashBoardState);

    useEffect(() => {    
        if(!stats) dispatch(statsGet({endUrl: "/dashboard/stats"}));
    }, [dispatch, stats]);
    

    return(
        <Main>
            <Container sx={{p: '0px!important'}}>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Hi, Welcome back
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Total Users" color="primary" total={stats?.data?.data?.total} icon={<SupervisorAccountRoundedIcon />} loading={stats ? false : true} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Active Users" color="secondary" total={stats?.data?.data?.active} icon={<RecordVoiceOverRoundedIcon />} loading={stats ? false : true} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Inactive Users" color="info" total={stats?.data?.data?.inactive} icon={<AccessibleRoundedIcon />} loading={stats ? false : true} />
                    </Grid> 
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Blocked Users" color="error" total={stats?.data?.data?.blocked} icon={<NoAccountsRoundedIcon />} loading={stats ? false : true} />
                    </Grid>                                       
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{mt: 5}}>
                    <AppUsersListChart
                        title="Users Type"
                        chartLabel={[
                            "Total","Active", "InActive", "Blocked"
                        ]}
                        chartSeries={[
                            stats?.data?.data?.total,
                            stats?.data?.data?.active,
                            stats?.data?.data?.inactive,
                            stats?.data?.data?.blocked
                        ]}
                        chartColors={[
                            theme.palette.primary.main,
                            theme.palette.info.main,
                            theme.palette.warning.main,
                            theme.palette.error.main,
                        ]}
                        loading={stats ? false : true}
                    />
                </Grid>
            </Container>
        </Main>
    )
}