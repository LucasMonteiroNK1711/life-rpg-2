import { useState } from "react"
import { login } from "../services/api"

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin() {
    const data = await login(email, password)

    if (data.token) {
      localStorage.setItem("token", data.token)
      onLogin()
    } else {
      alert("Login inválido")
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        placeholder="Senha"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  )
}
