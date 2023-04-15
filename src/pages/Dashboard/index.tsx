import React, { useEffect, useState } from 'react'
import { Header } from '../../components/Header';
import { Food } from '../../components/Food'
import api from '../../services/api';
import { IFood } from '../../@types/food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

const EDITING_FOOD_INITIAL_STATE: IFood = {
  id: 0,
  name: '',
  description: '',
  price: '',
  available: false,
  image: ''
}

export function Dashboard() {
  const [foods,setFoods] = useState<IFood[]>([])
  const [editingFood, setEditingFood] = useState<IFood>(EDITING_FOOD_INITIAL_STATE)
  const [modalOpen,setModalOpen] = useState<boolean>(false)
  const [editModalOpen,setEditModalOpen] = useState<boolean>(false)
  console.log(modalOpen, editModalOpen)
   async function getFoodsFromApi():Promise<void> {
    const {data} = await api.get('/foods')
    setFoods(data as IFood[])
  }

  useEffect(() => {
    getFoodsFromApi()
    
    return () => {
      setFoods([])
    }
  },[])

  async function handleAddFood(food:IFood):Promise<void> {
    try {
      const {data} = await api.post('/foods', {
        ...food,
        available: true,
      }); 

      const createdFood = data as IFood

      setFoods([...foods,createdFood ]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food:IFood):Promise<void> {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id:number):Promise<void> {
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods.filter(food => food.id !== id);
    setFoods(foodsFiltered);
  }

  function toggleModal():void {
    setModalOpen(!modalOpen)
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen)
  }

  function handleEditFood(food:IFood) {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};
