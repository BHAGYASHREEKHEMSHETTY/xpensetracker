import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import styles from "./Budget.module.css";

export default function Budget({ monthlyBudget, setMonthlyBudget }) {
    const [budget, setBudget] = useState(monthlyBudget);

    useEffect(() => {
        setBudget(monthlyBudget);
    }, [monthlyBudget]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBudget((prev) => ({ ...prev, [name]: Number(value) }));
    };

    const handleSave = () => {
        setMonthlyBudget(budget);
    };

    return (
        <div className={styles.budgetWrapper}>
            <h2>Set Monthly Budgets</h2>
            <div className={styles.inputsWrapper}>
                <label>
                    Food Budget
                    <input
                        type="number"
                        name="food"
                        value={budget.food || 0}
                        onChange={handleInputChange}
                        min="0"
                        placeholder="Enter Food budget"
                    />
                </label>
                <label>
                    Entertainment Budget
                    <input
                        type="number"
                        name="entertainment"
                        value={budget.entertainment || 0}
                        onChange={handleInputChange}
                        min="0"
                        placeholder="Enter Entertainment budget"
                    />
                </label>
                <label>
                    Travel Budget
                    <input
                        type="number"
                        name="travel"
                        value={budget.travel || 0}
                        onChange={handleInputChange}
                        min="0"
                        placeholder="Enter Travel budget"
                    />
                </label>
            </div>
            <Button handleClick={handleSave} style="primary" shadow>
                Save Budget
            </Button>
        </div>
    );
}