import { notFound } from "next/navigation";
import {productos} from "../../../lib/datos";

export const dynamicParams = false;

export function generateStaticParams() {
    return productos.map(producto => ({
        id: producto.id.toString()
    }));
}

export default async function ProductsPage({params}: {params: Promise<{id: string}>}) {

    const {id} = await params;
    const producto = productos.find(producto => producto.id === Number(id));
    if (!producto) {
        notFound();
    }
    return <main>
        <h1>Producto: {producto.nombre}</h1>
        <p>Precio: ${producto.precio}</p>
    </main>;
}