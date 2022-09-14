// =========================== Scroll Top ===========================

const header = document.querySelector('.header');
window.addEventListener('scroll', (e) => {
    let scrollTop = window.scrollY;
    if (scrollTop > 250) {
        header.classList.add('sticky')
    } else {
        header.classList.remove('sticky')
    }
})
// ========================== Header Form ==========================

const headerMain = document.querySelector('.header__main');
const headerLogo = document.querySelector('.header__logo');
const headerNav = document.querySelector('.header__navbar');
const headerSearchCart = document.querySelector('.header__search-cart');
const headerForm = document.querySelector('.header__form-search');

const searchIcon = document.querySelector('.header__search');
const xIcon = document.querySelector('.header__form-search span:last-child');

// handle Icon Search Header
searchIcon.addEventListener('click', (e) => {
    headerLogo.classList.add('hide');
    headerNav.classList.add('hide');
    headerSearchCart.classList.add('hide');
    headerMain.style.justifyContent = 'center'
    headerForm.classList.remove('hide');
})

// handle Icon X Search Header
xIcon.addEventListener('click', (e) => {
    headerLogo.classList.remove('hide');
    headerNav.classList.remove('hide');
    headerSearchCart.classList.remove('hide');
    headerMain.style.justifyContent = 'space-between';
    headerForm.classList.add('hide')
})

// handle display Search Header
headerForm.children[1].addEventListener('input', (e) => {
    let stamp = e.target.value;
    getProducts(stamp);
})

// ========================== Header Cart ==========================

const showHideCart = document.querySelector('.cart');

document.querySelector('.header__cart ').addEventListener('click' , (e) => {
    showHideCart.classList.remove('hide');

    let elementType = e.target.getAttribute('data-close');
    if (elementType === 'close') {
        showHideCart.classList.add('hide');
    }
})
// ================================== FOOTER ===================================

const showFooter = document.querySelectorAll('.footer__col ul');

let stamp = document.querySelectorAll('.footer__col div');
for (let i = 0; i < stamp.length; i++) {
    stamp[i].addEventListener('click', (e) => {
        showFooter[i].classList.toggle('show');
    })
}

// ================================== STORE ===================================

const selectProvince = document.querySelector('.store__search span');
const listProvince = document.querySelector('.store__province');

const storeList = document.querySelector('.store__list');
const storeMore = document.querySelector('.store__more');

const totalStore = document.querySelector('.store__search b');

// handle show listProvince
selectProvince.addEventListener('click', () => {
    listProvince.style.display = 'block';
})

// handle button xem toàn bộ store
storeMore.addEventListener('click', (e) => {
    storeList.style.height = 'auto';
    storeList.style.overFlow = 'visible';
    storeMore.style.display = 'none'
})

// handle bộ lọc show các store từng tỉnh thành
listProvince.addEventListener('click', (e) => {
    // chuyển HTMLnode về mảng = spread-operator
    let arrProvince = [...listProvince.children];
    // tìm Li người dùng chọn fill lên thẻ Span
    let currentProvince = arrProvince.find(province => province === e.target);
    selectProvince.innerHTML = currentProvince.innerHTML
    // sau đó ẩn thẻ ul
    listProvince.style.display = 'none';
    // lấy attribute của province
    let codeProvince = e.target.getAttribute('data-province')
    // xóa dòng chữ xem thêm
    storeMore.style.display = 'none';
    // hiển thị full độ dài list
    storeList.style.height = 'auto';
    storeList.style.overFlow = 'visible';
    // get data từ API về
    apiGetStore()
        .then(response => {
            // lọc các province có name trùng với attribute của province
            let storeOfProvince = response.data.filter((province) => province.nameProvince === codeProvince);
            totalStore.innerHTML = `Có ${storeOfProvince.length} cửa hàng TopZone tại`;
            if (storeOfProvince.length == 1) {
                storeList.style.display = 'block';
                storeList.style.textAlign = 'center';
            } else {
                storeList.style.textAlign = 'left';
            }
            // hiển thị mảng mới ra màn hình
            display(storeOfProvince)
        })
        .catch( error => console.log(error))
})

getStore()

// hàm lấy dữ liêu Store từ API
function getStore() {
    apiGetStore()
    .then(response => {
        // console.log(response.data)
        let stores = response.data.map((store) => {
            return store = new Stores(
                store.id,
                store.nameProvince,
                store.nameStore,
                store.addressStore,
            );
        })
        display(stores)
    })
    .catch(error => console.log(error))
}

// hàm render HTML
function display(stores) {
    let content = '';
    stores.reduce((result, store) => {
        return content = result + 
        `<div class="col-lg-6 col-12">
            <p class="m-0 ">
                <a href="">
                    <span>
                        ${store.nameStore}
                        <span>
                            Xem chỉ đường
                        </span>
                    </span>
                    <span>${store.addressStore}</span>
                    <button class="btn btn-primary d-none"
                    data-type="edit"
                    data-id="${store.id}"
                    >Edit</button>
                    <button class="btn btn-danger d-none"
                    data-type="del"
                    data-id="${store.id}"
                    >Delete</button>
                </a>
            </p>
        </div>
        `
    },'')
    storeList.children[0].innerHTML = content;
}

// =============================== PRODUCTS ===============================

// tạo danh sách sản phẩm = [] 
let productList = [];

// clone data = Axios về & lưu vào danh sách sản phẩm
apiGetProducts()
    .then((response) => productList = response.data) 
    .catch(error => console.log(error))
// setTimeout(() => {
//     console.log(productList) 
// }, 3000)

// hiển thị option cho người dùng chọn
let filter = document.querySelectorAll('.product__filter .Container div div');

filter.forEach((boLoc) => boLoc.addEventListener('click', (e) => {
    let elementType = e.target.getAttribute('data-type');
    filter.forEach((filter) => filter.children[1].classList.add('hide'));
    if (elementType === 'price') {          
        e.target.children[1].classList.remove('hide');
    } else if (elementType === 'type') {          
        e.target.children[1].classList.remove('hide');
    } else if (elementType === 'screen') {          
        e.target.children[1].classList.remove('hide');
    } else if (elementType === 'cameraF') {          
        e.target.children[1].classList.remove('hide');
    } else if (elementType === 'cameraB') {        
        e.target.children[1].classList.remove('hide');
    } else if (elementType === 'special') {          
        e.target.children[1].classList.remove('hide');
    } else if (elementType === 'memory') {           
        e.target.children[1].classList.remove('hide');
    } else if (elementType === 'ram') {           
        e.target.children[1].classList.remove('hide');
    } 
}))

// lọc theo lưạ chọn người dùng
let choice = document.querySelectorAll('.product__filter .Container div div ul li');
console.log(choice)
choice.forEach((choice) => choice.addEventListener(('click'), (e) => {
    // lọc theo option chọn type
    let type = document.querySelector('.product__type span')
    let elementType = e.target.getAttribute('data-type-2');
    //chuyển đổi Type => lựa chọn mới
    type.innerHTML = elementType;
    if (elementType != null) {
        displayProducts(productList.filter((product)=> {
            return product.type === elementType;
        }))  
    }
}))

// lấy 1 sản phẩm từ API = id 
function getProductID(id) {
    apiGetProductID()
        .then(response => console.log(response.data))
        .catch(error => console.log(error))
}

//  khởi tạo danh sách giỏ hàng
let cartList = []

// giải nén & gán object từ localStorage vào cartList
cartList = JSON.parse(localStorage.getItem('cartList')) || [];

// hiển thị danh sách giò hàng đã lưu ở localStorage
displayProductToCart(cartList);

// Handle xử lý thêm item vào cartList & hiển thị ra màn hình
document.querySelector('.product__main .row').addEventListener('click', (e) => {
    // bắt sự kiện click ở nút ADD trong productLit, lấy id & type 
    let id = e.target.getAttribute('data-id');
    let elementType = e.target.getAttribute('data-type');

    // nếu type == Add thì lấy id sản phẩm vừa click
    if (elementType == 'add') {
        // duyệt qua List sản phẩm, trả về sản phẩm có id trùng với id lấy đc
        let product = productList.filter(product => {
            return product.id === id; 
        });
        
        // tạo đối tượng mới bao gồm product vừa lấy đc = id & khối lượng set = 1;
        let cartItem = {
            product : {...product},
            quantity : 1,
        };

        // duyệt qua List giỏ hàng, kiểm tra xem có sản phẩm nào trùng id với id vừa lấy đc
        let stamp = cartList.find((cartItem) => {
            return cartItem.product[0].id === id;
        })
        // console.log(stamp) 

        
        if (stamp === undefined) {  
            cartList.push(cartItem);    // nếu ko có thì undefined => push vào giỏ hàng
        } else {    
            stamp.quantity++;   // nếu có trùng thì trả về object trùng => +1 số lượng SP trong giỏ lên
        }
        // console.log(cartList)
        total();

        // lưu vào local Storage mỗi khi thêm sản phẩm
        window.localStorage.setItem('cartList', JSON.stringify(cartList));
        // hiển thị giỏ hàng lên giao diện
        displayProductToCart(cartList);
    }
})

// handle xử lý nút UP, DOWN, DELETE
document.querySelector('.cart__list').addEventListener('click', (e) => {
    // bắt sự kiện click ở cartList, lấy id & type (up || down)
    let elementType = e.target.getAttribute('data-type');
    let id = e.target.getAttribute('data-id');

    // duyệt qua List giỏ hàng, kiểm tra xem có sản phẩm nào trùng id với id vừa lấy đc => trả về object đó
    let stamp = cartList.find((cartItem) => {
        return cartItem.product[0].id === id;
    })

    // duyệt qua List giỏ hàng, kiểm tra xem có sản phẩm nào trùng id với id vừa lấy đc => tra về index của object đó
    let stampIndex = cartList.findIndex((cartItem) => {
        return cartItem.product[0].id === id;
    })

    // nếu type == DOWN thì giảm quantity 1 đvị
    if (elementType === 'down') {
        stamp.quantity--;
        // nếu quantity = 0 thì xóa chính nó
        if (stamp.quantity === 0) {
            cartList.splice(stampIndex, 1);
        }
    // nếu type == UP thì tăng quantity 1 đvị
    } else if (elementType === 'up') {
        stamp.quantity++;
    // nếu type == Delete thì xóa chính nó   
    } else if (elementType === 'delete') {
        if (stampIndex != -1) {
            cartList.splice(stampIndex, 1);
        }
    }
    total();
    // lưu vào local Storage mỗi khi thêm sản phẩm
    window.localStorage.setItem('cartList', JSON.stringify(cartList));
    // hiển thị giỏ hàng lên giao diện
    displayProductToCart(cartList);
})

// handle xử lý nút CLEAR-ALL, Purchase
document.querySelector('.cart__btn').addEventListener('click', (e) => {
    let elementType = e.target.getAttribute('data-type');
    
    if (elementType === 'clear' || elementType === 'purchase') {
        cartList.splice(0);
    }
    total();
    // lưu vào local Storage mỗi khi thêm sản phẩm
    window.localStorage.setItem('cartList', JSON.stringify(cartList));
    // hiển thị giỏ hàng lên giao diện
    displayProductToCart(cartList);
})


// hàm tính tổng tiền & tính tổng số lượng sản phẩm trong cartList
function total() {
    let total = 0;
    let totalQuantity = 0;
    cartList.forEach((cartItem) => {
        let stamp = +cartItem.product[0].price * +cartItem.quantity;
        total += stamp;
        totalQuantity += +cartItem.quantity;
    })
    // tổng số lượng sản phẩm trong cartList
    document.querySelector('.header__quantity').innerHTML = totalQuantity;
    // tổng tiền trong cartList
    document.querySelector('.cart__total span').innerHTML = total.toLocaleString();
}

getProducts(); 
total();
// hàm lấy dữ liêu Products từ API
function getProducts(searchName) {
    apiGetProducts(searchName)
        .then(response => {
            let products = response.data;
            products.map((product) => {
                return product = new Products(
                    product.id,
                    product.name,
                    product.price,
                    product.screen,
                    product.backCamera,
                    product.frontCamera,
                    product.image,
                    product.desc,
                    product.type,
                );
            })
            displayProducts(products)
        })
        .catch(error => console.log(error))
}

// hàm render Products
function displayProducts(products) {
    let content = '';
    products.reduce((result, product) => {
        return content = result + 
        `<div class="col-xl-3 mb-xl-3 col-md-4 mb-md-3 col-6 mb-3">
        <div class="product__col">
            <div class="product__img">
                <img src="${product.img}" alt="">
            </div>
            <div class="product__content">
                <div class="product__name">
                    <h5>${product.name}</h5>
                </div>
                <div class="product__price">
                    <strong>${(+product.price).toLocaleString()}đ</strong>
                </div>
            </div>
            <div class="product__discount">Giảm 30%</div>
            <div class="product__status">
                <em>In Stock</em>
            </div>
            <div class="product__details">
                <p>${product.desc} </p> 
                <p>Màn hình: ${product.screen} </p> 
                <p>Camera Sau:${product.backCamera} </p> 
                <p>Camera Trước: ${product.frontCamera} </p> 
                <div class="product__cart">
                    <div>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <button class="btn btn-style" data-type="add" data-id="${product.id}">Add <i class="fa-solid fa-angle-right"></i></button>
                </div>
            </div>
        </div>
    </div>`
    },'')
    document.querySelector('.product__main .row').innerHTML = content;
}

// hàm render CartList
function displayProductToCart(cartList) {
    let content = `
    <div>
        <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9bdd8040b334d31946f49e36beaf32db.png" style="width: 100px; margin-bottom: 20px;">
        <p>Chưa có sản phẩm</p>
    </div>`;
    cartList.reduce((result, cartItem) => {
        return content = result + 
        `<div class="cart__item">
            <div class="cart__item-img">
                <img src="${cartItem.product[0].img}" alt="">
            </div>
            <div class="cart__item-name">
                <span>${cartItem.product[0].name}</span>
            </div>
            <div class="cart__item-quantity">
                <span>
                    <i class="fa-solid fa-angle-left" data-id="${cartItem.product[0].id}" data-type="down"></i>
                    ${cartItem.quantity}
                    <i class="fa-solid fa-angle-right" data-id="${cartItem.product[0].id}" data-type="up"></i>
                </span>
            </div>
            <div class="cart__item-price">
                <span>${(+cartItem.product[0].price).toLocaleString()}</span>
            </div>
            <div class="cart__item-delete">
                <span>
                    <i class="fa-solid fa-trash-can" data-id="${cartItem.product[0].id}" data-type="delete"></i>
                </span>
            </div>
        </div>`
    }, '')
    document.querySelector('.cart__list').innerHTML = content;
}
  
 // ============================= Code Edit Store =============================
// function updateStoreID(id) {
//     apiUpdateStoreID(id)
//         .then((response) => {
//             console.log(response.data)
//             document.querySelector('.id').value = response.data.id;
//             document.querySelector('.nameProvince').value = response.data.nameProvince;
//             document.querySelector('.nameStore').value = response.data.nameStore;
//             document.querySelector('.addressStore').value = response.data.addressStore;
//         })
//         .catch(error => console.log(error))
// }
// storeList.addEventListener('click', (e) => {
//     console.log(e.target)
//     let element = e.target.getAttribute('data-type')
//     let id = e.target.getAttribute('data-id')
//     if (element  === 'edit') {
//         updateStoreID(id);
//     } else if (element  === 'del') {
//         delStore(id)
//     }
// })
// function updateStore(id, store) {
//     apiUpdateStore(id, store)
//         .then(response => {
//             console.log(response.data.addrssStore);
//             response.data.addrssStore = '';
//             getStore();
//         })
//         .catch(error => console.log(error))
// }
// document.querySelector('.update').addEventListener('click', (e) => {
//     console.log(document.querySelector('.id').value)
//     let id = document.querySelector('.id').value;
//     let nameProvince = document.querySelector('.nameProvince').value;
//     let nameStore = document.querySelector('.nameStore').value;
//     let addressStore = document.querySelector('.addressStore').value;
    
//     let store = new Stores(id, nameProvince, nameStore, addressStore)
//     updateStore(id, store)
//     // addStore(store)
// })
// function addStore(store) {
//     apiAddStore(store)
//         .then(response => getStore())
//         .catch(error => console.log(error))
// }
// function delStore(id) {
//     apiDelStore(id)
//         .then(response => getStore())
//         .catch(error => console.log(error))
// }
// ============================================================================