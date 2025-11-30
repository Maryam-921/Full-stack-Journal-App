import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function SentimentChart({ entries }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!entries || entries.length === 0) return;

        const ctx = chartRef.current.getContext("2d");

        // destroy old instance to prevent Chart.js errors when re-rendering
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const xLabels = entries.map(e => e.created_at);
        const positive = entries.map(e => e.positive_score);
        const negative = entries.map(e => e.negative_score);
        const compound = entries.map(e => e.compound_score);
        console.log(entries)
        chartInstance.current = new Chart(ctx, {
            type: "line",
            data: {
                labels: xLabels,
                datasets: [
                    {
                        label: "Positive",
                        data: positive,
                        borderWidth: 2,
                        borderColor: "#4CAF50",
                        backgroundColor: "#4CAF50",
                        tension: 0.2,
                        fill: false
                    },
                    {
                        label: "Negative",
                        data: negative,
                        borderWidth: 2,
                        borderColor: "#E53935",
                        backgroundColor: "#E53935",
                        tension: 0.2,
                        fill: false
                    },
                    {
                        label: "Compound",
                        data: compound,
                        borderWidth: 2,
                        borderColor: "#1E88E5",
                        backgroundColor: "#1E88E5",
                        tension: 0.2,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: -1,
                        max: 1
                    }
                }
            }
        });
    }, [entries]);

    return (
        <div style={{ height: "350px", width: "100%" }}>
            <canvas id="myChart" ref={chartRef}></canvas>
        </div>
    );
}

function SentimentPie({ entries }) {
    const pieRef = useRef(null);
    const pieInstance = useRef(null);

    useEffect(() => {
        if (!entries || entries.length === 0) return;

        const ctx = pieRef.current.getContext("2d");

        // destroy previous chart instance to avoid duplication
        if (pieInstance.current) {
            pieInstance.current.destroy();
        }

        // Calculate averages
        const avgPositive = entries.reduce((acc, e) => acc + e.positive_score, 0) / entries.length;
        const avgNegative = entries.reduce((acc, e) => acc + e.negative_score, 0) / entries.length;
        const avgCompound = entries.reduce((acc, e) => acc + e.compound_score, 0) / entries.length;

        // Prepare data
        const data = [avgPositive, avgNegative, avgCompound];

        pieInstance.current = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Positive", "Negative", "Compound"],
                datasets: [
                    {
                        data: data,
                        backgroundColor: [
                            "#4CAF50", // green
                            "#E53935", // red
                            "#1E88E5"  // blue
                        ],
                        borderColor: "#ffffff",
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        });
    }, [entries]);

    return (
        <div style={{ width: "100%", height: "300px" }}>
            <canvas ref={pieRef}></canvas>
        </div>
    );
}

export {SentimentChart, SentimentPie};
