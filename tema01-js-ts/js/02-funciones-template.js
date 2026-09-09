const calcularDescuento = (precio, porcentaje) => {
    return precio * porcentaje;
}

const productos = "Laptop";
const precio = 2500;

const descuento = calcularDescuento(precio, 0.1);

'<h1>'  + titulo + '</h1>';

console.log( `El producto ${productos} tiene un precio de ${precio} y un descuento del 10% es de $${descuento}. 
    El precio final es de $${precio - descuento}.`);