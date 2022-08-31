// ========================== Header ==========================

// scroll top
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

// handle Icon search
searchIcon.addEventListener('click', (e) => {
    headerLogo.classList.add('hide');
    headerNav.classList.add('hide');
    headerSearchCart.classList.add('hide');
    headerMain.style.justifyContent = 'center'
    headerForm.classList.remove('hide')
})

// handle Icon X
xIcon.addEventListener('click', (e) => {
    headerLogo.classList.remove('hide');
    headerNav.classList.remove('hide');
    headerSearchCart.classList.remove('hide');
    headerMain.style.justifyContent = 'space-between'
    headerForm.classList.add('hide')
})
// ========================== Header Cart ==========================

document.querySelector('.header__cart ').addEventListener('click' , (e) => {
    const showCart = document.querySelector('.cart');
    showCart.classList.toggle('hide');
})


// ========================== CAROUSEL ==========================

const imageList = document.querySelectorAll('.carousel__image div');
const dotsList = document.querySelectorAll('.carousel__dots button');

// Convert nodeList => Array
const imageListArr = [...imageList];
const dotsListArr = [...dotsList];
const imageSlide = document.querySelector('.carousel__image');

for (let i = 0; i < dotsList.length; i++) {
    dotsList[i].addEventListener('click', (e) => {
        if (dotsList[i] == dotsList[0]) {
            imageSlide.style.transform = 'translateX(0)'
        } else if (dotsList[i] == dotsList[1]) {
            imageSlide.style.transform = 'translateX(-1519.2px)'
        } else if (dotsList[i] == dotsList[2]) {
            imageSlide.style.transform = 'translateX(-3038.4px)'
        } else if (dotsList[i] == dotsList[3]) {
            imageSlide.style.transform = 'translateX(-4557.6px)'
        } else if (dotsList[i] == dotsList[4]) {
            imageSlide.style.transform = 'translateX(-6076.8px)'
        } else if (dotsList[i] == dotsList[5]) {
            imageSlide.style.transform = 'translateX(-7596.0px)'
        } else if (dotsList[i] == dotsList[6]) {
            imageSlide.style.transform = 'translateX(-9115.2px)'
        } 
    })
}
// console.log(window.innerWidth)
const prev = () => {
    if (value < 0) {
        value += 1519.2;
        imageSlide.style.transform = `translateX(${(value)}px)`
    } else {
        imageSlide.style.transform = `translateX(0px)`
    }
}
const next = () => {
    value -= 1519.2;
    if (value < -9115.2) {
        imageSlide.style.transform = `translateX(0px)`
        value = 0;
    } else {
        imageSlide.style.transform = `translateX(${(value)}px)`
    }
}
let value = 0;
const btnPrev = document.querySelector('.btn-prev')
btnPrev.addEventListener('click', prev)
const btnNext = document.querySelector('.btn-next')
btnNext.addEventListener('click', next)

setInterval(next, 5000)

// ========================== STORE ==========================

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
function getStore() {
    apiGetStore()
    .then(response => {
        console.log(response.data)
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

function display(stores) {
    let content = '';
    stores.reduce((result, store) => {
        return content = result + 
        `<p class="m-0">
            <a href="#+">
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
        </p>`
    },'')
    storeList.innerHTML = content;
}
// ========================== Code Edit Store ==========================
function updateStoreID(id) {
    apiUpdateStoreID(id)
        .then((response) => {
            console.log(response.data)
            document.querySelector('.id').value = response.data.id;
            document.querySelector('.nameProvince').value = response.data.nameProvince;
            document.querySelector('.nameStore').value = response.data.nameStore;
            document.querySelector('.addressStore').value = response.data.addressStore;
        })
        .catch(error => console.log(error))
}

storeList.addEventListener('click', (e) => {
    console.log(e.target)
    let element = e.target.getAttribute('data-type')
    let id = e.target.getAttribute('data-id')
    if (element  === 'edit') {
        updateStoreID(id);
    } else if (element  === 'del') {
        delStore(id)
    }

})

function updateStore(id, store) {
    apiUpdateStore(id, store)
        .then(response => {
            console.log(response.data.addrssStore);
            response.data.addrssStore = '';
            getStore();
        })
        .catch(error => console.log(error))
}

document.querySelector('.update').addEventListener('click', (e) => {
    console.log(document.querySelector('.id').value)
    let id = document.querySelector('.id').value;
    let nameProvince = document.querySelector('.nameProvince').value;
    let nameStore = document.querySelector('.nameStore').value;
    let addressStore = document.querySelector('.addressStore').value;
    
    let store = new Stores(id, nameProvince, nameStore, addressStore)
    updateStore(id, store)
    // addStore(store)
})

function addStore(store) {
    apiAddStore(store)
        .then(response => getStore())
        .catch(error => console.log(error))
}

function delStore(id) {
    apiDelStore(id)
        .then(response => getStore())
        .catch(error => console.log(error))
}

// ========================== PRODUCTS ==========================

let productList = [];
apiGetProducts()
    .then(response => productList = response.data)
    .catch(error => console.log(error))
// setTimeout(() => {
//     console.log(productList) 
// }, 3000)

const selectType = document.querySelector('.product__type')
const selectScreen = document.querySelector('.product__screen')
const selectCameraF = document.querySelector('.product__camera-F')
const selectCameraB = document.querySelector('.product__camera-B')

// product type
selectType.addEventListener('click', (e) => {
    let ul = document.querySelector('.product__type ul');
    ul.classList.toggle('hide');
    // lọc theo option chọn
    let elementType = e.target.getAttribute('data-type');
    if (elementType != null) {
        displayProducts(productList.filter((product)=> {
            return product.type === elementType;
        }))  
        // setTimeout(() => {
        //     console.log(productList) 
        // }, 3000) 
    }
})
// product screen
selectScreen.addEventListener('click', (e) => {
    let ul = document.querySelector('.product__screen ul')
    ul.classList.toggle('hide')
})

// product camera front
selectCameraF.addEventListener('click', (e) => {
    let ul = document.querySelector('.product__camera-F ul')
    ul.classList.toggle('hide')
})

// product camera back
selectCameraB.addEventListener('click', (e) => {
    let ul = document.querySelector('.product__camera-B ul')
    ul.classList.toggle('hide')
})


function getProductID(id) {
    apiGetProductID()
        .then(response => console.log(response.data))
        .catch(error => console.log(error))
}
let cartList = []

document.querySelector('.product__main .row').addEventListener('click', (e) => {
    let id = e.target.getAttribute('data-id');
    let elementType = e.target.getAttribute('data-type');
    if (elementType == 'add') {
        document.querySelector('.cart__list div').classList.add('hide');
        cartItem = productList.filter(product => product.id === id);
        // product.push(product);
        // displayProductToCart(product);
        // console.log(product)
    }
})




getProducts()

function getProducts() {
    apiGetProducts()
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
function displayProducts(products) {
    let content = '';
    products.reduce((result, product) => {
        return content = result + 
        `<div class="col-3">
        <div class="product__col">
            <div class="product__img">
                <img src="${product.img}" alt="">
            </div>
            <div class="product__content">
                <div class="product__name">
                    <h5>${product.name}</h5>
                </div>
                <div class="product__price">
                    <strong>${product.price}đ</strong>
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
function displayProductToCart(product) {
    let content = '';
    product.reduce((result, product) => {
        return content = result + 
        `<div class="cart__item">
            <div class="cart__item-img">
                <img src="${product.img}" alt="">
            </div>
            <div class="cart__item-name">
                <span>${product.name}</span>
            </div>
            <div class="cart__item-quantity">
                <span>
                    <i class="fa-solid fa-angle-left"></i>
                    1
                    <i class="fa-solid fa-angle-right"></i>
                </span>
            </div>
            <div class="cart__item-price">
                <span>${product.price}</span>
            </div>
            <div class="cart__item-delete">
                <span>
                    <i class="fa-solid fa-trash-can"></i>
                </span>
            </div>
        </div>`
    }, '')
    document.querySelector('.cart__list').innerHTML += content;
}
