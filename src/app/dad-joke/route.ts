import { revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";

async function getJoke(): Promise<string> {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: { Accept: "text/plain" },
    cache: "no-store",
  });
  return response.text();
}

export async function GET(request: Request) {
  const promises = Array.from({ length: 4 }, getJoke);

  const results = await Promise.allSettled(promises);

  const jokes = results.map((result) =>
    result.status === "fulfilled" ? result.value : "Failed to fetch joke"
  );

  //   https://nextjs.org/docs/app/api-reference/functions/revalidateTag
  revalidateTag("todos");

  return new Response(JSON.stringify({ jokes }), {
    status: 200,
  });
}
