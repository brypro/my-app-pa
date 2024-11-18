'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import pb from '@/lib/pocketbase'
import Employee from '@/app/models/models'
import RecordEmployee from '../app/models/models';


export function EmployeeAttendanceComponent() {
  const [filteredData, setFilteredData] = useState<{ id: string, timestamp: string, in: string, out: string, employee: string, isLate: boolean }[]>([])

  useEffect(() => {
    async function fetchData() {
      const attendanceRecords = await pb.collection('records').getFullList<RecordEmployee>()
      const employees = await pb.collection('employees').getFullList<Employee>()
      console.log(employees)
      console.log(attendanceRecords)
      const formattedRecords = attendanceRecords.map(record => ({
        id: record.id,
        timestamp: record.timestamp,
        in: record.in,
        out: record.out,
        employee: employees.find(employee => employee.id == record.empleadoId)?.name || 'Desconocido',
        isLate: record.isLate
      }))
      setFilteredData(formattedRecords)
    }

    fetchData()
  }, [])

  const handleExport = (format: 'pdf' | 'excel') => {
    // Implement export functionality here
    console.log(`Exporting to ${format}`)
  }

  return (
    <div className="min-h-screen text-gray-800 p-8" style={{ backgroundColor: '#D8DEE9' }}>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4" style={{ color: '#2E3440' }}>Historial de Entradas y Salidas</h1>
          
          <div className="flex justify-between items-center mb-4">
            <div className="space-x-2">
              <Button onClick={() => handleExport('pdf')} style={{ backgroundColor: '#81A1C1', color: 'white' }}>
                Exportar PDF
              </Button>
              <Button onClick={() => handleExport('excel')} style={{ backgroundColor: '#81A1C1', color: 'white' }}>
                Exportar Excel
              </Button>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>Fecha</TableHead>
                <TableHead style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>Empleado</TableHead>
                <TableHead style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>Entrada</TableHead>
                <TableHead style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>Salida</TableHead>
                <TableHead style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>Tardanza</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>{row.timestamp}</TableCell>
                  <TableCell style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>{row.employee}</TableCell>
                  <TableCell style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>{row.in}</TableCell>
                  <TableCell style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>{row.out}</TableCell>
                  <TableCell style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>{row.isLate ? 'Sí' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
