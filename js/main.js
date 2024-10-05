// Calcular pagos en cuotas sobre un monto determinado.

const elMonto = document.getElementById('monto');
const elCuotas = document.getElementById('cuotas');
const elInputsContainer = document.getElementById('inputsContainer');
const btn = document.getElementById('button');
const elPago = document.getElementById('pago');
const elError = document.getElementById('error');
const tbody = document.getElementById('tbody');

class CalculadoraCuotas {
  constructor() {
    this.monto = 0;
    this.cuotas = 0;
    this.pago = 0;
    this.arrPagos = this.printPagos();
  }

  calcularCuotas() {
    this.pago = parseFloat(this.monto) / parseInt(this.cuotas);
  }

  pagos() {
    this.arrPagos.push({
      pago: this.pago,
      monto: this.monto,
      cuota: this.cuotas,
    });
  }

  guardarPagos() {
    localStorage.setItem('pagos', JSON.stringify(this.arrPagos));
  }

  printPagos() {
    const pagos = JSON.parse(localStorage.getItem('pagos')) || [];

    for (const pago of pagos) {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td class="border border-slate-600">${pago.pago.toFixed(2)}</td>
        <td class="border border-slate-600">${pago.monto}</td>
        <td class="border border-slate-600">${pago.cuota}</td>
      `;

      tbody.appendChild(tr);
    }
    return pagos;
  }

  init() {
    btn.addEventListener('click', (e) => {
      this.monto = elMonto.value;
      this.cuotas = elCuotas.value;

      if (isNaN(this.monto) || this.monto <= 0) {
        alertMontoValido();
      } else if (isNaN(this.cuotas) || this.cuotas <= 0) {
        alertCuotaValida();
      } else {
        this.calcularCuotas();

        elError.innerHTML = '';
        elPago.innerHTML = `<p>El monto de cada cuota es: $${this.pago.toFixed(
          2
        )}</p>`;

        const tr = document.createElement('tr');

        tr.innerHTML = `
          <td class="border border-slate-600">${this.pago.toFixed(2)}</td>
          <td class="border border-slate-600">${this.monto}</td>
          <td class="border border-slate-600">${this.cuotas}</td>
        `;

        tbody.appendChild(tr);

        this.pagos();
        console.log(this.arrPagos);
      }
      this.guardarPagos();
    });
  }
}

const alertMontoValido = () => {
  elError.innerHTML = `<p>Ingrese un monto valido del producto.</p>`;
};
const alertCuotaValida = () => {
  elError.innerHTML = `<p>IIngrese el numero mayor a 0.`;
};
const calculadora = new CalculadoraCuotas();
calculadora.init();
