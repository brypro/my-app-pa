'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import pb from '@/lib/pocketbase'

export function EmployeeAttendanceComponent() {
  const [date, setDate] = useState<Date>()
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const attendanceRecords = await pb.collection('attendance').getFullList()
      setFilteredData(attendanceRecords)
    }

    fetchData()
  }, [])

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      const filtered = filteredData.filter(item => 
        item.date === format(selectedDate, 'yyyy-MM-dd')
      )
      setFilteredData(filtered)
    } else {
      fetchData()
    }
  }

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
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={"w-[240px] justify-start text-left font-normal"}
                  style={{ backgroundColor: '#5E81AC', color: 'white' }}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Seleccionar fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
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
                <TableHead style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>Entrada</TableHead>
                <TableHead style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>Salida</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>{row.date}</TableCell>
                  <TableCell style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>{row.checkIn}</TableCell>
                  <TableCell style={{ color: '#2E3440', borderColor: '#ECEFF4' }}>{row.checkOut}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
