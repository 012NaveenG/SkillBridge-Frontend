import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const UserGrowthGraph = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = echarts.init(chartRef.current);

        const options = {
            title: {
                text: 'Candidates Assigned For The Job Roles',
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    name: 'Candidates',
                    type: 'line',
                    data: data,
                    smooth: true,
                    lineStyle: {
                        color: '#5470C6',
                    },
                    itemStyle: {
                        color: '#5470C6',
                    },
                },
            ],
        };

        chart.setOption(options);

        // Clean up the chart instance on component unmount
        return () => {
            chart.dispose();
        };
    }, [data]); // Add 'data' as a dependency here

    return (
        <div>
            <div ref={chartRef} style={{ width: '100%', height: '300px' }}></div>
        </div>
    );
};

export default UserGrowthGraph;
