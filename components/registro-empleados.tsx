'use client'

import { useState, useEffect, SetStateAction } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import pb from '@/lib/pocketbase'

export function RegistroEmpleados() {
  const [mensaje, setMensaje] = useState('')
  const [empleadoId, setEmpleadoId] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedEmployee, setSelectedEmployee] = useState<Record<string, any> | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [employees, setEmployees] = useState<Record<string, any>[]>([])

  const handleRegistro = async () => {
    if (!empleadoId) {
      setMensaje('Por favor, ingrese un ID de empleado.')
      return
    }

    try {
      const record = {
        empleadoId,
        timestamp: new Date().toISOString().split('T')[0]
      }
      await pb.collection('records').create(record)
      setMensaje(`Registro creado exitosamente para el empleado ${empleadoId}.`)
      setEmpleadoId('')
    } catch (error) {
      setMensaje('Error al registrar. Por favor, intente nuevamente.' + error)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEmployeeClick = (employee: SetStateAction<any>) => {
    setSelectedEmployee(employee)
    setEmpleadoId(employee.id)
  }

  const fetchEmployees = async () => {
    try {
      const records = await pb.collection('employees').getFullList()
      setEmployees(records)
    } catch (error) {
      console.error('Error fetching employees:', error)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

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
              onClick={handleRegistro}
              className="w-full py-3 text-white bg-[#81A1C1] hover:bg-[#5E81AC] transition-colors duration-200"
              style={{boxShadow: '0 2px 4px rgba(46, 52, 64, 0.1)'}}
            >
              Registrar Entrada
            </Button>
            <Button 
              onClick={handleRegistro}
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

        <div className="mt-8">
          <h2 className="text-xl font-bold text-center text-gray-800">Lista de Empleados</h2>
          <ul className="mt-4 space-y-2">
            {employees.map((employee) => (
              <li 
                key={employee.id} 
                className={`p-2 border rounded-md cursor-pointer ${selectedEmployee?.id === employee.id ? 'bg-[#81A1C1] text-white' : 'bg-white text-gray-800'}`}
                onClick={() => handleEmployeeClick(employee)}
              >
                {employee.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
