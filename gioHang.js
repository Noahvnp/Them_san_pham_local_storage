var keyLocalStorageItemGioHang = 'danhSachItemGioHang';
// Tạo ra đối tượng item giỏ hàng
    // input: idSanPham, SoLuong
    // output: Đối tượng item giỏ hàng
function taoDoiTuongItemGioHang(idSanPham, soLuong) {
    var itemGioHang = new Object();
    itemGioHang.idSanPham = idSanPham;
    itemGioHang.soLuong = soLuong;

    return itemGioHang;
}

// Lấy ra toàn bộ item giỏ hàng được lưu trữ trong local storage
function layDanhSachItemGioHang() {
    var danhSachItemGioHang = new Array();
    // Lấy chuỗi json lưu trữ trong local storage
    var jsonDanhSachItemGioHang = localStorage.getItem(keyLocalStorageItemGioHang);

    // Chuyển từ json qua danh sách item giỏ hàng
    if(jsonDanhSachItemGioHang != null)
        danhSachItemGioHang = JSON.parse(jsonDanhSachItemGioHang);

    return danhSachItemGioHang;
}

function luuDanhSachItemGioHangVaoLocalStorage(danhSachItemGioHang) {
    // Chuyển thành chuỗi json
    var jsonDanhSachItemGioHang = JSON.stringify(danhSachItemGioHang);
    // Lưu vào local storage
    localStorage.setItem(keyLocalStorageItemGioHang, jsonDanhSachItemGioHang);
}

