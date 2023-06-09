import React from 'react'
import { createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { IFood } from '../../@types/food';
import { FormHandles } from '@unform/core';

interface ModalEditFoodProps {
  isOpen: boolean
  setIsOpen(isOpen:boolean): void
  handleUpdateFood(food: IFood): Promise<void>
  editingFood: IFood
}

export function ModalEditFood({ isOpen, setIsOpen, handleUpdateFood, editingFood }: ModalEditFoodProps) {
  const formRef = createRef<FormHandles>()

  function handleSubmit(data:IFood) {
      handleUpdateFood(data)
      setIsOpen(false)
  }

  
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}