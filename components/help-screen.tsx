'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function HelpScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado', { name, email, message })
  }

  return (
    <div className="min-h-screen bg-[#D8DEE9] text-[#2E3440] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Centro de Ayuda</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Preguntas Frecuentes</h2>
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow">
            <AccordionItem value="item-1">
              <AccordionTrigger>¿Cómo puedo cambiar mi contraseña?</AccordionTrigger>
              <AccordionContent>
                Para cambiar tu contraseña, ve a la sección de "Configuración de cuenta" y selecciona "Cambiar contraseña". Sigue las instrucciones para establecer una nueva contraseña segura.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>¿Cómo puedo actualizar mi información de perfil?</AccordionTrigger>
              <AccordionContent>
                Dirígete a la sección "Mi Perfil" y haz clic en "Editar". Allí podrás actualizar tu información personal, foto de perfil y otros detalles.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>¿Cómo puedo contactar al soporte técnico?</AccordionTrigger>
              <AccordionContent>
                Puedes contactar a nuestro equipo de soporte técnico utilizando el formulario de contacto que se encuentra más abajo en esta página, o enviando un correo electrónico a soporte@ejemplo.com.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Formulario de Contacto</h2>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Nombre</label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Correo Electrónico</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2">Mensaje</label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="bg-[#81A1C1] hover:bg-[#5E81AC] text-white">
              Enviar Mensaje
            </Button>
          </form>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Documentación del Usuario</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="mb-4">Para obtener información más detallada sobre cómo usar nuestro sistema, consulta nuestra documentación completa:</p>
            <ul className="list-disc pl-6">
              <li><a href="/docs/getting-started" className="text-blue-600 hover:underline">Guía de inicio rápido</a></li>
              <li><a href="/docs/user-manual" className="text-blue-600 hover:underline">Manual del usuario</a></li>
              <li><a href="/docs/api-reference" className="text-blue-600 hover:underline">Referencia de la API</a></li>
              <li><a href="/docs/troubleshooting" className="text-blue-600 hover:underline">Solución de problemas</a></li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}