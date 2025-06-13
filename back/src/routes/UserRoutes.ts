import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { UserRepoHolder } from '../singletons/UserRepoHolder';



async function userRoutes(fastify: FastifyInstance, opts: FastifyPluginOptions) {
    

    fastify.post("/register", async (request, reply) => {
        const userRepo = UserRepoHolder.getInstance();

        const { email, password } = request.body as { email: string; password: string };
        const token = await userRepo.createUser(email, password)
        reply.send({ status: "ok", token: token })
    })

    fastify.post("/login", async (request, reply) => {
        const userRepo = UserRepoHolder.getInstance();

        const { email, password } = request.body as { email: string; password: string };
        const token = await userRepo.login(email, password)

        reply.send({ status: "ok", token: token })
    })

    
}

export default userRoutes;
