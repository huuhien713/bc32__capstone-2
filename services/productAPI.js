// ========================== PRODUCTS ==========================

function apiGetProducts(searchName) {
    return axios({
        url : 'https://62fdf0cb41165d66bfb4b14f.mockapi.io/Products',
        method : 'GET',
        params : {
            name : searchName,
        }
    })
}
function apiGetProductID(id) {
    return axios({
        url : `https://62fdf0cb41165d66bfb4b14f.mockapi.io/Products/${id}`,
        method : 'GET',
    })
}
