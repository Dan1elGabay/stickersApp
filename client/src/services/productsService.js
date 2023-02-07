import http from './httpService';

const apiUrl = 'http://localhost:5000/api/products';

export const getAllProducts = () => http.get(`${apiUrl}/`);  

export const deleteProduct = (postId) => { 
    console.log(`deleted post with id # ${postId}`);
    http.delete(`${apiUrl}/${postId}`);
}

export const updateProduct = (postId) => { 
    console.log(`Updated post with id # ${postId}`);
    http.put(`${apiUrl}/${postId}`);
}
