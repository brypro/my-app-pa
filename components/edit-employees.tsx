'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import pb from '@/lib/pocketbase'

// Tipo para representar un empleado
type Employee = {
  id: string
  name: string
  position: string
  department: string
}

export function EditEmployeesComponent() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function fetchEmployees() {
      const records = await pb.collection('employees').getFullList()
      setEmployees(records.map((record: any) => ({
        id: record.id,
        name: record.name,
        position: record.position,
        department: record.department
      })))
    }

    fetchEmployees()
  }, [])

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddEmployee = async () => {
    const newEmployee = { id: '', name: 'Nuevo Empleado', position: 'Posición', department: 'Departamento' }
    const record = await pb.collection('employees').create(newEmployee)
    setEmployees([...employees, { ...newEmployee, id: record.id }])
  }

  const handleEditEmployee = async (id: string) => {
    const updatedEmployee = employees.find(employee => employee.id === id)
    if (updatedEmployee) {
      await pb.collection('employees').update(id, updatedEmployee)
      setEmployees(employees.map(employee => employee.id === id ? updatedEmployee : employee))
    }
  }

  const handleDeleteEmployee = async (id: string) => {
    await pb.collection('employees').delete(id)
    setEmployees(employees.filter(employee => employee.id !== id))
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
