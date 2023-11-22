import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/auth', () => {
    return HttpResponse.json({
      products: {
        id: 1,
        title: 'iPhone 9',
        description: 'An apple mobile which is nothing like apple',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Apple',
        category: 'smartphones',
        thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        images: [
          'https://i.dummyjson.com/data/products/1/1.jpg',
          'https://i.dummyjson.com/data/products/1/2.jpg',
          'https://i.dummyjson.com/data/products/1/3.jpg',
          'https://i.dummyjson.com/data/products/1/4.jpg',
          'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        ],
      },
    });
  }),
];

// const mockResponse = {
//   data: {
//     results: {
//       name: 'Sand Crawler',
//       model: 'Digger Crawler',
//       manufacturer: 'Corellia Mining Corporation',
//       cost_in_credits: '150000',
//       length: '36.8 ',
//       max_atmosphering_speed: '30',
//       crew: '46',
//       passengers: '30',
//       cargo_capacity: '50000',
//       consumables: '2 months',
//       vehicle_class: 'wheeled',
//       pilots: [],
//       films: [
//         'https://swapi.dev/api/films/1/',
//         'https://swapi.dev/api/films/5/',
//       ],
//       created: '2014-12-10T15:36:25.724000Z',
//       edited: '2014-12-20T21:30:21.661000Z',
//       url: 'https://swapi.dev/api/vehicles/4/',
//     },
//   },
// };

// export default {
//   get: jest.fn().mockResolvedValue(mockResponse),
// };
