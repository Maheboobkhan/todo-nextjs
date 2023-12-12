// components/Todo.js
import React from "react";

const Todo = ({ todo, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-2 border-b bg-[#CCCCFF] mb-[5px]">
      <div className="text-[#595959]">{todo.text}</div>
      <div>
        <button className="mx-1 text-blue-500" onClick={() => onEdit(todo.id)}>
          Edit
        </button>
        <button className="mx-1 text-red-500" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
