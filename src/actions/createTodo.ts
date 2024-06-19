"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";

const schema = z.object({
  todo: z.string(),
});

export async function createTodo(formData: FormData) {
  const validatedFields = schema.safeParse({
    todo: formData.get("todo"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(process.env.BASE_API_URL + "/todos", {
    method: "POST",
    body: JSON.stringify({
      todo: validatedFields.data.todo,
    }),
  }).then((res) => res.json());

  revalidateTag("todos");

  return res;
}
