import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@aishasolanki/medium-zod-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  // we should use prisma client inside the handler because the route can be deployed in different workers so we need to create a new instance of prisma client for each request
  //hono provides the env through this context variable
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input" });
    }
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
    if (!newUser) {
      c.status(403);
      return c.json({ msg: "User already exists" });
    }
    return c.json({ msg: "user created successfully" });
  } catch (e) {
    console.log(e);
    return c.json({ msg: "error while signing up" });
  }
});

userRouter.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input" });
    }
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
    return c.json({ msg: "user signed in successfully", jwt: token });
  } catch (e) {
    return c.json({ msg: "error while signing in" });
  }
});
