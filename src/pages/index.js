import { ProductContext } from '@/contexts/ProductContext'
import { useContext } from 'react'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'

export default function HomeContext() {
  const { products } = useContext(ProductContext)

  const whatsapp = ({ title, description, price, image, number }) => {
    const message = `Olá, estou interessado(a) no produto ${title}. `
    const info = `Segue abaixo as informações:\n\nNome: ${title}\nDescrição: ${description}\nPreço: ${price}`
    return `https://wa.me/55${number}?text=${encodeURIComponent(
      message + info,
    )}`
  }
  return (
    <main>
      <Header />
      {!products ? (
        <p>Carregando produtos...</p>
      ) : (
        <div className="mx-auto mt-32 mb-5 grid w-fit grid-cols-1 justify-center justify-items-center gap-y-20 gap-x-14 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              img={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
              active={product.active ? 'Ativo' : 'Inativo'}
              whatsapp={whatsapp({
                title: product.title,
                description: product.description,
                price: product.price,
                image: product.image,
                number: product.whatsappNumber,
              })}
            />
          ))}
        </div>
      )}
    </main>
  )
}
