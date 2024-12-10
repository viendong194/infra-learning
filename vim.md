---
title: Vim
layout: default
id: vim
---

# Tổng Hợp Về Vim Trong Terminal

## Cài Đặt Vim
Để cài đặt Vim trên các hệ điều hành khác nhau, bạn có thể sử dụng các lệnh sau:

- **Ubuntu/Debian**:
  ```sh
  sudo apt update
  sudo apt install vim
- **Ubuntu/Debian**:
  ```sh
  brew install vim

# Các Chế Độ Hoạt Động
Vim có nhiều chế độ hoạt động khác nhau, mỗi chế độ phục vụ một mục đích cụ thể:

Normal mode: Chế độ mặc định để điều hướng và chỉnh sửa.
Insert mode: Chế độ chèn văn bản, kích hoạt bằng cách nhấn i.
Visual mode: Chế độ chọn văn bản, kích hoạt bằng cách nhấn v.
Command-line mode: Chế độ nhập lệnh, kích hoạt bằng cách nhấn :.

# Các Lệnh Cơ Bản
Dưới đây là một số lệnh cơ bản trong Vim:

- **Thoát Vim**:
:q - Thoát nếu không có thay đổi.
:q! - Thoát mà không lưu thay đổi.
:wq - Lưu file và thoát.
- **Chèn Văn Bản**:
i - Chèn trước con trỏ.
a - Chèn sau con trỏ.
o - Chèn dòng mới bên dưới dòng hiện tại.
- **Xóa Văn Bản**:
x - Xóa ký tự dưới con trỏ.
dd - Xóa dòng hiện tại.
d{motion} - Xóa theo chuyển động.
- **Sao Chép và Dán**:
yy - Sao chép dòng hiện tại.
p - Dán sau con trỏ.
P - Dán trước con trỏ.