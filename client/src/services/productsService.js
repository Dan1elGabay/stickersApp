import http from "./httpService";

const apiUrl = "http://localhost:5000/api/products";

export const getAllProducts = () => http.get(`${apiUrl}/`);

export const deleteProduct = async (id) => {
  console.log(`deleted product with id # ${id}`);
  const response = await http.delete(`${apiUrl}/${id}`);
  return response;
};

export const updateProduct = async (id, data) => {
  console.log(`Updated product with id # ${id}`);
  const response = await http.patch(`${apiUrl}/${id}`, data);
  return response;
};

export const createProduct = async (product) => {
  const response = await http.post(`${apiUrl}/`,product);
  return response;
};


