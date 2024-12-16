import { NextResponse } from 'next/server';

let attendanceLog = []; // Base de datos temporal (en memoria)

export async function POST(req) {
  try {
    const body = await req.json();
    const { nfcUID } = body;

    // Simula el registro de la asistencia
    const newRecord = {
      id: attendanceLog.length + 1,
      nfcUID,
      timestamp: new Date().toISOString(),
    };

    attendanceLog.push(newRecord);
    console.log('✅ Registro agregado:', newRecord);

    return NextResponse.json({ message: 'Asistencia registrada', record: newRecord }, { status: 200 });
  } catch (error) {
    console.error('❌ Error en la API:', error.message);
    return NextResponse.json({ error: 'Error al registrar asistencia' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ attendanceLog });
}
