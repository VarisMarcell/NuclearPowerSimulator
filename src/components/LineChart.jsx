import { Chart } from "chart.js/auto"
import { useEffect, useRef } from "react"

const LineChart = (props) => {
    const canvasRef = useRef(null)

    const { data, maxLength, title, xAxisLabel, yAxisLabel } = props
    console.log(yAxisLabel)

    useEffect(() => {
        const ctx = canvasRef.current
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [...new Array(maxLength)].map((_, index) => index),
                datasets: [{
                    label: title,
                    data: data,
                    borderWidth: 1
                }]
            },
            options: {
                animation: false,
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: yAxisLabel
                        },
                        beginAtZero: true
                    },
                    x: {
                        title: {
                            display: true,
                            text: xAxisLabel,
                        },
                        beginAtZero: true
                    }

                }
            }
        })
        
        return () => {
            myChart.destroy()
        }
    }, [ data ])
    return (
        <canvas ref={canvasRef}></canvas>
    )
}

export default LineChart