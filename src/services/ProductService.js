import axios from "axios";

export const getAllProduct = async () =>  {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`);
    return res.data;
};

export const createProduct = async (data) =>  {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data);
    return res.data;
};

export const getDetailsProduct = async (id) =>  {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details/${id}`);
    return res.data;
};

export const updateProduct = async (id, data) =>  {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data);
    return res.data;
};

export const deleteProduct = async (id) =>  {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/product/delete-product/${id}`);
    return res.data;
};


