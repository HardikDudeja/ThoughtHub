import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { HTTPException } from 'hono/http-exception';
import { verify } from 'hono/jwt';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

blogRouter.use(async (c, next) => {
    console.log("in auth middleware");
    const authHeader = c.req.header('Authorization');
    if(!authHeader){
        return c.json({message: 'Not Authorised'}, 401)
    }

    const userId = await verify(authHeader, c.env.JWT_SECRET);
    if(!userId){
        return c.json({message: 'Not Authorised'}, 401);
    }
    c.set('userId', userId.id);
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
                authorId: c.get('userId')
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