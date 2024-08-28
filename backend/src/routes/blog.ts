import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { HTTPException } from 'hono/http-exception';
import { verify } from 'hono/jwt';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: number; // change this
    }
}>();

blogRouter.use(async (c, next) => {
    const authHeader = c.req.header('Authorization')?.split(' ')[1];
    if(!authHeader){
        return c.json({message: 'Not Authorised'}, 401)
    }

    const user = await verify(authHeader, c.env.JWT_SECRET);
    if(!user){
        return c.json({message: 'Not Authorised'}, 401);
    }
    c.set('userId', Number(user.id));
    await next();
});

//create a blog
blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,}).$extends(withAccelerate());
    const { title, content } = await c.req.json();

    try {
        const blog = await prisma.blog.create({
            data: {
                title,
                content,
                authorId: c.get('userId')
            }
        });
        return c.json({blog});
    } catch (error) {
        return c.json({message: "Error creating blog"}, 422)
    }
    
});

//edit a blog
blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,}).$extends(withAccelerate());
    const body = await c.req.json();
    try {
        const updatedBlog = await prisma.blog.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        });
        return c.json({message: "blog updated", blog: updatedBlog});
    } catch (error) {
        throw new HTTPException(404, { message: 'Blog not found', cause: error })
    }
});

// bulk blog
// TODO: add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,}).$extends(withAccelerate());
    try {
        const blogs = await prisma.blog.findMany({
            orderBy: { id: 'desc'}
        });
        return c.json({blogs})
    } catch (error) {
        throw new HTTPException(500, { message: 'Error retrieving blogs', cause: error });
    }
});

// get particular blog
blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,}).$extends(withAccelerate());
    const id = c.req.param('id');
    try {
        const blog = await prisma.blog.findUnique({
            where: { id: Number(id) }
        });
        if (!blog) {
            return c.json({ message: 'Blog not found' }, 404);
        }
        return c.json({blog});
    } catch (error) {
        throw new HTTPException(500, { message: 'Error retrieving blog', cause: error });
    }
});

