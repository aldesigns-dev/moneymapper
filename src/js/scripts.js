document.addEventListener('DOMContentLoaded', () => {
  let chartInitialized = false;
  let barChart;

  // Username validation
  const usernameInput = document.getElementById('username');
  // Regex: at least 1 uppercase, 1 lowercase, 1 number, min 6 chars
  const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (usernameInput) {
    usernameInput.addEventListener('input', () => {
      if (usernameRegex.test(usernameInput.value)) {
        usernameInput.classList.remove('is-invalid');
        usernameInput.classList.add('is-valid');
      } else {
        usernameInput.classList.remove('is-valid');
        usernameInput.classList.add('is-invalid');
      }
    });
  }

  // Chart tab event
  const chartTab = document.querySelector('button[data-bs-target="#chart"]');
  if (chartTab) {
    chartTab.addEventListener('shown.bs.tab', () => {
      const data = getMonthlyData();
      if (!chartInitialized) {
        const ctx = document.getElementById('barChart').getContext('2d');
        barChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: [
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'
            ],
            datasets: [
              {
                label: 'Income',
                data: data.income,
                backgroundColor: 'rgba(54, 162, 235, 0.7)'
              },
              {
                label: 'Expenses',
                data: data.expenses,
                backgroundColor: 'rgba(255, 99, 132, 0.7)'
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
        chartInitialized = true;
      } else {
        // Update chart data if already initialized
        barChart.data.datasets[0].data = data.income;
        barChart.data.datasets[1].data = data.expenses;
        barChart.update();
      }
    });
  }

  // Live chart update on input
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  months.forEach(month => {
    ['income', 'expenses'].forEach(type => {
      const input = document.getElementById(`${type}-${month}`);
      if (input) {
        input.addEventListener('input', () => {
          if (barChart) {
            const data = getMonthlyData();
            barChart.data.datasets[0].data = data.income;
            barChart.data.datasets[1].data = data.expenses;
            barChart.update();
          }
        });
      }
    });
  });

  // Download chart as image
  const downloadBtn = document.getElementById('download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const canvas = document.getElementById('barChart');
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'chart.png';
      link.click();
    });
  }
});

function getMonthlyData() {
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  const income = months.map(month => {
    const val = document.getElementById(`income-${month}`)?.value;
    return val === '' || val === undefined ? 0 : Number(val);
  });

  const expenses = months.map(month => {
    const val = document.getElementById(`expenses-${month}`)?.value;
    return val === '' || val === undefined ? 0 : Number(val);
  });

  return { income, expenses };
}