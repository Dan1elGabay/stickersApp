import http from './httpService';

const apiUrl = 'http://localhost:5000/api/products';

export const getAllProducts = () => http.get(`${apiUrl}/`);  

export const deleteProduct = (id) => { 
    console.log(`deleted product with id # ${id}`);
    http.delete(`${apiUrl}/${id}`);
}

export const updateProduct = async (id,data) => { 
    console.log(`Updated product with id # ${id}`);
        const response = await http.patch(`${apiUrl}/${id}`,data);
        return response
}

export const updateAndReplaceProduct = (id) => { 
    console.log(`Updated and replaced product with id # ${id}`);
    http.put(`${apiUrl}/${id}`);
    
}

export const createProduct = (product) => { 
    console.log(`create new product: ${product}`);
    http.post(`${apiUrl}/${product}`);
}
