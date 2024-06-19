"use client";
import { Todo } from "@/app/todo-list/page";

export default function TodoCard({ todo }: { todo: Todo }) {
  return (
    <li className="w-full flex overflow-hidden justify-between border shadow bg-white rounded-xl ">
      {todo.todo}: is completed: {todo.isCompleted.toString()}
    </li>
  );
}
