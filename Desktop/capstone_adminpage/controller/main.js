// dom lấy giá trị
dom = (selector) => document.querySelector(selector);

getProducts();

function getProducts(searchName) {
  apiGetProducts(searchName)
    .then((response) => {
      // console.log(response.data);
      let products = response.data.map((product) => {
        return (product = new Product(
          product.id,
          product.name,
          product.price,
          product.img,
          product.desc,
          product.backCamera,
          product.frontCamera,
          product.type,
          product.screen
        ));
      });

      display(products);
    })
    .catch((error) => {
      console.log(error);
    });
}

function addProduct(product) {
  apiAddProducts(product)
    .then(() => {
      getProducts();
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteProduct(id) {
  apiDeleteProduct(id)
    .then(() => {
      getProducts();
    })
    .catch((error) => {
      console.log(error);
    });
}

function editProduct(id) {
  apiGetProductById(id)
    .then((response) => {
      let product = response.data;
      // console.log(product);
      dom("#idSP").value = product.id;

      dom("#tenSP").value = product.name;
      dom("#giaSP").value = Number(product.price).toLocaleString();

      dom("#hinhAnhSP").value = product.img;
      dom("#camTruocSP").value = product.frontCamera;
      dom("#manHinhSP").value = product.screen;
      dom("#camSauSP").value = product.backCamera;
      dom("#hangSP").value = product.type;
      dom("#moTaSP").value = product.desc;
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateProduct(id, product) {
  apiUpdateProduct(id, product)
    .then(() => {
      getProducts();
    })
    .catch((error) => {
      console.log(error);
    });
}

//==========================

function display(objects) {
  let output = objects.reduce((result, obj, index) => {
    return (
      result +
      `
  <tr>
  <td>${index + 1}</td>

  <td>${obj.name}</td>

  <td>${Number(obj.price).toLocaleString()}</td>

  <td>${obj.type}</td>

  <td>
  <div class="divManHinh"> ${obj.screen}</div>
  </td>

  <td>
  <div class="divCamTruoc">${obj.frontCamera}</div>
  </td>

  <td>
  <div class="divCamSau">${obj.backCamera}</div>
  </td>

  <td><img src='${obj.img}' width='60px' height='60px' /></td>

  <td><div class="divMoTa">${obj.desc}</div></td>

  <td>
  <button class='btn btn-danger' data-type='edit' data-id='${
    obj.id
  }'>Edit</button>

  <button class='btn btn-warning' data-type='delete' data-id='${
    obj.id
  }'>Delete</button></td>

  </tr>`
    );
  }, "");

  document.getElementById("tblDanhSachSP").innerHTML = output;
}

document.getElementById("btnSPMoi").addEventListener("click", () => {
  document.getElementById("modal").style.display = "block ";

  dom(".modal-title").innerHTML = "Thêm Sản Phẩm Mới";
  dom("#modal__footer").innerHTML = `
  <button id="btnThem" data-type="add" class="button">
  Thêm Sản Phẩm</button>
  <button id="btnHuy " data-dismiss="modal" class="button">
  Hủy</button>
  `;

  resetForm();
});

dom("#modal__footer").addEventListener("click", (event) => {
  let elType = event.target.getAttribute("data-type");

  let id = dom("#idSP").value;
  let name = dom("#tenSP").value;
  let price = dom("#giaSP").value;
  let img = dom("#hinhAnhSP").value;
  let backCamera = dom("#camSauSP").value;
  let frontCamera = dom("#camTruocSP").value;
  let type = dom("#hangSP").value;
  let screen = dom("#manHinhSP").value;
  let desc = dom("#moTaSP").value;

  let isValid = validateForm();
  if (!isValid) return;

  let product = new Product(
    null,
    name,
    price,
    img,
    desc,
    backCamera,
    frontCamera,
    type,
    screen
  );

  // console.log(product);

  if (elType === "add") {
    addProduct(product);
    resetForm();
  } else if (elType === "update") {
    console.log(elType);
    let isValid = validateForm();
    if (!isValid) return;

    updateProduct(id, product);
  }
});

dom("#tblDanhSachSP").addEventListener("click", (event) => {
  let id = event.target.getAttribute("data-id");
  let elType = event.target.getAttribute("data-type");
  if (elType === "delete") {
    deleteProduct(id);
  } else if (elType === "edit") {
    document.getElementById("modal").style.display = "block ";
    dom(".modal-title").innerHTML = "Cập Nhật Sản Phẩm";
    dom("#modal__footer").innerHTML = `
      <button id="btnCapNhat" data-type="update" class="button">Cập Nhật</button>
      <button id="btnHuy " data-dismiss="modal" class="button">
      Hủy</button>
     `;
    editProduct(id);
  }
});

dom("#searchInput").addEventListener("keyup", (event) => {
  if (event.key !== "Enter") {
    return;
  }
  getProducts(event.target.value);
});

dom("#searchInput").addEventListener("input", (event) => {
  getProducts(event.target.value);
});

dom("#btnFind").onclick = () => {
  let value = document.getElementById("searchInput").value;
  getProducts(value);
};

//reset form
function resetForm() {
  dom("#tenSP").value = "";
  dom("#giaSP").value = "";
  dom("#hinhAnhSP").value = "";
  dom("#manHinhSP").value = "";
  dom("#camTruocSP").value = "";
  dom("#camSauSP").value = "";
  dom("#hangSP").value = "";
  dom("#moTaSP").value = "";
}

// Đóng modal
document.getElementById("modal__wrapper").addEventListener("click", (event) => {
  let content = event.target.getAttribute("data-dismiss");
  if (content === "modal") {
    document.getElementById("modal").style.display = "none";
  }

  let check = document.getElementById("modal__content").contains(event.target);
  // console.log(check);
  if (!check) {
    document.getElementById("modal").style.display = "none";
  }
});

//===============Validate==============

validateName = () => {
  let elType = dom("#tenSP").value;

  if (!elType) {
    dom("#tbName").innerHTML = "Không để trống tên sản phẩm";
    return false;
  }

  dom("#tbName").innerHTML = "";
  return true;
};

validatePrice = () => {
  let elType = dom("#giaSP").value;
  if (!elType) {
    dom("#tbPrice").innerHTML = "Không để trống giá sản phẩm";
    return false;
  }

  let regex = /^[0-9]+$/;
  if (!regex.test(elType)) {
    dom("#tbPrice").innerHTML = "Giá sản phẩm phải là số";
    return false;
  }
  dom("#tbPrice").innerHTML = "";
  return true;
};

validateImg = () => {
  let elType = dom("#hinhAnhSP").value;

  if (!elType) {
    dom("#tbImg").innerHTML = "Không để trống hình ảnh sản phẩm";
    return false;
  }

  dom("#tbImg").innerHTML = "";
  return true;
};

validateDesc = () => {
  let elType = dom("#moTaSP").value;

  if (!elType) {
    dom("#tbDesc").innerHTML = "Không để trống mô tả sản phẩm";
    return false;
  }

  if (elType.length < 10 || elType.length > 300) {
    dom("#tbDesc").innerHTML =
      "Mô tả sản phẩm tối thiểu 10 ký tự và tối đa 300 ký tự ";
    return false;
  }

  dom("#tbDesc").innerHTML = "";
  return true;
};

validateScreen = () => {
  let elType = dom("#manHinhSP").value;

  if (!elType) {
    dom("#tbScreen").innerHTML = "Chưa nhập thông số màn hình";
    return false;
  }

  dom("#tbScreen").innerHTML = "";
  return true;
};

validateFrontCam = () => {
  let elType = dom("#camTruocSP").value;

  if (!elType) {
    dom("#tbfrontCam").innerHTML = "Chưa nhập thông số camera trước";
    return false;
  }

  dom("#tbfrontCam").innerHTML = "";
  return true;
};

validateBackCam = () => {
  let elType = dom("#camSauSP").value;

  if (!elType) {
    dom("#tbBackCam").innerHTML = "Chưa nhập thông số camera sau ";
    return false;
  }

  dom("#tbBackCam").innerHTML = "";
  return true;
};

validateType = () => {
  let elType = dom("#hangSP").value;

  if (!elType) {
    dom("#tbType").innerHTML = "Chưa nhập hãng sản phẩm";
    return false;
  }

  dom("#tbType").innerHTML = "";
  return true;
};

validateForm = () => {
  let isValid = true;
  isValid =
    validateName() &
    validatePrice() &
    validateImg() &
    validateScreen() &
    validateFrontCam() &
    validateBackCam() &
    validateType() &
    validateDesc();

  if (!isValid) {
    return false;
  }
  return true;
};
