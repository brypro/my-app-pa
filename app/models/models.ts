export default interface Employee {
    id: string
    name: string
    position: string
    department: string
    workSchedule: string
    workDays: string[]
}

export default interface RecordEmployee {
    id: string
    timestamp: string
    in: string
    out: string
    empleadoId: string
    isLate: boolean
}
