// components/TodoList.js
import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, onEdit, onDelete }) => {
  return (
    <div className="min-h-[400px] max-h-[400px] border overflow-y-auto">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TodoList;
