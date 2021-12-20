-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 20, 2021 lúc 09:28 AM
-- Phiên bản máy phục vụ: 10.4.22-MariaDB
-- Phiên bản PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `quan_ly_su_kien`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `event`
--

CREATE TABLE `event` (
  `id_event` int(100) NOT NULL,
  `name` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `organizational_unit` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `type_of_event` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `eventended` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `event`
--

INSERT INTO `event` (`id_event`, `name`, `description`, `image`, `organizational_unit`, `type_of_event`, `eventended`) VALUES
(69, 'Workshop \"Tháng 12 ở Nhật - Lễ giáng sinh và Bonenkai\" ', 'Tháng 12 cũng là lúc Nhật Bản bắt đầu bước sang đông, thời tiết dường như có vẻ khắc nghiệt hơn song đây lại là thời điểm có thể nói là bận rộn và nhộn nhịp nhất trong năm ở Nhật. Trước đây người ta con gọi tháng 12 là “師走”- shiwasu (nghĩa là: đến thầy cũng phải chạy) cho thấy sự tất bật của mọi người lúc này. Ở công sở thì mọi người cố gắng tăng tốc để hoàn thành, tổng kết lại công việc trước thềm năm mới.\nVà không thể không nhắc đến trong tháng 12 chính là 忘年会 ‐ Bonenkai – Tiệc tất niên, thường được tổ chức từ trung tuần tháng 12 cho đến hết năm. Đây là dịp nhân viên công ty họp mặt quây quần trong một không gian ấm cúng, mọi người cùng ăn uống, trò chuyện hết sức vui vẻ với nhau theo tinh thần “làm hết sức chơi hết mình” mà ta thường thấy ở người Nhật.', 'http://localhost:4000/static/upload-1639920906282_workshop.jpg', 'undefined', 'undefined', 0),
(76, 'MÙA ĐÔNG KHÔNG LẠNH VỚI “UEF-NHỮNG CÂU CHUYỆN ĐẸP”,  CHỦ ĐỀ “WARM UP YOUR HEART” ', '', 'http://localhost:4000/static/upload-1639924118722_upload-1639918477073_upload-1639893243518_YouTube.png', 'undefined', 'undefined', 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id_event`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `event`
--
ALTER TABLE `event`
  MODIFY `id_event` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
