import Link from "next/link";
import ProductCard from "../components/ProductsCard";
import { productos, posts } from "../lib/datos";

export default function Home() {
  return <main>
    <h1>Catalogo de productos</h1>
    <p>Catalogo de productos de la tienda de Lideratec Academy</p>
    <h2>Productos</h2>
    <div className="products-grid">
      {productos.map(producto =>  <ProductCard key={producto.id} {...producto} />)}
    </div>
    <h2>Articulos</h2>
    <div className="products-grid">
      {posts.map((post) => (
        <p key={post.slug}>
          <Link href={`/blog/${post.slug}`}>{post.titulo}</Link>
        </p>
      ))}
    </div>
  </main>;
}