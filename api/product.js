/*
 * @Date: 2022-04-22 13:24:28
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-04-24 11:06:25
 * @FilePath: /my-first-app/api/product.js
 */
import * as dayjs from 'dayjs';

const website = 'https://makemesurprise.com';
// const website = 'https://www.getphotoblanket.com';

export const getList = ({ page = 1, pageSize = 20 }) => {
  const url = website + `/products.json?page=${page}&limit=${pageSize}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.products)
}

export const getDetails = (handle) => {
  const url = website + '/products.json?page=1&limit=250';
  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.products.find(item => item.handle === handle));
}

export const getSaleList = async () => {
  const list = await getList({ page: 1, pageSize: 250 });
  const products = list.sort((a, b) => {
    return dayjs(b.updated_at).unix() - dayjs(a.updated_at).unix();
  }).map(item => {
    return {
      title: item.title,
      image: item.images[0].src,
      created_at: dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss'),
      published_at: dayjs(item.published_at).format('YYYY-MM-DD HH:mm:ss'),
      updated_at: dayjs(item.updated_at).format('YYYY-MM-DD HH:mm:ss'),
      variants: item.variants.map(i => {
        return {
          created_at: dayjs(i.created_at).format('YYYY-MM-DD HH:mm:ss'),
          published_at: dayjs(i.published_at).format('YYYY-MM-DD HH:mm:ss'),
          updated_at: dayjs(i.updated_at).format('YYYY-MM-DD HH:mm:ss'),
        }
      })
    }
  })
  return Promise.resolve(products.slice(0, 10));
}
