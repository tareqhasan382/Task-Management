"use client";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import CreateCard from "./CreateCard";
import useCardStore from "@/store/useCardStore";
import CardItem from "./CardItem";

const Section = ({ list }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cardList, setDragTask } = useCardStore();
  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const cards = cardList.filter((card) => card.order === list.order);

  return (
    <div className="w-full rounded lg:p-2 mb-6 relative">
      <div className="bg-slate-300 rounded lg:p-2 p-1 ">
        <div className=" flex items-center justify-between mb-2">
          <div className="w-full bg-white rounded flex items-center justify-between p-2 ">
            <h1 className="font-semibold  ">{list.name}</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex cursor-pointer size-8 text-center"
            >
              <Plus
                className="w-full h-full hover:bg-slate-200 duration-300 p-1 rounded-full"
                size={20}
              />
            </button>
          </div>
          <CreateCard
            list={list}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </div>
        <div className=" w-full">
          {cards.map((card) => (
            <div
              key={card._id}
              className="bg-white my-2 rounded shadow w-full p-2 "
              draggable
              onDragStart={() => {
                setDragTask(card._id);
              }}
            >
              <CardItem item={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section;

// const filteredCards = cardList
//   .flatMap((cardsWrapper) => cardsWrapper.taskCards)
//   .filter((card) => card.order === list.order);
