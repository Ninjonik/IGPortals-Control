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
            layers={['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', 'points', 'slices', 'mesh', 'legends']}
            curve="monotoneX"
            enablePoints={true}
            pointSize={0}
            pointColor={{theme: 'background'}}
            pointBorderWidth={2}
            lineWidth={4}
            legends={[]}
            isInteractive={false}
            debugMesh={false}
            tooltip={({point}) => {
                return (
                    <div
                        style={{
                            padding: '12px',
                            color: '#fff',
                            background: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: '5px',
                        }}
                    >
                        <strong>{point.data.xFormatted}</strong>
                        <br/>
                        <strong>{point.data.yFormatted}</strong>
                    </div>
                );
            }}
            enableSlices={'x'}
            debugSlices={false}
            sliceTooltip={({slice}) => {
                return (
                    <div
                        style={{
                            background: 'white',
                            padding: '9px 12px',
                            border: '1px solid #ccc',
                        }}
                    >
                        <div>
                            <strong>{slice.points[0].data.xFormatted}</strong>
                        </div>
                        {slice.points.map((point) => (
                            <div
                                key={point.id}
                                style={{
                                    color: point.serieColor,
                                    padding: '3px 0',
                                }}
                            >
                                <strong>{point.serieId}</strong> [{point.data.yFormatted}]
                            </div>
                        ))}
                    </div>
                );
            }}
            enableCrosshair={false}
            crosshairType={'bottom-right'}
            role={'img'}
            useMesh={true}
            defs={[]}
            fill={[]}
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