
const ctx = document.getElementById('lineChart').getContext('2d');


const gradient = ctx.createLinearGradient(0, 0, 0, 200);
gradient.addColorStop(0, '#FF6CAB');
gradient.addColorStop(1, '#7366FF');


const lineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Spending',
      data: [120, 190, 300, 250, 220, 270, 310],
      borderColor: gradient,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#fff',
      pointRadius: 4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: '#ccc' },
        grid: { color: 'rgba(255,255,255,0.05)' }
      },
      y: {
        ticks: { color: '#ccc' },
        grid: { color: 'rgba(255,255,255,0.05)' }
      }
    }
  }
});


let transactions = JSON.parse(localStorage.getItem('transactions')) || [
  { description: "Paid Home Rent", amount: -8200, date: "March 26, 2024" }
];


const balanceAmount = document.querySelector('.balance-card h1');
const recentActivityContainer = document.querySelector('.recent-activity');
const transactionForm = document.getElementById('transactionForm');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');



function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}


function renderTransactions() {
  const activityList = document.getElementById('activity-list');
  activityList.innerHTML = "";
  transactions.slice().reverse().forEach((tx, idx) => {
    const div = document.createElement('div');
    div.className = 'activity-item';


    const icon = tx.amount < 0
      ? '<span class="activity-icon" style="background:#2a1a1a;"><i class="fa-solid fa-arrow-down text-expense"></i></span>'
      : '<span class="activity-icon" style="background:#1a2a1a;"><i class="fa-solid fa-arrow-up text-income"></i></span>';

    div.innerHTML = `
      <div class="activity-info">
        ${icon}
        <div>
          <div style="font-size:1rem;font-weight:500;">${tx.description}</div>
          <span class="activity-date">${tx.date}</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;">
        <span class="activity-amount" style="color: ${tx.amount < 0 ? '#ff6363' : '#4ade80'};">
          ${tx.amount < 0 ? '-' : '+'}$${Math.abs(tx.amount).toFixed(2)}
        </span>
        <button class="delete-btn" title="Delete"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;


    div.querySelector('.delete-btn').addEventListener('click', () => {
    
      const realIdx = transactions.length - 1 - idx;
      transactions.splice(realIdx, 1);
      renderTransactions();
      updateBalance();
    });

    activityList.appendChild(div);
  });

  localStorage.setItem('transactions', JSON.stringify(transactions));
}


function updateBalance() {
  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  balanceAmount.textContent = `$${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}


if (transactionForm) {
  transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);


  

    
    const signedAmount = type === 'expense' ? -Math.abs(amount) : Math.abs(amount);

    transactions.push({
      description,
      amount: signedAmount,
      type,
      date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
    });

    renderTransactions();
    updateBalance();
    transactionForm.reset();
  });
}


renderTransactions();
updateBalance();
const navItems = document.querySelectorAll('.animated-navbar .nav-item');

navItems.forEach(item => {
  item.addEventListener('click', () => {

    navItems.forEach(i => i.classList.remove('active'));


    item.classList.add('active');


    const targetId = item.getAttribute('data-target');
    if(targetId) {
 
      const targetSection = document.querySelector(`.${targetId}`) || document.getElementById(targetId);
      
      if(targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
     
      if(targetId === 'add-transaction') {
        setTimeout(() => {
          document.getElementById('description').focus();
        }, 500);
      }
    }
  });
});

  document.querySelectorAll('.circle').forEach(circle => {
    const value = circle.getAttribute('data-value'); 
    const progressCircle = circle.querySelector('.progress');
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    progressCircle.style.strokeDashoffset = offset;
  });

document.querySelectorAll(".nav-item").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
    item.classList.add("active");
  });
});
