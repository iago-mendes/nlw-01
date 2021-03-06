import { Request, Response, response } from 'express';
import knex from '../database/connection';

class pointsController
{
    async index(request: Request, response: Response)
    {
        const { city, uf, items } = request.query;
        const parsedItems = items ? String(items).split(',').map(item => Number(item.trim())) : [];

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');
        
        const serializedPoints = points.map(point =>
        {
            return {
                ...point,
                image_url: `http://10.0.0.103:1712/uploads/point_images/${point.image}`,
            }
        })
        
        return response.json(serializedPoints);
    }

    async show(request: Request, response: Response)
    {
        const { id } = request.query;
        const point = await knex('points').where('id', Number(id)).first(); 

        if(!point)
        {
            return response.status(400).json({ message: 'Point not found!' });
        }

        const serializedPoint =
        {
            ...point,
            image_url: `http://10.0.0.103:1712/uploads/point_images/${point.image}`,
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', Number(id))
            .select('items.title');

        return response.json({ point: serializedPoint, items });
    }

    async create(request: Request, response: Response)
    {
        const trx = await knex.transaction();

        const {name, email, whatsapp, latitude, longitude, city, uf, items} = request.body
        const point = {image: request.file.filename, name, email, whatsapp, latitude, longitude, city, uf}
        const ids = await trx('points').insert(point)

        const point_id = ids[0];
        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) =>
            {
                return {point_id, item_id};
            });

        await trx('point_items').insert(pointItems);

        await trx.commit();

        return({ id: point_id, ...point });
    }
}

export default pointsController;