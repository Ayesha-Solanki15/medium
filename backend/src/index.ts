import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// this generic is used in hono because env type is not defined

// limiting the middleware for such routes
app.use("/api/vi/blog/*", async (c, next) => {
  // get the Headers
  // verify the header
  // if the header is valid, we can proceed
  // if not, we return the user with 403 status code
  const header = c.req.header("authorization")?.split(" ")[1];
  if (!header) {
    c.status(403);
    return c.json({ msg: "Invalid token" });
  }
  // can replace the syntax with
  // const header = c.req.header("authorization") || ""
  const response = await verify(header, c.env.JWT_SECRET);
  if (response.id) {
    await next();
  } else {
    c.status(403);
    return c.json({ msg: "unauthorized" });
  }
});

app.post("/api/v1/user/signup", async (c) => {
  // we should use prisma client inside the handler because the route can be deployed in different workers so we need to create a new instance of prisma client for each request
  //hono provides the env through this context variable
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
    if (!newUser) {
      c.status(400);
      return c.json({ msg: "User already exists" });
    }
    return c.json({ msg: "user created successfully" });
  } catch (e) {
    return c.json({ msg: "error while signing up" });
  }
});

app.post("/api/v1/user/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!existingUser) {
      c.status(403); //unauthorized
      return c.json({ msg: "Invalid user" });
    }
    const token = await sign({ id: existingUser.id }, c.env.JWT_SECRET);
    c.res.headers.set("Authorization", `Bearer ${token}`);
    return c.json({ msg: "user signed in successfully" });
  } catch (e) {
    return c.json({ msg: "error while signing in" });
  }
});

app.post("/api/v1/blog", (c) => {
  return c.json({ msg: "Hello World" });
});

app.put("/api/v1/blog", (c) => {
  return c.json({ msg: "Hello World" });
});

app.get("/api/v1/blog/:id", (c) => {
  return c.json({ msg: "Hello World" });
});

export default app;
