import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import pb from '@/lib/pocketbase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const EditEmployeeModal = ({ isOpen, onClose, employee, setEmployees }) => {
  const [name, setName] = useState(employee.name);
  const [position, setPosition] = useState(employee.position);
  const [department, setDepartment] = useState(employee.department);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEmployee = {
      name,
      position,
      department,
    };
    await pb.collection('employees').update(employee.id, updatedEmployee);
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === employee.id ? { ...emp, ...updatedEmployee } : emp
      )
    );
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
        <Dialog.Title className="text-lg font-medium">Edit Employee</Dialog.Title>
        <Dialog.Description className="mt-2 mb-4 text-sm text-gray-500">
          Update the details below to edit the employee.
        </Dialog.Description>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              Position
            </label>
            <Input
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <Input
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-500 text-white">
              Update Employee
            </Button>
          </div>
        </form>
        <Dialog.Close asChild>
          <button className="absolute top-3 right-3">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditEmployeeModal;
