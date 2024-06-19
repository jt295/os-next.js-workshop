export default async function Home() {
  const foo = await fetch(process.env.BASE_API_URL + "/").then((res) =>
    res.text()
  );

  return (
    <main className="p-8 container mx-auto">
      <h1>This is a test!</h1>
      <p className="bg-black text-white p-4 rounded drop-shadow my-4">
        This is some text that we have styled
      </p>
      {foo}
    </main>
  );
}
