// Calcular pagos en cuotas sobre un monto determinado.

const elMonto = document.getElementById('monto');
const elCuotas = document.getElementById('cuotas');
const elInputsContainer = document.getElementById('inputsContainer');
const btn = document.getElementById('button');
const elPago = document.getElementById('pago');
const elError = document.getElementById('error');

class CalculadoraCuotas {
  constructor() {
    this.monto = 0;
    this.cuotas = 0;
    this.pago = 0;
    this.arrPagos = [];
  }

  calcularCuotas() {
    this.pago = (parseFloat(this.monto) / parseInt(this.cuotas)).toFixed(2);
  }

  pagos() {
    this.arrPagos.push(this.pago);
    const totalPagos = this.arrPagos.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return totalPagos;
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

        console.log(this.pago);
        console.log(this.arrPagos);

        elError.innerHTML = '';
        elPago.innerHTML = `<p>El monto de cada cuota es: ${this.pago}</p>`;
        this.arrPagos = [];
      }
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
