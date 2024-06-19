export default async function DynamicData() {
  const artificialTimeouts = [1000, 3000, 4000, 6000, 8000, 10000];
  const timeout =
    artificialTimeouts[Math.floor(Math.random() * artificialTimeouts.length)];

  const data = await fetch(
    `http://localhost:3000/slow-api?timeout=${timeout}`,
    {
      cache: "no-store",
    }
  ).then((res) => res.text());

  return <p>{data}</p>;
}
