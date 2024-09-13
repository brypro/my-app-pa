'use client'

import React, { useState } from 'react'
import { Trash2, Save, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"

type Record = {
  id: number
  employeeName: string
  date: string
  checkIn: string
  checkOut: string
}

export function AdminPanel() {
  const [records, setRecords] = useState<Record[]>([
    { id: 1, employeeName: "John Doe", date: "2023-06-01", checkIn: "09:00", checkOut: "17:00" },
    { id: 2, employeeName: "Jane Smith", date: "2023-06-01", checkIn: "08:30", checkOut: "16:30" },
    { id: 3, employeeName: "Bob Johnson", date: "2023-06-01", checkIn: "09:15", checkOut: "17:15" },
  ])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleEdit = (id: number) => {
    setEditingId(id)
    setValidationError(null)
  }

  const handleSave = (id: number) => {
    const record = records.find(r => r.id === id)
    if (record) {
      const checkInTime = new Date(`2000-01-01T${record.checkIn}`)
      const checkOutTime = new Date(`2000-01-01T${record.checkOut}`)
      
      if (checkOutTime <= checkInTime) {
        setValidationError("La hora de salida debe ser posterior a la hora de entrada.")
        return
      }
    }
    setEditingId(null)
    setValidationError(null)
  }

  const handleDelete = (id: number) => {
    setRecords(records.filter(record => record.id !== id))
    setValidationError(null)
  }

  const handleInputChange = (id: number, field: keyof Record, value: string) => {
    setRecords(records.map(record => 
      record.id === id ? { ...record, [field]: value } : record
    ))
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#D8DEE9' }}>
      <h1 className="text-2xl font-bold mb-4">Panel de Administración de Registros</h1>
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
                {editingId === record.id ? (
                  <Input 
                    value={record.employeeName} 
                    onChange={(e) => handleInputChange(record.id, 'employeeName', e.target.value)}
                  />
                ) : record.employeeName}
              </TableCell>
              <TableCell>
                {editingId === record.id ? (
                  <Input 
                    type="date" 
                    value={record.date} 
                    onChange={(e) => handleInputChange(record.id, 'date', e.target.value)}
                  />
                ) : record.date}
              </TableCell>
              <TableCell>
                {editingId === record.id ? (
                  <Input 
                    type="time" 
                    value={record.checkIn} 
                    onChange={(e) => handleInputChange(record.id, 'checkIn', e.target.value)}
                  />
                ) : record.checkIn}
              </TableCell>
              <TableCell>
                {editingId === record.id ? (
                  <Input 
                    type="time" 
                    value={record.checkOut} 
                    onChange={(e) => handleInputChange(record.id, 'checkOut', e.target.value)}
                  />
                ) : record.checkOut}
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