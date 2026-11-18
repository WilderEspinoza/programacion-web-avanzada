import Link from "next/link";

export default function ProductsCard({ id, nombre, precio}: {id: string; nombre: string; precio: number}) {
    return <div className="card">
        <h2>{nombre}</h2>
        <p>Precio: ${precio}</p>
        <Link href={`/products/${id}`}>Ver detalles</Link>
    </div>
}