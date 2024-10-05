// Calcular pagos en cuotas sobre un monto determinado.

const elMonto = document.getElementById('monto');
const elCuotas = document.getElementById('cuotas');
const elInputsContainer = document.getElementById('inputsContainer');
const btnCalcular = document.getElementById('calcular');
const btnBorrar = document.getElementById('borrar');
const elPago = document.getElementById('pago');
const elErrorMonto = document.getElementById('error-monto');
const elErrorCuotas = document.getElementById('error-cuotas');
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

  generarPagos() {
    this.monto = elMonto.value;
    this.cuotas = elCuotas.value;

    if (isNaN(this.monto) || this.monto <= 0) {
      alertMontoValido();
    } else if (isNaN(this.cuotas) || this.cuotas <= 0) {
      alertCuotaValida();
    } else {
      this.calcularCuotas();

      elErrorMonto.innerHTML = '';
      elErrorCuotas.innerHTML = '';
      elPago.innerHTML = `<p>El monto de cada cuota es: $${Math.round(
        this.pago
      )}</p>`;

      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td class="border border-slate-600">${Math.round(this.pago)}</td>
        <td class="border border-slate-600">${this.monto}</td>
        <td class="border border-slate-600">${this.cuotas}</td>
      `;

      tbody.appendChild(tr);

      this.dataPagos();
      console.log(this.arrPagos);
    }
    this.guardarPagos();
  }

  dataPagos() {
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
        <td class="border border-slate-600">${Math.round(pago.pago)}</td>
        <td class="border border-slate-600">${pago.monto}</td>
        <td class="border border-slate-600">${pago.cuota}</td>
      `;

      tbody.appendChild(tr);
    }
    return pagos;
  }

  borrarTabla() {
    btnBorrar.addEventListener('click', () => {
      localStorage.clear();
      tbody.innerHTML = '';
    });
  }

  init() {
    this.borrarTabla();

    btnCalcular.addEventListener('click', () => {
      this.generarPagos();
    });
  }
}

const alertMontoValido = () => {
  elErrorMonto.innerHTML = `Ingrese un monto valido del producto.`;
};
const alertCuotaValida = () => {
  elErrorCuotas.innerHTML = `Ingrese el numero mayor a 0.`;
};
const calculadora = new CalculadoraCuotas();
calculadora.init();
