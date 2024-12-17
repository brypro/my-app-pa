export default interface Employee {
    id: string
    name: string
    position: string
    department: string
    ufc: string
}

export default interface RecordEmployee {
    id: string
    timestamp: string
    in: string
    out: string
    empleadoId: string
    month: number
    year: number
}
