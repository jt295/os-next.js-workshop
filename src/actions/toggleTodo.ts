"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";

const schema = z.object({
  todoId: z.string(),
  isCompleted: z.string().optional(),
});

export async function toggleTodo(formData: FormData) {
  const validatedFields = schema.safeParse({
    todoId: formData.get("todoId"),
    isCompleted: formData.get("newStatus") ?? "",
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
        isCompleted: validatedFields.data.isCompleted === "on" ? false : true,
      }),
    }
  ).then((res) => res.json());

  revalidateTag("todos");

  return res;
}
