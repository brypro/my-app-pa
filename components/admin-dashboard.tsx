'use client'

import { useState, useEffect } from 'react'
import { Bar, } from 'react-chartjs-2'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Users, 
  Clock, 
} from 'lucide-react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js'

import pb from '@/lib/pocketbase'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

export function AdminDashboardComponent() {
  const [activeEmployees, setActiveEmployees] = useState(0)
  const [recentEntries, setRecentEntries] = useState(0)
  const [recentExits, setRecentExits] = useState(0)
  const [attendanceData, setAttendanceData] = useState<{
    labels: string[],
    datasets: { label: string, data: number[], backgroundColor: string }[]
  }>({
    labels: [],
    datasets: [
      {
        label: 'Entradas',
        data: [],
        backgroundColor: '#5E81AC',
      },
      {
        label: 'Salidas',
        data: [],
        backgroundColor: '#A3BE8C',
      },
    ],
  })


  useEffect(() => {
    async function fetchData() {
      const employees = await pb.collection('employees').getFullList()
      const records = await pb.collection('records').getFullList()
      

      setActiveEmployees(employees.length)
      setRecentEntries(records.length)
      setRecentExits(records.filter(record => record.out).length)

      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - i)
        return date.toISOString().split('T')[0]
      }).reverse()

      const attendanceEntries = last7Days.map(date => records.filter(record => record.in && record.timestamp.startsWith(date)).length)
      const attendanceExits = last7Days.map(date => records.filter(record => record.out && record.timestamp.startsWith(date)).length)
      

      setAttendanceData({
        labels: last7Days,
        datasets: [
          {
            label: 'Entradas',
            data: attendanceEntries,
            backgroundColor: '#5E81AC',
          },
          {
            label: 'Salidas',
            data: attendanceExits,
            backgroundColor: '#A3BE8C',
          },
        ],
      })

    }

    fetchData()
  }, [])

  return (
    <div className="h-full w-full bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard de Administración</h1>
      
      {/* Widgets */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empleados Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeEmployees}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entradas Contabilizadas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentEntries}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Salidas Contabilizadas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentExits}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Asistencia Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={attendanceData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
