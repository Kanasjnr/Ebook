const getProductList = async (searchTerm) => {
    const api = import.meta.env.VITE_APP_DB_SERVER;

    const response = await fetch(`${api}/product${searchTerm ? `?search=${searchTerm}` : ""}`);

    if (!response.ok){
        throw{message: response.statusText, status: response.status};
    }

    const data = await response.json();
    return data;
}

const getProduct = async (id) => {
    const api = import.meta.env.VITE_APP_DB_SERVER;

    const response = await fetch(`${api}/product/${id}`)

    if (!response.ok){
        throw{
            message: response.statusText, status: response.status
        }
    }
    
    const data = await response.json();
    return data;
}

const getFeaturedList = async () => {
    const api = import.meta.env.VITE_APP_DB_SERVER;

    const response = await fetch(`${api}/product/featured`)

    if (!response.ok){
        throw{
            message: response.statusText, status: response.status
        }
    }

    const data = await response.json();
    return data;
}

const productService = {
    getProductList,
    getProduct,
    getFeaturedList
};

export { getProductList, getProduct, getFeaturedList };
export default productService;