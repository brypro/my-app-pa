'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Fallo {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
}

const fallos: Fallo[] = [
  { id: 1, titulo: "Fuga de agua", descripcion: "Tubería rota en el baño del segundo piso", ubicacion: "Edificio A, Piso 2", prioridad: 'Alta' },
  { id: 2, titulo: "Luz fundida", descripcion: "Lámpara del pasillo principal no funciona", ubicacion: "Edificio B, Planta baja", prioridad: 'Media' },
  { id: 3, titulo: "Aire acondicionado ruidoso", descripcion: "Unidad de A/C hace ruidos extraños", ubicacion: "Edificio C, Oficina 301", prioridad: 'Baja' },
]

export function NotificacionFallosComponent() {
  return (
    <div className="min-h-screen bg-[#D8DEE9] p-4 md:p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#2E3440]">Notificaciones de Fallos</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh]">
            {fallos.map((fallo) => (
              <Card key={fallo.id} className="mb-4">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#2E3440]">{fallo.titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#5E81AC] mb-2">{fallo.descripcion}</p>
                  <p className="text-sm text-[#5E81AC]"><strong>Ubicación:</strong> {fallo.ubicacion}</p>
                  <p className="text-sm text-[#5E81AC]"><strong>Prioridad:</strong> {fallo.prioridad}</p>
                </CardContent>
                <CardFooter>
                  <Button className="bg-[#A3BE8C] hover:bg-[#8FBCBB] text-white">
                    Marcar como Resuelto
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}