import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { HTTPException } from 'hono/http-exception';
import { sign } from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

blogRouter.use('/*', async (c, next) => {
    await next();
});

//blog
blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,}).$extends(withAccelerate());
    const { title, content } = await c.req.json();

    try {
        const blog = await prisma.blog.create({
            data: {
                title,
                content,
                authorId: 1
            }
        });
        return c.json({blog});
    } catch (error) {
        return c.json({message: "Error creating blog"}, 422)
    }
    
});

//put blog / edit
blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,}).$extends(withAccelerate());
    const body = await c.req.json();
    try {
        const updatedBlog = await prisma.blog.update({
            where: {
                id: 1
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

// get particular blog
blogRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,}).$extends(withAccelerate());
    const body = await c.req.json();
    try {
        const blog = await prisma.blog.findUnique({
            where: { id: body.id }
        });
        if (!blog) {
            return c.json({ message: 'Blog not found' }, 404);
        }
        return c.json({blog});
    } catch (error) {
        throw new HTTPException(500, { message: 'Error retrieving blog', cause: error });
    }
});

// bulk blog
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