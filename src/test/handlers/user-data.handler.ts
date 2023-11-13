import { http, HttpResponse } from 'msw';
import { userListData, userDetailData } from '../mock/user-data';

export const userListHandler = http.get(
  'https://swapi.dev/api/vehicles/',
  async ({ request, params }) => {
    console.log(params);
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || 1;
    const search = url.searchParams.get('search');
    const foundResults = search
      ? userListData.filter((data) => data.name === search)
      : userListData;

    const startItem = (Number(page) - 1) * 10;
    const endItem = Number(page) * 10;
    const results = foundResults.slice(startItem, endItem);

    return HttpResponse.json({
      count: userListData.length,
      results,
    });
  }
);

export const userDetailHandler = http.get(
  'https://swapi.dev/api/vehicles/:id',
  async ({ params }) => {
    if (params.id === '4') {
      return HttpResponse.json(userDetailData);
    }
  }
);
