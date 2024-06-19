import { Post } from "@/app/posts/[slug]/page";
import Image from "next/image";
import Link from "next/link";

export default function PostCard(post: Post) {
  return (
    <article className="relative flex gap-4 rounded overflow-hidden shadow-lg hover:shadow-xl duration-150 hover:-translate-y-[2px] focus-within:outline">
      {post.image && (
        <Image width={300} height={150} src={post.image} alt={""} />
      )}
      <div className="prose">
        <h2>
          <Link
            className="block focus:outline-none after:absolute after:contents[''] after:left-0 after:bottom-0 after:w-full after:h-full"
            href={`/posts/${post.title.split(" ").join("-")}`}
          >
            {post.title}
          </Link>
        </h2>
        {post.description && <p>{post.description}</p>}
      </div>
    </article>
  );
}
