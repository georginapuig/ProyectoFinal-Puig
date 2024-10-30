// Calcular pagos en cuotas sobre un monto determinado.

const elMonto = document.getElementById('monto');
const elCuotas = document.getElementById('cuotas');
const elPago = document.getElementById('pago');
const elErrorMonto = document.getElementById('error-monto');
const elErrorCuotas = document.getElementById('error-cuotas');
const tbody = document.getElementById('tbody');
const pagoText = document.getElementById('pago');

const obtenerDivisas = async () => {
  // api de conversor de moneda
  const api =
    'https://v6.exchangerate-api.com/v6/fcab5483d6088f9202163512/latest/USD';
  const res = await fetch(api);
  const data = await res.json();
  return data.conversion_rates.UYU;
};

export class CalculadoraCuotas {
  constructor() {
    this.monto = 0;
    this.cuotas = 0;
    this.pagoUYU = 0;
    this.pagoUSD = 0;
    this.arrPagos = this.printPagos();
  }

  calcularCuotas() {
    this.pagoUYU = parseFloat(this.monto) / parseInt(this.cuotas);
  }

  async generarPagosTabla() {
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
        this.pagoUYU
      )}</p>`;

      const cotizacionDolar = await obtenerDivisas();
      this.pagoUSD = this.pagoUYU / cotizacionDolar;
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td class="border border-slate-600">$ ${Math.round(this.pagoUYU)}</td>
        <td class="border border-slate-600">${Math.round(this.pagoUSD)} USD</td>
        <td class="border border-slate-600">$ ${this.monto}</td>
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
      pagoUYU: this.pagoUYU,
      pagoUSD: this.pagoUSD,
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
        <td class="border border-slate-600">$ ${Math.round(pago.pagoUYU)}</td>
        <td class="border border-slate-600">${Math.round(pago.pagoUSD)} USD</td>
        <td class="border border-slate-600">$ ${pago.monto}</td>
        <td class="border border-slate-600">${pago.cuota}</td>
      `;

      tbody.appendChild(tr);
    }
    return pagos;
  }

  borrarDatosTabla() {
    localStorage.clear();
    tbody.innerHTML = '';
    pagoText.innerHTML = '';
  }
}

const alertMontoValido = () => {
  elErrorMonto.innerHTML = `Ingrese un monto valido del producto.`;
};

const alertCuotaValida = () => {
  elErrorCuotas.innerHTML = `Ingrese el numero mayor a 0.`;
};
