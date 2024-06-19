import { URL } from "url";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const useSetTimeout = Number(url.searchParams.get("timeout"));

  const timeout = useSetTimeout || 3000;

  await new Promise((resolve) => setTimeout(resolve, timeout));

  return new Response(`You just waited for ${timeout / 1000} seconds`, {
    status: 200,
  });
}
