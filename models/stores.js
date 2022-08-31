// function Stores(nameProvince, nameStore, addressStore) {
//     this.nameProvince = nameProvince;
//     this.nameStore = nameStore;
//     this.addressStore = addressStore;
// }

class Stores {
    constructor(id, nameProvince, nameStore, addressStore) {
        this.id = id;
        this.nameProvince = nameProvince;
        this.nameStore = nameStore;
        this.addressStore = addressStore;
    }   
}

class Products {
    constructor(id, name, price, screen, backCamera, frontCamera, img, desc, type) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.screen = screen;
        this.backCamera = backCamera;
        this.frontCamera = frontCamera;
        this.img = img;
        this.desc = desc;
        this.type = type;
    }
}

class CartList {
    constructor(id, cartItem, quantity) {
        this.id = id;
        this.cartItem = cartItem;
        this.quantity = quantity;
    }
}