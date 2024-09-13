'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginScreenComponent() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ username: '', password: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de autenticación
    // Por ahora, solo mostraremos errores de ejemplo
    setErrors({
      username: username ? '' : 'El nombre de usuario es requerido',
      password: password ? '' : 'La contraseña es requerida'
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F4F9]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-[#2E3440]">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="username" className="text-[#2E3440]">
              Nombre de Usuario
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-[#D8DEE9] border-[#ECEFF4] text-[#2E3440] focus:outline-none focus:ring-2 focus:ring-[#81A1C1]"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-[#BF616A]">{errors.username}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password" className="text-[#2E3440]">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-[#D8DEE9] border-[#ECEFF4] text-[#2E3440] focus:outline-none focus:ring-2 focus:ring-[#81A1C1]"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-[#BF616A]">{errors.password}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-[#81A1C1] text-white rounded-md hover:bg-[#5E81AC] focus:outline-none focus:ring-2 focus:ring-[#5E81AC] focus:ring-opacity-50"
          >
            Iniciar Sesión
          </Button>
        </form>
        <div className="text-center">
          <a href="#" className="text-[#5E81AC] hover:underline">
            Recuperar Contraseña
          </a>
        </div>
      </div>
    </div>
  )
}