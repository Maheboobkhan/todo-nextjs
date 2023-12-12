"use client";
import { useState, useEffect } from "react";
import TodoList from "./TodoList";

import { db } from "@/app/FirebaseConfig";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

const TodoPage = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null);

  useEffect(() => {
    // Fetch todos from Firestore on component mount
    const fetchTodos = async () => {
      const todoCollection = collection(db, "todos");
      const todoSnapshot = await getDocs(todoCollection);
      const todosData = todoSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todosData);
    };

    fetchTodos();
  }, []); // Empty dependency array to run the effect only once on mount

  const handleAddTodo = async () => {
    if (newTodo.trim() !== "") {
      if (editTodoId !== null) {
        // If editing an existing todo
        const todoDocRef = doc(db, "todos", editTodoId);
        await updateDoc(todoDocRef, { text: newTodo });
        const updatedTodos = todos.map((todo) =>
          todo.id === editTodoId ? { ...todo, text: newTodo } : todo
        );
        setTodos(updatedTodos);
        setEditTodoId(null);
      } else {
        // If adding a new todo
        const todoDocRef = await addDoc(collection(db, "todos"), {
          text: newTodo,
        });
        setTodos([...todos, { id: todoDocRef.id, text: newTodo }]);
      }

      setNewTodo("");
    }
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setNewTodo(todoToEdit.text);
    setEditTodoId(id);
  };

  const handleDeleteTodo = async (id) => {
    // Delete todo from Firestore
    const todoDocRef = doc(db, "todos", id);
    await deleteDoc(todoDocRef);

    // Update state
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-1 p-2 mr-2 border"
          placeholder="Enter your todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={handleAddTodo}
        >
          {editTodoId !== null ? "Edit Todo" : "Add Todo"}
        </button>
      </div>

      {todos.length === 0 ? (
        <p className="text-gray-500">No items found</p>
      ) : (
        <TodoList
          todos={todos}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
        />
      )}
    </div>
  );
};

export default TodoPage;
