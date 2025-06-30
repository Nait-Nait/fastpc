import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { RepoHolder } from '../singletons/RepoHolder';
import { Category } from '../entities/ComponentCategories';
import { CPUComponent, GPUComponent } from '../entities/Component';
import { ScrapedComponent } from '../entities/ScrapedComponent';


async function componentsRoutes(fastify: FastifyInstance, opts: FastifyPluginOptions) {

    fastify.get("/list", async (request, reply) => {
        const compoRepo = RepoHolder.getInstance();
        const category = (request.query as any).category
        const page = (request.query as any).page ?? 0
        if (!category) {
            reply.send({ status: "bruh", text: "Especifica una categoria" })
        }

        const validCategories = Object.values(Category)

        if (Object.values(Category).includes(category)) {
            const results = await compoRepo.getSavedComponents(category, page)
            console.log(results)

            const scrapedResults: ScrapedComponent[] = []
            for (const value of results) {
                const scrapedProducts = await compoRepo.scrapeProduct(value);
                scrapedResults.push(new ScrapedComponent(value, scrapedProducts));
            }

            //reply.send(results)
            reply.send({
                totalPages: await compoRepo.getTotalPages(category),
                results: scrapedResults
            })
        } else {
            reply.send({
                status: "bruh",
                text: "Categoría no válida, ej: " + Category.GPU,
            });
        }

    })

    fastify.get("/details", async (request, reply) => {
        const compoRepo = RepoHolder.getInstance();
        const category = (request.query as any).category
        const id = (request.query as any).id
        if (!category || !id) {
            reply.send({ status: "bruh", text: "Especifica una categoria y una id" })
        }

        const validCategories = Object.values(Category)

        if (Object.values(Category).includes(category)) {
            const result = await compoRepo.getComponent(id, category)

            const scrapedResults: ScrapedComponent[] = []
            const scrapedProducts = await compoRepo.scrapeProduct(result);
            scrapedResults.push(new ScrapedComponent(result, scrapedProducts));

            //reply.send(results)
            reply.send({
                results: scrapedResults
            })
        } else {
            reply.send({
                status: "bruh",
                text: "Categoría no válida, ej: " + Category.GPU,
            });
        }
    })

    fastify.get("/search", async (request, reply) => {
        const compoRepo = RepoHolder.getInstance();
        const category = (request.query as any).category
        const query = (request.query as any).query
        if (!category || !query) {
            reply.send({ status: "bruh", text: "Especifica una categoria y una query" })
        }

        const validCategories = Object.values(Category)

        if (Object.values(Category).includes(category)) {
            const results = await compoRepo.searchComponents(category, query)

            const scrapedResults: ScrapedComponent[] = []
            for (const value of results) {
                const scrapedProducts = await compoRepo.scrapeProduct(value);
                scrapedResults.push(new ScrapedComponent(value, scrapedProducts));
            }

            //reply.send(results)
            reply.send({
                results: scrapedResults
            })
        } else {
            reply.send({
                status: "bruh",
                text: "Categoría no válida, ej: " + Category.GPU,
            });
        }
    })

    fastify.get("/random", async (request, reply) => {
        const compoRepo = RepoHolder.getInstance();
        const category = (request.query as any).category
        const number = (request.query as any).page ?? 1
        if (!category) {
            reply.send({ status: "bruh", text: "Especifica una categoria" })
        }

        const validCategories = Object.values(Category)

        if (Object.values(Category).includes(category)) {
            const results = await compoRepo.getRandomComponents(category, number)

            const scrapedResults: ScrapedComponent[] = []
            for (const value of results) {
                const scrapedProducts = await compoRepo.scrapeProduct(value);
                scrapedResults.push(new ScrapedComponent(value, scrapedProducts));
            }

            //reply.send(results)
            reply.send(scrapedResults)
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
        try {
            const component = new CPUComponent(name, benchmarkscore, frecuency, cores, threads, socket, tdp, hyperthreading);
            await compoRepo.saveComponents([component], Category.CPU);

            reply.send({ status: "OK" })
        }catch(e) {
            reply.send({status:"nook"})
        }


    })
}

export default componentsRoutes;
