import React from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import styles from "./BarChart.module.css";

export default function BarChartComponent({ data }) {
    return (
        <div className={styles.expenseChart}>
            <h2>Monthly Expenses</h2>
            <div className={styles.barWrapper}>
                {data?.length ? (
                    <ResponsiveContainer className={styles.barContainer} width="100%" height={280}>
                        <BarChart data={data} layout="vertical">
                            <XAxis type="number" axisLine={false} />
                            <YAxis type="category" dataKey="name" width={200} axisLine={false} />
                            <Bar dataKey="value" fill="#8884d8" barSize={25} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "280px" }}>
                        No transactions!
                    </div>
                )}
            </div>
        </div>
    );
}