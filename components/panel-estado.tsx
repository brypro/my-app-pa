'use client'

import { Server, Cpu, HardDrive, Wifi, AlertCircle, CheckCircle, XCircle } from "lucide-react"

const StatusIndicator = ({ status }: { status: "normal" | "warning" | "error" }) => {
  const colorMap = {
    normal: "#A3BE8C",
    warning: "#EBCB8B",
    error: "#BF616A"
  }
  return (
    <div className="flex items-center">
      <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: colorMap[status] }}></div>
      {status === "normal" && <CheckCircle size={16} color={colorMap[status]} />}
      {status === "warning" && <AlertCircle size={16} color={colorMap[status]} />}
      {status === "error" && <XCircle size={16} color={colorMap[status]} />}
    </div>
  )
}

const StatusPanel = ({ title, icon, status }: { title: string, icon: React.ReactNode, status: "normal" | "warning" | "error" }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
    <div className="flex items-center">
      {icon}
      <span className="ml-2 font-semibold">{title}</span>
    </div>
    <StatusIndicator status={status} />
  </div>
)

export function PanelEstado() {
  return (
    <div className="min-h-screen text-gray-800 p-8" style={{ backgroundColor: "#F4F4F9" }}>
      <h1 className="text-2xl font-bold mb-6">Panel de Estado del Sistema</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatusPanel title="Servidor Principal" icon={<Server className="text-gray-600" />} status="normal" />
        <StatusPanel title="CPU" icon={<Cpu className="text-gray-600" />} status="warning" />
        <StatusPanel title="Almacenamiento" icon={<HardDrive className="text-gray-600" />} status="normal" />
        <StatusPanel title="Red" icon={<Wifi className="text-gray-600" />} status="error" />
      </div>
      <div className="mt-8 flex justify-end space-x-4">
        <button className="px-4 py-2 rounded-md text-white font-semibold" style={{ backgroundColor: "#A3BE8C" }}>
          Reiniciar Servicios
        </button>
        <button className="px-4 py-2 rounded-md text-white font-semibold" style={{ backgroundColor: "#A3BE8C" }}>
          Ejecutar Diagnóstico
        </button>
      </div>
    </div>
  )
}