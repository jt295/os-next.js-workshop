import Image from "next/image";

export type Post = {
  id: number;
  title: string;
  description?: string;
  image?: string;
  content?: string; // HTML;
  author: string;
};

export async function generateStaticParams() {
  const posts: Post[] = await fetch(process.env.BASE_API_URL + "/posts", {
    cache: "default",
    next: { tags: ["posts"] },
  }).then((res) => res.json());

  return posts.map((post) => ({
    slug: post.title.split(" ").join("-"),
  }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  const res: Post[] = await fetch(
    `${process.env.BASE_API_URL}/posts/${params.slug}`,
    { cache: "default", next: { tags: ["posts"] } }
  ).then((res) => res.json());
  const post = res[0];

  return (
    <main className="p-8 container mx-auto">
      <article className="prose mx-auto">
        <h1>{post.title}</h1>
        {post.image && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 650px"
              src={post.image}
              alt={""}
              fill
              priority
            />
          </div>
        )}
        <p>{post.description}</p>
        <p>Post by {post.author}</p>
        {post.content && (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        )}
      </article>
    </main>
  );
}
