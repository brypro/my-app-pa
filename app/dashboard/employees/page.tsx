import { EditEmployeesComponent } from "@/components/edit-employees";
import { useState } from "react";
import AddEmployeeModal from "@/components/add-employee-modal";

export default function EmployeesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <EditEmployeesComponent />
            <button onClick={openModal}>Add Employee</button>
            <AddEmployeeModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    )
}
