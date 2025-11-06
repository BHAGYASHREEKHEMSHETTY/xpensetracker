import React, { useEffect, useState } from "react";
import Card from "../../Card/Card";
import styles from "./Home.module.css";
import TransactionList from "../../TransactionList/TransactionList";
import Expense from "../../Forms/Expense/Expense";
import Modal from "../../Modal/Modal";
import AddBalance from "../../Forms/AddBalance/AddBalance";
import PieChart from "../../PieChart/PieChart";
import BarChart from "../../BarChart/BarChart";
import Budget from "../../Budget/Budget";
import BudgetComparisonChart from "../../BudgetComparisonChart/BudgetComparisonChart";


const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
};

// Function to calculate category statistics
const calculateCategoryStats = (expenseList) => {
    return expenseList.reduce(
        (acc, item) => {
            acc.spends[item.category] = (acc.spends[item.category] || 0) + Number(item.price);
            acc.counts[item.category] = (acc.counts[item.category] || 0) + 1;
            return acc;
        },
        {
            spends: { food: 0, entertainment: 0, travel: 0 },
            counts: { food: 0, entertainment: 0, travel: 0 },
        }
    );
};

function Home() {
    const [balance, setBalance] = useLocalStorage("balance", 5000);
    const [expenseList, setExpenseList] = useLocalStorage("expense", []);
    const [isOpenBalance, setIsOpenBalance] = useState(false);
    const [isOpenExpense, setIsOpenExpense] = useState(false);
    const [monthlyBudget, setMonthlyBudget] = useLocalStorage("monthlyBudget", { food: 0, entertainment: 0, travel: 0 });

    // Calculate total expenses for each category
    const totalExpenses = expenseList.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + Number(item.price);
        return acc;
    }, {});

    const totalExpensesAmount = expenseList.reduce((total, item) => total + Number(item.price), 0);
    const { spends: categorySpends, counts: categoryCounts } = calculateCategoryStats(expenseList);

    const handleAddIncome = () => {
        setIsOpenBalance(true);
    };

    const handleAddExpense = () => {
        setIsOpenExpense(true);
    };

    return (
        <div className={styles.container}>
             <h1>Expense Tracker</h1>
            <h2>Finance Visualizer</h2>
            <div className={styles.cardsWrapper}>
                <Card title="Wallet Balance" money={balance} buttonText="+ Add Income" buttonType="success" handleClick={handleAddIncome} />
                <Card title="Total Expenses" money={totalExpensesAmount} buttonText="+ Add Expense" buttonType="failure" handleClick={handleAddExpense} />
                <PieChart data={Object.entries(categorySpends).map(([key, value]) => ({ name: key, value }))} />
            </div>
            <div className={styles.transactionsWrapper}>
                <TransactionList transactions={expenseList} editTransactions={setExpenseList} title="Recent Transactions" balance={balance} setBalance={setBalance} />
                <BarChart data={Object.entries(categoryCounts).map(([key, value]) => ({ name: key, value }))} />
            </div>
            <Budget monthlyBudget={monthlyBudget} setMonthlyBudget={setMonthlyBudget} />
            <BudgetComparisonChart budget={monthlyBudget} expenses={totalExpenses} />
            <Modal isOpen={isOpenExpense} setIsOpen={setIsOpenExpense}>
                <Expense setIsOpen={setIsOpenExpense} expenseList={expenseList} setExpenseList={setExpenseList} setBalance={setBalance} balance={balance} />
            </Modal>
            <Modal isOpen={isOpenBalance} setIsOpen={setIsOpenBalance}>
                <AddBalance setIsOpen={setIsOpenBalance} setBalance={setBalance} />
            </Modal>
        </div>
    );
}

export default Home;