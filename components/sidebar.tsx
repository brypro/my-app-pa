'use client'

import { useState } from 'react'
import { 
  LayoutDashboard, 
  Users, 
  FileBarChart, 
  Clock, 
  LogIn, 
  Edit, 
  Activity, 
  AlertTriangle, 
  FileText, 
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Gestión de Empleados', href: '/dashboard/employees' },
  { icon: FileBarChart, label: 'Reportes', href: '/dashboard/reports' },
  { icon: Clock, label: 'Historial de Asistencia', href: '/dashboard/attendance-history' },
  { icon: LogIn, label: 'Registro de Entrada/Salida', href: '/dashboard/check-in-out' },
  { icon: Edit, label: 'Corrección de Registros', href: '/dashboard/record-correction' },
  { icon: Activity, label: 'Estado del Sistema', href: '/dashboard/system-status' },
  { icon: AlertTriangle, label: 'Notificación de Fallos', href: '/dashboard/fault-notifications' },
  { icon: FileText, label: 'Generar Reportes Mensuales', href: '/dashboard/monthly-reports' },
  { icon: HelpCircle, label: 'Ayuda', href: '/dashboard/help' },
]

export function SidebarComponent() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState('Dashboard')

  return (
    <div className={cn(
      "flex flex-col h-screen bg-[#D8DEE9] text-[#2E3440] transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex justify-end p-4">
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-[#5E81AC]">
          {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 px-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={cn(
                  "flex items-center p-2 rounded-lg hover:bg-[#F4F4F9] transition-colors duration-200",
                  activeItem === item.label && "border-l-4 border-[#5E81AC]"
                )}
                onClick={() => setActiveItem(item.label)}
              >
                <item.icon className="w-6 h-6 text-[#5E81AC]" />
                {!isCollapsed && (
                  <span className="ml-3 whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {item.label}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}