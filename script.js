let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function addExpense() {
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value;
  const date = document.getElementById('date').value;
  
  if (amount && category && date) {
    expenses.push({ amount, category, description, date });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateDashboard();
    clearForm();
  } else {
    alert('Please fill in all required fields');
  }
}

function updateDashboard() {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  document.getElementById('total-expenses').textContent = `Total Expenses: ${formatDKK(totalExpenses)}`;
  
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});
  
  const categoryTotalsList = document.getElementById('category-totals');
  categoryTotalsList.innerHTML = Object.entries(categoryTotals)
    .map(([category, total]) => `<li>${category}: ${formatDKK(total)}</li>`)
    .join('');
  
  const expensesList = document.getElementById('expenses');
  expensesList.innerHTML = expenses
    .map((expense, index) => `
      <li>
        ${expense.date} - ${expense.category} - ${formatDKK(expense.amount)}
        ${expense.description ? `- ${expense.description}` : ''}
        <button onclick="deleteExpense(${index})">Delete</button>
      </li>
    `)
    .join('');
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  updateDashboard();
}

function clearForm() {
  document.getElementById('amount').value = '';
  document.getElementById('category').value = '';
  document.getElementById('description').value = '';
  document.getElementById('date').value = '';
}

function formatDKK(amount) {
  return new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(amount);
}

updateDashboard();