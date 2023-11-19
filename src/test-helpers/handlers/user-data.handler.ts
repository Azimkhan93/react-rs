import { http, HttpResponse } from 'msw';
import { userListData } from '../mock/user-data';

export const userListHandler = http.get(
  'https://dummyjson.com/products/',
  async ({ request, params }) => {
    console.log(params);
    const url = new URL(request.url);
    const page = url.searchParams.get('limit') || 1;
    const search = url.searchParams.get('search');
    const foundResults = search
      ? userListData.filter((data) => data.title === search)
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
  'https://dummyjson.com/products/:id',
  async ({ params }) => {
    if (params.id) {
      return HttpResponse.json(
        userListData.find((user) => user.id === Number(params.id))
      );
    }
  }
);
