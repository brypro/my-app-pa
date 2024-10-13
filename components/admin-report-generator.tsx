'use client'

import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export function AdminReportGeneratorComponent() {
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [showChart, setShowChart] = useState(false)

  const generateReport = (e: React.FormEvent) => {
    e.preventDefault()
    setShowChart(true)
  }

  const chartData = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      {
        label: 'Asistencia',
        data: [85, 90, 88, 92],
        backgroundColor: '#A3BE8C',
      },
      {
        label: 'Ausencias',
        data: [15, 10, 12, 8],
        backgroundColor: '#5E81AC',
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  }

  return (
    <div className="min-h-screen text-gray-800 bg-[#F4F4F9] p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Generador de Reportes de Asistencia</h1>
        <form onSubmit={generateReport} className="mb-8">
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <label htmlFor="month" className="block mb-2 font-semibold">
                Mes
              </label>
              <select
                id="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full p-2 border rounded-md bg-white border-[#ECEFF4]"
                required
              >
                <option value="">Seleccionar mes</option>
                <option value="01">Enero</option>
                <option value="02">Febrero</option>
                <option value="03">Marzo</option>
                {/* Agregar los demás meses */}
              </select>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label htmlFor="year" className="block mb-2 font-semibold">
                Año
              </label>
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full p-2 border rounded-md bg-white border-[#ECEFF4]"
                required
              >
                <option value="">Seleccionar año</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                {/* Agregar más años si es necesario */}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#81A1C1] text-white font-bold py-2 px-4 rounded hover:bg-[#5E81AC] transition duration-300"
          >
            Generar Reporte
          </button>
        </form>
        {showChart && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Reporte de Asistencia: {month}/{year}
            </h2>
            <Bar data={chartData} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  )
}