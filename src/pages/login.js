import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'

export default function Login() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    if (
      process.env.LOGIN_USERNAME === username &&
      process.env.LOGIN_PASSWORD === password
    ) {
      login()
    } else {
      console.log('erro!!!')
    }
  }
  console.log('USERNAME -- ', username)
  console.log('PASSWORD -- ', password)

  console.log('USERNAME .ENV -- ', process.env.LOGIN_USERNAME)
  console.log('PASSWORD .ENV -- ', process.env.LOGIN_PASSWORD)
  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
