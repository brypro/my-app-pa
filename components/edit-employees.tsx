'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Tipo para representar un empleado
type Employee = {
  id: number
  name: string
  position: string
  department: string
}

export function EditEmployeesComponent() {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'Juan Pérez', position: 'Desarrollador', department: 'TI' },
    { id: 2, name: 'María García', position: 'Diseñadora', department: 'UX/UI' },
    { id: 3, name: 'Carlos Rodríguez', position: 'Gerente de Proyecto', department: 'Gestión' },
  ])
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddEmployee = () => {
    // Implementar lógica para agregar empleado
    console.log('Agregar nuevo empleado')
  }

  const handleEditEmployee = (id: number) => {
    // Implementar lógica para editar empleado
    console.log('Editar empleado', id)
  }

  const handleDeleteEmployee = (id: number) => {
    // Implementar lógica para eliminar empleado
    console.log('Eliminar empleado', id)
  }

  return (
    <div className="min-h-screen p-8 text-gray-800" style={{ backgroundColor: '#F4F4F9' }}>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Administración de Empleados</h1>
      <div className="mb-6 flex justify-between items-center">
        <Button 
          onClick={handleAddEmployee}
          style={{ backgroundColor: '#81A1C1' }}
          className="text-white hover:bg-opacity-90"
        >
          <Plus className="mr-2 h-4 w-4" /> Agregar Nuevo Empleado
        </Button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar empleados..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-64"
            style={{ borderColor: '#ECEFF4' }}
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Posición</TableHead>
            <TableHead>Departamento</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEmployees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEditEmployee(employee.id)}
                  style={{ backgroundColor: '#EBCB8B' }}
                  className="mr-2 text-white hover:bg-opacity-90"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleDeleteEmployee(employee.id)}
                  style={{ backgroundColor: '#BF616A' }}
                  className="text-white hover:bg-opacity-90"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}