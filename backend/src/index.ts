import { Hono } from "hono";

import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";

const app = new Hono();

// this generic is used in hono because env type is not defined

app.route("/api/v1/user", userRouter);

app.route("/api/v1/blog", blogRouter);

export default app;
