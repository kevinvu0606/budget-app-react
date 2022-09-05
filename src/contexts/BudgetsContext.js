import React, { useContext, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

const BudgetsContext = React.createContext();
export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage('budgets', []);
  const [expenses, setExpenses] = useLocalStorage('expenses', []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  function addExpense({ description, amount, budgetId }) {
    setExpenses((previousExpenses) => {
      return [
        ...previousExpenses,
        { id: uuidV4(), description, amount, budgetId },
      ];
    });
  }

  function addBudget(name, max) {
    setBudgets((previousBudgets) => {
      // checking to see if the budget name already exists
      if (previousBudgets.find((budget) => budget.name === name)) {
        return previousBudgets;
      }
      return [...previousBudgets, { id: uuidV4(), name, max }];
    });
  }

  function deleteBudget({ id }) {
    setBudgets((previousBudgets) => {
      return previousBudgets.filter((budget) => budget.id !== id);
    });
  }

  function deleteExpense({ id }) {
    // Need to uncategorized budget
    setExpenses((previousExpenses) => {
      return previousExpenses.filter((budget) => budget.id !== id);
    });
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
