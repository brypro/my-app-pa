'use client'

import React, { useState, useEffect } from 'react'
import { Trash2, Save, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import pb from '@/lib/pocketbase'
import RecordEmployee from '../app/models/models';
import Employee from '../app/models/models'

// type Record = {
//   id: string
//   employeeName: string
//   date: string
//   checkIn: string
//   checkOut: string
// }

export function RecordCorrectionComponent() {
  const [records, setRecords] = useState<RecordEmployee[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRecords() {
      const records = await pb.collection('records').getFullList<RecordEmployee>()
      const employees = await pb.collection('employees').getFullList<Employee>()
      setRecords(records)
      setEmployees(employees)
      //   records.map((record: any) => ({
      //   id: record.id,
      //   employeeName: employees.find((employee: Employee) => employee.id === record.empleadoId)?.name || 'Desconocido',
      //   date: record.timestamp,
      //   employeeId: record.employeeId,
      //   checkIn: record.in,
      //   checkOut: record.out
      // })))
    }

    fetchRecords()
  }, [])

  const handleEdit = (id: string) => {
    setEditingId(id)
    setValidationError(null)
  }

  const handleSave = async (id: string) => {
    const record = records.find(r => r.id === id)
    if (record) {
      const checkInTime = new Date(`2000-01-01T${record.in}`)
      const checkOutTime = new Date(`2000-01-01T${record.out}`)
      
      if (checkOutTime <= checkInTime) {
        setValidationError("La hora de salida debe ser posterior a la hora de entrada.")
        return
      }

      await pb.collection('records').update(id, record)
    }
    setEditingId(null)
    setValidationError(null)
  }

  const handleDelete = async (id: string) => {
    await pb.collection('records').delete(id)
    setRecords(records.filter(record => record.id !== id))
    setValidationError(null)
  }

  const handleInputChange = (id: string, field: keyof RecordEmployee, value: string) => {
    setRecords(records.map(record => 
      record.id === id ? { ...record, [field]: value } : record
    ))
  }

  return (
    <div className="min-h-screen text-gray-800 p-8" style={{ backgroundColor: '#D8DEE9' }}>
      <h1 className="text-2xl font-bold mb-4">Panel de Corrección de Registros</h1>
      {validationError && (
        <Alert className="mb-4" style={{ backgroundColor: '#EBCB8B', color: '#2E3440' }}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Empleado</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Entrada</TableHead>
            <TableHead>Salida</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map(record => (
            <TableRow key={record.id}>
              <TableCell>
                {employees.find(employee => employee.id === record.empleadoId)?.name || 'Desconocido'}
              </TableCell>
              <TableCell>
                { record.timestamp}
              </TableCell>
              <TableCell>
                {editingId === record.id ? (
                  <Input 
                    type="time" 
                    value={record.in} 
                    onChange={(e) => handleInputChange(record.id, 'in', e.target.value)}
                  />
                ) : record.in}
              </TableCell>
              <TableCell>
                {editingId === record.id ? (
                  <Input 
                    type="time" 
                    value={record.out} 
                    onChange={(e) => handleInputChange(record.id, 'out', e.target.value)}
                  />
                ) : record.out}
              </TableCell>
              <TableCell>
                {editingId === record.id ? (
                  <Button onClick={() => handleSave(record.id)} style={{ backgroundColor: '#A3BE8C', color: '#2E3440' }}>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Cambios
                  </Button>
                ) : (
                  <Button onClick={() => handleEdit(record.id)} variant="outline">
                    Editar
                  </Button>
                )}
                <Button onClick={() => handleDelete(record.id)} variant="outline" className="ml-2" style={{ color: '#BF616A' }}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
