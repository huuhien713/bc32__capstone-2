// ========================== STORE ==========================

function apiGetStore() {
    return axios({
        url : 'https://62fdf0cb41165d66bfb4b14f.mockapi.io/Store',
        method : 'GET',
    })
}

function apiUpdateStoreID(id) {
    return axios({
        url : `https://62fdf0cb41165d66bfb4b14f.mockapi.io/Store/${id}`,
        method: 'GET'
    })
}

function apiUpdateStore(id, store) {
    return axios({
        url : `https://62fdf0cb41165d66bfb4b14f.mockapi.io/Store/${id}`,
        method : 'PUT',
        data: store,
    })
}

function apiAddStore(store) {
    return axios({
        url : 'https://62fdf0cb41165d66bfb4b14f.mockapi.io/Store',
        method : 'POST',
        data : store,
    })
}

function apiDelStore(id) {
    return axios({
        url : `https://62fdf0cb41165d66bfb4b14f.mockapi.io/Store/${id}`,
        method : 'DELETE',
    })
}

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
