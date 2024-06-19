# Docs

## Slow API

Included as part of this starter repo is an API route which mimics a real, very slow, API. Where the data returned cannot be cached (for example, if it is user data or something realtime).

It returns the string `You just waited for ${timeout / 1000} seconds`, stating how long it took to return. It accepts a query param for setting how long to wait before sending a response.

To prevent caching of this response, and for showcasing how we can utilise suspense boundaries to asynchronously stream slow components after page load, the DynamicData.tsx component is included in the components folder.

## Mock CMS API

### Background

The mock CMS (content management system) is a small serverless application built on Cloudflare with Hono and D1.

Hono is a webframework, with similarities to Express.js (the node.js server framework).
D1 is a Cloudflare's native serverless database - it is built on SQLite.

In a real CMS API there would be authentication for requests, either with and API key or OAuth credentials. For simplicity this API is completely open, and doesn't require keys.

### API

All routes are built from this base url, shared as part of this workshop.

If you would like to complete this workshop and were not part of the OS technology conference, the API repo is here: <https://github.com/jt295/hono-d1-api>. Feel free to clone and deploy on Cloudflare, or play around locally.

#### Test route

GET /
Returns "Hello from the CMS API"

GET /home
Returns JSON payload, of schema:

```ts
type response = {
    title: string;
    description: string;
    image: string;
    listOfSiteFeatures: string[];
    content: string // HTML
}
```

#### Posts

Available actions:

- POST create a post
- GET all posts
- GET post by slug
- PATCH post by ID
- DELETE post by ID

##### Posts database table definition

```ts
const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").default(""),
  image: text("image"),
  content: text("content").default(""),
  author: text("author"),
});
```

##### Create post

POST/posts/

Expects request body of stringified JSON, of schema:

```ts
    type requestBody = {
        title: string; // Only letters, spaces, and numbers
        description?: string;
        image?: string // Image URL
        content?: string // HTML content
        author?: string;
    }
```

##### Get all posts

GET/posts/

Returns all posts as an array of JSON objects with schema:

```ts
type response = {
  id: number;
  title: string;
  description?: string;
  image?: string;
  content?: string; // HTML;
  author: string;
}[]
```

##### Get post by slug

Get/posts/:slug

The slug is the 'slugified' version of the title, meaning all spaces are replaced by dashes (-).

/posts/:My-first-post

Would fetch a post called "My first post" from the CMS.

Returns the post as a JSON object matching the schema:

```ts
type response = {
  id: number;
  title: string;
  description?: string;
  image?: string;
  content?: string; // HTML;
  author: string;
}
```

##### Update a post

PATCH/posts/:recordId

The recordId is the ID of the post.

Will update the relevant post based on the fields provided in the body.

Expects request body of stringified JSON, of schema:

```ts
type requestBody = {
    title?: string; // Only letters, spaces, and numbers
    description?: string;
    image?: string // Image URL
    content?: string // HTML content
    author?: string;
}
```

##### Delete a post

DELETE/posts/:recordId

The recordId is the ID of the post.

Will delete the post of the matching ID

If successful:

Returns JSON:
{ deletedId: recordId }

If unsuccessful:

Returns string:
`Deletion of record ${recordId} failed`

#### Todos

Available actions:

- POST create a todo
- GET all todos
- PATCH todo by ID
- DELETE todo by ID

##### Todo database table definition

```ts
const todos = sqliteTable("todos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  todo: text("todo").notNull(),
  isCompleted: integer("is_completed", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
});
```

##### Create todo

POST/todos/

Expects request body of stringified JSON, of schema:

```ts
    type requestBody = {
        todo: string;
    }
```

##### Get all todos

GET/todos/

Returns all todos as an array of JSON objects with schema:

```ts
type response = {
  id: number;
  todo: string;
  isCompleted: boolean;
  createdAt?: number;
}[]
```

##### Update a todo

PATCH/todos/:recordId

The recordId is the ID of the post.

Will update the relevant post based on the fields provided in the body.

Expects request body of stringified JSON, of schema:

```ts
type requestBody = {
  todo?: string;
  isCompleted?: boolean;
}
```

##### Delete a todo

DELETE/todos/:recordId

The recordId is the ID of the todo.

Will delete the todo of the matching ID

If successful:

Returns JSON:
{ deletedId: recordId }

If unsuccessful:

Returns string:
`Deletion of record ${recordId} failed`
