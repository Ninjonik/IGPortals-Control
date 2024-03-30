"use client"

import {ResponsiveLine} from "@nivo/line";

export const TemperatureGraph = (forecastData: any) => {

    return (
        <ResponsiveLine
            data={forecastData.forecastData}
            margin={{top: 20, right: 20, bottom: 25, left: 20}}
            xScale={{type: 'point'}}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            pointLabel={"y"}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisLeft={null}
            axisBottom={{
                tickValues: [0, 3, 6, 9, 12, 15, 18, 21, 23], // Define the custom tick values here
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Time',
                legendOffset: 36,
                legendPosition: 'middle',
                format: (value) => `${value}:00` // Custom format for displaying time labels
            }}
            pointBorderColor={{from: 'serieColor'}}
            enableGridX={false}
            enableGridY={false}
            enablePointLabel={true}
            pointLabelYOffset={-12}
            enableArea={true}
            areaBaselineValue={'auto'}
            areaOpacity={0.5}
            areaBlendMode="multiply"
            colors={{scheme: 'category10'}}
        />
    );
};