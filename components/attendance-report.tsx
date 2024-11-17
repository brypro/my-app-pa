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
  const [attendanceData, setAttendanceData] = useState([])
  const [tardinessData, setTardinessData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const attendanceRecords = await pb.collection('attendance').getFullList()
      const tardinessRecords = await pb.collection('tardiness').getFullList()

      setAttendanceData(attendanceRecords.map(record => record.average))
      setTardinessData(tardinessRecords.map(record => record.count))
    }

    fetchData()
  }, [])

  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  
  const barData = {
    labels: months,
    datasets: [
      {
        label: 'Asistencia Promedio',
        data: attendanceData,
        backgroundColor: '#A3BE8C',
      },
    ],
  }

  const lineData = {
    labels: months,
    datasets: [
      {
        label: 'Tardanzas',
        data: tardinessData,
        borderColor: '#5E81AC',
        tension: 0.1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Reporte de Asistencia Anual',
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
          <Bar data={barData} options={chartOptions} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Line data={lineData} options={chartOptions} />
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
