import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { HTTPException } from 'hono/http-exception';



const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  }
}>();

// convert to base path later

// sign up route
app.post('/api/v1/user/signup', async (c) => {
  // add zod validation, hash the password
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,}).$extends(withAccelerate());
  const {email, name, password} = await c.req.json();
  try {
    await prisma.user.create({
      data: {
        email,
        name,
        password
      }
    });
  } catch (error) {
    throw new HTTPException(401, { message: 'user creation failed', cause: error })
  }
  return c.text('User created');
});

// sign in route
app.post('api/v1/user/signin', (c) => c.text('sign in'));

//blog
app.post('api/v1/blog', (c) => c.text('blog'));

//put blog / edit
app.post('api/v1/blog', (c) => c.text('put blog'));

// get particular blog
app.get('api/v1/blog', (c) => c.text('getting a blog'));

// bulk blog
app.get('api/v1/blog/bulk', (c) => c.text('getting bulk blog'));


export default app
