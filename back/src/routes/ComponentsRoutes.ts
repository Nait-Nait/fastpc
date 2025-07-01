import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { RepoHolder } from '../singletons/RepoHolder';
import { Category } from '../entities/ComponentCategories';
import { CPUComponent, GPUComponent, MotherboardComponent, PSUComponent, RAMComponent, SSDComponent } from '../entities/Component';
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
        const { name, memory, wattage } = request.body as any;

        if (!name || !memory || !wattage) {
            return reply.code(400).send({ status: "error", text: "Faltan parámetros" });
        }

        try {
            const component = new GPUComponent(name, memory, wattage);
            await compoRepo.saveComponents([component], Category.GPU);
            return reply.send({ status: "OK" });
        } catch (error) {
            return reply.code(500).send({ status: "error", text: "Error al guardar GPU" });
        }
    });

    fastify.post("/addcpu", async (request, reply) => {
        const compoRepo = RepoHolder.getInstance();
        const { name, cores, clock, socket, tdp, wattage } = request.body as any;

        if (!name || !cores || !clock || !socket || !tdp || !wattage) {
            return reply.code(400).send({ status: "error", text: "Faltan parámetros" });
        }

        try {
            const component = new CPUComponent(name, cores, clock, socket, tdp, wattage);
            await compoRepo.saveComponents([component], Category.CPU);
            return reply.send({ status: "OK" });
        } catch (error) {
            return reply.code(500).send({ status: "error", text: "Error al guardar CPU" });
        }
    });

    fastify.post("/addram", async (request, reply) => {
        const compoRepo = RepoHolder.getInstance();
        const { name, brand, capacity, gen, speed, wattage } = request.body as any;

        if (!name || !brand || !capacity || !gen || !speed || !wattage) {
            return reply.code(400).send({ status: "error", text: "Faltan parámetros" });
        }

        try {
            const component = new RAMComponent(name, brand, capacity, gen, speed, wattage);
            await compoRepo.saveComponents([component], Category.RAM);
            return reply.send({ status: "OK" });
        } catch (error) {
            return reply.code(500).send({ status: "error", text: "Error al guardar RAM" });
        }
    });

    fastify.post("/addpsu", async (request, reply) => {
        const compoRepo = RepoHolder.getInstance();
        const { name, manufacturer, model, efficiencyRating, noiseRating, wattage } = request.body as any;

        if (!name || !manufacturer || !model || !efficiencyRating || !noiseRating || !wattage) {
            return reply.code(400).send({ status: "error", text: "Faltan parámetros" });
        }

        try {
            const component = new PSUComponent(name, manufacturer, model, efficiencyRating, noiseRating, wattage);
            await compoRepo.saveComponents([component], Category.PSU);
            return reply.send({ status: "OK" });
        } catch (error) {
            return reply.code(500).send({ status: "error", text: "Error al guardar PSU" });
        }
    });

    fastify.post("/addmotherboard", async (request, reply) => {
        const compoRepo = RepoHolder.getInstance();
        const { name, year, socket, chipset, formFactor, powerConsumption, memorySupport, pcieSupport } = request.body as any;

        if (!name || year === undefined || !socket || !chipset || !formFactor || !powerConsumption || !memorySupport || !pcieSupport) {
            return reply.code(400).send({ status: "error", text: "Faltan parámetros" });
        }

        try {
            const component = new MotherboardComponent(name, Number(year), socket, chipset, formFactor, powerConsumption, memorySupport, pcieSupport);
            await compoRepo.saveComponents([component], Category.MOTHERBOARD);
            return reply.send({ status: "OK" });
        } catch (error) {
            return reply.code(500).send({ status: "error", text: "Error al guardar Motherboard" });
        }
    });

    fastify.post("/addssd", async (request, reply) => {
        const compoRepo = RepoHolder.getInstance();
        const { name, capacity, format, interface: iface, released, controller, dram, wattage } = request.body as any;

        if (!name || !capacity || !format || !iface || !released || !controller || !dram || !wattage) {
            return reply.code(400).send({ status: "error", text: "Faltan parámetros" });
        }

        try {
            const component = new SSDComponent(name, capacity, format, iface, released, controller, dram, wattage);
            await compoRepo.saveComponents([component], Category.SSD);
            return reply.send({ status: "OK" });
        } catch (error) {
            return reply.code(500).send({ status: "error", text: "Error al guardar SSD" });
        }
    });


}

export default componentsRoutes;
