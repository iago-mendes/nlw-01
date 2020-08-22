import Knex from 'knex';

export async function seed(knex: Knex)
{
    await knex('points').insert(
    [
        {
            image: 'market.jpg',
            name: 'Coleta 1',
            email: 'contato@1.com',
            whatsapp: '38999999999',
            latitude: -16.7057341,
            longitude: -43.8429957, 
            city: 'Montes Claros',
            uf: 'MG'
        },
        {
            image: 'market.jpg',
            name: 'Coleta 2',
            email: 'contato@2.com',
            whatsapp: '38999999999',
            latitude: -16.7157341,
            longitude: -43.8429957, 
            city: 'Montes Claros',
            uf: 'MG'
        },
        {
            image: 'market.jpg',
            name: 'Coleta 3',
            email: 'contato@3.com',
            whatsapp: '38999999999',
            latitude: -16.7057341,
            longitude: -43.8529957, 
            city: 'Montes Claros',
            uf: 'MG'
        },
        {
            image: 'market.jpg',
            name: 'Coleta 4',
            email: 'contato@4.com',
            whatsapp: '38999999999',
            latitude: -16.7157341,
            longitude: -43.8529957, 
            city: 'Montes Claros',
            uf: 'MG'
        }
    ]);
};