import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signInInput, signUpInput } from "@player9/common-blog";
import { sign, verify } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = signUpInput.safeParse(body);

    if (!success) {
      c.status(411);
      return c.json({
        error: "Invalid Inputs",
      });
    }

    const { name, email, password } = body;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      jwt,
    });
  } catch (error) {
    c.status(400);
    return c.json({
      error: "Error while signing up",
    });
  }
});

userRouter.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = signInInput.safeParse(body);

    if (!success) {
      c.status(411);
      return c.json({
        error: "Invalid Inputs",
      });
    }

    const { email, password } = body;

    const user = await prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        error: "Incorrect email or password",
      });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ jwt });
  } catch (error) {
    c.status(400);
    return c.json({ error: "Error while signing in" });
  }
});

userRouter.get("/userinfo", async (c) => {
  try {
    const header = c.req.header("Authorization");

    if (!header || !header.startsWith("Bearer ")) {
      c.status(401);
      return c.json({
        error: "Unauthorized",
      });
    }

    const token = header.split(" ")[1];

    const response = await verify(token, c.env.JWT_SECRET);

    if (!response.id) {
      c.status(401);
      return c.json({
        error: "Unauthorized",
      });
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findUnique({
      where: {
        id: response.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return c.json({ user });
  } catch (error) {
    c.status(400);
    return c.json({ error: "Error while fetching user" });
  }
});
