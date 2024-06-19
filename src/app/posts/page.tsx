import PostCard from "@/components/postCard";

type Post = {
  id: number;
  title: string;
  description?: string;
  image?: string;
  content?: string; // HTML;
  author: string;
};

export default async function Posts() {
  const posts: Post[] = await fetch(process.env.BASE_API_URL + "/posts", {
    cache: "default",
    next: { tags: ["posts"] },
  }).then((res) => res.json());

  return (
    <main className="p-8 container mx-auto">
      <div className="prose mb-8">
        <h1>Posts</h1>
      </div>
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard {...post} />
          </li>
        ))}
      </ul>
    </main>
  );
}
