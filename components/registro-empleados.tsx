'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegistroEmpleados() {
  const [mensaje, setMensaje] = useState('')
  const [empleadoId, setEmpleadoId] = useState('')

  const handleRegistro = (tipo: 'entrada' | 'salida') => {
    if (!empleadoId) {
      setMensaje('Por favor, ingrese un ID de empleado.')
      return
    }
    setMensaje(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} registrada exitosamente para el empleado ${empleadoId}.`)
    setEmpleadoId('')
  }

  return (
    <div className="min-h-screen flex items-center text-gray-800 justify-center bg-[#F4F4F9]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg" style={{boxShadow: '0 4px 6px rgba(46, 52, 64, 0.1)'}}>
        <h1 className="text-2xl font-bold text-center text-gray-800">Registro de Entrada y Salida</h1>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="empleadoId">ID del Empleado</Label>
            <Input 
              id="empleadoId"
              value={empleadoId}
              onChange={(e) => setEmpleadoId(e.target.value)}
              placeholder="Ingrese el ID del empleado"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => handleRegistro('entrada')}
              className="w-full py-3 text-white bg-[#81A1C1] hover:bg-[#5E81AC] transition-colors duration-200"
              style={{boxShadow: '0 2px 4px rgba(46, 52, 64, 0.1)'}}
            >
              Registrar Entrada
            </Button>
            <Button 
              onClick={() => handleRegistro('salida')}
              className="w-full py-3 text-white bg-[#81A1C1] hover:bg-[#5E81AC] transition-colors duration-200"
              style={{boxShadow: '0 2px 4px rgba(46, 52, 64, 0.1)'}}
            >
              Registrar Salida
            </Button>
          </div>
        </div>
        
        {mensaje && (
          <div className="mt-4 p-3 bg-[#A3BE8C] text-white rounded-md" role="alert">
            {mensaje}
          </div>
        )}
      </div>
    </div>
  )
}