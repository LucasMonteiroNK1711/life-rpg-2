const API_URL = "http://localhost:3000"

export async function register(email, password) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })

  return response.json()
}

export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })

  return response.json()
}

export async function getTasks() {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.json()
}

export async function createTask(title, xp) {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, xp })
  })

  return response.json()
}

export async function completeTask(id) {
  const token = localStorage.getItem("token")

  await fetch(`${API_URL}/tasks/${id}/complete`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
