'use client'

import React from 'react'
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
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  
  const barData = {
    labels: months,
    datasets: [
      {
        label: 'Asistencia Promedio',
        data: [65, 70, 80, 81, 76, 85, 87, 80, 74, 78, 82, 79],
        backgroundColor: '#A3BE8C',
      },
    ],
  }

  const lineData = {
    labels: months,
    datasets: [
      {
        label: 'Tardanzas',
        data: [12, 19, 10, 5, 8, 3, 7, 15, 20, 18, 12, 9],
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
    <div className="min-h-screen bg-[#F4F4F9] p-8">
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