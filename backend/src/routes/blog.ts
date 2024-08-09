import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";
import {
  createBlogInput,
  updatedBlogInput,
} from "@aishasolanki/medium-zod-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// limiting the middleware for such routes
blogRouter.use("/*", async (c, next) => {
  // get the Headers
  // verify the header
  // if the header is valid, we can proceed
  // if not, we return the user with 403 status code
  const authHeader = c.req.header("authorization")?.split(" ")[1];
  if (!authHeader) {
    c.status(411);
    return c.json({ msg: "Invalid token" });
  }
  // can replace the syntax with
  // const header = c.req.header("authorization") || ""
  const { id } = await verify(authHeader, c.env.JWT_SECRET);
  if (id) {
    c.set("userId", String(id));
    await next();
  } else {
    c.status(403);
    return c.json({ msg: "unauthorized" });
  }
});

blogRouter.post("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input" });
    }
    const userId = c.get("userId");
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    if (!post) {
      c.status(403);
      return c.json({
        msg: "error while creating post",
      });
    }
    return c.json({
      msg: "post created successfully",
      postId: post.id,
    });
  } catch (e) {
    c.status(403);
    return c.json({
      msg: "error occurred",
    });
  }
});

blogRouter.put("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = updatedBlogInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input" });
    }
    const userId = c.get("userId");
    const post = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    if (!post) {
      c.status(403);
      return c.json({ msg: "invalid id" });
    }
    return c.json({ msg: "post updated successfully" });
  } catch (e) {
    c.status(500);
    return c.json({ msg: "Error while updating post" });
  }
});

blogRouter.get("/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { id } = c.req.param();
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!post) {
      c.status(404);
      return c.json({
        msg: "post not found",
      });
    }
    return c.json({
      post,
    });
  } catch (e) {
    c.status(403);
    return c.json({
      msg: "invalid post id",
    });
  }
});

// todo: add pagination
blogRouter.get("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!posts) {
      c.status(404);
      return c.json({
        msg: "no posts found",
      });
    }
    return c.json({
      posts: posts,
    });
  } catch (e) {
    c.status(403);
    return c.json({
      msg: "error occurred",
    });
  }
});
