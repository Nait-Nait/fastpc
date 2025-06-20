import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { RepoHolder } from '../singletons/RepoHolder';
import { Category } from '../entities/ComponentCategories';
import { CPUComponent, GPUComponent } from '../entities/Component';


async function componentsRoutes(fastify: FastifyInstance, opts: FastifyPluginOptions) {

    fastify.get("/list", async (request, reply) => {
        const compoRepo = RepoHolder.getInstance();
        const category = (request.query as any).category
        if (!category) {
            reply.send({ status: "bruh", text: "Especifica una categoria" })
        }

        const validCategories = Object.values(Category)

        if (Object.values(Category).includes(category)) {
            const results = await compoRepo.getSavedComponents(category)
            reply.send(results)
        } else {
            reply.send({
                status: "bruh",
                text: "Categoría no válida, ej: " + Category.GPU,
            });
        }

    })

    fastify.post("/addgpu", async (request, reply) => {
        const compoRepo = RepoHolder.getInstance();
        const { name, benchmarkscore, vram } = (request.body as any)
        if (!name || !benchmarkscore || !vram) {
            reply.send({ status: "bruh", text: "Faltan parametros" })
        }

        const component = new GPUComponent(name, benchmarkscore, vram);
        await compoRepo.saveComponents([component], Category.GPU);

        reply.send({ status: "OK" })

    })

    fastify.post("/addcpu", async (request, reply) => {
        const compoRepo = RepoHolder.getInstance();
        const body = request.body;
        console.log(body)
        const { name, benchmarkscore, frecuency, cores, threads, socket, tdp, hyperthreading } = (body as any)

        if (
            name === undefined ||
            benchmarkscore === undefined ||
            frecuency === undefined ||
            cores === undefined ||
            threads === undefined ||
            socket === undefined ||
            tdp === undefined ||
            hyperthreading === undefined
        ) {
            reply.send({ status: "bruh", text: "Faltan parametros" })
        }

        const component = new CPUComponent(name, benchmarkscore, frecuency, cores, threads, socket, tdp, hyperthreading);
        await compoRepo.saveComponents([component], Category.CPU);

        reply.send({ status: "OK" })

    })
}

export default componentsRoutes;
