// PieChart.js
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const HiredCandidates = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = echarts.init(chartRef.current);

        const options = {
            title: {
                text: 'Candidate Hiring Statistics',
                subtext: 'Hired vs Not Hired',
                left: 'center',
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: 'Candidates',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 300, name: 'Hired' },
                        { value: 700, name: 'Not Hired' },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                },
            ],
        };

        chart.setOption(options);

        return () => {
            chart.dispose();
        };
    }, []);

    return <div ref={chartRef} style={{ width: '400px', height: '300px' }} />;
};

export default HiredCandidates;
