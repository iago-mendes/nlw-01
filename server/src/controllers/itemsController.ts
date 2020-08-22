import { Request, Response } from 'express';
import knex from '../database/connection';

class itemsController
{
    async index(request: Request, response: Response)
    {
        const items = await knex('items').select('*');

        const serializedItems = items.map(item => 
            {
                return {
                    id: item.id,
                    title: item.title,
                    image_url: `http://10.0.0.103:1712/uploads/${item.image}`
                };
            });

        response.json(serializedItems);
    }
}

export default itemsController;