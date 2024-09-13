'use client'

import React from 'react'
import Link from 'next/link'
import { Bell, Settings, User, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function NavbarComponent() {
  return (
    <nav className="bg-[#F4F4F9] border-b border-[#ECEFF4] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-[#2E3440] font-semibold text-lg">Sistema de Gestión de Empleados</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-[#5E81AC]" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5 text-[#5E81AC]" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5 text-[#5E81AC]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#D8DEE9]">
              <DropdownMenuItem>
                <Link href="/perfil" className="text-[#2E3440]">Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/configuracion" className="text-[#2E3440]">Configuración</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/logout" className="text-[#2E3440]">Cerrar Sesión</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5 text-[#5E81AC]" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-[#F4F4F9]">
            <nav className="flex flex-col space-y-4">
              <Link href="/notificaciones" className="flex items-center text-[#2E3440]">
                <Bell className="h-5 w-5 mr-2 text-[#5E81AC]" />
                Notificaciones
              </Link>
              <Link href="/configuracion" className="flex items-center text-[#2E3440]">
                <Settings className="h-5 w-5 mr-2 text-[#5E81AC]" />
                Configuración
              </Link>
              <Link href="/perfil" className="flex items-center text-[#2E3440]">
                <User className="h-5 w-5 mr-2 text-[#5E81AC]" />
                Perfil
              </Link>
              <Link href="/logout" className="flex items-center text-[#2E3440]">
                Cerrar Sesión
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}