function taoDoiTuongSanPham(hinhAnh, ten, giaGoc, phanTramGiamGia, khuVuc, id) {
    var sanPham = new Object();
    // Gán thuộc tính cho đối tưỢng
    sanPham.hinhAnh = hinhAnh;
    sanPham.ten = ten; 
    sanPham.giaGoc = giaGoc;
    sanPham.phanTramGiamGia = phanTramGiamGia;
    sanPham.khuVuc = khuVuc;
    // Nếu sản phẩm chưa có Id thì tạo mới Id
    if(id != null)
        sanPham.id = id;
    else
        sanPham.id = taoId();

    // Phương thức tính giá bán
    sanPham.tinhGiaBan = function() {
        var giaBan = this.giaGoc * (100 - this.phanTramGiamGia)/100;
        return giaBan;
    }

    sanPham.toJson = function(){
        var json = JSON.stringify(this);
        return json;
    }

    /* 
    Từ JSON chuyển thành một đối tượng đầy đủ các phương thức
        input: json;
        output: đối tượng đầy đủ;
    */
    sanPham.fromJSON = function(json) {
        var doiTuongDayDu = new Object();
        // Bước 1: chuyển json thành đối tưỢng
        var doiTuong = JSON.parse(json);

        // Bước 2: CHuyển đối tượng thành đối tượng đầy đủ phương thức
        var doiTuongDayDu = 
            taoDoiTuongSanPham(doiTuong.hinhAnh, doiTuong.ten, doiTuong.giaGoc, doiTuong.phanTramGiamGia, doiTuong.khuVuc);
        return doiTuongDayDu;
    }


    // Từ JSON của danh sách sản phẩm trả về một danh sách sản phẩm có đầy đủ chức năng phương thức
        // input: json của danh sách sản phẩm
        // output: danh sách sản phẩm đầy đủ phương thức
    sanPham.fromJSONs = function(jsonDanhSachSanPham) {
        var danhSachSanPhamDayDu = new Array();
        var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);

        for(var i = 0; i < danhSachSanPham.length; i++) {
            var sanPham = danhSachSanPham[i];
            var sanPhamDayDu = 
                taoDoiTuongSanPham(sanPham.hinhAnh, sanPham.ten, sanPham.giaGoc, sanPham.phanTramGiamGia, sanPham.khuVuc, sanPham.id);
            danhSachSanPhamDayDu[i] = sanPhamDayDu;
        }

        return danhSachSanPhamDayDu;
    }
    return sanPham;
}


// Chuyển một DANH SÁCH đối tượng thành một đoạn HTML để hiển thị được danh sách sản phẩm ra màn hình
//     input: 1 danh sách sản phẩm
//     output: HTML hiểN thị danh sách sản phẩm
function chuyenDanhSachDoiTuongSanPhamThanhHTML(danhSachSanPham) {
    var HTMLDanhSachSanPham = '<div class="items">';
    
    for( var i = 0; i < danhSachSanPham.length; i++) {
        var sanPham = danhSachSanPham[i];
        var HTMLSanPham = chuyenDoiTuongSanPhamThanhHTML(sanPham);
        HTMLDanhSachSanPham += HTMLSanPham;
    }

    HTMLDanhSachSanPham += '</div>';
    return HTMLDanhSachSanPham;
}


// Chuyển 1 đối tượng thành 1 đoạn HTML
    // input: 1 đối tượng
    // output: HTML hiển thị 1 đối tượng
function chuyenDoiTuongSanPhamThanhHTML(sanPham) {
    var HTMLSanPham = '';

    HTMLSanPham += '<div class="item">'
    HTMLSanPham +=      '<div class="item-thumb">'
    HTMLSanPham +=          '<img src=" '+sanPham.hinhAnh+' " alt="">'
    HTMLSanPham +=       '</div>'

    HTMLSanPham +=       '<h2 class="item-title">' + sanPham.ten +'</h2>'
    HTMLSanPham +=       '<div class="item-price">'
    HTMLSanPham +=           '<span class="item-price-origin">'+ sanPham.giaGoc +'</span>'
    HTMLSanPham +=           '<span class="item-price-sale">'+ sanPham.tinhGiaBan() +'</span>'
    HTMLSanPham +=        '</div>'

    HTMLSanPham +=        '<button onclick="onclickDuaVaoGioHang(\''+ sanPham.id + '\')" class="btn btn-primary">Thêm vào giỏ hàng</button>'
    HTMLSanPham += '</div>'

    return HTMLSanPham;

}


function laySanPhamTheoId(idSanPham) {
    var sanPham = new Object();
    // Lấy danh sách sản phẩm
    var danhSachSanPham = layDanhSachSanPhamTrongLocalStogare();
    // Duyệt toàn bộ đối tượng kiểm tra xem id của đối tượng có bằng với id truyền vào hay không
    for(var i = 0; i < danhSachSanPham.length; i++) {
        var sanPhamHienTai = danhSachSanPham[i];
        if (sanPhamHienTai.id == idSanPham)
            sanPham = sanPhamHienTai;
    }
    sanPham = taoDoiTuongSanPham(sanPham.hinhAnh, sanPham.ten, sanPham.giaGoc, sanPham.phanTramGiamGia, sanPham.khuVuc, sanPham.id);
    return sanPham;
}

// Lấy danh sách sản phẩm dưới localStorage
function layDanhSachSanPhamTrongLocalStogare() {
    // Lấy danh sách toàn bộ đối tượng
    var jsonDanhSachSanPham = localStorage.getItem('danhSachSanPham');
    // Chuyển json thành đối tượng
    var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);
    console.log(danhSachSanPham);
    return danhSachSanPham;
}




// Hàm sinh ID tự động (ID là duy nhất) ==> hàm có thể trùng ID nhưng xác suất cực thấp.
function taoId() {
    var id = '';
    //Lấy milisecond ở thời điểm hiện tại
    id = Math.random().toString().substring(2,10) + "_" + String(new Date().getTime());
    return id;
}