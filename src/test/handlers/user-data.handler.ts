import { http, HttpResponse } from 'msw';
import { userListData, userDetailData } from '../mock/user-data';

export const userListHandler = http.get(
  'https://swapi.dev/api/vehicles',
  async ({ params }) => {
    console.log(params);
    return HttpResponse.json({
      count: 39,
      results: userListData,
    });
  }
);

export const userDetailHandler = http.get(
  'https://swapi.dev/api/vehicles/:id',
  async ({ params }) => {
    console.log('id = ', params.id);
    if (params.id === '4') {
      return HttpResponse.json(userDetailData);
    }
  }
);
