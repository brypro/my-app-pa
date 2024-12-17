'use client'

import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import { Button } from "@/components/ui/button"
import pb from '@/lib/pocketbase'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
)

export function AttendanceReportComponent() {
  const [attendanceData, setAttendanceData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Asistencia Promedio',
        data: [],
        backgroundColor: '#A3BE8C',
      },
    ],
  })
  const [tardinessData, setTardinessData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Tardanzas',
        data: [],
        borderColor: '#5E81AC',
        tension: 0.1,
      },
    ],
  })

  useEffect(() => {
    async function fetchData() {
      const attendanceRecords = await pb.collection('attendance').getFullList()
      const tardinessRecords = await pb.collection('tardiness').getFullList()

      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - i)
        return date.toISOString().split('T')[0]
      }).reverse()

      const attendanceData = last7Days.map(date => attendanceRecords.filter(record => record.date === date).reduce((sum, record) => sum + record.average, 0) / attendanceRecords.filter(record => record.date === date).length || 0)
      const tardinessData = last7Days.map(date => tardinessRecords.filter(record => record.date === date).reduce((sum, record) => sum + record.count, 0))

      setAttendanceData({
        labels: last7Days,
        datasets: [
          {
            label: 'Asistencia Promedio',
            data: attendanceData,
            backgroundColor: '#A3BE8C',
          },
        ],
      })

      setTardinessData({
        labels: last7Days,
        datasets: [
          {
            label: 'Tardanzas',
            data: tardinessData,
            borderColor: '#5E81AC',
            tension: 0.1,
          },
        ],
      })
    }

    fetchData()
  }, [])

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Reporte de Asistencia Semanal',
      },
    },
    scales: {
      x: {
        type: 'category' as const,
      },
      y: {
        type: 'linear' as const,
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="min-h-screen bg-[#F4F4F9] text-gray-800 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard de Asistencia</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Bar data={attendanceData} options={chartOptions} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Line data={tardinessData} options={chartOptions} />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <Button className="bg-[#81A1C1] hover:bg-[#5E81AC] text-white">
          Generar Reporte Mensual
        </Button>
        <Button className="bg-[#81A1C1] hover:bg-[#5E81AC] text-white">
          Generar Reporte Trimestral
        </Button>
        <Button className="bg-[#81A1C1] hover:bg-[#5E81AC] text-white">
          Generar Reporte Anual
        </Button>
      </div>
    </div>
  )
}
