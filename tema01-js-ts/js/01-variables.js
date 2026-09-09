function calcularTotal(productos){

    let total = 0;

    for (let i = 0; i < productos.length; i++) {
        total += productos[i].precio;

    }
    return total;

}


const productos = [
    { nombre: "Producto 1", precio: 10 },
    { nombre: "Producto 2", precio: 20 },
    { nombre: "Producto 3", precio: 30 }
];

console.log("Total de productos:", calcularTotal(productos));


