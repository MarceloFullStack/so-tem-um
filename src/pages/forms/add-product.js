import { useAuth } from '@/contexts/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import InputMask from 'react-input-mask'

export default function AddProduct() {
  const { isAuthenticated } = useAuth()

  const [productData, setProductData] = useState({
    image: '',
    title: '',
    description: '',
    price: 0,
    active: true,
    whatsappNumber: '',
    createdAt: new Date().toISOString(),
  })

  const [imageFile, setImageFile] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [router] = useState(useRouter())

  const handleChange = (event) => {
    const { name, value } = event.target
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    setPhoneNumber(value.replace(/\D/g, ''))
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setImageFile(file)
    setProductData((prevState) => ({
      ...prevState,
      image: URL.createObjectURL(file),
    }))
  }

  const handleSave = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append('file', imageFile)
      formData.append('title', productData.title)
      formData.append('description', productData.description)
      formData.append('price', productData.price)
      formData.append('active', productData.active)
      formData.append('whatsappNumber', phoneNumber)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.status === 200) {
        const data = await response.json()
        console.log('Upload successful!', data)
        // router.push('/')
      } else {
        console.log('Upload failed!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (!isAuthenticated) {
    return (
      <p>
        Você precisa estar logado para acessar esta página. <br />
        <br />
        <Link href="/login">Fazer Login</Link>
      </p>
    )
  }

  return (
    <form encType="multipart/form-data">
      <div className="mb-6">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Título
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={productData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md outline-none"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Descrição
        </label>
        <textarea
          name="description"
          id="description"
          value={productData.description}
          onChange={handleChange}
          required
          rows="4"
          className="w-full p-2 border rounded-md outline-none"
        ></textarea>
      </div>

      <div className="mb-6">
        <label
          htmlFor="price"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Preço
        </label>
        <input
          type="number"
          name="price"
          id="price"
          value={productData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md outline-none"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="whatsappNumber"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Link do WhatsApp
        </label>
        <InputMask
          mask="(99) 99999-9999"
          type="text"
          name="whatsappNumber"
          id="whatsappNumber"
          value={productData.whatsappNumber}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md outline-none"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="image"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Imagem
        </label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleImageChange}
          accept=".jpg,.jpeg,.png"
          required
        />
        {productData.image && (
          <Image
            src={productData.image}
            alt="Product"
            width="288"
            height="320"
          />
        )}
      </div>

      <button
        type="submit"
        onClick={handleSave}
        className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
      >
        Salvar
      </button>
    </form>
  )
}
