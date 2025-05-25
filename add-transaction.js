const transactionForm = document.getElementById('transactionForm');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('categorySelect');
const selectedCategory = document.getElementById('selectedCategory');
const categoryOptions = document.getElementById('categoryOptions');
const categoryInput = document.getElementById('category');

function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}


categoryInput.value = "Food";

transactionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (description && !isNaN(amount)) {
    const newTransaction = {
      id: Date.now(),
      description,
      amount,
      category: categoryInput.value,
      date: formatDate(new Date())
    };

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    transactionForm.reset();
    alert('Transaction added! Go to My Expenses to see it.');
  }
});

selectedCategory.addEventListener('click', () => {
  categoryOptions.style.display = categoryOptions.style.display === 'block' ? 'none' : 'block';
});


document.addEventListener('click', (e) => {
  if (!categorySelect.contains(e.target)) {
    categoryOptions.style.display = 'none';
  }
});

document.querySelectorAll('.category-option').forEach(option => {
  option.addEventListener('click', () => {
    const icon = option.querySelector('i').outerHTML;
    const label = option.textContent.trim();
    selectedCategory.querySelector('.cat-icon').innerHTML = icon;
    selectedCategory.querySelector('.cat-label').textContent = label;
    categoryInput.value = option.getAttribute('data-value');
    categoryOptions.style.display = 'none';
  });
});
