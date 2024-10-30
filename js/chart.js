import { CalculadoraCuotas } from './main.js';

const btnCalcular = document.getElementById('calcular');
const btnBorrar = document.getElementById('borrar');
const ctx = document.getElementById('myChart');

class barChart extends CalculadoraCuotas {
  constructor() {
    super();

    this.x = [];
    this.y = [];
    this.chart = new Chart(ctx, this.config());
  }

  init() {
    btnBorrar.addEventListener('click', () => {
      this.borrarDatosTabla();
      this.borrarDatosChart();
    });

    btnCalcular.addEventListener('click', async () => {
      await this.generarPagosTabla();
      this.actualizarDatosChart();
    });

    this.obtenerDatosChart();
    this.actualizarAxisChart(this.x, this.y);
  }

  config() {
    const config = {
      type: 'bar',
      data: {
        labels: this.x,
        datasets: [
          {
            label: 'pagos en pesos uruguayos',
            data: this.y,
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Pagos en UYU x cuotas',
            color: 'white',
            font: {
              size: 15,
            },
            padding: {
              top: 10,
              bottom: 30,
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'cuotas',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'pagos $',
            },
          },
        },
      },
    };
    return config;
  }

  actualizarAxisChart = (x, y) => {
    this.chart.data.labels = x;
    this.chart.data.datasets[0].data = y;
    this.chart.update();
  };

  obtenerDatosChart() {
    for (const element of this.arrPagos) {
      this.x.push(element['cuota']);
      this.y.push(element['pagoUYU']);
    }
  }

  actualizarDatosChart() {
    this.x = [];
    this.y = [];

    this.obtenerDatosChart();
    this.actualizarAxisChart(this.x, this.y);
  }

  borrarDatosChart() {
    this.arrPagos = [];
    this.actualizarAxisChart(0, 0);
  }
}

const chart = new barChart();
chart.init();
