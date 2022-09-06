//Một kiểu dữ liệu trong javascript: Boolean
//Boolen: true / false

var isActive = false;
var isLoggesIn = true;

var a = 5;
var b = 8;
var c = 5;

// Các biểu thức so sánh sẽ trả về giá trị boolean
console.log(`a > b`, a > b); // 5 > 8  => False
console.log(`a < b`, a < b); // 5 < 8  => True

//So sánh lớn,bé hơn hoặc bằng
console.log(`a >= b`, a >= b); // 5 >= 5 => true
console.log(`a >= c`, a >= c); // 8 >= 5 => false

//So sánh bằng
var d = "5";
console.log(`a == c`, a == c); // 5 == 5 => true

// Khi so sánh bằng với toán tử "==" thì nó sẽ đưa 2 giá trị về cùng một kiểu dữ liệu rồi mới so sánh
console.log(`a == d`, a == d); // 5 == "5" => true

// Khi so sánh bằng với toán tử "===" thì nó sẽ đi kiểm tra kiểu dữ liệu của 2 biến trước,nếu khác kiểu dữ liệu lập tức trả về false, nếu đồng kiểu dữ liệu thì mới đi so sánh giá trị
console.log(`a === d`, a === d); // 5 === "5" => false

// => Luôn luôn sử dụng toán tử "===" để so sánh bằng

// So sánh khác
console.log(`a != c`, a != c); // 5!= 5 => false
console.log(`a != d`, a != d); // 5!= "5" => false
console.log(`a !== d`, a !== d); // 5!== "5" => true

// So sánh chuỗi
var name1 = "Anna";
var name2 = "Annie";
var name3 = "Bob";
console.log(`"Anna" > "Annie"`, name1 > name2); // "Anna" > "Annie" => false
console.log(`"Bob" > "Annie"`, name1 > name2); // "Bob" > "Annie" => false
console.log(`"12" > "8"`, "12" > "8"); //=> false

//Cấu trúc điều kiện
// var a = 5;
// var b = 8;
if (a > b) {
  console.log(`Giá trị a lớn hơn giá trị b`);
}

// Bài toán tính tiền phạt thẻ tín dụng
function tinhTienPhat() {
  //B1 DOM lấy các giá trị từ input
  var tagCreditCardBalance = Number(
    document.getElementById(`creditCardBalance`).value
  );
  var tagPayment = Number(document.getElementById(`payment`).value);
  //B2: tính số tiền còn nợ
  var balance = tagCreditCardBalance - tagPayment;
  //B3: Xử lí tính tiền phạt
  var penalty = 0;
  if (balance > 0) {
    penalty = (balance * 1.5) / 100;
  }
  alert(`Số Tiền Phạt : ` + penalty);
}

//if-else
var x = 4;
var y = 6;
if (x > y) {
  console.log(`Giá trị của x lớn hơn giá trị của y`);
} else {
  console.log(`Giá trị của y lớn hơn giá trị của x`);
}

// Bài toán tính tiền lương

document.getElementById(`tinhTien`).onclick = function () {
  var tagSoGioLam = Number(document.getElementById(`soGioLam`).value);
  var tagSoTienLuong = Number(document.getElementById(`soTienLuong`).value);
  var tienLuong = 0;

  var tagSoGioOt = tagSoGioLam - 40;

  if (tagSoGioLam > 40) {
    tienLuong = 40 * tagSoTienLuong + tagSoGioOt * tagSoTienLuong * 1.5;
  } else {
    tienLuong = tagSoGioLam * tagSoTienLuong;
  }
  document.getElementById(`tienLuong`).value =
    tienLuong.toLocaleString() + ` VND`;
};

// If - Else If - Else;
// var x = 4;
// var y = 6;
if (x > y) {
  console.log(`x lớn hơn y`);
} else if (x < y) {
  console.log(`x nhỏ hơn y`);
} else {
  console.log(`x bằng y`);
}

//Bài toán tính đơn giá mua hàng
document.getElementById(`tinhToan`).onclick = function () {
  var tagSoLuong = Number(document.getElementById(`soLuong`).value);
  var tagDonGia = Number(document.getElementById(`donGia`).value);
  var thanhTien = 0;
  if (tagSoLuong >= 100) {
    thanhTien = 100 * tagDonGia + (tagSoLuong - 100) * tagDonGia * 0.88;
  } else if (tagSoLuong >= 50) {
    thanhTien = 49 * tagDonGia + (tagSoLuong - 49) * tagDonGia * 0.92;
  } else {
    thanhTien = tagDonGia * tagSoLuong;
  }
  document.getElementById(`tienTra`).value =
    thanhTien.toLocaleString() + " VND";
};

// Toán tử bật 3 (Ternary operator)
var age = 16;
// var message = "";
// if (age >= 18) {
//   message = "welcome";
// } else {
//   message = "Not allowed";
// }
// console.log(message);

//Cách dùng toán từ bậc 3
var message = age >= 18 ? "welcome" : "Not Allowed";
console.log(message);

//Toán tử logic: &&(AND) , ||(OR) , !(NOT)
var tuoi = 15;
var hasTicket = true;

// &&(AND):
// Nếu tất cả là true: true && true => true
// Nếu có ít nhất 1 giá trị là false: true && false && true => false

//Chỉ vào rạp nếu lớn hơn 13 VÀ có vé xem phim
if (age > 13 && hasticket === true) {
  console.log(`Welcome to cinema`);
}

// ||(OR) :
//- Nếu tất cả giá trị là false: false || false => false
//- NẾu có ít nhất 1 giá trị là true => false || true || false => true

// Thời gian mở cửa của cửa hàng là từ 8 đến 22
var hour = 23;
if (hour < 8 || hour > 22) {
  console.log(`Store close`);
}

// !(NOT):
console.log(`!true`, true);
console.log(`!false`, !false);
