---
title: Chmod - Chown 
layout: default
id: chmod&chown
---


Trong Linux, quyền sở hữu và quyền truy cập tệp là những khái niệm cơ bản giúp quản lý quyền truy cập vào các tệp và thư mục. Dưới đây là giải thích chi tiết:

### Quyền Sở Hữu Tệp
Mỗi tệp và thư mục trong Linux đều có một chủ sở hữu và một nhóm liên kết với nó. Có ba loại chủ sở hữu:

1. **User (Owner)**: Người dùng sở hữu tệp. Mặc định, đây là người tạo ra tệp.
2. **Group**: Một nhóm người dùng. Tất cả các thành viên trong nhóm có cùng quyền truy cập vào tệp.
3. **Other**: Tất cả những người dùng khác có quyền truy cập vào hệ thống nhưng không phải là chủ sở hữu hoặc thành viên của nhóm.

### Quyền Truy Cập Tệp
Quyền truy cập xác định những hành động có thể thực hiện trên một tệp hoặc thư mục. Có ba loại quyền truy cập:

1. **Read (r)**: Cho phép xem nội dung của tệp hoặc liệt kê nội dung của thư mục.
2. **Write (w)**: Cho phép sửa đổi nội dung của tệp hoặc thêm/xóa tệp trong thư mục.
3. **Excute (x)**: Cho phép chạy tệp như một chương trình hoặc truy cập vào thư mục.

### Biểu Diễn Quyền Truy Cập
Quyền truy cập được biểu diễn theo một định dạng cụ thể khi bạn liệt kê các tệp bằng lệnh `ls -l`. Ví dụ:
```bash
-rwxr-xr--
```
Chuỗi này có thể được phân tích như sau:
- Ký tự đầu tiên chỉ loại tệp (`-` cho tệp thường, `d` cho thư mục).
- Ba ký tự tiếp theo (`rwx`) là quyền truy cập của owner.
- Ba ký tự tiếp theo (`r-x`) là quyền truy cập của group.
- Ba ký tự cuối cùng (`r--`) là quyền truy cập của other.

### Thay Đổi Quyền Sở Hữu và Quyền Truy Cập
Bạn có thể thay đổi quyền sở hữu và quyền truy cập bằng các lệnh `chown` và `chmod`.

#### Thay Đổi Quyền Sở Hữu
- **Thay đổi chủ sở hữu**:
  ```bash
  sudo chown newuser filename
  ```
- **Thay đổi chủ sở hữu và nhóm**:
  ```bash
  sudo chown newuser:newgroup filename
  ```

#### Thay Đổi Quyền Truy Cập
- **Sử dụng chế độ ký hiệu**:
  ```bash
  chmod u+rwx,g+rx,o+r filename
  ```
  Lệnh này cấp quyền đọc, ghi và thực thi cho chủ sở hữu, quyền đọc và thực thi cho nhóm, và quyền đọc cho người khác.

- **Sử dụng chế độ số**:
  ```bash
  chmod 755 filename
  ```
  Lệnh này đặt quyền truy cập thành `rwxr-xr-x`, trong đó chủ sở hữu có toàn quyền, và nhóm và người khác có quyền đọc và thực thi.

### Ví Dụ Thực Tế
Giả sử bạn có một tệp `example.txt` với các quyền truy cập sau:
```bash
-rw-r--r--
```
- Chủ sở hữu có thể đọc và ghi.
- Nhóm có thể đọc.
- Người khác có thể đọc.

Để làm cho tệp này có thể thực thi bởi chủ sở hữu, bạn sẽ sử dụng:
```bash
chmod u+x example.txt
```
Bây giờ các quyền truy cập sẽ trông như sau:
```bash
-rwxr--r--
```
