import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/auth', () => {
    // Note that you DON'T have to stringify the JSON!
    return HttpResponse.json({
      user: {
        cargo_capacity: '50000',
        consumables: '2 months',
        cost_in_credits: '150000',
        created: '2014-12-10T15:36:25.724000Z',
        crew: '46',
        edited: '2014-12-10T15:36:25.724000Z',
        length: '36.8',
        manufacturer: 'Corellia Mining Corporation',
        max_atmosphering_speed: '30',
        model: 'Digger Crawler',
        name: 'Sand Crawler',
        passengers: '30',
        pilots: [],
        films: ['https://swapi.dev/api/films/1/'],
        url: 'https://swapi.dev/api/vehicles/4/',
        vehicle_class: 'wheeled',
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
