import Image from "next/image";

type homeRoute = {
  title: string;
  description?: string;
  image?: string;
  listOfSiteFeatures: string[];
  content?: string; // HTML;
};

export default async function Home() {
  const { title, description, image, listOfSiteFeatures, content }: homeRoute =
    await fetch(process.env.BASE_API_URL + "/home").then((res) => res.json());

  return (
    <main className="p-8 container mx-auto">
      <div className="flex flex-col lg:flex-row gap-4 w-fullmax-w-full">
        <div className="prose-xl max-w-full w-full ">
          <h1>{title}</h1>
          <p>{description}</p>
          <p>Image url: {image}</p>
        </div>
        {image && (
          <Image
            priority
            className="h-auto lg:max-w-[50vw] w-full rounded-lg overflow-hidden"
            width={800}
            height={450}
            src={image}
            alt={""}
          />
        )}
      </div>

      <div className="prose-lg mt-8">
        <h2>Site features</h2>
        <ul className="list-disc">
          {listOfSiteFeatures.map((item) => (
            <li key={item.split(" ").join("-")}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="prose-lg mx-auto prose-ul:list-disc">
        {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
      </div>
    </main>
  );
}
