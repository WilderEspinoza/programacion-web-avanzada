import { Component } from '@angular/core';
import { Producto } from '../../modelos/producto';

@Component({
  selector: 'app-ej05-control-flow',
  standalone: true,
  imports: [],
  templateUrl: './ej05-control-flow.html',
})
export class Ej05ControlFlow {
  productos: Producto[] = [
    { id: 1, nombre: 'Producto 1', precio: 10.99, activo: true, stock: 5 },
    { id: 2, nombre: 'Producto 2', precio: 19.99, activo: false, stock: 0 },
    { id: 3, nombre: 'Producto 3', precio: 5.99, activo: true, stock: 10 },
    { id: 4, nombre: 'Producto 4', precio: 15.49, activo: true, stock: 2 },
    { id: 5, nombre: 'Producto 5', precio: 8.75, activo: false, stock: 0 },
  ];

}
