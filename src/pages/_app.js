import { AuthProvider } from '@/contexts/AuthContext'
import { ProductProvider } from '@/contexts/ProductContext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <ProductProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ProductProvider>
  )
}
