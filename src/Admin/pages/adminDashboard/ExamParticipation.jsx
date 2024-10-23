import ReactECharts from 'echarts-for-react';

const ExamParticipation = ({ data }) => {

    const color = ['#ff4d4f', '#ff7a45', '#ffa940', '#73d13d', '#40a9ff', '#40a9ff', '#9254de'];
    
    const option = {
        title: {
            text: 'Participation in exams',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: (params) => {
                const { name, data } = params[0];
                return `
                    <strong>${name}</strong><br/>
                    <span style="color:${color[1]};">&#8226;</span> Assigned Candidates: ${data.assignedCandidates}<br/>
                    <span style="color:${color[0]};">&#8226;</span> Attended By: ${data.value}
                `;
            },
        },
        xAxis: {
            data: data.map((item) => item.title),
        },
        yAxis: {},
        series: [
            {
                name: 'attendedBy',
                type: 'bar',
                data: data.map((item, idx) => ({
                    value: item.attendedBy,
                    assignedCandidates: item.assignedCandidates,  // Store assignedCandidates here
                    itemStyle: { color: color[idx % color.length] },  // Ensure consistent coloring
                })),
            },
        ],
    };

    return <ReactECharts option={option} />;
};

export default ExamParticipation;
