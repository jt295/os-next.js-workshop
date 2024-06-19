# os-next.js-workshop

This repo includes a set of tasks, to be completed sequentially.

The main branch is the starting point, if needed, there is a branch for each step, where the step is completed for reference.

## Background

This repo was bootstrapped with the `npx create-next-app@latest` command.

It is in [Typescript](https://www.typescriptlang.org/), using the [App router](https://nextjs.org/docs) and includes [Tailwind CSS](https://tailwindcss.com/).

### Next.js File system routing paradigms

## Tasks

There is a supporting docs markdown file explaining the API routes available for the mock CMS.

### 1. The base page.tsx

Start local dev with `npm run dev` go to localhost:3000 and update the page.tsx file in the /app folder. This is the React component for the home page.

Make a change to the page, press save, and confirm your change renders as expected!

### 2. Fetching data from the CMS API

Make a fetch request to the base route of the API, save the response as a variable in the component, display that value on the page!

Because, by default, in the new model every React component is a server component, you can safely make sensitive calls to APIs before the return statement. These will be completed on the server (either at build time or request time) and the values fetched will be included in the initial response to the user.

But what if we we have a very slow request? We will see later how to work around that with suspense boundaries.

## 3. Creating our homepage

Make a fetch request to API/home, this will return a JSON object for a home page.

Destructure this reponse and use it to render some content to the page.

If you're feeling fancy, add some styling too!

## 4. Posts - rendering dynamic content/routes

The Mock CMS has a database of posts. How to fetch these posts is detailed in the docs.md.

### 4a. Dynamic routes

Render a post by slug

Next.js has file based routing, this means that if you make a folder 'posts' in the app folder, and add a page.tsx file to it, that component will render when you visit the /posts route of the application.

This will be our landing page to find all posts, but how do we show a particular post?

This is where [dynamic routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes) come in.

Place a folder, inside the 'posts' folder, called [slug], and inside this add a page.tsx file.

This component will render when we visit /posts/some-valid-slug.

The component will receive the slug as a param, and we can use this to fetch the correct content from the CMS.

```tsx
export default async function Post({ params }: { params: { slug: string } }) {
// Use params.slug for some fetch request

return (
    <>
    {/** Some React component **/}
    </>
)};
```

### 4b. The posts page - render a list of links to each post

Now we can see particular posts, but how do we get to them?

In the page.tsx file inside the 'posts' folder, fetch all of the posts and map over them to create a link to each post.

## 5. Static generation

Right now we are server rendering each of the posts at request time.

This is perfect for truly dynamic content (like user data), but for more static content, we could create these particular pages ahead of time, and then serve the pre-genenerated page. This would be far more performant.

In Next.js, we can use the [generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) function, to pre-fetch all of the possible slugs for our posts, and render (using those slugs) each page.

Before trying this, build and run the application with: ```npm run build; npm run start;``` so you can see the before and after.

You will need to re-run this command after adding the generate static params function is added.

## 6. A Todo list, interactive elements

There is a TODO api included in the mock CMS, detailed in the doc.md, which supports full CRUD operation. Let's implement a UI to interface with this!

### 6a. Render the Todos

Create a /todos route in the app directory, and render all of the todos

### 6b. Add toggle functionality

### 6c. Add create functionality

### 6d. Add delete functionality

### 6e. Optimistic updates, Why and how?

## 7. Creating an API route

## 8. Using suspense to stream in content from slower APIs

## 9. Deploying Next.js as a hybrid Azure static web app

## 10. Direct integration with a database
