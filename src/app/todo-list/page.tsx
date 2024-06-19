import TodoCard from "@/components/todoCard";

export type Todo = {
  id: number;
  todo: string;
  isCompleted: boolean;
  created_at: string; // iso string for date
};

export default async function Page() {
  const todos: Todo[] = await fetch(process.env.BASE_API_URL + "/todos", {
    cache: "default",
    next: { tags: ["todos"] },
  }).then((res) => res.json());

  return (
    <main className="p-8 container mx-auto">
      <h1>Todo list</h1>
      <ul className="flex flex-col gap-2 mb-8">
        {todos?.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </ul>
    </main>
  );
}
