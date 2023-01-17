import { Card, CardHeader } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import { CHART_HEIGHT, LEGEND_HEIGHT } from '../consts/consts';
import useChart from '../hooks/useChart';

export const AppUsersListChart = ({ title, chartLabel, chartSeries, chartColors, loading }) => {
    const theme = useTheme();

    const chartOptions = useChart({
        colors: chartColors,
        labels: chartLabel,
        stroke: { colors: [theme.palette.background.paper] },
        legend: { floating: true, horizontalAlign: 'center' },
        dataLabels: { enabled: true, dropShadow: { enabled: false } },
        tooltip: {
            fillSeriesColor: false,
            y: {
              formatter: (seriesName) => (seriesName),
              title: {
                formatter: (seriesName) => `${seriesName}`,
              },
            },
        },
        plotOptions: {
            pie: { donut: { labels: { show: false } } },
        },
    });

    const StyledChartWrapper = styled('div')(({ theme }) => ({
        height: CHART_HEIGHT,
        marginTop: theme.spacing(5),
        '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
        '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
          overflow: 'visible',
        },
        '& .apexcharts-legend': {
          height: LEGEND_HEIGHT,
          alignContent: 'center',
          position: 'relative !important',
          borderTop: `solid 1px ${theme.palette.divider}`,
          top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
        },
    }));

    return (
        <Card>
            <CardHeader title={title} />
            <StyledChartWrapper dir="ltr">
                {!loading &&
                    <ReactApexChart type="pie" series={chartSeries} options={chartOptions} height={280} />
                }
            </StyledChartWrapper>
        </Card>
    );
};