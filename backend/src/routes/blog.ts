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

// blogRouter.use('/*', (c, next) => {
//     next();
// });

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
blogRouter.post('api/v1/blog', (c) => c.text('put blog'));

// get particular blog
blogRouter.get('api/v1/blog', (c) => c.text('getting a blog'));

// bulk blog
blogRouter.get('api/v1/blog/bulk', (c) => c.text('getting bulk blog'));