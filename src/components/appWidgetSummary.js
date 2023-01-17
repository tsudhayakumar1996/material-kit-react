import { Card, Typography } from "@mui/material"
import { alpha } from "@mui/material/styles";
import { styled } from '@mui/material/styles';

const StyledIcon = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
}));

export const AppWidgetSummary = ({  title, color, total, icon, loading }) => {
    return(
        <Card
            sx={{
                py: 5,
                boxShadow: 0,
                textAlign: 'center',
                color: (theme) => theme.palette[color].darker,
                bgcolor: (theme) => theme.palette[color].lighter,                
            }}            
            >
            <StyledIcon
                sx={{
                color: (theme) => theme.palette[color].dark,
                backgroundImage: (theme) =>
                    `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                    theme.palette[color].dark,
                    0.24
                    )} 100%)`,
                }}
            >
                {icon}
            </StyledIcon>
            {!loading &&
                <>
                    <Typography variant="h3">{total}</Typography>

                    <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                        {title}
                    </Typography>
                </>
            }
        </Card>
    )
}