"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";

const schema = z.object({
  todoId: z.string(),
  todo: z.string(),
});

export async function updateTodo(formData: FormData) {
  const validatedFields = schema.safeParse({
    todoId: formData.get("todoId"),
    todo: formData.get("todo"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(
    process.env.BASE_API_URL + "/todos/" + validatedFields.data.todoId,
    {
      method: "PATCH",
      body: JSON.stringify({
        todo: validatedFields.data.todo,
      }),
    }
  ).then((res) => res.json());

  revalidateTag("todos");

  return res;
}
