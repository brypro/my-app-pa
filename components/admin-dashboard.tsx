'use client'

import { useState, useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Users, 
  Clock, 
  AlertTriangle,
  FileText
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
  const [systemFailures, setSystemFailures] = useState(0)
  const [pendingReports, setPendingReports] = useState(0)
  const [attendanceData, setAttendanceData] = useState({
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
  const [productivityData, setProductivityData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Productividad',
        data: [],
        borderColor: '#5E81AC',
        tension: 0.1,
      },
    ],
  })

  useEffect(() => {
    async function fetchData() {
      const employees = await pb.collection('employees').getFullList()
      const records = await pb.collection('records').getFullList()
      const failures = await pb.collection('failures').getFullList()
      const reports = await pb.collection('reports').getFullList()

      setActiveEmployees(employees.length)
      setRecentEntries(records.filter(record => record.checkIn).length)
      setRecentExits(records.filter(record => record.checkOut).length)
      setSystemFailures(failures.length)
      setPendingReports(reports.length)

      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - i)
        return date.toISOString().split('T')[0]
      }).reverse()

      const attendanceEntries = last7Days.map(date => records.filter(record => record.checkIn && record.timestamp.startsWith(date)).length)
      const attendanceExits = last7Days.map(date => records.filter(record => record.checkOut && record.timestamp.startsWith(date)).length)
      const productivity = last7Days.map(date => {
        const dayRecords = records.filter(record => record.timestamp.startsWith(date))
        const totalHours = dayRecords.reduce((sum, record) => sum + (new Date(record.checkOut) - new Date(record.checkIn)) / (1000 * 60 * 60), 0)
        return totalHours / dayRecords.length || 0
      })

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

      setProductivityData({
        labels: last7Days,
        datasets: [
          {
            label: 'Productividad',
            data: productivity,
            borderColor: '#5E81AC',
            tension: 0.1,
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
            <CardTitle className="text-sm font-medium">Entradas Recientes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentEntries}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Salidas Recientes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentExits}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fallos del Sistema</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemFailures}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reportes Pendientes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReports}</div>
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
        
        <Card>
          <CardHeader>
            <CardTitle>Productividad Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={productivityData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
