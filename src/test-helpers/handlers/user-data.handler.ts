import { http, HttpResponse } from 'msw';
import { userListData } from '../mock/user-data';

export const userListHandler = http.get(
  'https://dummyjson.com/products/search',
  async ({ request }) => {
    const url = new URL(request.url);
    const skip = url.searchParams.get('skip') || 1;
    const search = url.searchParams.get('q');
    const limit = url.searchParams.get('limit') || 10;
    const foundResults = search
      ? userListData.filter((data) => data.title === search)
      : userListData;
    const endItem = Number(skip) + Number(limit);
    const products = foundResults.slice(Number(skip), endItem);
    return HttpResponse.json({
      count: userListData.length,
      products,
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
