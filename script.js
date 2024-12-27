// Funzione per visualizzare la data corrente
function updateDate() {
  const dateElement = document.getElementById('date');
  const date = new Date();
  const formattedDate = date.toLocaleDateString('it-IT', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  dateElement.textContent = formattedDate;
}

// Funzione per il toggle del tema scuro
const toggleThemeButton = document.getElementById('toggle-theme');
toggleThemeButton.addEventListener('click', () => {
  const body = document.body;
  const sidebar = document.querySelector('.sidebar');
  const content = document.querySelector('.content');
  const header = document.querySelector('header');
  
  // Toggle classe dark-mode
  body.classList.toggle('dark-mode');
  sidebar.classList.toggle('dark-mode');
  content.classList.toggle('dark-mode');
  header.classList.toggle('dark-mode');
  
  // Salva la preferenza del tema in localStorage
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.removeItem('theme');
  }
});

// Carica il tema dalla preferenza salvata nel localStorage
window.onload = function () {
  // Imposta il tema scuro se precedentemente scelto
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.querySelector('.sidebar').classList.add('dark-mode');
    document.querySelector('.content').classList.add('dark-mode');
    document.querySelector('header').classList.add('dark-mode');
  }

  // Carica i grafici
  new Chart(document.getElementById('fatturatoChart'), fatturatoConfig);
  new Chart(document.getElementById('clientiChart'), clientiConfig);
  new Chart(document.getElementById('crescitaChart'), crescitaConfig);
  
  // Aggiorna la data corrente
  updateDate();
  
  // Aggiorna la data ogni giorno (opzionale)
  setInterval(updateDate, 86400000); // 86400000 ms = 1 giorno
};

// Dati e configurazione dei grafici

// Grafico Fatturato Mensile
const fatturatoData = {
  labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'],
  datasets: [{
    label: 'Fatturato Mensile (€)',
    data: [5000, 7000, 8000, 9000, 9500, 12000],
    borderColor: '#007bff',
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
    borderWidth: 2,
    fill: true,
    tension: 0.4
  }]
};

const fatturatoConfig = {
  type: 'line',
  data: fatturatoData,
  options: {
    responsive: true,
    animation: { duration: 1000 },
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: €${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Mese' }
      },
      y: {
        title: { display: true, text: '€' }
      }
    }
  }
};

// Grafico Clienti Attivi
const clientiData = {
  labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'],
  datasets: [{
    label: 'Clienti Attivi',
    data: [120, 150, 180, 200, 220, 250],
    backgroundColor: 'rgba(54, 162, 235, 0.6)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 2,
    borderRadius: 5,
    tension: 0.4
  }]
};

const clientiConfig = {
  type: 'bar',
  data: clientiData,
  options: {
    responsive: true,
    animation: { duration: 1000 },
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw} Clienti`;
          }
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Mese' }
      },
      y: {
        title: { display: true, text: 'Clienti' }
      }
    }
  }
};

// Grafico Tasso di Crescita
const crescitaData = {
  labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'],
  datasets: [{
    label: 'Tasso di Crescita (%)',
    data: [5, 8, 10, 12, 15, 18],
    backgroundColor: 'rgba(75, 192, 192, 0.6)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 2,
    borderRadius: 5,
    tension: 0.4
  }]
};

const crescitaConfig = {
  type: 'line',
  data: crescitaData,
  options: {
    responsive: true,
    animation: { duration: 1000 },
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`;
          }
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Mese' }
      },
      y: {
        title: { display: true, text: '%' }
      }
    }
  }
};
