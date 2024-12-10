# Tổng Hợp Về Crontab

## Cài Đặt Crontab
Để cài đặt `cron` trên các hệ điều hành khác nhau, bạn có thể sử dụng các lệnh sau:

- **Ubuntu/Debian**:
  ```sh
  sudo apt update
  sudo apt install cron
- **CentOS/RHEL**:
  ```sh
  sudo yum install cronie

## Cấu Trúc Crontab

    ```sh
    * * * * * command_to_execute
    - - - - -
    | | | | |
    | | | | +---- Ngày trong tuần (0 - 7) (Chủ nhật = 0 hoặc 7)
    | | | +------ Tháng (1 - 12)
    | | +-------- Ngày trong tháng (1 - 31)
    | +---------- Giờ (0 - 23)
    +------------ Phút (0 - 59)


## Các Lệnh Crontab Thường Dùng
- **Tạo hoặc chỉnh sửa file crontab**:
    ```sh
    crontab -e

- **Xem các tác vụ đã lên lịch**:
    ```sh
    crontab -l

- **Xóa file crontab**:
    ```sh
    crontab -r

## Các Ví Dụ Về Crontab 

- **chạy crontab chạy script 5 phút 1 lần**:
    ```sh
    */5 * * * * /path/to/your/script.sh

- **chạy crontab chạy script vào đầu tháng**:
    ```sh
    0 0 1 * * /path/to/your/script.sh

