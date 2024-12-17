import { NextResponse } from 'next/server';
import pb from '@/lib/pocketbase';

async function findEmployeeByNfcUID(nfcUID) {
  const employees = await pb.collection('employees').getFullList({
    filter: `nfcUID="${nfcUID}"`
  });
  return employees.length > 0 ? employees[0] : null;
}

async function findTodaysRecords(employeeId) {
  const currentDate = new Date().toISOString().split('T')[0];
  const records = await pb.collection('records').getFullList({
    filter: `empleadoId="${employeeId}" && timestamp="${currentDate}"`
  });
  return records;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { nfcUID } = body;

    const employee = await findEmployeeByNfcUID(nfcUID);
    if (!employee) {
      return NextResponse.json({ error: 'Empleado no encontrado' }, { status: 404 });
    }

    const records = await findTodaysRecords(employee.id);

    if (records.length > 0) {
      const lastRecord = records[records.length - 1];
      lastRecord.out = new Date().toISOString();
      await pb.collection('records').update(lastRecord.id, lastRecord);
      console.log('✅ Registro de salida actualizado:', lastRecord);
      globalNotification(`Salida registrada para el empleado con UID: ${nfcUID}`);
      return NextResponse.json({ message: 'Salida registrada', record: lastRecord }, { status: 200 });
    } else {
      const newRecord = {
        empleadoId: employee.id,
        timestamp: new Date().toISOString(),
        in: new Date().toISOString(),
        out: ''
      };

      await pb.collection('records').create(newRecord);
      console.log('✅ Registro de entrada agregado:', newRecord);
      globalNotification(`Entrada registrada para el empleado con UID: ${nfcUID}`);
      return NextResponse.json({ message: 'Entrada registrada', record: newRecord }, { status: 200 });
    }
  } catch (error) {
    console.error('❌ Error en la API:', error.message);
    return NextResponse.json({ error: 'Error al registrar asistencia' }, { status: 500 });
  }
}

export async function GET() {
  const records = await pb.collection('records').getFullList();
  return NextResponse.json({ attendanceLog: records });
}

function globalNotification(message) {
  console.log('🔔 Notificación global:', message);
}
