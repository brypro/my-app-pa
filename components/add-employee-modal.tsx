import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import pb from '@/lib/pocketbase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AddEmployeeModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [workSchedule, setWorkSchedule] = useState('');
  const [workDays, setWorkDays] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmployee = {
      name,
      position,
      department,
      workSchedule,
      workDays: workDays.split(',').map(day => day.trim()),
    };
    await pb.collection('employees').create(newEmployee);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
        <Dialog.Title className="text-lg font-medium">Add Employee</Dialog.Title>
        <Dialog.Description className="mt-2 mb-4 text-sm text-gray-500">
          Fill in the details below to add a new employee.
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
          <div className="mb-4">
            <label htmlFor="workSchedule" className="block text-sm font-medium text-gray-700">
              Work Schedule
            </label>
            <Input
              id="workSchedule"
              value={workSchedule}
              onChange={(e) => setWorkSchedule(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="workDays" className="block text-sm font-medium text-gray-700">
              Work Days
            </label>
            <Input
              id="workDays"
              value={workDays}
              onChange={(e) => setWorkDays(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-500 text-white">
              Add Employee
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

export default AddEmployeeModal;
