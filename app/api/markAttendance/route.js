import { NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

// you can also fetch all records at once via getFullList
//const records = await pb.collection('employees').getFullList();
//console.log('📋 Empleados:', records);

async function findEmployeeByNfcUID(nfcUID) {
  console.log('🔍 Buscando empleado con UID:', nfcUID);
  try {
    const employees = await pb.collection('employees').getFirstListItem(`nfcUID="${nfcUID}"`);
    console.log('🔍 Empleado encontrado:', employees)
    return employees || null;
  }
  catch (error) {
    console.error('❌ Error al buscar empleado:', error.message);
    return null;
  }
}

async function findTodaysRecords(employeeId) {
  const currentDate = new Date().toISOString().split('T')[0];
  console.log('🔍 Buscando registros de hoy para el empleado:', employeeId, currentDate);
  const records = await pb.collection('records').getFullList(2,{
    filter: `empleadoId="${employeeId}" && timestamp="${currentDate}"`,
  });
  console.log('🔍 Registros de hoy:', records )
  return records;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { nfcUID } = body;

    const employee = await findEmployeeByNfcUID(nfcUID);
    if (!employee) {
      console.log('❌ Empleado no encontrado con UID:', nfcUID);
      return NextResponse.json({ error: 'Empleado no encontrado' }, { status: 404 });
    }

    const records = await findTodaysRecords(employee.id);

    if (records.length > 0) {
      const lastRecord = records[records.length - 1];
      lastRecord.out = new Date().toISOString();
      await pb.collection('records').update(lastRecord.id, lastRecord);
      console.log('✅ Registro de salida actualizado:', lastRecord);
      globalNotification(`Salida registrada para el empleado: ${employee.name}`);
      return NextResponse.json({ message: `${employee.name}: Salida registrada`, record: lastRecord }, { status: 200 });
    } else {
      const currentDate = new Date().toISOString().split('T')[0];
      const newRecord = {
        empleadoId: employee.id,
        timestamp: currentDate,
        in: new Date().toISOString(),
        out: ''
      };

      await pb.collection('records').create(newRecord);
      console.log('✅ Registro de entrada agregado:', newRecord);
      globalNotification(`Entrada registrada para el empleado empleado: ${employee.name}`);
      return NextResponse.json({ message: `${employee.name}: Entrada registrada`, record: newRecord }, { status: 200 });
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
