#include <iostream>
#include <vector>
#include <string>
#include <iomanip>
#include <ctime>
#include <cmath>
#include <algorithm>
using namespace std;

class KhachHang {
private:
    static int nextID;
    int maKH;
    string hoTen;
    string diaChi;
    string soDT;
    string loaiKH;

public:
    KhachHang(string hoTen, string diaChi, string soDT, string loaiKH) 
        : hoTen(hoTen), diaChi(diaChi), soDT(soDT), loaiKH(loaiKH) {
        maKH = nextID++;
    }

    int getMaKH() const { return maKH; }
    string getHoTen() const { return hoTen; }
    string getLoaiKH() const { return loaiKH; }

    void display() const {
        cout << "Ma KH: " << setw(5) << setfill('0') << maKH 
             << ", Ho Ten: " << hoTen 
             << ", Dia Chi: " << diaChi 
             << ", So DT: " << soDT 
             << ", Loai KH: " << loaiKH << endl;
    }
};

int KhachHang::nextID = 10000;

class Phong {
private:
    static int nextID;
    int maPhong;
    string tenPhong;
    string loaiPhong;

public:
    Phong(string tenPhong, string loaiPhong) 
        : tenPhong(tenPhong), loaiPhong(loaiPhong) {
        maPhong = nextID++;
    }

    int getMaPhong() const { return maPhong; }
    string getTenPhong() const { return tenPhong; }
    string getLoaiPhong() const { return loaiPhong; }

    void display() const {
        cout << "Ma Phong: " << setw(3) << setfill('0') << maPhong 
             << ", Ten Phong: " << tenPhong 
             << ", Loai Phong: " << loaiPhong << endl;
    }
};

int Phong::nextID = 100;

class DanhSachThuePhong {
private:
    KhachHang khachHang;
    Phong phong;
    time_t ngayBatDau;

public:
    DanhSachThuePhong(KhachHang khachHang, Phong phong, time_t ngayBatDau) 
        : khachHang(khachHang), phong(phong), ngayBatDau(ngayBatDau) {}

    string getTenKH() const { return khachHang.getHoTen(); }
    string getTenPhong() const { return phong.getTenPhong(); }
    string getLoaiPhong() const { return phong.getLoaiPhong(); }
    time_t getNgayBatDau() const { return ngayBatDau; }

    double tinhTienThue() const {
        double giaThue;
        if (phong.getLoaiPhong() == "Phong VIP") giaThue = 4000;
        else if (phong.getLoaiPhong() == "Phong chat luong cao") giaThue = 3000;
        else giaThue = 2000;

        time_t now = time(0);
        double soThang = ceil(difftime(now, ngayBatDau) / (30 * 24 * 3600)); 
        return giaThue * soThang;
    }

    void display() const {
        cout << "Khach Hang: " << khachHang.getHoTen() 
             << ", Phong: " << phong.getTenPhong() 
             << ", Ngay Bat Dau: " << ctime(&ngayBatDau) 
             << ", Loai Phong: " << phong.getLoaiPhong()
             << ", Tien Thue: " << tinhTienThue() << "000 dong" << endl;
    }
};

// Các hàm x? lý danh sách
void nhapKhachHang(vector<KhachHang>& dsKhachHang) {
    string hoTen, diaChi, soDT, loaiKH;
    cout << "Nhap Ho ten KH: "; cin.ignore(); getline(cin, hoTen);
    cout << "Nhap Dia chi KH: "; getline(cin, diaChi);
    cout << "Nhap So dien thoai KH: "; getline(cin, soDT);
    cout << "Nhap Loai KH (Sinh vien, Ho gia dinh, Doanh nghiep): "; getline(cin, loaiKH);
    dsKhachHang.emplace_back(hoTen, diaChi, soDT, loaiKH);
}

void inDanhSachKhachHang(const vector<KhachHang>& dsKhachHang) {
    for (const auto& kh : dsKhachHang) kh.display();
}

void nhapPhong(vector<Phong>& dsPhong) {
    string tenPhong, loaiPhong;
    cout << "Nhap Ten phong: "; cin.ignore(); getline(cin, tenPhong);
    cout << "Nhap Loai phong (Phong VIP, Phong chat luong cao, Phong Thuong): "; getline(cin, loaiPhong);
    dsPhong.emplace_back(tenPhong, loaiPhong);
}

void inDanhSachPhong(const vector<Phong>& dsPhong) {
    for (const auto& phong : dsPhong) phong.display();
}

void nhapDanhSachThuePhong(vector<DanhSachThuePhong>& dsThuePhong, const vector<KhachHang>& dsKhachHang, const vector<Phong>& dsPhong) {
    int maKH, maPhong;
    tm ngay;
    cout << "Nhap ma KH: "; cin >> maKH;
    cout << "Nhap ma Phong: "; cin >> maPhong;
    cout << "Nhap ngay bat dau thue (YYYY MM DD): "; 
    cin >> ngay.tm_year >> ngay.tm_mon >> ngay.tm_mday;
    ngay.tm_year -= 1900; ngay.tm_mon -= 1; ngay.tm_sec = 0; ngay.tm_min = 0; ngay.tm_hour = 0;
    time_t ngayBatDau = mktime(&ngay);

    KhachHang kh = *find_if(dsKhachHang.begin(), dsKhachHang.end(), [maKH](const KhachHang& kh) { return kh.getMaKH() == maKH; });
    Phong p = *find_if(dsPhong.begin(), dsPhong.end(), [maPhong](const Phong& ph) { return ph.getMaPhong() == maPhong; });
    dsThuePhong.emplace_back(kh, p, ngayBatDau);
}

void sapXepTheoHoTen(vector<DanhSachThuePhong>& dsThuePhong) {
    sort(dsThuePhong.begin(), dsThuePhong.end(), [](const DanhSachThuePhong& a, const DanhSachThuePhong& b) {
        return a.getTenKH() < b.getTenKH();
    });
}

void sapXepTheoTenPhong(vector<DanhSachThuePhong>& dsThuePhong) {
    sort(dsThuePhong.begin(), dsThuePhong.end(), [](const DanhSachThuePhong& a, const DanhSachThuePhong& b) {
        return a.getTenPhong() < b.getTenPhong();
    });
}

void tinhTienThue(const vector<DanhSachThuePhong>& dsThuePhong) {
    for (const auto& thue : dsThuePhong) thue.display();
}

int main() {
    vector<KhachHang> dsKhachHang;
    vector<Phong> dsPhong;
    vector<DanhSachThuePhong> dsThuePhong;

    int chon;
    do {
        cout << "\n1. Nhap danh sach khach hang\n2. In danh sach khach hang\n3. Nhap danh sach phong\n4. In danh sach phong\n"
             << "5. Nhap danh sach thue phong\n6. Sap xep theo ho ten KH\n7. Sap xep theo ten phong\n"
             << "8. Tinh tien thue phong\n0. Thoat\nChon: ";
        cin >> chon;
        switch (chon) {
            case 1: nhapKhachHang(dsKhachHang); break;
            case 2: inDanhSachKhachHang(dsKhachHang); break;
            case 3: nhapPhong(dsPhong); break;
            case 4: inDanhSachPhong(dsPhong); break;
            case 5: nhapDanhSachThuePhong(dsThuePhong, dsKhachHang, dsPhong); break;
            case 6: sapXepTheoHoTen(dsThuePhong); break;
            case 7: sapXepTheoTenPhong(dsThuePhong); break;
            case 8: tinhTienThue(dsThuePhong); break;
        }
    } while (chon != 0);

    return 0;
}

