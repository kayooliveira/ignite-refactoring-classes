import React from 'react'
import {  useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';
import { IFood } from '../../@types/food';

interface FoodProps {
  food: IFood
  handleDelete(id: number): Promise<void>
  handleEditFood(food:IFood): void
}

export function Food({food, handleDelete, handleEditFood}:FoodProps) {
    const [ isAvailable,setIsAvailable] = useState<boolean>(false)

  async function toggleAvailable(): Promise<void>{
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable
    })

    setIsAvailable(!isAvailable)
  }

  function setEditingFood(): void{
    handleEditFood(food)
  }

  function handleDeleteFood() {
    handleDelete(food.id)
  }

  return (
      <Container available={isAvailable}>
        <header>
          <img src={food.image} alt={food.name} />
        </header>
        <section className="body">
          <h2>{food.name}</h2>
          <p>{food.description}</p>
          <p className="price">
            R$ <b>{food.price}</b>
          </p>
        </section>
        <section className="footer">
          <div className="icon-container">
            <button
              type="button"
              className="icon"
              onClick={setEditingFood}
              data-testid={`edit-food-${food.id}`}
            >
              <FiEdit3 size={20} />
            </button>

            <button
              type="button"
              className="icon"
              onClick={handleDeleteFood}
              data-testid={`remove-food-${food.id}`}
            >
              <FiTrash size={20} />
            </button>
          </div>

          <div className="availability-container">
            <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

            <label htmlFor={`available-switch-${food.id}`} className="switch">
              <input
                id={`available-switch-${food.id}`}
                type="checkbox"
                checked={isAvailable}
                onChange={toggleAvailable}
                data-testid={`change-status-food-${food.id}`}
              />
              <span className="slider" />
            </label>
          </div>
        </section>
      </Container>
  )


}