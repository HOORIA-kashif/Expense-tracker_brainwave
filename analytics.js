
const transactions = JSON.parse(localStorage.getItem('transactions')) || [];


const categoryTotals = {};
transactions.forEach(tx => {
  if (!categoryTotals[tx.category]) categoryTotals[tx.category] = 0;
  categoryTotals[tx.category] += Math.abs(tx.amount);
});

const categories = Object.keys(categoryTotals);
const amounts = Object.values(categoryTotals);


const colors = [
  'linear-gradient(135deg,#ff6cab 0%,#7366ff 100%)',
  'linear-gradient(135deg,#4ade80 0%,#00d2ff 100%)',
  'linear-gradient(135deg,#fbbf24 0%,#ff6363 100%)',
  'linear-gradient(135deg,#a78bfa 0%,#f472b6 100%)',
  'linear-gradient(135deg,#f472b6 0%,#fbbf24 100%)',
  'linear-gradient(135deg,#00d2ff 0%,#4ade80 100%)'
];
const solidColors = [
  '#ff6cab', '#4ade80', '#fbbf24', '#a78bfa', '#f472b6', '#00d2ff'
];


if (categories.length && document.getElementById('categoryPieChart')) {
  const ctx = document.getElementById('categoryPieChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: categories,
      datasets: [{
        data: amounts,
        backgroundColor: solidColors,
        borderWidth: 4,
        borderColor: '#232323',
        hoverOffset: 16
      }]
    },
    options: {
      cutout: '60%',
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1800,
        easing: 'easeOutBounce'
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed || 0;
              return `${label}: $${value.toLocaleString()}`;
            }
          }
        }
      }
    }
  });


  const legend = document.getElementById('chartLegend');
  categories.forEach((cat, i) => {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `<span class="legend-color" style="background:${solidColors[i % solidColors.length]}"></span>${cat}`;
    legend.appendChild(item);
  });
}