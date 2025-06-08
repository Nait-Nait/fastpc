import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { RepoHolder } from '../singletons/RepoHolder';
import { Category } from '../entities/ComponentCategories';
import { DBEntityManager } from '../singletons/DbEntityManager';
import { Component } from '../entities/Component';


async function ProductRoutes(fastify: FastifyInstance, opts: FastifyPluginOptions) {

    fastify.get("/list", async (request, reply) => {
        const compoRepo = RepoHolder.getInstance();
        const category = (request.query as any).category
        const componentId = (request.query as any).componentid
        if (!category || !componentId) {
            reply.send({ status: "bruh", text: "Especifica una categoria y un componentId" })
        }

        const validCategories = Object.values(Category)

        if (Object.values(Category).includes(category)) {
            const results = await compoRepo.getSavedProducts(componentId, category)
            reply.send(results)
        } else {
            reply.send({
                status: "bruh",
                text: "Categoría o componentId no válidos, ej categoria: " + Category.GPU,
            });
        }

    })

    fastify.get("/scrape", async (request, reply) => {
        const category = (request.query as any).category
        const componentId = (request.query as any).componentid
        const compoRepo = RepoHolder.getInstance();
        const dbManager = DBEntityManager.getInstance();
        
        if (!category || !componentId) {
            reply.send({ status: "bruh", text: "Especifica una categoria y un componentId" })
        }

        const validCategories = Object.values(Category)

        if (Object.values(Category).includes(category)) {
            const categoryComp = compoRepo.getComponentCategory(category)

            const dbResult = await dbManager.getRepository(categoryComp as any).findOneBy({id: componentId})

            const results = await compoRepo.scrapeProduct(dbResult as Component)

            reply.send(results)
        } else {
            reply.send({
                status: "bruh",
                text: "Categoría o componentId no válidos, ej categoria: " + Category.GPU,
            });
        }
    })

    fastify.get("/triggerscrape", async (request, reply) => {

    })
}

export default ProductRoutes;