// import React from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// export default function BudgetComparisonChart({ budget, expenses }) {
//     const data = [
//         { name: "Budget", value: budget.food },
//         { name: "Actual", value: expenses },
//     ];

//     return (
//         <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={data}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="value" fill="#8884d8" />
//             </BarChart>
//         </ResponsiveContainer>
//     );
// }
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function BudgetComparisonChart({ budget, expenses }) {
    // Prepare data for each category
    const data = [
        { name: "Food", budget: budget.food, actual: expenses.food || 0 },
        { name: "Entertainment", budget: budget.entertainment, actual: expenses.entertainment || 0 },
        { name: "Travel", budget: budget.travel, actual: expenses.travel || 0 },
    ];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="budget" fill="#82ca9d" name="Budget" />
                <Bar dataKey="actual" fill="#8884d8" name="Actual" />
            </BarChart>
        </ResponsiveContainer>
    );
}