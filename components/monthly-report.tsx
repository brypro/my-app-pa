'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import pb from '@/lib/pocketbase'

export function MonthlyReportComponent() {
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [reportData, setReportData] = useState<Record<string, any>[]>([])

  const generateReport = async (e: React.FormEvent) => {
    e.preventDefault()
    const report = await pb.collection('records').getFullList(100,{
      filter: `timestamp >= '${year}-${month}-01' && timestamp <= '${year}-${month}-31'`
    })
    setReportData(report)
  }

  return (
    <div className="min-h-screen text-gray-800 p-8" style={{ backgroundColor: '#D8DEE9' }}>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4" style={{ color: '#2E3440' }}>Generar Reporte Mensual</h1>
          <form onSubmit={generateReport} className="mb-8">
            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label htmlFor="month" className="block mb-2 font-semibold">
                  Mes
                </label>
                <Input
                  id="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full p-2 border rounded-md bg-white border-[#ECEFF4]"
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label htmlFor="year" className="block mb-2 font-semibold">
                  Año
                </label>
                <Input
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full p-2 border rounded-md bg-white border-[#ECEFF4]"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#81A1C1] text-white font-bold py-2 px-4 rounded hover:bg-[#5E81AC] transition duration-300"
            >
              Generar Reporte
            </Button>
          </form>
          {reportData.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                Reporte de Asistencia: {month}/{year}
              </h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>Fecha</TableHead>
                    <TableHead style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>Empleado</TableHead>
                    <TableHead style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>Entrada</TableHead>
                    <TableHead style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>Salida</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>{row.timestamp}</TableCell>
                      <TableCell style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>{row.empleadoId}</TableCell>
                      <TableCell style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>{row.in}</TableCell>
                      <TableCell style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>{row.out}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
