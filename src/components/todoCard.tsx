"use client";

import { deleteTodo } from "@/actions/deleteTodo";
import { toggleTodo } from "@/actions/toggleTodo";
import { updateTodo } from "@/actions/updateTodo";
import { Todo } from "@/app/todo-list/page";
import classnames from "classnames";
import { useRef, useState } from "react";

export default function TodoCard({ todo }: { todo: Todo }) {
  const [isEditMode, setEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function update(formData: FormData) {
    await updateTodo(formData);
  }

  async function toggle(formData: FormData) {
    await toggleTodo(formData);
  }

  return (
    <li className="w-full flex overflow-hidden justify-between border shadow bg-white rounded-xl ">
      <div className="relative flex gap-2 items-center w-full px-4 py-2 g-white duration-75 hover:bg-black/10">
        <form
          className="flex gap-2 b"
          action={toggle}
          id={`toggle-form-${todo.id}`}
        >
          <input
            aria-labelledby={`${todo.id}-label`}
            type="checkbox"
            name="newStatus"
            id={todo.id.toString()}
            checked={Boolean(todo.isCompleted)}
            readOnly
          />
          <input type="text" readOnly hidden value={todo.id} name="todoId" />
          <label
            id={`${todo.id}-label`}
            className={classnames(isEditMode ? "hidden" : "block")}
          >
            {todo.todo}
          </label>
          <button
            className={
              classnames(isEditMode ? "hidden" : "block") +
              " absolute left-0 bottom-0 w-full h-full"
            }
            type="submit"
            aria-label={`Set status of "${todo.todo}" to be ${
              todo.isCompleted ? "incomplete" : "completed"
            }`}
          ></button>
        </form>
        <form
          className="flex"
          action={update}
          id={`update-form-${todo.id}`}
          onSubmit={() => setEditMode(false)}
        >
          <input
            type="text"
            name="todo"
            id={`${todo.id}-edit`}
            className={classnames(isEditMode ? "block" : "hidden")}
            defaultValue={todo.todo}
            ref={inputRef}
          />
          <input type="text" readOnly hidden value={todo.id} name="todoId" />
          <button type="submit"></button>
        </form>
      </div>
      <div className="flex">
        <button
          type="button"
          onClick={() => {
            setEditMode(!isEditMode);
            setTimeout(() => {
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }, 50);
          }}
          className="min-w-12 duration-75 whitespace-nowrap hover:opacity-80 min-h-12 px-2 font-semibold flex items-center text-white bg-orange-500 justify-center"
        >
          {isEditMode ? "Cancel edit" : "Edit"}
        </button>
        <form action={deleteTodo} id={`delete-form-${todo.id}`}>
          <input type="text" readOnly hidden value={todo.id} name="todoId" />
          <button
            type="submit"
            className="min-w-12 duration-75 hover:opacity-80 min-h-12 px-2 font-semibold flex items-center justify-center text-white bg-red-600"
          >
            Delete
          </button>
        </form>
      </div>
    </li>
  );
}
