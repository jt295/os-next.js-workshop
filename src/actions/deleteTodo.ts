"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";

const schema = z.object({
  todoId: z.string(),
});

export async function deleteTodo(formData: FormData) {
  const validatedFields = schema.safeParse({
    todoId: formData.get("todoId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(
    process.env.BASE_API_URL + "/todos/" + validatedFields.data.todoId,
    {
      method: "DELETE",
    }
  ).then((res) => res.json());

  revalidateTag("todos");

  return res;
}
