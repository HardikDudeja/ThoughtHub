import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { HTTPException } from 'hono/http-exception';
import { sign } from 'hono/jwt'



const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
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
   const user =  await prisma.user.create({
      data: {
        email,
        name,
        password
      }
    });
    const secret = c.env.JWT_SECRET;
    const token = await sign({id: user.id}, secret);
    return c.json({user: user, token: token});
  } catch (error) {
    throw new HTTPException(401, { message: 'user creation failed', cause: error })
  }
});

// sign in route
app.post('api/v1/user/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,}).$extends(withAccelerate());
  const {email, password} = await c.req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if(!user){
      return c.json({message: 'user not found'}, 404)
    }
    if(password != user.password){
      return c.json({ message: "wrong credentials" }, 403);
    }
    const token = await sign({id: user?.id}, c.env.JWT_SECRET)
    return c.json({token: token, message: "signed in"});
  });

//blog
app.post('api/v1/blog', (c) => c.text('blog'));

//put blog / edit
app.post('api/v1/blog', (c) => c.text('put blog'));

// get particular blog
app.get('api/v1/blog', (c) => c.text('getting a blog'));

// bulk blog
app.get('api/v1/blog/bulk', (c) => c.text('getting bulk blog'));


export default app
