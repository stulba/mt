import { capitalizeFirst } from './utils';
import qs from 'query-string';

const url = 'http://localhost:3000';

const Products = {
  url: 'http://localhost:3000/products',

  add(product) {
    fetch(this.url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(res => {
        return res.json();
      })
      .catch(err => console.log(err));
  },

  getAll({ gender = '', category = '', page = 1, limit = 5, search = '' }) {
    let query = `_page=${page}&_limit=${limit}`;

    if (gender && category) {
      const { sort, pricerange } = qs.parse(search);
      gender = capitalizeFirst(gender);
      category = capitalizeFirst(category);

      query = `gender=${gender}&subCategory=${category}&_sort=created_at&_order=desc&_page=${page}&_limit=${limit}`;

      if (sort) {
        if (sort === 'freshness') {
          query = `gender=${gender}&subCategory=${category}&_page=${page}&_limit=${limit}&_sort=created_at&_order=desc`;
        } else if (sort === 'pricedesc') {
          query = `gender=${gender}&subCategory=${category}&_page=${page}&_limit=${limit}&_sort=price&_order=desc`;
        } else if (sort === 'priceasc') {
          query = `gender=${gender}&subCategory=${category}&_page=${page}&_limit=${limit}&_sort=price&_order=asc'`;
        }
      }

      if (pricerange) {
        const [min, max] = pricerange;
        query += `&price_gte=${min}&price_lte=${max}`;
      }
    }

    return fetch(`${url}/products?${query}`)
      .then(res =>
        res.json().then(products => {
          const productsCount = parseInt(res.headers.get('X-Total-Count'));

          return {
            productsCount,
            products
          };
        })
      )
      .catch(err => console.log(err));
  },
  getOne(id) {
    return fetch(`${url}/products/${id}`)
      .then(res => res.json())
      .catch(err => console.log(err));
  }
};

const Users = {
  url: 'http://localhost:3000/users',

  getOne({ email, password }) {
    return fetch(`${url}/users?email=${email}&password=${password}`)
      .then(res => res.json())
      .catch(err => console.log(err));
  },

  addOne(user) {
    return fetch(this.url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res)
      .catch(err => console.log(err));
  }
};

const Categories = {
  getAll() {
    return fetch(`${url}/categories`)
      .then(res => res.json())
      .catch(err => console.log(err));
  }
};

export { Products, Users, Categories };
