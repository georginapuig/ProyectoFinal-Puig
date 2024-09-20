// Calcular pagos en cuotas sobre un monto determinado.

class CalculadoraCuotas {
    constructor() {
        this.monto = 0;
        this.cuotas = 0;
        this.pago = 0;
        this.arrPagos = [];
    }

    calcularCuotas() {
        this.pago = parseFloat(this.monto) / parseInt(this.cuotas);
    }

    pagos() {
      this.arrPagos.push(this.pago);
      const totalPagos = this.arrPagos.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      console.log(`total de pagos ${totalPagos}`)
    }

    init() {
      while (this.monto !== 'exit') {
        this.monto = prompt('Ingrese el monto del producto. Escriba exit para salir del programa');

        if (this.monto === 'exit') { break; }

        if (isNaN(this.monto) || this.monto <= 0) {
          alertMontoValido();
          continue;
        }

        while (this.cuotas !== 'exit') {
          this.cuotas = prompt('Ingrese el numero de cuotas.');

          if (this.cuotas === 'exit') { break; }

          if (isNaN(this.cuotas) || this.cuotas <= 0) {
            alertCuotaValida();
            continue;
          }

          this.calcularCuotas();
          alert('El monto de cada cuota es : ' + this.pago);
          break;
        }

        this.pagos();
        this.pago = 0;
      }

    }
}

const alertMontoValido = () => { alert('Ingrese un monto valido del producto.'); }
const alertCuotaValida = () => { alert('Ingrese el numero mayor a 0.'); }

const calculadora = new CalculadoraCuotas();
calculadora.init();
