const apiGetProducts = (searchName) => {
  return axios({
    url: `https://62fdf0cb41165d66bfb4b14f.mockapi.io/Products`,
    method: "GET",
    params: {
      name: searchName,
    },
  });
};

const apiAddProducts = (product) => {
  return axios({
    url: `https://62fdf0cb41165d66bfb4b14f.mockapi.io/Products`,
    method: "POST",
    data: product,
  });
};

const apiDeleteProduct = (id) => {
  return axios({
    url: `https://62fdf0cb41165d66bfb4b14f.mockapi.io/Products/${id}`,
    method: "DELETE",
  });
};

const apiGetProductById = (id) => {
  return axios({
    url: `https://62fdf0cb41165d66bfb4b14f.mockapi.io/Products/${id}`,
    method: "GET",
  });
};

const apiUpdateProduct = (id, product) => {
  return axios({
    url: `https://62fdf0cb41165d66bfb4b14f.mockapi.io/Products/${id}`,
    method: "PUT",
    data: product,
  });
};
