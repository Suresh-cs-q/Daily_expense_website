// script.js

let expenses = [];
let budget = 0;

// Function to add an expense
function addExpense(event) {
    event.preventDefault();
    
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    const expense = { amount, description, category };
    expenses.push(expense);
    
    document.getElementById('expense-form').reset(); // Reset form
    displayExpenses();
}

// Function to display expenses
function displayExpenses() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = ''; // Clear previous list

    let total = 0;
    expenses.forEach((expense, index) => {
        total += expense.amount;
        const li = document.createElement('li');
        li.textContent = `${expense.description} - $${expense.amount.toFixed(2)} (${expense.category})`;
        expenseList.appendChild(li);
    });

    document.getElementById('total-expense').textContent = `Total Expense: $${total.toFixed(2)}`;
    updateBudgetStatus(total);
}

// Function to set budget
function setBudget() {
    budget = parseFloat(document.getElementById('budget-amount').value);
    document.getElementById('budget-amount').value = ''; // Clear input
    updateBudgetStatus();
}

// Function to update budget status
function updateBudgetStatus(total = 0) {
    const remaining = budget - total;
    document.getElementById('budget-status').textContent = `Budget Remaining: $${remaining.toFixed(2)}`;
}

// Function to add a reminder
function addReminder(event) {
    event.preventDefault();
    
    const description = document.getElementById('reminder-description').value;
    const dueDate = document.getElementById('reminder-date').value;
    
    if (!description || !dueDate) {
        alert("Please fill in both fields.");
        return;
    }

    const reminderList = document.getElementById('reminder-list');
    const li = document.createElement('li');
    li.textContent = `${description} - Due: ${dueDate}`;
    reminderList.appendChild(li);

    document.getElementById('reminder-form').reset(); // Reset form
}

// Event listeners
document.getElementById('expense-form').addEventListener('submit', addExpense);
document.getElementById('set-budget').addEventListener('click', setBudget);
document.getElementById('reminder-form').addEventListener('submit', addReminder);
