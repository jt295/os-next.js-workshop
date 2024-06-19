"use client";

import { toggleTodo } from "@/actions/toggleTodo";
import { Todo } from "@/app/todo-list/page";

export default function TodoCard({ todo }: { todo: Todo }) {
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
          <label id={`${todo.id}-label`}>{todo.todo}</label>
          <button
            className={" absolute left-0 bottom-0 w-full h-full"}
            type="submit"
            aria-label={`Set status of "${todo.todo}" to be ${
              todo.isCompleted ? "incomplete" : "completed"
            }`}
          ></button>
        </form>
      </div>
    </li>
  );
}
