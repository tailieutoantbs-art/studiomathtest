import { Chapter, StandardCurriculumChapter, FlatYCCD } from '../types/curriculum';
import { CHEMISTRY_CURRICULUM } from './curriculumChemistry';
import { ENGLISH_CURRICULUM } from './curriculumEnglish';

export const RAW_CURRICULUM: Chapter[] = [
  {
    "id": "VL10-CH1",
    "subject": "VatLi",
    "grade": 10,
    "textbook": "KNTT",
    "order": 1,
    "code": "CH1-VL10",
    "title": "Chương 1. Mở đầu",
    "lessons": [
      {
        "id": "VL10-B1",
        "title": "Bài 1. Làm quen với Vật lí",
        "order": 1,
        "yccds": [
          {
            "id": "VL10-YCCD-001",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.1.1",
            "content": "Nêu được đối tượng nghiên cứu của Vật lí học và mục tiêu của môn Vật lí."
          },
          {
            "id": "VL10-YCCD-002",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.1.2",
            "content": "Phân tích được một số ảnh hưởng của vật lí đối với cuộc sống, đối với sự phát triển của khoa học, công nghệ và kĩ thuật."
          },
          {
            "id": "VL10-YCCD-003",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.1.3",
            "content": "Nêu được ví dụ chứng tỏ kiến thức, kĩ năng vật lí được sử dụng trong một số lĩnh vực công nghiệp, đời sống."
          }
        ]
      },
      {
        "id": "VL10-B2",
        "title": "Bài 2. Các quy tắc an toàn trong phòng thực hành Vật lí",
        "order": 2,
        "yccds": [
          {
            "id": "VL10-YCCD-004",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.1.4",
            "content": "Nêu và thảo luận được các quy tắc an toàn trong nghiên cứu và học tập môn Vật lí."
          },
          {
            "id": "VL10-YCCD-005",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.1.5",
            "content": "Nhận biết các biển cảnh báo nguy hiểm và quy định an toàn khi thao tác với nguồn điện, nhiệt, quang học."
          }
        ]
      },
      {
        "id": "VL10-B3",
        "title": "Bài 3. Thực hành tính sai số trong phép đo. Ghi kết quả đo",
        "order": 3,
        "yccds": [
          {
            "id": "VL10-YCCD-006",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.1.6",
            "content": "Nêu được các loại sai số đơn giản hay gặp khi đo các đại lượng vật lí (sai số hệ thống, sai số ngẫu nhiên) và cách khắc phục."
          },
          {
            "id": "VL10-YCCD-007",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.1.7",
            "content": "Mô tả được các bước tính sai số tuyệt đối, sai số tỉ đối và quy tắc viết đúng kết quả đo của đại lượng vật lí."
          },
          {
            "id": "VL10-YCCD-008",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.1.8",
            "content": "Thực hiện tính toán sai số trực tiếp và gián tiếp từ bảng số liệu thực nghiệm đo đạc cụ thể."
          }
        ]
      }
    ]
  },
  {
    "id": "VL10-CH2",
    "subject": "VatLi",
    "grade": 10,
    "textbook": "KNTT",
    "order": 2,
    "code": "CH2-VL10",
    "title": "Chương II. Động học",
    "lessons": [
      {
        "id": "VL10-B4",
        "title": "Bài 4. Độ dịch chuyển và quãng đường đi được",
        "order": 4,
        "yccds": [
          {
            "id": "VL10-YCCD-009",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.1",
            "content": "Từ hình ảnh hoặc ví dụ thực tiễn, định nghĩa được độ dịch chuyển; so sánh được quãng đường đi được và độ dịch chuyển."
          },
          {
            "id": "VL10-YCCD-010",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.2",
            "content": "Biểu diễn được vectơ độ dịch chuyển trong hệ toạ độ và phân biệt độ lớn độ dịch chuyển với quãng đường."
          },
          {
            "id": "VL10-YCCD-011",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.3",
            "content": "Xác định được độ dịch chuyển tổng hợp và quãng đường trong các bài toán chuyển động thực tế nhiều chặng."
          }
        ]
      },
      {
        "id": "VL10-B5",
        "title": "Bài 5. Tốc độ và vận tốc",
        "order": 5,
        "yccds": [
          {
            "id": "VL10-YCCD-012",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.4",
            "content": "Lập luận rút ra công thức tính tốc độ trung bình, định nghĩa được tốc độ và vận tốc."
          },
          {
            "id": "VL10-YCCD-013",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.5",
            "content": "Dựa vào định nghĩa tốc độ theo một phương và độ dịch chuyển, rút ra công thức tính và định nghĩa vận tốc; phân biệt tốc độ và vận tốc."
          },
          {
            "id": "VL10-YCCD-014",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.6",
            "content": "Vận dụng được công thức tính tốc độ, vận tốc và công thức cộng vận tốc tổng hợp trong các tình huống thực tiễn."
          }
        ]
      },
      {
        "id": "VL10-B6",
        "title": "Bài 6. Thực hành: Đo tốc độ của vật chuyển động",
        "order": 6,
        "yccds": [
          {
            "id": "VL10-YCCD-015",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.7",
            "content": "Thảo luận thiết kế phương án hoặc lựa chọn phương án và thực hiện đo tốc độ bằng dụng cụ thực hành (cổng quang điện, đồng hồ hiện số)."
          },
          {
            "id": "VL10-YCCD-016",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.8",
            "content": "Mô tả được một vài phương pháp đo tốc độ thông dụng và đánh giá được ưu, nhược điểm của chúng."
          }
        ]
      },
      {
        "id": "VL10-B7",
        "title": "Bài 7. Đồ thị độ dịch chuyển – thời gian",
        "order": 7,
        "yccds": [
          {
            "id": "VL10-YCCD-017",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.9",
            "content": "Nhận dạng được dạng đồ thị độ dịch chuyển – thời gian (d – t) trong chuyển động thẳng đều và đứng yên."
          },
          {
            "id": "VL10-YCCD-018",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.10",
            "content": "Tính được tốc độ từ độ dốc của đồ thị độ dịch chuyển – thời gian và vẽ đồ thị dựa trên số liệu cho trước."
          },
          {
            "id": "VL10-YCCD-019",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.11",
            "content": "Khai thác đồ thị (d – t) để xác định thời điểm và vị trí gặp nhau của hai chuyển động thẳng."
          }
        ]
      },
      {
        "id": "VL10-B8",
        "title": "Bài 8. Chuyển động biến đổi. Gia tốc",
        "order": 8,
        "yccds": [
          {
            "id": "VL10-YCCD-020",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.12",
            "content": "Nêu được ý nghĩa, định nghĩa và đơn vị của gia tốc trong chuyển động biến đổi."
          },
          {
            "id": "VL10-YCCD-021",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.13",
            "content": "Lập luận rút ra công thức tính gia tốc a = (v - v0)/t và xác định được tính chất nhanh dần đều, chậm dần đều từ dấu của a và v."
          }
        ]
      },
      {
        "id": "VL10-B9",
        "title": "Bài 9. Chuyển động thẳng biến đổi đều",
        "order": 9,
        "yccds": [
          {
            "id": "VL10-YCCD-022",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.14",
            "content": "Nêu được các phương trình vận tốc, độ dịch chuyển và phương trình liên hệ giữa gia tốc, vận tốc và quãng đường."
          },
          {
            "id": "VL10-YCCD-023",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.15",
            "content": "Vận dụng đồ thị vận tốc – thời gian (v – t) để tính độ dịch chuyển và gia tốc trong một số trường hợp đơn giản."
          },
          {
            "id": "VL10-YCCD-024",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.16",
            "content": "Vận dụng các công thức của chuyển động thẳng biến đổi đều để giải các bài toán chuyển động thực tế (hãm phanh, tăng tốc)."
          }
        ]
      },
      {
        "id": "VL10-B10",
        "title": "Bài 10. Sự rơi tự do",
        "order": 10,
        "yccds": [
          {
            "id": "VL10-YCCD-025",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.17",
            "content": "Nêu được đặc điểm của sự rơi tự do và gia tốc rơi tự do g."
          },
          {
            "id": "VL10-YCCD-026",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.18",
            "content": "Mô tả định tính chuyển động rơi trong trường trọng lực đều khi có và không có sức cản của không khí."
          },
          {
            "id": "VL10-YCCD-027",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.19",
            "content": "Vận dụng các công thức rơi tự do tính thời gian rơi, vận tốc chạm đất và quãng đường đi được trong giây thứ n."
          }
        ]
      },
      {
        "id": "VL10-B11",
        "title": "Bài 11. Thực hành: Đo gia tốc rơi tự do",
        "order": 11,
        "yccds": [
          {
            "id": "VL10-YCCD-028",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.20",
            "content": "Thảo luận thiết kế phương án hoặc lựa chọn phương án và thực hiện đo gia tốc rơi tự do bằng dụng cụ thực hành."
          },
          {
            "id": "VL10-YCCD-029",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.21",
            "content": "Xử lí số liệu thực nghiệm đo gia tốc rơi tự do và viết đúng kết quả đo kèm sai số."
          }
        ]
      },
      {
        "id": "VL10-B12",
        "title": "Bài 12. Chuyển động ném",
        "order": 12,
        "yccds": [
          {
            "id": "VL10-YCCD-030",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.22",
            "content": "Nêu được tính chất chuyển động của vật bị ném ngang theo hai phương Ox (thẳng đều) và Oy (rơi tự do)."
          },
          {
            "id": "VL10-YCCD-031",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.23",
            "content": "Mô tả và giải thích được chuyển động ném ngang; viết phương trình quỹ đạo của vật ném ngang."
          },
          {
            "id": "VL10-YCCD-032",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.2.24",
            "content": "Vận dụng tính tầm xa, thời gian rơi và vận tốc chạm đất trong chuyển động ném ngang hoặc ném xiên."
          }
        ]
      }
    ]
  },
  {
    "id": "VL10-CH3",
    "subject": "VatLi",
    "grade": 10,
    "textbook": "KNTT",
    "order": 3,
    "code": "CH3-VL10",
    "title": "Chương III. Động lực học",
    "lessons": [
      {
        "id": "VL10-B13",
        "title": "Bài 13. Tổng hợp và phân tích lực. Cân bằng lực",
        "order": 13,
        "yccds": [
          {
            "id": "VL10-YCCD-033",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.1",
            "content": "Nêu được định nghĩa lực, tổng hợp lực và quy tắc hình bình hành lực."
          },
          {
            "id": "VL10-YCCD-034",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.2",
            "content": "Dùng hình vẽ tổng hợp các lực đồng quy trên một mặt phẳng và phân tích một lực thành hai lực thành phần vuông góc."
          }
        ]
      },
      {
        "id": "VL10-B14",
        "title": "Bài 14. Định luật 1 Newton",
        "order": 14,
        "yccds": [
          {
            "id": "VL10-YCCD-035",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.3",
            "content": "Phát biểu được định luật 1 Newton và nêu được khái niệm quán tính."
          },
          {
            "id": "VL10-YCCD-036",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.4",
            "content": "Minh hoạ và giải thích được các hiện tượng quán tính trong đời sống và giao thông vận tải."
          }
        ]
      },
      {
        "id": "VL10-B15",
        "title": "Bài 15. Định luật 2 Newton",
        "order": 15,
        "yccds": [
          {
            "id": "VL10-YCCD-037",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.5",
            "content": "Phát biểu được định luật 2 Newton, viết biểu thức F = ma và nêu được khối lượng là đại lượng đặc trưng cho mức quán tính của vật."
          },
          {
            "id": "VL10-YCCD-038",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.6",
            "content": "Vận dụng được mối liên hệ đơn vị dẫn xuất N (newton) với các đơn vị cơ bản kg, m, s trong hệ SI."
          },
          {
            "id": "VL10-YCCD-039",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.7",
            "content": "Vận dụng định luật 2 Newton để tìm gia tốc, lực tác dụng hoặc khối lượng trong các trường hợp vật chịu nhiều lực."
          }
        ]
      },
      {
        "id": "VL10-B16",
        "title": "Bài 16. Định luật 3 Newton",
        "order": 16,
        "yccds": [
          {
            "id": "VL10-YCCD-040",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.8",
            "content": "Phát biểu được định luật 3 Newton và nêu được đặc điểm của cặp lực trực đối (lực và phản lực)."
          },
          {
            "id": "VL10-YCCD-041",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.9",
            "content": "Minh hoạ được bằng ví dụ cụ thể về cặp lực trực đối và phân biệt cặp lực trực đối với cặp lực cân bằng."
          },
          {
            "id": "VL10-YCCD-042",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.10",
            "content": "Vận dụng định luật 3 Newton trong tương tác giữa các vật (chuyển động của tên lửa, người bơi, bóng va vào tường)."
          }
        ]
      },
      {
        "id": "VL10-B17",
        "title": "Bài 17. Trọng lực và lực căng",
        "order": 17,
        "yccds": [
          {
            "id": "VL10-YCCD-043",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.11",
            "content": "Nêu được: trọng lực tác dụng lên vật là lực hấp dẫn giữa Trái Đất và vật; trọng tâm; trọng lượng P = mg; nêu đặc điểm lực căng dây."
          },
          {
            "id": "VL10-YCCD-044",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.12",
            "content": "Biểu diễn bằng hình vẽ vectơ trọng lực và vectơ lực căng dây trong các trạng thái cân bằng cơ bản."
          }
        ]
      },
      {
        "id": "VL10-B18",
        "title": "Bài 18. Lực ma sát",
        "order": 18,
        "yccds": [
          {
            "id": "VL10-YCCD-045",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.13",
            "content": "Nêu được đặc điểm và công thức tính lực ma sát trượt F_mst = μ.N, lực ma sát nghỉ và ma sát lăn."
          },
          {
            "id": "VL10-YCCD-046",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.14",
            "content": "Biểu diễn lực ma sát trên hình vẽ và giải thích vai trò có lợi/có hại của ma sát trong thực tiễn."
          },
          {
            "id": "VL10-YCCD-047",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.15",
            "content": "Vận dụng giải bài toán chuyển động có lực ma sát trên mặt phẳng nằm ngang và mặt phẳng nghiêng."
          }
        ]
      },
      {
        "id": "VL10-B19",
        "title": "Bài 19. Lực cản và lực nâng",
        "order": 19,
        "yccds": [
          {
            "id": "VL10-YCCD-048",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.16",
            "content": "Mô tả được bằng ví dụ thực tiễn lực cản khi vật chuyển động trong chất lưu và lực nâng (Archimedes)."
          },
          {
            "id": "VL10-YCCD-049",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.17",
            "content": "Giải thích nguyên nhân xuất hiện lực nâng và sự phụ thuộc của lực cản vào hình dạng khí động học của vật."
          }
        ]
      },
      {
        "id": "VL10-B20",
        "title": "Bài 20. Một số ví dụ về cách giải các bài toán thuộc phần động lực học",
        "order": 20,
        "yccds": [
          {
            "id": "VL10-YCCD-050",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.18",
            "content": "Mô tả phương pháp động lực học giải bài toán chuyển động: chọn hệ quy chiếu, phân tích lực, viết phương trình định luật 2 Newton."
          },
          {
            "id": "VL10-YCCD-051",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.19",
            "content": "Vận dụng phương pháp động lực học giải bài toán vật chuyển động trên mặt phẳng nghiêng hoặc hệ nhiều vật nối bằng dây."
          }
        ]
      },
      {
        "id": "VL10-B21",
        "title": "Bài 21. Moment lực. Cân bằng của vật rắn",
        "order": 21,
        "yccds": [
          {
            "id": "VL10-YCCD-052",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.20",
            "content": "Nêu được khái niệm moment lực M = F.d, cánh tay đòn, ngẫu lực và tác dụng làm quay của ngẫu lực."
          },
          {
            "id": "VL10-YCCD-053",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.21",
            "content": "Phát biểu quy tắc moment lực và điều kiện cân bằng của một vật có trục quay cố định hoặc vật rắn tổng quát."
          },
          {
            "id": "VL10-YCCD-054",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.22",
            "content": "Vận dụng quy tắc moment lực giải quyết các bài toán đòn bẩy, cân cơ học, cầu bập bênh trong đời sống."
          }
        ]
      },
      {
        "id": "VL10-B22",
        "title": "Bài 22. Thực hành: Tổng hợp lực",
        "order": 22,
        "yccds": [
          {
            "id": "VL10-YCCD-055",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.23",
            "content": "Thực hiện phương án thí nghiệm tổng hợp hai lực đồng quy và hai lực song song cùng chiều bằng dụng cụ thực hành."
          },
          {
            "id": "VL10-YCCD-056",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.3.24",
            "content": "Xử lí số liệu và so sánh độ lớn, hướng của hợp lực thực nghiệm với quy tắc hình bình hành lực."
          }
        ]
      }
    ]
  },
  {
    "id": "VL10-CH4",
    "subject": "VatLi",
    "grade": 10,
    "textbook": "KNTT",
    "order": 4,
    "code": "CH4-VL10",
    "title": "Chương IV. Năng lượng, công, công suất",
    "lessons": [
      {
        "id": "VL10-B23",
        "title": "Bài 23. Năng lượng. Công cơ học",
        "order": 23,
        "yccds": [
          {
            "id": "VL10-YCCD-057",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.4.1",
            "content": "Nêu được biểu thức tính công A = F.s.cosα, đơn vị đo công Joule (1 J = 1 N.m)."
          },
          {
            "id": "VL10-YCCD-058",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.4.2",
            "content": "Phân biệt được công phát động (α < 90°), công cản (α > 90°) và trường hợp lực không sinh công (α = 90°)."
          },
          {
            "id": "VL10-YCCD-059",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.4.3",
            "content": "Tính công của trọng lực, công của lực kéo và công của lực ma sát khi vật dịch chuyển trong các tình huống thực tiễn."
          }
        ]
      },
      {
        "id": "VL10-B24",
        "title": "Bài 24. Công suất",
        "order": 24,
        "yccds": [
          {
            "id": "VL10-YCCD-060",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.4.4",
            "content": "Nêu được định nghĩa công suất P = A/t và đơn vị đo công suất Watt (W)."
          },
          {
            "id": "VL10-YCCD-061",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.4.5",
            "content": "Vận dụng mối liên hệ giữa công suất với lực tác dụng và vận tốc tức thời: P = F.v."
          },
          {
            "id": "VL10-YCCD-062",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.4.6",
            "content": "Giải các bài toán thực tiễn về công suất động cơ ô tô, xe máy khi lên dốc hoặc tăng tốc."
          }
        ]
      },
      {
        "id": "VL10-B25",
        "title": "Bài 25. Động năng, thế năng",
        "order": 25,
        "yccds": [
          {
            "id": "VL10-YCCD-063",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.4.7",
            "content": "Nêu được định nghĩa và công thức tính động năng W_d = 1/2 m.v^2 và thế năng trọng trường W_t = mgh."
          },
          {
            "id": "VL10-YCCD-064",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.4.8",
            "content": "Giải thích định lí động năng: độ biến thiên động năng của một vật bằng tổng công của các ngoại lực tác dụng lên vật."
          }
        ]
      },
      {
        "id": "VL10-B26",
        "title": "Bài 26. Cơ năng và định luật bảo toàn cơ năng",
        "order": 26,
        "yccds": [
          {
            "id": "VL10-YCCD-065",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.4.9",
            "content": "Nêu được khái niệm cơ năng W = W_d + W_t và phát biểu định luật bảo toàn cơ năng trong trọng trường."
          },
          {
            "id": "VL10-YCCD-066",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.4.10",
            "content": "Phân tích sự chuyển hoá giữa động năng và thế năng trong chuyển động của con lắc đơn, vật rơi tự do, tàu lượn siêu tốc."
          },
          {
            "id": "VL10-YCCD-067",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.4.11",
            "content": "Vận dụng định luật bảo toàn cơ năng hoặc định lí biến thiên cơ năng khi có lực ma sát để tính vận tốc, độ cao cực đại."
          }
        ]
      },
      {
        "id": "VL10-B27",
        "title": "Bài 27. Hiệu suất",
        "order": 27,
        "yccds": [
          {
            "id": "VL10-YCCD-068",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.4.12",
            "content": "Nêu được định nghĩa hiệu suất H = (Năng lượng có ích / Năng lượng toàn phần) * 100%."
          },
          {
            "id": "VL10-YCCD-069",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.4.13",
            "content": "Xác định phần năng lượng có ích và phần năng lượng hao phí trong các động cơ nhiệt, máy điện, pin mặt trời."
          }
        ]
      }
    ]
  },
  {
    "id": "VL10-CH5",
    "subject": "VatLi",
    "grade": 10,
    "textbook": "KNTT",
    "order": 5,
    "code": "CH5-VL10",
    "title": "Chương V. Động lượng",
    "lessons": [
      {
        "id": "VL10-B28",
        "title": "Bài 28. Động lượng",
        "order": 28,
        "yccds": [
          {
            "id": "VL10-YCCD-070",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.5.1",
            "content": "Nêu được định nghĩa vectơ động lượng p = m.v, đơn vị đo kg.m/s hoặc N.s."
          },
          {
            "id": "VL10-YCCD-071",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.5.2",
            "content": "Rút ra mối liên hệ giữa xung lượng của lực và độ biến thiên động lượng: Δp = F.Δt."
          }
        ]
      },
      {
        "id": "VL10-B29",
        "title": "Bài 29. Định luật bảo toàn động lượng",
        "order": 29,
        "yccds": [
          {
            "id": "VL10-YCCD-072",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.5.3",
            "content": "Nêu được khái niệm hệ kín và phát biểu định luật bảo toàn động lượng cho hệ kín."
          },
          {
            "id": "VL10-YCCD-073",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.5.4",
            "content": "Phân biệt va chạm đàn hồi (động năng được bảo toàn) và va chạm mềm (hai vật dính liền sau va chạm)."
          },
          {
            "id": "VL10-YCCD-074",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.5.5",
            "content": "Vận dụng định luật bảo toàn động lượng giải bài toán va chạm mềm và chuyển động bằng phản lực (súng giật khi bắn, tên lửa phụt khí)."
          }
        ]
      },
      {
        "id": "VL10-B30",
        "title": "Bài 30. Thực hành: Xác định động lượng của vật trước và sau va chạm",
        "order": 30,
        "yccds": [
          {
            "id": "VL10-YCCD-075",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.5.6",
            "content": "Thực hiện thí nghiệm đo vận tốc của hai xe trước và sau va chạm trên đệm khí để xác định động lượng."
          },
          {
            "id": "VL10-YCCD-076",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.5.7",
            "content": "Đánh giá sai số và kiểm chứng sự bảo toàn động lượng từ kết quả thực nghiệm thu được."
          }
        ]
      }
    ]
  },
  {
    "id": "VL10-CH6",
    "subject": "VatLi",
    "grade": 10,
    "textbook": "KNTT",
    "order": 6,
    "code": "CH6-VL10",
    "title": "Chương VI. Chuyển động tròn",
    "lessons": [
      {
        "id": "VL10-B31",
        "title": "Bài 31. Động học của chuyển động tròn đều",
        "order": 31,
        "yccds": [
          {
            "id": "VL10-YCCD-077",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.6.1",
            "content": "Nêu định nghĩa radian, tốc độ góc ω, chu kì T, tần số f và mối liên hệ v = r.ω."
          },
          {
            "id": "VL10-YCCD-078",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.6.2",
            "content": "Mô tả đặc điểm vectơ vận tốc tức thời trong chuyển động tròn đều (phương tiếp tuyến, chiều theo chiều chuyển động)."
          }
        ]
      },
      {
        "id": "VL10-B32",
        "title": "Bài 32. Lực hướng tâm và gia tốc hướng tâm",
        "order": 32,
        "yccds": [
          {
            "id": "VL10-YCCD-079",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.6.3",
            "content": "Nêu được biểu thức gia tốc hướng tâm a_ht = v^2/r = r.ω^2 và biểu thức lực hướng tâm F_ht = m.a_ht."
          },
          {
            "id": "VL10-YCCD-080",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.6.4",
            "content": "Xác định các lực hoặc hợp lực đóng vai trò là lực hướng tâm (lực hấp dẫn, lực ma sát nghỉ, lực căng dây)."
          },
          {
            "id": "VL10-YCCD-081",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.6.5",
            "content": "Thảo luận và đề xuất giải pháp an toàn khi xe đi vào khúc cua, thiết kế mặt đường nghiêng để chống lật xe."
          }
        ]
      }
    ]
  },
  {
    "id": "VL10-CH7",
    "subject": "VatLi",
    "grade": 10,
    "textbook": "KNTT",
    "order": 7,
    "code": "CH7-VL10",
    "title": "Chương VII. Biến dạng của vật rắn. Áp suất chất lỏng",
    "lessons": [
      {
        "id": "VL10-B33",
        "title": "Bài 33. Biến dạng của vật rắn",
        "order": 33,
        "yccds": [
          {
            "id": "VL10-YCCD-082",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.7.1",
            "content": "Nêu được sự biến dạng kéo, biến dạng nén; mô tả đặc tính giới hạn đàn hồi, độ cứng của lò xo; phát biểu định luật Hooke."
          },
          {
            "id": "VL10-YCCD-083",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.7.2",
            "content": "Mô tả mối liên hệ giữa lực đàn hồi và độ biến dạng của lò xo: F_dh = k.|Δl|."
          },
          {
            "id": "VL10-YCCD-084",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.7.3",
            "content": "Vận dụng định luật Hooke tính độ dãn, độ nén của lò xo trong các bài toán cân bằng hoặc treo vật."
          }
        ]
      },
      {
        "id": "VL10-B34",
        "title": "Bài 34. Khối lượng riêng. Áp suất chất lỏng",
        "order": 34,
        "yccds": [
          {
            "id": "VL10-YCCD-085",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.7.4",
            "content": "Nêu được khối lượng riêng là khối lượng của một đơn vị thể tích; công thức tính áp suất p = F/S và đơn vị Pa (N/m^2)."
          },
          {
            "id": "VL10-YCCD-086",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.7.5",
            "content": "Thành lập và vận dụng công thức độ chênh lệch áp suất chất lỏng Δp = ρ.g.Δh theo độ sâu."
          },
          {
            "id": "VL10-YCCD-087",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL10.7.6",
            "content": "Vận dụng nguyên lí Pascal và công thức áp suất chất lỏng giải thích hoạt động của máy nâng thuỷ lực, bình thông nhau."
          }
        ]
      }
    ]
  },
  {
    "id": "VL11-CH1",
    "subject": "VatLi",
    "grade": 11,
    "textbook": "KNTT",
    "order": 1,
    "code": "CH1-VL11",
    "title": "Chương 1. Dao động",
    "lessons": [
      {
        "id": "VL11-B1",
        "title": "Bài 1. Dao động điều hoà",
        "order": 1,
        "yccds": [
          {
            "id": "VL11-YCCD-001",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.1.1",
            "content": "Nêu được định nghĩa dao động, dao động tuần hoàn, dao động tự do và dao động điều hoà."
          },
          {
            "id": "VL11-YCCD-002",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.1.2",
            "content": "Phân tích phương trình li độ x = A.cos(ωt + φ) và giải thích ý nghĩa các đại lượng: biên độ, chu kì, tần số, pha ban đầu."
          }
        ]
      },
      {
        "id": "VL11-B2",
        "title": "Bài 2. Mô tả dao động điều hoà",
        "order": 2,
        "yccds": [
          {
            "id": "VL11-YCCD-003",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.1.3",
            "content": "Nhận dạng được đồ thị li độ – thời gian có dạng hình sin của dao động điều hoà."
          },
          {
            "id": "VL11-YCCD-004",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.1.4",
            "content": "Xác định biên độ, chu kì, tần số và độ lệch pha giữa hai dao động từ đồ thị hình sin."
          }
        ]
      },
      {
        "id": "VL11-B3",
        "title": "Bài 3. Vận tốc, gia tốc trong dao động điều hoà",
        "order": 3,
        "yccds": [
          {
            "id": "VL11-YCCD-005",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.1.5",
            "content": "Nêu được phương trình vận tốc v = -ωA.sin(ωt + φ) và gia tốc a = -ω^2.A.cos(ωt + φ) = -ω^2.x."
          },
          {
            "id": "VL11-YCCD-006",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.1.6",
            "content": "Mô tả mối quan hệ về pha giữa li độ, vận tốc và gia tốc trong dao động điều hoà."
          },
          {
            "id": "VL11-YCCD-007",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.1.7",
            "content": "Vận dụng hệ thức độc lập với thời gian A^2 = x^2 + v^2/ω^2 để tính vận tốc, li độ ở thời điểm bất kì."
          }
        ]
      },
      {
        "id": "VL11-B4",
        "title": "Bài 4. Bài tập về dao động điều hoà",
        "order": 4,
        "yccds": [
          {
            "id": "VL11-YCCD-008",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.1.8",
            "content": "Giải các bài toán tìm thời gian ngắn nhất, quãng đường đi được và xác định trạng thái dao động tại các thời điểm."
          }
        ]
      },
      {
        "id": "VL11-B5",
        "title": "Bài 5. Động năng. Thế năng. Sự chuyển hoá giữa động năng và thế năng trong dao động điều hoà",
        "order": 5,
        "yccds": [
          {
            "id": "VL11-YCCD-009",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.1.9",
            "content": "Nêu được công thức động năng W_d = 1/2 m v^2, thế năng W_t = 1/2 m ω^2 x^2 và cơ năng W = W_d + W_t."
          },
          {
            "id": "VL11-YCCD-010",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.1.10",
            "content": "Phân tích đồ thị năng lượng theo thời gian và theo li độ; giải thích sự chuyển hoá qua lại giữa động năng và thế năng."
          },
          {
            "id": "VL11-YCCD-011",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.1.11",
            "content": "Tính toán vị trí hoặc vận tốc khi động năng bằng n lần thế năng và giải bài toán bảo toàn cơ năng của con lắc lò xo."
          }
        ]
      },
      {
        "id": "VL11-B6",
        "title": "Bài 6. Dao động tắt dần. Dao động cưỡng bức. Hiện tượng cộng hưởng",
        "order": 6,
        "yccds": [
          {
            "id": "VL11-YCCD-012",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.1.12",
            "content": "Nêu định nghĩa và đặc điểm của dao động tắt dần, dao động duy trì, dao động cưỡng bức và điều kiện xảy ra hiện tượng cộng hưởng."
          },
          {
            "id": "VL11-YCCD-013",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.1.13",
            "content": "Thảo luận và đánh giá sự có lợi hoặc có hại của hiện tượng cộng hưởng trong đời sống và kĩ thuật (cầu sập, bộ giảm xóc xe)."
          }
        ]
      },
      {
        "id": "VL11-B7",
        "title": "Bài 7. Bài tập về sự chuyển năng lượng trong dao động điều hoà",
        "order": 7,
        "yccds": [
          {
            "id": "VL11-YCCD-014",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.1.14",
            "content": "Vận dụng định luật bảo toàn cơ năng giải các bài toán tương tác năng lượng phức tạp trong dao động điều hoà."
          }
        ]
      }
    ]
  },
  {
    "id": "VL11-CH2",
    "subject": "VatLi",
    "grade": 11,
    "textbook": "KNTT",
    "order": 2,
    "code": "CH2-VL11",
    "title": "Chương 2. Sóng",
    "lessons": [
      {
        "id": "VL11-B8",
        "title": "Bài 8. Mô tả sóng",
        "order": 8,
        "yccds": [
          {
            "id": "VL11-YCCD-015",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.2.1",
            "content": "Nêu được định nghĩa sóng cơ, bước sóng λ, biên độ, chu kì, tần số sóng và công thức liên hệ v = λ.f."
          },
          {
            "id": "VL11-YCCD-016",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.2.2",
            "content": "Từ đồ thị độ dịch chuyển – khoảng cách của sóng, xác định được bước sóng, biên độ và chiều truyền sóng."
          }
        ]
      },
      {
        "id": "VL11-B9",
        "title": "Bài 9. Sóng ngang, sóng dọc, sự truyền năng lượng của sóng",
        "order": 9,
        "yccds": [
          {
            "id": "VL11-YCCD-017",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.2.3",
            "content": "Phân biệt được sóng ngang và sóng dọc dựa trên phương dao động của phần tử môi trường so với phương truyền sóng."
          },
          {
            "id": "VL11-YCCD-018",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.2.4",
            "content": "Nêu được ví dụ chứng minh quá trình truyền sóng là quá trình truyền pha dao động và truyền năng lượng chứ không truyền phần tử vật chất."
          }
        ]
      },
      {
        "id": "VL11-B10",
        "title": "Bài 10. Thực hành: Đo tần số của sóng âm",
        "order": 10,
        "yccds": [
          {
            "id": "VL11-YCCD-019",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.2.5",
            "content": "Thảo luận phương án và thực hiện đo tần số sóng âm bằng dao động kí điện tử hoặc cảm biến âm thanh."
          }
        ]
      },
      {
        "id": "VL11-B11",
        "title": "Bài 11. Sóng điện từ",
        "order": 11,
        "yccds": [
          {
            "id": "VL11-YCCD-020",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.2.6",
            "content": "Nêu được định nghĩa sóng điện từ, tốc độ truyền trong chân không c = 3.10^8 m/s và các dải bức xạ trong thang sóng điện từ."
          },
          {
            "id": "VL11-YCCD-021",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.2.7",
            "content": "So sánh bước sóng, tần số và ứng dụng của tia hồng ngoại, ánh sáng nhìn thấy, tia tử ngoại, tia X và tia gamma."
          }
        ]
      },
      {
        "id": "VL11-B12",
        "title": "Bài 12. Giao thoa sóng",
        "order": 12,
        "yccds": [
          {
            "id": "VL11-YCCD-022",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.2.8",
            "content": "Nêu được định nghĩa hiện tượng giao thoa sóng, điều kiện hai nguồn sóng kết hợp và công thức khoảng vân i = λD/a."
          },
          {
            "id": "VL11-YCCD-023",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.2.9",
            "content": "Giải thích được sự hình thành các vân cực đại và vân cực tiểu trong giao thoa sóng nước và sóng ánh sáng."
          },
          {
            "id": "VL11-YCCD-024",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.2.10",
            "content": "Vận dụng công thức i = λD/a để xác định vị trí vân sáng, vân tối hoặc tính bước sóng ánh sáng trong thí nghiệm Young."
          }
        ]
      },
      {
        "id": "VL11-B13",
        "title": "Bài 13. Sóng dừng",
        "order": 13,
        "yccds": [
          {
            "id": "VL11-YCCD-025",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.2.11",
            "content": "Nêu được định nghĩa sóng dừng, nút sóng, bụng sóng và điều kiện có sóng dừng trên dây có hai đầu cố định hoặc một đầu cố định một đầu tự do."
          },
          {
            "id": "VL11-YCCD-026",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.2.12",
            "content": "Xác định khoảng cách giữa hai nút liền kề, hai bụng liền kề (λ/2) và giữa một nút và một bụng liền kề (λ/4)."
          },
          {
            "id": "VL11-YCCD-027",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.2.13",
            "content": "Tính bước sóng, tốc độ truyền sóng hoặc số nút, số bụng sóng trên dây đàn đang dao động."
          }
        ]
      },
      {
        "id": "VL11-B14",
        "title": "Bài 14. Thực hành: Đo tốc độ truyền âm",
        "order": 14,
        "yccds": [
          {
            "id": "VL11-YCCD-028",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.2.14",
            "content": "Thảo luận và tiến hành phương án đo tốc độ truyền âm trong không khí bằng hiện tượng sóng dừng trong ống cộng hưởng."
          },
          {
            "id": "VL11-YCCD-029",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.2.15",
            "content": "Xử lí số liệu thực nghiệm để tính tốc độ truyền âm kèm sai số đo."
          }
        ]
      }
    ]
  },
  {
    "id": "VL11-CH3",
    "subject": "VatLi",
    "grade": 11,
    "textbook": "KNTT",
    "order": 3,
    "code": "CH3-VL11",
    "title": "Chương 3. Điện trường",
    "lessons": [
      {
        "id": "VL11-B15",
        "title": "Bài 15. Năng lượng và tương tác tĩnh điện",
        "order": 15,
        "yccds": [
          {
            "id": "VL11-YCCD-029B",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.3.0",
            "content": "Nêu các hiện tượng nhiễm điện (do cọ xát, tiếp xúc, hưởng ứng) và bản chất hạt mang điện."
          },
          {
            "id": "VL11-YCCD-029C",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.3.0B",
            "content": "Giải thích hiện tượng nhiễm điện của các vật trong tự nhiên và ứng dụng chống tĩnh điện."
          }
        ]
      },
      {
        "id": "VL11-B16",
        "title": "Bài 16. Lực tương tác giữa các điện tích",
        "order": 16,
        "yccds": [
          {
            "id": "VL11-YCCD-030",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.3.1",
            "content": "Phát biểu định luật Coulomb, viết biểu thức F = k.|q1.q2|/r^2 và nêu đơn vị điện tích Coulomb (C)."
          },
          {
            "id": "VL11-YCCD-031",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.3.2",
            "content": "Biểu diễn vectơ lực tương tác Coulomb giữa hai điện tích điểm cùng dấu hoặc trái dấu."
          },
          {
            "id": "VL11-YCCD-032",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.3.3",
            "content": "Vận dụng nguyên lí chồng chất lực điện để xác định lực tổng hợp tác dụng lên một điện tích điểm đặt gần nhiều điện tích khác."
          }
        ]
      },
      {
        "id": "VL11-B17",
        "title": "Bài 17. Khái niệm điện trường",
        "order": 17,
        "yccds": [
          {
            "id": "VL11-YCCD-033",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.3.4",
            "content": "Nêu định nghĩa điện trường, cường độ điện trường E = F/q, đơn vị V/m và đặc điểm đường sức điện."
          },
          {
            "id": "VL11-YCCD-034",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.3.5",
            "content": "Biểu diễn vectơ cường độ điện trường gây bởi một điện tích điểm và vẽ đường sức điện của các hệ điện tích đơn giản."
          }
        ]
      },
      {
        "id": "VL11-B18",
        "title": "Bài 18. Điện trường đều",
        "order": 18,
        "yccds": [
          {
            "id": "VL11-YCCD-035",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.3.6",
            "content": "Nêu định nghĩa điện trường đều và công thức liên hệ E = U/d giữa hai bản phẳng song song tích điện trái dấu."
          },
          {
            "id": "VL11-YCCD-036",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.3.7",
            "content": "Mô tả tác dụng của điện trường đều lên chuyển động của hạt tích điện bay vào vuông góc với đường sức điện."
          }
        ]
      },
      {
        "id": "VL11-B19",
        "title": "Bài 19. Thế năng điện",
        "order": 19,
        "yccds": [
          {
            "id": "VL11-YCCD-037",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.3.8",
            "content": "Nêu được khái niệm công của lực điện trường dịch chuyển điện tích q và công thức thế năng điện W_M = q.V_M."
          },
          {
            "id": "VL11-YCCD-038",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.3.9",
            "content": "Giải thích tính chất không phụ thuộc hình dạng đường đi của công lực điện (lực thế)."
          }
        ]
      },
      {
        "id": "VL11-B20",
        "title": "Bài 20. Điện thế",
        "order": 20,
        "yccds": [
          {
            "id": "VL11-YCCD-039",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.3.10",
            "content": "Nêu được khái niệm điện thế V_M = A_M∞/q, hiệu điện thế U_MN = V_M - V_N = A_MN/q và đơn vị Volt (V)."
          },
          {
            "id": "VL11-YCCD-040",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.3.11",
            "content": "Vận dụng công thức A = q.U và U = E.d để tính công lực điện và hiệu điện thế trong điện trường đều."
          }
        ]
      },
      {
        "id": "VL11-B21",
        "title": "Bài 21. Tụ điện",
        "order": 21,
        "yccds": [
          {
            "id": "VL11-YCCD-041",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.3.12",
            "content": "Nêu định nghĩa tụ điện, điện dung C = Q/U, đơn vị Fara (F) và công thức năng lượng điện trường W = 1/2 C.U^2."
          },
          {
            "id": "VL11-YCCD-042",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.3.13",
            "content": "Vận dụng công thức điện dung tương đương của bộ tụ ghép song song và ghép nối tiếp."
          }
        ]
      }
    ]
  },
  {
    "id": "VL11-CH4",
    "subject": "VatLi",
    "grade": 11,
    "textbook": "KNTT",
    "order": 4,
    "code": "CH4-VL11",
    "title": "Chương 4. Dòng điện không đổi",
    "lessons": [
      {
        "id": "VL11-B22",
        "title": "Bài 22. Cường độ dòng điện",
        "order": 22,
        "yccds": [
          {
            "id": "VL11-YCCD-043",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.4.1",
            "content": "Nêu định nghĩa dòng điện, cường độ dòng điện I = Δq/Δt, đơn vị Ampe (A) và biểu thức I = S.n.v.e."
          },
          {
            "id": "VL11-YCCD-044",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.4.2",
            "content": "Giải thích cơ chế dẫn điện trong kim loại dựa trên sự chuyển động có hướng của các electron tự do dưới tác dụng của điện trường."
          }
        ]
      },
      {
        "id": "VL11-B23",
        "title": "Bài 23. Điện trở. Định luật Ohm",
        "order": 23,
        "yccds": [
          {
            "id": "VL11-YCCD-045",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.4.3",
            "content": "Phát biểu định luật Ohm cho đoạn mạch chỉ có điện trở: I = U/R; nêu đơn vị Ohm (Ω) và công thức điện trở dây dẫn R = ρ.l/S."
          },
          {
            "id": "VL11-YCCD-046",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.4.4",
            "content": "Mô tả đường đặc trưng V – A của dây kim loại và ảnh hưởng của nhiệt độ lên điện trở kim loại, nhiệt điện trở."
          },
          {
            "id": "VL11-YCCD-047",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.4.5",
            "content": "Tính điện trở tương đương, cường độ dòng điện và hiệu điện thế trong mạch điện nối tiếp và song song."
          }
        ]
      },
      {
        "id": "VL11-B24",
        "title": "Bài 24. Nguồn điện",
        "order": 24,
        "yccds": [
          {
            "id": "VL11-YCCD-048",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.4.6",
            "content": "Nêu định nghĩa suất điện động E của nguồn điện và điện trở trong r của nguồn điện."
          },
          {
            "id": "VL11-YCCD-049",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.4.7",
            "content": "Phát biểu định luật Ohm cho toàn mạch kín: I = E/(R_N + r); phân biệt suất điện động và hiệu điện thế hai cực nguồn."
          },
          {
            "id": "VL11-YCCD-050",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.4.8",
            "content": "Vận dụng định luật Ohm cho toàn mạch tính cường độ dòng điện, hiệu điện thế mạch ngoài và hiện tượng đoản mạch."
          }
        ]
      },
      {
        "id": "VL11-B25",
        "title": "Bài 25. Năng lượng điện và công suất điện",
        "order": 25,
        "yccds": [
          {
            "id": "VL11-YCCD-051",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.4.9",
            "content": "Nêu công thức tính công của nguồn điện A_ng = E.I.t và công suất nguồn P_ng = E.I; công suất toả nhiệt Joule - Lenz P = I^2.R."
          },
          {
            "id": "VL11-YCCD-052",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.4.10",
            "content": "Tính hiệu suất của nguồn điện H = U/E * 100% trong mạch kín có điện trở trong."
          },
          {
            "id": "VL11-YCCD-053",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.4.11",
            "content": "Giải bài toán kinh tế tính tiền điện tiêu thụ và tìm điều kiện để mạch ngoài đạt công suất cực đại (R_N = r)."
          }
        ]
      },
      {
        "id": "VL11-B26",
        "title": "Bài 26. Thực hành: Đo suất điện động và điện trở trong của pin điện hoá",
        "order": 26,
        "yccds": [
          {
            "id": "VL11-YCCD-054",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.4.12",
            "content": "Thảo luận thiết kế phương án thí nghiệm đo suất điện động và điện trở trong của pin bằng vôn kế và ampe kế."
          },
          {
            "id": "VL11-YCCD-055",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL11.4.13",
            "content": "Vẽ đồ thị U theo I và xác định suất điện động E cùng điện trở trong r từ toạ độ giao điểm và độ dốc đồ thị."
          }
        ]
      }
    ]
  },
  {
    "id": "VL12-CH1",
    "subject": "VatLi",
    "grade": 12,
    "textbook": "KNTT",
    "order": 1,
    "code": "CH1-VL12",
    "title": "Chương 1. Vật lí nhiệt",
    "lessons": [
      {
        "id": "VL12-B1",
        "title": "Bài 1. Cấu trúc của chất. Sự chuyển thể",
        "order": 1,
        "yccds": [
          {
            "id": "VL12-YCCD-001",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.1.1",
            "content": "Sử dụng mô hình động học phân tử, nêu được sơ lược cấu trúc của chất rắn, chất lỏng, chất khí."
          },
          {
            "id": "VL12-YCCD-002",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.1.2",
            "content": "Giải thích được sơ lược một số hiện tượng vật lí liên quan đến sự chuyển thể: sự nóng chảy, đông đặc, bay hơi, sôi, ngưng tụ."
          }
        ]
      },
      {
        "id": "VL12-B2",
        "title": "Bài 2. Nội năng. Định luật I của nhiệt động lực học",
        "order": 2,
        "yccds": [
          {
            "id": "VL12-YCCD-003",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.1.3",
            "content": "Nêu định nghĩa nội năng và viết hệ thức định luật I của nhiệt động lực học ΔU = A + Q; quy ước dấu của A và Q."
          },
          {
            "id": "VL12-YCCD-004",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.1.4",
            "content": "Phân tích hai cách làm thay đổi nội năng của một vật: thực hiện công và truyền nhiệt."
          },
          {
            "id": "VL12-YCCD-005",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.1.5",
            "content": "Vận dụng định luật I nhiệt động lực học tính độ biến thiên nội năng, nhiệt lượng và công trong các quá trình đẳng áp, đẳng tích."
          }
        ]
      },
      {
        "id": "VL12-B3",
        "title": "Bài 3. Nhiệt độ. Thang nhiệt độ - nhiệt kế",
        "order": 3,
        "yccds": [
          {
            "id": "VL12-YCCD-006",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.1.6",
            "content": "Nêu được nguyên tắc cân bằng nhiệt, định nghĩa độ không tuyệt đối và thang Kelvin, thang Celsius."
          },
          {
            "id": "VL12-YCCD-007",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.1.7",
            "content": "Chuyển đổi được nhiệt độ đo theo thang Celsius sang nhiệt độ đo theo thang Kelvin và ngược lại: T(K) = t(°C) + 273,15."
          }
        ]
      },
      {
        "id": "VL12-B4",
        "title": "Bài 4. Nhiệt dung riêng",
        "order": 4,
        "yccds": [
          {
            "id": "VL12-YCCD-008",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.1.8",
            "content": "Nêu định nghĩa nhiệt dung riêng c, đơn vị J/(kg.K) và công thức nhiệt lượng trao đổi Q = m.c.Δt."
          },
          {
            "id": "VL12-YCCD-009",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.1.9",
            "content": "Giải thích ý nghĩa của nhiệt dung riêng trong thực tiễn (nhiệt dung riêng lớn của nước giúp điều hoà khí hậu vùng duyên hải)."
          },
          {
            "id": "VL12-YCCD-010",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.1.10",
            "content": "Vận dụng phương trình cân bằng nhiệt Q_toa = Q_thu để xác định nhiệt độ cân bằng hoặc nhiệt dung riêng của chất rắn."
          }
        ]
      },
      {
        "id": "VL12-B5",
        "title": "Bài 5. Nhiệt nóng chảy riêng",
        "order": 5,
        "yccds": [
          {
            "id": "VL12-YCCD-011",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.1.11",
            "content": "Nêu định nghĩa nhiệt nóng chảy riêng λ, đơn vị J/kg và công thức tính nhiệt lượng nóng chảy Q = λ.m."
          },
          {
            "id": "VL12-YCCD-012",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.1.12",
            "content": "Giải thích tại sao trong suốt quá trình nóng chảy ở nhiệt độ xác định, nhiệt độ của chất không tăng dù tiếp tục cấp nhiệt lượng."
          }
        ]
      },
      {
        "id": "VL12-B6",
        "title": "Bài 6. Nhiệt hoá hơi riêng",
        "order": 6,
        "yccds": [
          {
            "id": "VL12-YCCD-013",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.1.13",
            "content": "Nêu định nghĩa nhiệt hoá hơi riêng L, đơn vị J/kg và công thức nhiệt lượng hoá hơi Q = L.m."
          },
          {
            "id": "VL12-YCCD-014",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.1.14",
            "content": "Vận dụng các công thức nhiệt tính tổng nhiệt lượng cần cung cấp để chuyển một lượng nước đá từ nhiệt độ âm thành hơi nước sôi."
          }
        ]
      },
      {
        "id": "VL12-B7",
        "title": "Bài 7. Thực hành: Đo nhiệt nóng chảy riêng của nước đá",
        "order": 7,
        "yccds": [
          {
            "id": "VL12-YCCD-015",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.1.15",
            "content": "Thảo luận phương án và thực hiện đo nhiệt nóng chảy riêng của nước đá bằng nhiệt lượng kế điện trở nhiệt."
          }
        ]
      },
      {
        "id": "VL12-B8",
        "title": "Bài 8. Thực hành: Đo nhiệt hoá hơi riêng của nước",
        "order": 8,
        "yccds": [
          {
            "id": "VL12-YCCD-016",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.1.16",
            "content": "Thực hiện phương án đo nhiệt hoá hơi riêng của nước bằng cân điện tử và ấm đun có công suất xác định."
          }
        ]
      }
    ]
  },
  {
    "id": "VL12-CH2",
    "subject": "VatLi",
    "grade": 12,
    "textbook": "KNTT",
    "order": 2,
    "code": "CH2-VL12",
    "title": "Chương 2. Khí lí tưởng",
    "lessons": [
      {
        "id": "VL12-B9",
        "title": "Bài 9. Mô hình động học phân tử chất khí",
        "order": 9,
        "yccds": [
          {
            "id": "VL12-YCCD-017",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.2.1",
            "content": "Nêu các giả thuyết của thuyết động học phân tử chất khí và khái niệm khí lí tưởng."
          },
          {
            "id": "VL12-YCCD-018",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.2.2",
            "content": "Phân tích chuyển động Brown để minh chứng các phân tử khí chuyển động hỗn loạn không ngừng."
          }
        ]
      },
      {
        "id": "VL12-B10",
        "title": "Bài 10. Định luật Boyle",
        "order": 10,
        "yccds": [
          {
            "id": "VL12-YCCD-019",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.2.3",
            "content": "Phát biểu định luật Boyle cho quá trình đẳng nhiệt: p.V = hằng số."
          },
          {
            "id": "VL12-YCCD-020",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.2.4",
            "content": "Vẽ và giải thích đường đẳng nhiệt (nhánh hypebol trên hệ toạ độ p – V)."
          },
          {
            "id": "VL12-YCCD-021",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.2.5",
            "content": "Vận dụng định luật Boyle giải các bài toán nén pit-tông, bọt khí nổi từ đáy hồ lên mặt nước."
          }
        ]
      },
      {
        "id": "VL12-B11",
        "title": "Bài 11. Định luật Charles",
        "order": 11,
        "yccds": [
          {
            "id": "VL12-YCCD-022",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.2.6",
            "content": "Phát biểu định luật Charles cho quá trình đẳng áp: V/T = hằng số."
          },
          {
            "id": "VL12-YCCD-023",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.2.7",
            "content": "Mô tả đường đẳng áp trên hệ toạ độ V – T và mối quan hệ giữa thể tích khí với nhiệt độ tuyệt đối."
          }
        ]
      },
      {
        "id": "VL12-B12",
        "title": "Bài 12. Phương trình trạng thái của khí lí tưởng",
        "order": 12,
        "yccds": [
          {
            "id": "VL12-YCCD-024",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.2.8",
            "content": "Nêu phương trình trạng thái khí lí tưởng p1.V1/T1 = p2.V2/T2 và phương trình Clapeyron - Mendeleev: p.V = n.R.T."
          },
          {
            "id": "VL12-YCCD-025",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.2.9",
            "content": "Vận dụng phương trình trạng thái giải các bài toán biến đổi trạng thái của lượng khí xác định."
          }
        ]
      },
      {
        "id": "VL12-B13",
        "title": "Bài 13. Áp suất khí theo mô hình động học phân tử. Quan hệ giữa động năng phân tử và nhiệt độ",
        "order": 13,
        "yccds": [
          {
            "id": "VL12-YCCD-026",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.2.10",
            "content": "Nêu hệ thức p = 1/3 n.m.(v^2)tb và hệ thức động năng tịnh tiến trung bình W_d = 3/2 k.T."
          },
          {
            "id": "VL12-YCCD-027",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.2.11",
            "content": "Giải thích nguồn gốc vi mô của áp suất chất khí là do sự va chạm của vô số phân tử khí lên thành bình chứa."
          }
        ]
      },
      {
        "id": "VL12-B14",
        "title": "Bài 14. Thực hành: Khảo sát định luật Boyle",
        "order": 14,
        "yccds": [
          {
            "id": "VL12-YCCD-028",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.2.12",
            "content": "Tiến hành thí nghiệm khảo sát định luật Boyle bằng xi-lanh kín và áp kế số."
          },
          {
            "id": "VL12-YCCD-029",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.2.13",
            "content": "Vẽ đồ thị p theo 1/V để kiểm chứng mối quan hệ tỉ lệ thuận giữa áp suất và nghịch đảo thể tích."
          }
        ]
      }
    ]
  },
  {
    "id": "VL12-CH3",
    "subject": "VatLi",
    "grade": 12,
    "textbook": "KNTT",
    "order": 3,
    "code": "CH3-VL12",
    "title": "Chương 3. Từ trường",
    "lessons": [
      {
        "id": "VL12-B15",
        "title": "Bài 15. Từ trường",
        "order": 15,
        "yccds": [
          {
            "id": "VL12-YCCD-030",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.3.1",
            "content": "Nêu định nghĩa từ trường, từ phổ, đường sức từ và các quy tắc xác định chiều đường sức từ của dòng điện thẳng, tròn, ống dây."
          },
          {
            "id": "VL12-YCCD-031",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.3.2",
            "content": "Mô tả hình dạng đường sức từ xung quanh nam châm thẳng, nam châm chữ U và ống dây mang dòng điện."
          }
        ]
      },
      {
        "id": "VL12-B16",
        "title": "Bài 16. Lực từ tác dụng lên dây dẫn mang dòng điện. Cảm ứng từ",
        "order": 16,
        "yccds": [
          {
            "id": "VL12-YCCD-032",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.3.3",
            "content": "Nêu định nghĩa cảm ứng từ B, đơn vị Tesla (T) và biểu thức lực từ Ampere: F = B.I.L.sinθ."
          },
          {
            "id": "VL12-YCCD-033",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.3.4",
            "content": "Vận dụng quy tắc bàn tay trái xác định phương, chiều của lực từ tác dụng lên đoạn dây dẫn mang dòng điện."
          },
          {
            "id": "VL12-YCCD-034",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.3.5",
            "content": "Giải các bài toán cân bằng dây dẫn treo trong từ trường hoặc lực từ tác dụng giữa hai dây dẫn song song mang dòng điện."
          }
        ]
      },
      {
        "id": "VL12-B17",
        "title": "Bài 17. Từ thông. Cảm ứng điện từ",
        "order": 17,
        "yccds": [
          {
            "id": "VL12-YCCD-035",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.3.6",
            "content": "Nêu định nghĩa từ thông Φ = B.S.cosα, đơn vị Weber (Wb) và phát biểu định luật Faraday về suất điện động cảm ứng: e_c = -ΔΦ/Δt."
          },
          {
            "id": "VL12-YCCD-036",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.3.7",
            "content": "Phát biểu định luật Lenz và xác định chiều của dòng điện cảm ứng xuất hiện trong mạch kín."
          },
          {
            "id": "VL12-YCCD-037",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.3.8",
            "content": "Tính suất điện động cảm ứng khi thanh dẫn chuyển động trong từ trường đều hoặc khi từ trường biến thiên theo thời gian."
          }
        ]
      },
      {
        "id": "VL12-B18",
        "title": "Bài 18. Hiện tượng tự cảm",
        "order": 18,
        "yccds": [
          {
            "id": "VL12-YCCD-038",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.3.9",
            "content": "Nêu định nghĩa hiện tượng tự cảm, độ tự cảm L của ống dây và suất điện động tự cảm: e_tc = -L.Δi/Δt."
          },
          {
            "id": "VL12-YCCD-039",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.3.10",
            "content": "Giải thích hiện tượng đóng mạch và ngắt mạch có cuộn cảm (đèn sáng từ từ hoặc loé sáng khi ngắt khoá K)."
          }
        ]
      },
      {
        "id": "VL12-B19",
        "title": "Bài 19. Sóng điện từ",
        "order": 19,
        "yccds": [
          {
            "id": "VL12-YCCD-040",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.3.11",
            "content": "Nêu các tính chất của sóng điện từ: là sóng ngang, lan truyền được trong chân không, các vectơ E và B vuông góc với nhau và vuông góc với v."
          },
          {
            "id": "VL12-YCCD-041",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.3.12",
            "content": "Mô tả nguyên tắc thu phát thông tin liên lạc bằng sóng vô tuyến: biến điệu, khuếch đại, tách sóng."
          }
        ]
      },
      {
        "id": "VL12-B20",
        "title": "Bài 20. Thực hành: Đo cảm ứng từ bằng cân dòng điện",
        "order": 20,
        "yccds": [
          {
            "id": "VL12-YCCD-042",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.3.13",
            "content": "Tiến hành phương án thí nghiệm đo cảm ứng từ B giữa hai cực nam châm bằng cân dòng điện."
          }
        ]
      }
    ]
  },
  {
    "id": "VL12-CH4",
    "subject": "VatLi",
    "grade": 12,
    "textbook": "KNTT",
    "order": 4,
    "code": "CH4-VL12",
    "title": "Chương 4. Vật lí hạt nhân",
    "lessons": [
      {
        "id": "VL12-B21",
        "title": "Bài 21. Cấu tạo và tính chất của hạt nhân",
        "order": 21,
        "yccds": [
          {
            "id": "VL12-YCCD-043",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.4.1",
            "content": "Nêu được kí hiệu hạt nhân ^A_Z X, số proton Z, số neutron N = A - Z, đơn vị khối lượng nguyên tử amu và khái niệm đồng vị."
          },
          {
            "id": "VL12-YCCD-044",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.4.2",
            "content": "Tính số proton, số neutron và số electron trong một nguyên tử hoặc một khối lượng chất cho trước."
          }
        ]
      },
      {
        "id": "VL12-B22",
        "title": "Bài 22. Năng lượng liên kết hạt nhân",
        "order": 22,
        "yccds": [
          {
            "id": "VL12-YCCD-045",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.4.3",
            "content": "Nêu hệ thức Einstein E = m.c^2, công thức tính độ hụt khối Δm và năng lượng liên kết W_lk = Δm.c^2."
          },
          {
            "id": "VL12-YCCD-046",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.4.4",
            "content": "Nêu mối liên hệ giữa năng lượng liên kết riêng (W_lk/A) và độ bền vững của hạt nhân; so sánh độ bền vững của các hạt nhân trung bình."
          },
          {
            "id": "VL12-YCCD-047",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.4.5",
            "content": "Tính năng lượng toả ra hoặc thu vào của một phản ứng hạt nhân dựa trên độ hụt khối hoặc năng lượng liên kết."
          }
        ]
      },
      {
        "id": "VL12-B23",
        "title": "Bài 23. Phản ứng phân hạch và phản ứng nhiệt hạch",
        "order": 23,
        "yccds": [
          {
            "id": "VL12-YCCD-048",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.4.6",
            "content": "Nêu định nghĩa và đặc điểm của phản ứng phân hạch hạt nhân nặng và phản ứng nhiệt hạch hạt nhân nhẹ."
          },
          {
            "id": "VL12-YCCD-049",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.4.7",
            "content": "So sánh năng lượng toả ra và điều kiện xảy ra của phân hạch (dây chuyền điều khiển được trong lò phản ứng) và nhiệt hạch."
          }
        ]
      },
      {
        "id": "VL12-B24",
        "title": "Bài 24. Hiện tượng phóng xạ",
        "order": 24,
        "yccds": [
          {
            "id": "VL12-YCCD-050",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.4.8",
            "content": "Nêu bản chất tự phát của phóng xạ, chu kì bán rã T, hằng số phóng xạ λ = ln2/T và định luật phóng xạ N(t) = N0.2^(-t/T)."
          },
          {
            "id": "VL12-YCCD-051",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.4.9",
            "content": "Mô tả tính chất của các tia phóng xạ α, β-, β+ và γ (bản chất, khả năng đâm xuyên, khả năng ion hoá)."
          },
          {
            "id": "VL12-YCCD-052",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.4.10",
            "content": "Vận dụng định luật phóng xạ xác định tuổi cổ vật bằng đồng vị Carbon-14 hoặc độ phóng xạ của nguồn y tế."
          }
        ]
      },
      {
        "id": "VL12-B25",
        "title": "Bài 25. Phóng xạ nhân tạo và ứng dụng",
        "order": 25,
        "yccds": [
          {
            "id": "VL12-YCCD-053",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.4.11",
            "content": "Nhận biết các biển cảnh báo phóng xạ và nêu quy tắc an toàn bảo vệ cơ thể khỏi bức xạ ion hoá."
          },
          {
            "id": "VL12-YCCD-054",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "VL12.4.12",
            "content": "Nêu các ứng dụng chính của đồng vị phóng xạ trong y tế (xạ trị, máy quét PET), nông nghiệp (chiếu xạ bảo quản) và công nghiệp."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN10-CH1",
    "subject": "Toan",
    "grade": 10,
    "textbook": "KNTT",
    "order": 1,
    "code": "CH1-TOAN10",
    "title": "Chương I: Mệnh đề và tập hợp",
    "lessons": [
      {
        "id": "TOAN10-B1",
        "title": "Bài 1: Mệnh đề",
        "order": 1,
        "yccds": [
          {
            "id": "TOAN10-YCCD-001",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.1.1",
            "content": "Thiết lập và phát biểu được các mệnh đề toán học, bao gồm: mệnh đề phủ định, mệnh đề đảo, mệnh đề tương đương, mệnh đề chứa kí hiệu ∀, ∃; điều kiện cần và đủ."
          },
          {
            "id": "TOAN10-YCCD-002",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.1.2",
            "content": "Xác định được tính đúng/sai của một mệnh đề toán học trong những trường hợp đơn giản."
          }
        ]
      },
      {
        "id": "TOAN10-B2",
        "title": "Bài 2: Tập hợp và các phép toán trên tập hợp",
        "order": 2,
        "yccds": [
          {
            "id": "TOAN10-YCCD-003",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.1.3",
            "content": "Nhận biết các khái niệm cơ bản về tập hợp (tập con, hai tập hợp bằng nhau, tập rỗng) và các kí hiệu ⊂, ⊃, ∅, ∈, ∉."
          },
          {
            "id": "TOAN10-YCCD-004",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.1.4",
            "content": "Thực hiện phép toán trên các tập hợp: giao, hợp, hiệu của hai tập hợp, phần bù của tập con và biểu diễn bằng biểu đồ Venn hoặc trục số."
          },
          {
            "id": "TOAN10-YCCD-005",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.1.5",
            "content": "Giải quyết một số vấn đề thực tiễn gắn với phép toán tập hợp (bài toán đếm số phần tử của hợp các tập hợp, bài toán điều tra học sinh)."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN10-CH2",
    "subject": "Toan",
    "grade": 10,
    "textbook": "KNTT",
    "order": 2,
    "code": "CH2-TOAN10",
    "title": "Chương II: Bất phương trình và hệ bất phương trình bậc nhất hai ẩn",
    "lessons": [
      {
        "id": "TOAN10-B3",
        "title": "Bài 3: Bất phương trình bậc nhất hai ẩn",
        "order": 3,
        "yccds": [
          {
            "id": "TOAN10-YCCD-006",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.2.1",
            "content": "Nhận biết được bất phương trình bậc nhất hai ẩn và nghiệm của bất phương trình bậc nhất hai ẩn."
          },
          {
            "id": "TOAN10-YCCD-007",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.2.2",
            "content": "Biểu diễn miền nghiệm của bất phương trình bậc nhất hai ẩn trên mặt phẳng toạ độ Oxy."
          }
        ]
      },
      {
        "id": "TOAN10-B4",
        "title": "Bài 4: Hệ bất phương trình bậc nhất hai ẩn",
        "order": 4,
        "yccds": [
          {
            "id": "TOAN10-YCCD-008",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.2.3",
            "content": "Nhận biết được hệ bất phương trình bậc nhất hai ẩn và nghiệm của hệ bất phương trình bậc nhất hai ẩn."
          },
          {
            "id": "TOAN10-YCCD-009",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.2.4",
            "content": "Biểu diễn được miền nghiệm của hệ bất phương trình bậc nhất hai ẩn (miền đa giác) trên mặt phẳng toạ độ Oxy."
          },
          {
            "id": "TOAN10-YCCD-010",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.2.5",
            "content": "Vận dụng kiến thức về hệ bất phương trình bậc nhất hai ẩn giải bài toán quy hoạch tuyến tính thực tiễn (tìm cực trị F = ax + by trên miền đa giác)."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN10-CH3",
    "subject": "Toan",
    "grade": 10,
    "textbook": "KNTT",
    "order": 3,
    "code": "CH3-TOAN10",
    "title": "Chương III: Hệ thức lượng trong tam giác",
    "lessons": [
      {
        "id": "TOAN10-B5",
        "title": "Bài 5: Giá trị lượng giác của một góc từ 0° đến 180°",
        "order": 5,
        "yccds": [
          {
            "id": "TOAN10-YCCD-011",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.3.1",
            "content": "Nhận biết giá trị lượng giác sin, cos, tan, cot của một góc từ 0° đến 180° trên nửa đường tròn đơn vị."
          },
          {
            "id": "TOAN10-YCCD-012",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.3.2",
            "content": "Giải thích hệ thức liên hệ giữa giá trị lượng giác của hai góc phụ nhau, bù nhau và sử dụng máy tính cầm tay để tính toán."
          }
        ]
      },
      {
        "id": "TOAN10-B6",
        "title": "Bài 6: Hệ thức lượng trong tam giác",
        "order": 6,
        "yccds": [
          {
            "id": "TOAN10-YCCD-013",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.3.3",
            "content": "Phát biểu định lí côsin, định lí sin và các công thức tính diện tích tam giác (Heron, bán kính đường tròn ngoại tiếp, nội tiếp)."
          },
          {
            "id": "TOAN10-YCCD-014",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.3.4",
            "content": "Mô tả cách giải tam giác: tính các cạnh và các góc của tam giác khi biết một số yếu tố cho trước."
          },
          {
            "id": "TOAN10-YCCD-015",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.3.5",
            "content": "Vận dụng giải tam giác vào giải quyết bài toán đo đạc thực tiễn (xác định khoảng cách giữa hai địa điểm có vật cản, tính chiều cao toà tháp)."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN10-CH4",
    "subject": "Toan",
    "grade": 10,
    "textbook": "KNTT",
    "order": 4,
    "code": "CH4-TOAN10",
    "title": "Chương IV: Vectơ",
    "lessons": [
      {
        "id": "TOAN10-B7",
        "title": "Bài 7: Các khái niệm mở đầu",
        "order": 7,
        "yccds": [
          {
            "id": "TOAN10-YCCD-016",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.4.1",
            "content": "Nhận biết khái niệm vectơ, vectơ cùng phương, cùng hướng, độ dài vectơ, hai vectơ bằng nhau, vectơ-không."
          }
        ]
      },
      {
        "id": "TOAN10-B8",
        "title": "Bài 8: Tổng và hiệu của hai vectơ",
        "order": 8,
        "yccds": [
          {
            "id": "TOAN10-YCCD-017",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.4.2",
            "content": "Nêu quy tắc ba điểm, quy tắc hình bình hành và quy tắc trừ hai vectơ chung gốc."
          },
          {
            "id": "TOAN10-YCCD-018",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.4.3",
            "content": "Thực hiện phép cộng và trừ vectơ; tính độ dài của vectơ tổng và hiệu trong các hình hình học phẳng."
          }
        ]
      },
      {
        "id": "TOAN10-B9",
        "title": "Bài 9: Tích của một vectơ với một số",
        "order": 9,
        "yccds": [
          {
            "id": "TOAN10-YCCD-019",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.4.4",
            "content": "Nêu định nghĩa và các tính chất của phép nhân một số với một vectơ; điều kiện để hai vectơ cùng phương."
          },
          {
            "id": "TOAN10-YCCD-020",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.4.5",
            "content": "Mô tả hệ thức vectơ trung điểm của đoạn thẳng, vectơ trọng tâm tam giác và phân tích một vectơ theo hai vectơ không cùng phương."
          }
        ]
      },
      {
        "id": "TOAN10-B10",
        "title": "Bài 10: Vectơ trong mặt phẳng toạ độ",
        "order": 10,
        "yccds": [
          {
            "id": "TOAN10-YCCD-021",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.4.6",
            "content": "Nhận biết toạ độ của điểm và toạ độ của vectơ đối với hệ toạ độ Oxy; biểu thức toạ độ của các phép toán cộng, trừ vectơ và nhân với một số."
          },
          {
            "id": "TOAN10-YCCD-022",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.4.7",
            "content": "Tìm toạ độ trung điểm của đoạn thẳng, toạ độ trọng tâm tam giác và tính độ dài vectơ khi biết toạ độ hai đầu mút."
          }
        ]
      },
      {
        "id": "TOAN10-B11",
        "title": "Bài 11: Tích vô hướng của hai vectơ",
        "order": 11,
        "yccds": [
          {
            "id": "TOAN10-YCCD-023",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.4.8",
            "content": "Nêu định nghĩa góc giữa hai vectơ, công thức tích vô hướng a.b = |a|.|b|.cos(a, b) và biểu thức toạ độ của tích vô hướng."
          },
          {
            "id": "TOAN10-YCCD-024",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.4.9",
            "content": "Tính góc giữa hai vectơ và chứng minh hai vectơ vuông góc nhau qua điều kiện tích vô hướng bằng 0."
          },
          {
            "id": "TOAN10-YCCD-025",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.4.10",
            "content": "Vận dụng tích vô hướng tính công cơ học của lực tác dụng trong Vật lí hoặc giải các bài toán hình học phẳng."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN10-CH5",
    "subject": "Toan",
    "grade": 10,
    "textbook": "KNTT",
    "order": 5,
    "code": "CH5-TOAN10",
    "title": "Chương V: Các số đặc trưng của mẫu số liệu không ghép nhóm",
    "lessons": [
      {
        "id": "TOAN10-B12",
        "title": "Bài 12: Số gần đúng và sai số",
        "order": 12,
        "yccds": [
          {
            "id": "TOAN10-YCCD-026",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.5.1",
            "content": "Hiểu khái niệm số gần đúng, sai số tuyệt đối, sai số tỉ đối và độ chính xác của số gần đúng."
          },
          {
            "id": "TOAN10-YCCD-027",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.5.2",
            "content": "Thực hiện quy tròn số gần đúng căn cứ vào độ chính xác cho trước."
          }
        ]
      },
      {
        "id": "TOAN10-B13",
        "title": "Bài 13: Các số đặc trưng đo xu thế trung tâm",
        "order": 13,
        "yccds": [
          {
            "id": "TOAN10-YCCD-028",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.5.3",
            "content": "Nêu định nghĩa và ý nghĩa của các số đặc trưng đo xu thế trung tâm: số trung bình cộng, trung vị, tứ phân vị, mốt."
          },
          {
            "id": "TOAN10-YCCD-029",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.5.4",
            "content": "Tính được số trung bình, trung vị, các tứ phân vị Q1, Q2, Q3 và mốt cho một mẫu số liệu không ghép nhóm."
          }
        ]
      },
      {
        "id": "TOAN10-B14",
        "title": "Bài 14: Các số đặc trưng đo độ phân tán",
        "order": 14,
        "yccds": [
          {
            "id": "TOAN10-YCCD-030",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.5.5",
            "content": "Nêu định nghĩa và ý nghĩa của các số đặc trưng đo độ phân tán: khoảng biến thiên, khoảng tứ phân vị, phương sai và độ lệch chuẩn."
          },
          {
            "id": "TOAN10-YCCD-031",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.5.6",
            "content": "Tính khoảng biến thiên, khoảng tứ phân vị, phương sai và độ lệch chuẩn của mẫu số liệu bằng máy tính cầm tay."
          },
          {
            "id": "TOAN10-YCCD-032",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.5.7",
            "content": "Rút ra kết luận và so sánh độ ổn định/mức độ đồng đều của hai mẫu số liệu thực nghiệm trong đời sống."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN10-CH6",
    "subject": "Toan",
    "grade": 10,
    "textbook": "KNTT",
    "order": 6,
    "code": "CH6-TOAN10",
    "title": "Chương VI: Hàm số, đồ thị và ứng dụng",
    "lessons": [
      {
        "id": "TOAN10-B15",
        "title": "Bài 15: Hàm số và đồ thị",
        "order": 15,
        "yccds": [
          {
            "id": "TOAN10-YCCD-033",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.6.1",
            "content": "Nêu các khái niệm cơ bản về hàm số: tập xác định, tập giá trị, hàm số đồng biến, hàm số nghịch biến, đồ thị hàm số."
          },
          {
            "id": "TOAN10-YCCD-034",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.6.2",
            "content": "Mô tả đặc trưng hình học của đồ thị hàm số đồng biến (đi lên từ trái sang phải) và nghịch biến (đi xuống từ trái sang phải)."
          }
        ]
      },
      {
        "id": "TOAN10-B16",
        "title": "Bài 16: Hàm số bậc hai",
        "order": 16,
        "yccds": [
          {
            "id": "TOAN10-YCCD-035",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.6.3",
            "content": "Nêu định nghĩa hàm số bậc hai y = ax^2 + bx + c (a ≠ 0), toạ độ đỉnh I(-b/(2a), -Δ/(4a)) và trục đối xứng x = -b/(2a)."
          },
          {
            "id": "TOAN10-YCCD-036",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.6.4",
            "content": "Lập bảng biến thiên và vẽ Parabol là đồ thị của hàm số bậc hai."
          },
          {
            "id": "TOAN10-YCCD-037",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.6.5",
            "content": "Vận dụng hàm số bậc hai giải bài toán thực tiễn tối ưu (tìm doanh thu lớn nhất, tầm bay cao nhất của vật ném dạng Parabol)."
          }
        ]
      },
      {
        "id": "TOAN10-B17",
        "title": "Bài 17: Dấu của tam thức bậc hai",
        "order": 17,
        "yccds": [
          {
            "id": "TOAN10-YCCD-038",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.6.6",
            "content": "Phát biểu định lí về dấu của tam thức bậc hai f(x) = ax^2 + bx + c (a ≠ 0) qua quan sát đồ thị hoặc biệt thức Δ."
          },
          {
            "id": "TOAN10-YCCD-039",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.6.7",
            "content": "Xét dấu tam thức bậc hai và giải bất phương trình bậc hai một ẩn."
          },
          {
            "id": "TOAN10-YCCD-040",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.6.8",
            "content": "Tìm điều kiện của tham số m để tam thức bậc hai luôn dương hoặc luôn âm trên R."
          }
        ]
      },
      {
        "id": "TOAN10-B18",
        "title": "Bài 18: Phương trình quy về phương trình bậc hai",
        "order": 18,
        "yccds": [
          {
            "id": "TOAN10-YCCD-041",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.6.9",
            "content": "Giải phương trình chứa căn thức dạng √(ax^2 + bx + c) = √(dx^2 + ex + f)."
          },
          {
            "id": "TOAN10-YCCD-042",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.6.10",
            "content": "Giải phương trình chứa căn thức dạng √(ax^2 + bx + c) = dx + e và thử lại nghiệm."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN10-CH7",
    "subject": "Toan",
    "grade": 10,
    "textbook": "KNTT",
    "order": 7,
    "code": "CH7-TOAN10",
    "title": "Chương VII: Phương pháp toạ độ trong mặt phẳng",
    "lessons": [
      {
        "id": "TOAN10-B19",
        "title": "Bài 19: Phương trình đường thẳng",
        "order": 19,
        "yccds": [
          {
            "id": "TOAN10-YCCD-043",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.7.1",
            "content": "Nêu định nghĩa vectơ pháp tuyến, vectơ chỉ phương của đường thẳng; dạng phương trình tham số và phương trình tổng quát."
          },
          {
            "id": "TOAN10-YCCD-044",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.7.2",
            "content": "Viết phương trình tham số và tổng quát của đường thẳng đi qua một điểm và biết VTPT hoặc VTCP; đi qua hai điểm phân biệt."
          }
        ]
      },
      {
        "id": "TOAN10-B20",
        "title": "Bài 20: Vị trí tương đối giữa hai đường thẳng. Góc và khoảng cách",
        "order": 20,
        "yccds": [
          {
            "id": "TOAN10-YCCD-045",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.7.3",
            "content": "Nêu điều kiện để hai đường thẳng cắt nhau, song song, trùng nhau, vuông góc nhau; công thức khoảng cách từ điểm đến đường thẳng."
          },
          {
            "id": "TOAN10-YCCD-046",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.7.4",
            "content": "Tính góc giữa hai đường thẳng và tính khoảng cách từ điểm M(x0, y0) đến đường thẳng Δ: ax + by + c = 0."
          },
          {
            "id": "TOAN10-YCCD-047",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.7.5",
            "content": "Giải bài toán tìm toạ độ đỉnh tam giác, phương trình đường cao, trung tuyến và khoảng cách trong tam giác."
          }
        ]
      },
      {
        "id": "TOAN10-B21",
        "title": "Bài 21: Đường tròn trong mặt phẳng toạ độ",
        "order": 21,
        "yccds": [
          {
            "id": "TOAN10-YCCD-048",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.7.6",
            "content": "Nêu phương trình chính tắc của đường tròn (x - a)^2 + (y - b)^2 = R^2 và điều kiện x^2 + y^2 - 2ax - 2by + c = 0 là phương trình đường tròn."
          },
          {
            "id": "TOAN10-YCCD-049",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.7.7",
            "content": "Xác định tâm và bán kính đường tròn; lập phương trình đường tròn đi qua ba điểm phân biệt."
          },
          {
            "id": "TOAN10-YCCD-050",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.7.8",
            "content": "Viết phương trình tiếp tuyến của đường tròn tại một điểm hoặc khi biết tiếp tuyến song song/vuông góc với đường thẳng cho trước."
          }
        ]
      },
      {
        "id": "TOAN10-B22",
        "title": "Bài 22: Ba đường conic",
        "order": 22,
        "yccds": [
          {
            "id": "TOAN10-YCCD-051",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.7.9",
            "content": "Nhận biết định nghĩa và phương trình chính tắc của Elip x^2/a^2 + y^2/b^2 = 1, Hypebol x^2/a^2 - y^2/b^2 = 1 và Parabol y^2 = 2px."
          },
          {
            "id": "TOAN10-YCCD-052",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.7.10",
            "content": "Xác định các yếu tố đặc trưng của Elip, Hypebol, Parabol: toạ độ các tiêu điểm, các đỉnh, tiêu cự, độ dài trục lớn/nhỏ."
          },
          {
            "id": "TOAN10-YCCD-053",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.7.11",
            "content": "Giải bài toán thực tế gắn với đường conic (gương phản xạ parabol, quỹ đạo chuyển động thiên văn của elip)."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN10-CH8",
    "subject": "Toan",
    "grade": 10,
    "textbook": "KNTT",
    "order": 8,
    "code": "CH8-TOAN10",
    "title": "Chương VIII: Đại số tổ hợp",
    "lessons": [
      {
        "id": "TOAN10-B23",
        "title": "Bài 23: Quy tắc đếm",
        "order": 23,
        "yccds": [
          {
            "id": "TOAN10-YCCD-054",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.8.1",
            "content": "Phát biểu quy tắc cộng, quy tắc nhân và nhận biết khi nào áp dụng quy tắc cộng, quy tắc nhân."
          },
          {
            "id": "TOAN10-YCCD-055",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.8.2",
            "content": "Vận dụng sơ đồ hình cây để đếm số khả năng xuất hiện trong các bài toán đếm nhiều công đoạn."
          }
        ]
      },
      {
        "id": "TOAN10-B24",
        "title": "Bài 24: Hoán vị, chỉnh hợp và tổ hợp",
        "order": 24,
        "yccds": [
          {
            "id": "TOAN10-YCCD-056",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.8.3",
            "content": "Nêu định nghĩa và công thức tính số hoán vị P_n = n!, số chỉnh hợp A_n^k, số tổ hợp C_n^k."
          },
          {
            "id": "TOAN10-YCCD-057",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.8.4",
            "content": "Phân biệt được bài toán chỉnh hợp (có thứ tự sắp xếp) và bài toán tổ hợp (chọn không phân biệt thứ tự); tính toán bằng máy tính cầm tay."
          },
          {
            "id": "TOAN10-YCCD-058",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.8.5",
            "content": "Giải các bài toán đếm phức tạp liên quan đến lập số tự nhiên thoả mãn điều kiện chẵn/lẻ hoặc chia nhóm đối tượng."
          }
        ]
      },
      {
        "id": "TOAN10-B25",
        "title": "Bài 25: Nhị thức Newton",
        "order": 25,
        "yccds": [
          {
            "id": "TOAN10-YCCD-059",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.8.6",
            "content": "Khai triển được nhị thức Newton (a + b)^n với n = 4, n = 5 bằng cách sử dụng các hệ số tổ hợp."
          },
          {
            "id": "TOAN10-YCCD-060",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.8.7",
            "content": "Tìm số hạng chứa x^k trong khai triển nhị thức Newton hoặc tính tổng các hệ số trong khai triển."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN10-CH9",
    "subject": "Toan",
    "grade": 10,
    "textbook": "KNTT",
    "order": 9,
    "code": "CH9-TOAN10",
    "title": "Chương IX: Tính xác suất theo định nghĩa cổ điển",
    "lessons": [
      {
        "id": "TOAN10-B26",
        "title": "Bài 26: Biến cố và định nghĩa cổ điển của xác suất",
        "order": 26,
        "yccds": [
          {
            "id": "TOAN10-YCCD-061",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.9.1",
            "content": "Nhận biết khái niệm phép thử ngẫu nhiên, không gian mẫu Ω, biến cố A, biến cố đối A-ngang và công thức P(A) = n(A)/n(Ω)."
          },
          {
            "id": "TOAN10-YCCD-062",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.9.2",
            "content": "Mô tả không gian mẫu và liệt kê các kết quả thuận lợi cho biến cố trong các phép thử đơn giản (gieo xúc xắc, tung đồng xu)."
          }
        ]
      },
      {
        "id": "TOAN10-B27",
        "title": "Bài 27: Thực hành tính xác suất theo định nghĩa cổ điển",
        "order": 27,
        "yccds": [
          {
            "id": "TOAN10-YCCD-063",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.9.3",
            "content": "Tính xác suất của biến cố trong các bài toán chọn ngẫu nhiên bằng cách sử dụng công thức tổ hợp."
          },
          {
            "id": "TOAN10-YCCD-064",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN10.9.4",
            "content": "Sử dụng biến cố đối để tính xác suất của các bài toán có từ \"ít nhất một\" trong các tình huống thực tiễn đời sống."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN11-CH1",
    "subject": "Toan",
    "grade": 11,
    "textbook": "KNTT",
    "order": 1,
    "code": "CH1-TOAN11",
    "title": "Chương 1. Hàm số lượng giác và phương trình lượng giác",
    "lessons": [
      {
        "id": "TOAN11-B1",
        "title": "Bài 1. Giá trị lượng giác của góc lượng giác",
        "order": 1,
        "yccds": [
          {
            "id": "TOAN11-YCCD-001",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.1.1",
            "content": "Nhận biết khái niệm góc lượng giác, đường tròn lượng giác, số đo bằng radian và hệ thức Chasles."
          },
          {
            "id": "TOAN11-YCCD-002",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.1.2",
            "content": "Tính giá trị lượng giác sin, cos, tan, cot của góc lượng giác và áp dụng quan hệ góc bù, phụ, đối, hơn kém π."
          }
        ]
      },
      {
        "id": "TOAN11-B2",
        "title": "Bài 2. Công thức lượng giác",
        "order": 2,
        "yccds": [
          {
            "id": "TOAN11-YCCD-003",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.1.3",
            "content": "Nêu công thức cộng, công thức nhân đôi, công thức hạ bậc, công thức biến đổi tích thành tổng và tổng thành tích."
          },
          {
            "id": "TOAN11-YCCD-004",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.1.4",
            "content": "Rút gọn biểu thức lượng giác và tính giá trị chính xác của biểu thức lượng giác."
          }
        ]
      },
      {
        "id": "TOAN11-B3",
        "title": "Bài 3. Hàm số lượng giác",
        "order": 3,
        "yccds": [
          {
            "id": "TOAN11-YCCD-005",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.1.5",
            "content": "Nêu định nghĩa, tập xác định, tập giá trị, chu kì và tính chẵn lẻ của 4 hàm số lượng giác: y = sin x, cos x, tan x, cot x."
          },
          {
            "id": "TOAN11-YCCD-006",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.1.6",
            "content": "Vẽ đồ thị và phân tích tính tuần hoàn, khoảng đồng biến, nghịch biến của hàm số lượng giác."
          }
        ]
      },
      {
        "id": "TOAN11-B4",
        "title": "Bài 4. Phương trình lượng giác cơ bản",
        "order": 4,
        "yccds": [
          {
            "id": "TOAN11-YCCD-007",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.1.7",
            "content": "Nhận biết công thức nghiệm của phương trình sin x = m, cos x = m, tan x = m, cot x = m."
          },
          {
            "id": "TOAN11-YCCD-008",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.1.8",
            "content": "Giải phương trình lượng giác đưa về dạng cơ bản và biểu diễn tập nghiệm trên đường tròn lượng giác."
          },
          {
            "id": "TOAN11-YCCD-009",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.1.9",
            "content": "Vận dụng phương trình lượng giác giải bài toán thực tiễn về chu kì thuỷ triều, dao động điều hoà con lắc."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN11-CH2",
    "subject": "Toan",
    "grade": 11,
    "textbook": "KNTT",
    "order": 2,
    "code": "CH2-TOAN11",
    "title": "Chương 2. Dãy số. Cấp số cộng và cấp số nhân",
    "lessons": [
      {
        "id": "TOAN11-B5",
        "title": "Bài 5. Dãy số",
        "order": 5,
        "yccds": [
          {
            "id": "TOAN11-YCCD-010",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.2.1",
            "content": "Nhận biết dãy số hữu hạn, vô hạn, dãy số tăng, dãy số giảm và dãy số bị chặn."
          }
        ]
      },
      {
        "id": "TOAN11-B6",
        "title": "Bài 6. Cấp số cộng",
        "order": 6,
        "yccds": [
          {
            "id": "TOAN11-YCCD-011",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.2.2",
            "content": "Nêu định nghĩa cấp số cộng, công sai d, công thức số hạng tổng quát u_n = u1 + (n - 1)d và tổng S_n."
          },
          {
            "id": "TOAN11-YCCD-012",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.2.3",
            "content": "Tìm số hạng đầu u1, công sai d và tính tổng n số hạng đầu tiên của một cấp số cộng."
          },
          {
            "id": "TOAN11-YCCD-013",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.2.4",
            "content": "Vận dụng cấp số cộng giải bài toán thực tiễn (xếp ghế nhà hát, số tiền gửi tiết kiệm tăng đều)."
          }
        ]
      },
      {
        "id": "TOAN11-B7",
        "title": "Bài 7. Cấp số nhân",
        "order": 7,
        "yccds": [
          {
            "id": "TOAN11-YCCD-014",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.2.5",
            "content": "Nêu định nghĩa cấp số nhân, công bội q, số hạng tổng quát u_n = u1.q^(n - 1) và tổng S_n."
          },
          {
            "id": "TOAN11-YCCD-015",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.2.6",
            "content": "Tìm số hạng đầu u1, công bội q và tính tổng n số hạng đầu tiên của một cấp số nhân."
          },
          {
            "id": "TOAN11-YCCD-016",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.2.7",
            "content": "Vận dụng cấp số nhân mô hình hoá bài toán tăng trưởng dân số, phân bào sinh học, lãi kép ngân hàng."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN11-CH3",
    "subject": "Toan",
    "grade": 11,
    "textbook": "KNTT",
    "order": 3,
    "code": "CH3-TOAN11",
    "title": "Chương 3. Các số đặc trưng đo xu thế trung tâm của mẫu số liệu ghép nhóm",
    "lessons": [
      {
        "id": "TOAN11-B8",
        "title": "Bài 8. Mẫu số liệu ghép nhóm",
        "order": 8,
        "yccds": [
          {
            "id": "TOAN11-YCCD-017",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.3.1",
            "content": "Nhận biết mẫu số liệu ghép nhóm, bảng tần số ghép nhóm và giá trị đại diện của nhóm [a; b)."
          }
        ]
      },
      {
        "id": "TOAN11-B9",
        "title": "Bài 9. Các số đặc trưng đo xu thế trung tâm",
        "order": 9,
        "yccds": [
          {
            "id": "TOAN11-YCCD-018",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.3.2",
            "content": "Tính số trung bình cộng, trung vị, các tứ phân vị và mốt của mẫu số liệu ghép nhóm."
          },
          {
            "id": "TOAN11-YCCD-019",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.3.3",
            "content": "Phân tích ý nghĩa thực tiễn của số trung bình và trung vị trong việc đánh giá mức thu nhập, điểm thi học sinh."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN11-CH4",
    "subject": "Toan",
    "grade": 11,
    "textbook": "KNTT",
    "order": 4,
    "code": "CH4-TOAN11",
    "title": "Chương 4. Quan hệ song song trong không gian",
    "lessons": [
      {
        "id": "TOAN11-B10",
        "title": "Bài 10. Đường thẳng và mặt phẳng trong không gian",
        "order": 10,
        "yccds": [
          {
            "id": "TOAN11-YCCD-020",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.4.1",
            "content": "Nêu các tính chất thừa nhận của hình học không gian, cách xác định một mặt phẳng và khái niệm hình chóp, hình tứ diện."
          },
          {
            "id": "TOAN11-YCCD-021",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.4.2",
            "content": "Tìm giao tuyến của hai mặt phẳng và tìm giao điểm của đường thẳng với mặt phẳng."
          }
        ]
      },
      {
        "id": "TOAN11-B11",
        "title": "Bài 11. Hai đường thẳng song song",
        "order": 11,
        "yccds": [
          {
            "id": "TOAN11-YCCD-022",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.4.3",
            "content": "Nêu vị trí tương đối của hai đường thẳng trong không gian: song song, cắt nhau, trùng nhau, chéo nhau."
          },
          {
            "id": "TOAN11-YCCD-023",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.4.4",
            "content": "Chứng minh hai đường thẳng song song trong không gian qua tính chất đường trung bình hoặc hình bình hành."
          }
        ]
      },
      {
        "id": "TOAN11-B12",
        "title": "Bài 12. Đường thẳng và mặt phẳng song song",
        "order": 12,
        "yccds": [
          {
            "id": "TOAN11-YCCD-024",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.4.5",
            "content": "Nêu điều kiện để đường thẳng song song với mặt phẳng (d // d' ⊂ (α))."
          },
          {
            "id": "TOAN11-YCCD-025",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.4.6",
            "content": "Chứng minh đường thẳng song song với mặt phẳng và dựng thiết diện song song với đường thẳng."
          }
        ]
      },
      {
        "id": "TOAN11-B13",
        "title": "Bài 13. Hai mặt phẳng song song",
        "order": 13,
        "yccds": [
          {
            "id": "TOAN11-YCCD-026",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.4.7",
            "content": "Nêu điều kiện để hai mặt phẳng song song, định lí Thales trong không gian và tính chất hình lăng trụ, hình hộp."
          },
          {
            "id": "TOAN11-YCCD-027",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.4.8",
            "content": "Chứng minh hai mặt phẳng song song và xác định thiết diện của hình chóp/lăng trụ cắt bởi mặt phẳng song song đáy."
          }
        ]
      },
      {
        "id": "TOAN11-B14",
        "title": "Bài 14. Phép chiếu song song",
        "order": 14,
        "yccds": [
          {
            "id": "TOAN11-YCCD-028",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.4.9",
            "content": "Nêu các tính chất của phép chiếu song song và vẽ hình biểu diễn của tam giác, hình bình hành, đường tròn trong không gian."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN11-CH5",
    "subject": "Toan",
    "grade": 11,
    "textbook": "KNTT",
    "order": 5,
    "code": "CH5-TOAN11",
    "title": "Chương 5. Giới hạn. Hàm số liên tục",
    "lessons": [
      {
        "id": "TOAN11-B15",
        "title": "Bài 15. Giới hạn của dãy số",
        "order": 15,
        "yccds": [
          {
            "id": "TOAN11-YCCD-029",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.5.1",
            "content": "Nêu định nghĩa giới hạn của dãy số, các giới hạn cơ bản lim 1/n^k = 0, lim q^n = 0 (|q| < 1) và tổng cấp số nhân lùi vô hạn S = u1/(1 - q)."
          },
          {
            "id": "TOAN11-YCCD-030",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.5.2",
            "content": "Vận dụng các định lí về giới hạn hữu hạn của dãy số để tính giới hạn của phân thức đại số bậc đa thức."
          }
        ]
      },
      {
        "id": "TOAN11-B16",
        "title": "Bài 16. Giới hạn của hàm số",
        "order": 16,
        "yccds": [
          {
            "id": "TOAN11-YCCD-031",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.5.3",
            "content": "Nêu định nghĩa giới hạn hữu hạn của hàm số tại một điểm, giới hạn một phía, giới hạn tại vô cực và giới hạn vô cực."
          },
          {
            "id": "TOAN11-YCCD-032",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.5.4",
            "content": "Tính giới hạn hàm số dạng vô định 0/0 (khử nhân tử chung) và dạng vô cùng / vô cùng."
          },
          {
            "id": "TOAN11-YCCD-033",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.5.5",
            "content": "Tính giới hạn dạng vô cùng - vô cùng bằng cách nhân liên hợp chứa căn thức."
          }
        ]
      },
      {
        "id": "TOAN11-B17",
        "title": "Bài 17. Hàm số liên tục",
        "order": 17,
        "yccds": [
          {
            "id": "TOAN11-YCCD-034",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.5.6",
            "content": "Nêu định nghĩa hàm số liên tục tại một điểm lim(x->x0) f(x) = f(x0), liên tục trên một khoảng, một đoạn."
          },
          {
            "id": "TOAN11-YCCD-035",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.5.7",
            "content": "Xét tính liên tục của hàm số cho bởi nhiều công thức tại điểm ranh giới x0."
          },
          {
            "id": "TOAN11-YCCD-036",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.5.8",
            "content": "Áp dụng định lí Bolzano chứng minh phương trình f(x) = 0 có ít nhất một nghiệm trên khoảng (a; b) nếu f(a).f(b) < 0."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN11-CH6",
    "subject": "Toan",
    "grade": 11,
    "textbook": "KNTT",
    "order": 6,
    "code": "CH6-TOAN11",
    "title": "Chương 6. Hàm số mũ và hàm số lôgarit",
    "lessons": [
      {
        "id": "TOAN11-B18",
        "title": "Bài 18. Luỹ thừa với số mũ thực",
        "order": 18,
        "yccds": [
          {
            "id": "TOAN11-YCCD-037",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.6.1",
            "content": "Nêu định nghĩa luỹ thừa với số mũ nguyên, hữu tỉ và số mũ thực; các tính chất của phép tính luỹ thừa."
          },
          {
            "id": "TOAN11-YCCD-038",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.6.2",
            "content": "Rút gọn biểu thức chứa căn thức và luỹ thừa có số mũ hữu tỉ bằng các tính chất đã học."
          }
        ]
      },
      {
        "id": "TOAN11-B19",
        "title": "Bài 19. Lôgarit",
        "order": 19,
        "yccds": [
          {
            "id": "TOAN11-YCCD-039",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.6.3",
            "content": "Nêu định nghĩa lôgarit log_a(b), lôgarit thập phân, lôgarit tự nhiên ln(b) và các tính chất cơ bản."
          },
          {
            "id": "TOAN11-YCCD-040",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.6.4",
            "content": "Áp dụng công thức đổi cơ số log_a(b) = log_c(b)/log_c(a) để tính toán và biểu diễn biểu thức lôgarit theo các ẩn số cho trước."
          }
        ]
      },
      {
        "id": "TOAN11-B20",
        "title": "Bài 20. Hàm số mũ và hàm số lôgarit",
        "order": 20,
        "yccds": [
          {
            "id": "TOAN11-YCCD-041",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.6.5",
            "content": "Nêu định nghĩa hàm số mũ y = a^x và hàm số lôgarit y = log_a(x) (a > 0, a ≠ 1), tập xác định và tập giá trị."
          },
          {
            "id": "TOAN11-YCCD-042",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.6.6",
            "content": "Vẽ đồ thị và giải thích tính đồng biến (a > 1), nghịch biến (0 < a < 1) của hàm số mũ và lôgarit."
          }
        ]
      },
      {
        "id": "TOAN11-B21",
        "title": "Bài 21. Phương trình, bất phương trình mũ và lôgarit",
        "order": 21,
        "yccds": [
          {
            "id": "TOAN11-YCCD-043",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.6.7",
            "content": "Giải phương trình, bất phương trình mũ và lôgarit cơ bản: a^x = b, log_a(x) = b bằng phương pháp đưa về cùng cơ số."
          },
          {
            "id": "TOAN11-YCCD-044",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.6.8",
            "content": "Giải phương trình mũ/lôgarit bằng phương pháp đặt ẩn phụ và giải quyết bài toán lãi suất ngân hàng, đo nồng độ pH dung dịch."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN11-CH7",
    "subject": "Toan",
    "grade": 11,
    "textbook": "KNTT",
    "order": 7,
    "code": "CH7-TOAN11",
    "title": "Chương 7. Quan hệ vuông góc trong không gian",
    "lessons": [
      {
        "id": "TOAN11-B22",
        "title": "Bài 22. Hai đường thẳng vuông góc",
        "order": 22,
        "yccds": [
          {
            "id": "TOAN11-YCCD-045",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.7.1",
            "content": "Nêu định nghĩa góc giữa hai đường thẳng trong không gian và khái niệm hai đường thẳng vuông góc."
          },
          {
            "id": "TOAN11-YCCD-046",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.7.2",
            "content": "Chứng minh hai đường thẳng vuông góc trong không gian bằng vectơ chỉ phương hoặc quan hệ song song."
          }
        ]
      },
      {
        "id": "TOAN11-B23",
        "title": "Bài 23. Đường thẳng vuông góc với mặt phẳng",
        "order": 23,
        "yccds": [
          {
            "id": "TOAN11-YCCD-047",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.7.3",
            "content": "Nêu điều kiện đường thẳng vuông góc với mặt phẳng (vuông góc với hai đường thẳng cắt nhau nằm trong mp), định lí ba đường vuông góc."
          },
          {
            "id": "TOAN11-YCCD-048",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.7.4",
            "content": "Chứng minh đường thẳng vuông góc với mặt phẳng và xác định hình chiếu vuông góc của một điểm lên mặt phẳng."
          },
          {
            "id": "TOAN11-YCCD-049",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.7.5",
            "content": "Tính góc giữa đường thẳng và mặt phẳng dựa trên hình chiếu vuông góc của đường thẳng lên mặt phẳng đó."
          }
        ]
      },
      {
        "id": "TOAN11-B24",
        "title": "Bài 24. Phép chiếu vuông góc. Góc giữa đường thẳng và mặt phẳng",
        "order": 24,
        "yccds": [
          {
            "id": "TOAN11-YCCD-050A",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.7.5A",
            "content": "Nêu định nghĩa phép chiếu vuông góc và góc giữa đường thẳng với mặt phẳng."
          },
          {
            "id": "TOAN11-YCCD-050B",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.7.5B",
            "content": "Xác định hình chiếu vuông góc và tính góc giữa đường thẳng với mặt phẳng."
          }
        ]
      },
      {
        "id": "TOAN11-B25",
        "title": "Bài 25. Hai mặt phẳng vuông góc",
        "order": 25,
        "yccds": [
          {
            "id": "TOAN11-YCCD-050",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.7.6",
            "content": "Nêu định nghĩa góc giữa hai mặt phẳng, khái niệm góc nhị diện và điều kiện để hai mặt phẳng vuông góc."
          },
          {
            "id": "TOAN11-YCCD-051",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.7.7",
            "content": "Chứng minh hai mặt phẳng vuông góc và tính góc phẳng nhị diện trong các hình chóp, hình lập phương."
          }
        ]
      },
      {
        "id": "TOAN11-B26",
        "title": "Bài 26. Khoảng cách",
        "order": 26,
        "yccds": [
          {
            "id": "TOAN11-YCCD-052",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.7.8",
            "content": "Tính khoảng cách từ một điểm đến một đường thẳng, từ một điểm đến một mặt phẳng trong không gian."
          },
          {
            "id": "TOAN11-YCCD-053",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.7.9",
            "content": "Tính khoảng cách giữa hai đường thẳng chéo nhau bằng cách dựng đường vuông góc chung hoặc mặt phẳng song song chứa một đường thẳng."
          }
        ]
      },
      {
        "id": "TOAN11-B27",
        "title": "Bài 27. Thể tích",
        "order": 27,
        "yccds": [
          {
            "id": "TOAN11-YCCD-054",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.7.10",
            "content": "Nêu công thức tính thể tích khối chóp V = 1/3 S_đáy . h, khối lăng trụ V = S_đáy . h và khối hộp chữ nhật V = a.b.c."
          },
          {
            "id": "TOAN11-YCCD-055",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.7.11",
            "content": "Tính thể tích khối đa diện (hình chóp tam giác, tứ giác đều) khi biết các kích thước cạnh và góc."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN11-CH8",
    "subject": "Toan",
    "grade": 11,
    "textbook": "KNTT",
    "order": 8,
    "code": "CH8-TOAN11",
    "title": "Chương 8. Các quy tắc tính xác suất",
    "lessons": [
      {
        "id": "TOAN11-B28",
        "title": "Bài 28. Biến cố hợp và biến cố giao. Biến cố độc lập",
        "order": 28,
        "yccds": [
          {
            "id": "TOAN11-YCCD-056A",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.8.1A",
            "content": "Nhận biết biến cố hợp, biến cố giao và tính độc lập của hai biến cố."
          }
        ]
      },
      {
        "id": "TOAN11-B29",
        "title": "Bài 29. Công thức cộng xác suất",
        "order": 29,
        "yccds": [
          {
            "id": "TOAN11-YCCD-056",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.8.1",
            "content": "Nêu công thức cộng xác suất P(A ∪ B) = P(A) + P(B) khi hai biến cố xung khắc."
          },
          {
            "id": "TOAN11-YCCD-057",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.8.2",
            "content": "Tính xác suất của biến cố hợp tổng quát: P(A ∪ B) = P(A) + P(B) - P(A ∩ B)."
          }
        ]
      },
      {
        "id": "TOAN11-B30",
        "title": "Bài 30. Công thức nhân xác suất cho hai biến cố độc lập",
        "order": 30,
        "yccds": [
          {
            "id": "TOAN11-YCCD-058",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.8.3",
            "content": "Nêu công thức nhân xác suất P(A ∩ B) = P(A).P(B) khi hai biến cố độc lập."
          },
          {
            "id": "TOAN11-YCCD-059",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.8.4",
            "content": "Vận dụng kết hợp công thức cộng và công thức nhân xác suất trong các bài toán thực tiễn."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN11-CH9",
    "subject": "Toan",
    "grade": 11,
    "textbook": "KNTT",
    "order": 9,
    "code": "CH9-TOAN11",
    "title": "Chương 9. Đạo hàm",
    "lessons": [
      {
        "id": "TOAN11-B31",
        "title": "Bài 31. Định nghĩa và ý nghĩa của đạo hàm",
        "order": 31,
        "yccds": [
          {
            "id": "TOAN11-YCCD-060",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.9.1",
            "content": "Nêu định nghĩa đạo hàm của hàm số tại một điểm, ý nghĩa vật lí (vận tốc tức thời) và ý nghĩa hình học (hệ số góc tiếp tuyến)."
          },
          {
            "id": "TOAN11-YCCD-061",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.9.2",
            "content": "Viết phương trình tiếp tuyến của đồ thị hàm số tại điểm có toạ độ (x0, y0) nằm trên đồ thị: y = f'(x0).(x - x0) + y0."
          }
        ]
      },
      {
        "id": "TOAN11-B32",
        "title": "Bài 32. Các quy tắc tính đạo hàm",
        "order": 32,
        "yccds": [
          {
            "id": "TOAN11-YCCD-062",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.9.3",
            "content": "Nêu đạo hàm của các hàm số sơ cấp cơ bản và quy tắc cộng, trừ, nhân, chia, hàm hợp."
          },
          {
            "id": "TOAN11-YCCD-063",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.9.4",
            "content": "Tính đạo hàm của tổng, hiệu, tích, thương các hàm số và áp dụng công thức đạo hàm hàm hợp."
          }
        ]
      },
      {
        "id": "TOAN11-B33",
        "title": "Bài 33. Đạo hàm cấp hai",
        "order": 33,
        "yccds": [
          {
            "id": "TOAN11-YCCD-064",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.9.5",
            "content": "Nêu định nghĩa đạo hàm cấp hai f''(x) = (f'(x))' và ý nghĩa cơ học của đạo hàm cấp hai."
          },
          {
            "id": "TOAN11-YCCD-065",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN11.9.6",
            "content": "Vận dụng tính đạo hàm cấp hai xác định gia tốc chuyển động của chất điểm tại thời điểm t."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN12-CH1",
    "subject": "Toan",
    "grade": 12,
    "textbook": "KNTT",
    "order": 1,
    "code": "CH1-TOAN12",
    "title": "Chương 1. Ứng dụng đạo hàm để khảo sát và vẽ đồ thị của hàm số",
    "lessons": [
      {
        "id": "TOAN12-B1",
        "title": "Bài 1. Tính đơn điệu và cực trị của hàm số",
        "order": 1,
        "yccds": [
          {
            "id": "TOAN12-YCCD-001",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.1.1",
            "content": "Nhận biết tính đồng biến, nghịch biến của hàm số trên một khoảng dựa vào dấu của đạo hàm cấp một f'(x)."
          },
          {
            "id": "TOAN12-YCCD-002",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.1.2",
            "content": "Nhận biết điểm cực đại, điểm cực tiểu, giá trị cực trị của hàm số thông qua bảng biến thiên hoặc đồ thị."
          },
          {
            "id": "TOAN12-YCCD-003",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.1.3",
            "content": "Tìm khoảng đơn điệu và các điểm cực trị của hàm số đa thức bậc ba, hàm phân thức hữu tỉ."
          }
        ]
      },
      {
        "id": "TOAN12-B2",
        "title": "Bài 2. Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
        "order": 2,
        "yccds": [
          {
            "id": "TOAN12-YCCD-004",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.1.4",
            "content": "Nêu định nghĩa giá trị lớn nhất (GTLN), giá trị nhỏ nhất (GTNN) của hàm số trên tập xác định."
          },
          {
            "id": "TOAN12-YCCD-005",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.1.5",
            "content": "Xác định GTLN, GTNN của hàm số liên tục trên một đoạn [a; b] bằng quy tắc đạo hàm."
          },
          {
            "id": "TOAN12-YCCD-006",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.1.6",
            "content": "Vận dụng GTLN, GTNN giải bài toán tối ưu thực tiễn (tiết kiệm chi phí sản xuất hộp sữa, diện tích chuồng trại lớn nhất)."
          }
        ]
      },
      {
        "id": "TOAN12-B3",
        "title": "Bài 3. Đường tiệm cận của đồ thị hàm số",
        "order": 3,
        "yccds": [
          {
            "id": "TOAN12-YCCD-007",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.1.7",
            "content": "Nhận biết hình ảnh hình học và định nghĩa của đường tiệm cận đứng, tiệm cận ngang và tiệm cận xiên."
          },
          {
            "id": "TOAN12-YCCD-008",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.1.8",
            "content": "Tìm phương trình các đường tiệm cận của đồ thị hàm phân thức bậc nhất trên bậc nhất và bậc hai trên bậc nhất."
          }
        ]
      },
      {
        "id": "TOAN12-B4",
        "title": "Bài 4. Khảo sát sự biến thiên và vẽ đồ thị của hàm số",
        "order": 4,
        "yccds": [
          {
            "id": "TOAN12-YCCD-009",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.1.9",
            "content": "Mô tả sơ đồ tổng quát khảo sát hàm số (TXĐ, tính đơn điệu, cực trị, tiệm cận, bảng biến thiên, đồ thị)."
          },
          {
            "id": "TOAN12-YCCD-010",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.1.10",
            "content": "Khảo sát và vẽ đồ thị của hàm đa thức bậc ba y = ax^3 + bx^2 + cx + d và hàm phân thức (ax+b)/(cx+d)."
          },
          {
            "id": "TOAN12-YCCD-011",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.1.11",
            "content": "Nhận biết tâm đối xứng và trục đối xứng của đồ thị hàm số từ dạng đồ thị."
          }
        ]
      },
      {
        "id": "TOAN12-B5",
        "title": "Bài 5. Ứng dụng thực tế của đạo hàm",
        "order": 5,
        "yccds": [
          {
            "id": "TOAN12-YCCD-012",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.1.12",
            "content": "Vận dụng đạo hàm giải các bài toán tối ưu liên môn trong Vật lí (quãng đường cực đại, công suất cực đại) và kinh tế (lợi nhuận biên)."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN12-CH2",
    "subject": "Toan",
    "grade": 12,
    "textbook": "KNTT",
    "order": 2,
    "code": "CH2-TOAN12",
    "title": "Chương 2. Toạ độ của vectơ trong không gian",
    "lessons": [
      {
        "id": "TOAN12-B6",
        "title": "Bài 6. Vectơ trong không gian",
        "order": 6,
        "yccds": [
          {
            "id": "TOAN12-YCCD-013",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.2.1",
            "content": "Nhận biết vectơ trong không gian, các phép toán cộng, trừ vectơ, nhân với một số và quy tắc hình hộp."
          },
          {
            "id": "TOAN12-YCCD-014",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.2.2",
            "content": "Chứng minh hệ thức vectơ trong hình tứ diện, hình hộp và tính tích vô hướng của hai vectơ trong không gian."
          }
        ]
      },
      {
        "id": "TOAN12-B7",
        "title": "Bài 7. Hệ toạ độ trong không gian",
        "order": 7,
        "yccds": [
          {
            "id": "TOAN12-YCCD-015",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.2.3",
            "content": "Nhận biết hệ toạ độ Oxyz trong không gian, toạ độ của điểm M(x; y; z) và toạ độ của vectơ u = (x; y; z)."
          },
          {
            "id": "TOAN12-YCCD-016",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.2.4",
            "content": "Biểu thức toạ độ của các phép toán vectơ: tổng, hiệu, tích một số với vectơ và toạ độ trung điểm, toạ độ trọng tâm."
          }
        ]
      },
      {
        "id": "TOAN12-B8",
        "title": "Bài 8. Biểu thức toạ độ của các phép toán vectơ",
        "order": 8,
        "yccds": [
          {
            "id": "TOAN12-YCCD-017",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.2.5",
            "content": "Tính độ dài vectơ, khoảng cách giữa hai điểm trong Oxyz, tích vô hướng u.v và góc giữa hai vectơ."
          },
          {
            "id": "TOAN12-YCCD-018",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.2.6",
            "content": "Vận dụng toạ độ vectơ giải các bài toán định vị không gian 3D, hệ toạ độ GPS mặt đất."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN12-CH3",
    "subject": "Toan",
    "grade": 12,
    "textbook": "KNTT",
    "order": 3,
    "code": "CH3-TOAN12",
    "title": "Chương 3. Các số đặc trưng đo mức độ phân tán cho mẫu số liệu ghép nhóm",
    "lessons": [
      {
        "id": "TOAN12-B9",
        "title": "Bài 9. Khoảng biến thiên và khoảng tứ phân vị",
        "order": 9,
        "yccds": [
          {
            "id": "TOAN12-YCCD-019",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.3.1",
            "content": "Nêu định nghĩa và ý nghĩa của khoảng biến thiên R và khoảng tứ phân vị Δ_Q của mẫu số liệu ghép nhóm."
          },
          {
            "id": "TOAN12-YCCD-020",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.3.2",
            "content": "Tính khoảng biến thiên và khoảng tứ phân vị của mẫu số liệu ghép nhóm cho trước."
          }
        ]
      },
      {
        "id": "TOAN12-B10",
        "title": "Bài 10. Phương sai và độ lệch chuẩn",
        "order": 10,
        "yccds": [
          {
            "id": "TOAN12-YCCD-021",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.3.3",
            "content": "Nêu định nghĩa và ý nghĩa của phương sai s^2 và độ lệch chuẩn s của mẫu số liệu ghép nhóm."
          },
          {
            "id": "TOAN12-YCCD-022",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.3.4",
            "content": "Tính phương sai và độ lệch chuẩn của mẫu số liệu ghép nhóm bằng công thức và máy tính cầm tay."
          },
          {
            "id": "TOAN12-YCCD-023",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.3.5",
            "content": "Rút ra kết luận thực tiễn về mức độ rủi ro đầu tư tài chính hoặc độ ổn định của năng suất cây trồng dựa vào phương sai."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN12-CH4",
    "subject": "Toan",
    "grade": 12,
    "textbook": "KNTT",
    "order": 4,
    "code": "CH4-TOAN12",
    "title": "Chương 4. Nguyên hàm và tích phân",
    "lessons": [
      {
        "id": "TOAN12-B11",
        "title": "Bài 11. Nguyên hàm",
        "order": 11,
        "yccds": [
          {
            "id": "TOAN12-YCCD-024",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.4.1",
            "content": "Nêu định nghĩa nguyên hàm, các tính chất cơ bản của nguyên hàm và bảng nguyên hàm của các hàm số sơ cấp cơ bản."
          },
          {
            "id": "TOAN12-YCCD-025",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.4.2",
            "content": "Tìm họ nguyên hàm của các hàm số đa thức, lượng giác, mũ bằng phương pháp trực tiếp hoặc đổi biến số đơn giản."
          }
        ]
      },
      {
        "id": "TOAN12-B12",
        "title": "Bài 12. Tích phân",
        "order": 12,
        "yccds": [
          {
            "id": "TOAN12-YCCD-026",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.4.3",
            "content": "Nêu định nghĩa tích phân theo công thức Newton - Leibniz: ∫(a->b) f(x)dx = F(b) - F(a) và các tính chất của tích phân."
          },
          {
            "id": "TOAN12-YCCD-027",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.4.4",
            "content": "Tính tích phân bằng phương pháp đổi biến số và phương pháp tích phân từng phần: ∫ u dv = u.v - ∫ v du."
          }
        ]
      },
      {
        "id": "TOAN12-B13",
        "title": "Bài 13. Ứng dụng hình học của tích phân",
        "order": 13,
        "yccds": [
          {
            "id": "TOAN12-YCCD-028",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.4.5",
            "content": "Tính diện tích hình phẳng giới hạn bởi đồ thị hàm số y = f(x), trục hoành và hai đường thẳng x = a, x = b: S = ∫(a->b) |f(x)|dx."
          },
          {
            "id": "TOAN12-YCCD-029",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.4.6",
            "content": "Tính thể tích khối tròn xoay khi quay hình phẳng quanh trục Ox: V = π ∫(a->b) [f(x)]^2 dx và giải bài toán tính quãng đường s(t) = ∫ v(t)dt."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN12-CH5",
    "subject": "Toan",
    "grade": 12,
    "textbook": "KNTT",
    "order": 5,
    "code": "CH5-TOAN12",
    "title": "Chương 5. Phương pháp toạ độ trong không gian",
    "lessons": [
      {
        "id": "TOAN12-B14",
        "title": "Bài 14. Phương trình mặt phẳng",
        "order": 14,
        "yccds": [
          {
            "id": "TOAN12-YCCD-030",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.5.1",
            "content": "Nêu định nghĩa vectơ pháp tuyến của mặt phẳng, phương trình tổng quát Ax + By + Cz + D = 0 (A^2 + B^2 + C^2 > 0)."
          },
          {
            "id": "TOAN12-YCCD-031",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.5.2",
            "content": "Lập phương trình mặt phẳng đi qua một điểm có VTPT; đi qua ba điểm không thẳng hàng hoặc qua điểm và vuông góc với đường thẳng."
          },
          {
            "id": "TOAN12-YCCD-032",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.5.3",
            "content": "Tính khoảng cách từ điểm M(x0, y0, z0) đến mặt phẳng (P) và xét vị trí tương đối giữa hai mặt phẳng."
          }
        ]
      },
      {
        "id": "TOAN12-B15",
        "title": "Bài 15. Phương trình đường thẳng trong không gian",
        "order": 15,
        "yccds": [
          {
            "id": "TOAN12-YCCD-033",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.5.4",
            "content": "Nêu định nghĩa vectơ chỉ phương, phương trình tham số và phương trình chính tắc của đường thẳng trong không gian."
          },
          {
            "id": "TOAN12-YCCD-034",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.5.5",
            "content": "Viết phương trình tham số và chính tắc của đường thẳng đi qua một điểm và có VTCP; đi qua hai điểm."
          },
          {
            "id": "TOAN12-YCCD-035",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.5.6",
            "content": "Xét vị trí tương đối giữa hai đường thẳng (song song, cắt nhau, chéo nhau, trùng nhau) và giữa đường thẳng với mặt phẳng."
          }
        ]
      },
      {
        "id": "TOAN12-B16",
        "title": "Bài 16. Công thức tính góc trong không gian",
        "order": 16,
        "yccds": [
          {
            "id": "TOAN12-YCCD-036",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.5.7",
            "content": "Nêu công thức tính góc giữa hai đường thẳng, góc giữa đường thẳng và mặt phẳng, góc giữa hai mặt phẳng trong không gian Oxyz."
          },
          {
            "id": "TOAN12-YCCD-037",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.5.8",
            "content": "Tính góc giữa đường thẳng và mặt phẳng đáy trong khối chóp bằng phương pháp toạ độ hoá hình không gian."
          }
        ]
      },
      {
        "id": "TOAN12-B17",
        "title": "Bài 17. Phương trình mặt cầu",
        "order": 17,
        "yccds": [
          {
            "id": "TOAN12-YCCD-038",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.5.9",
            "content": "Nêu phương trình mặt cầu (x - a)^2 + (y - b)^2 + (z - c)^2 = R^2 và điều kiện phương trình x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0 là mặt cầu."
          },
          {
            "id": "TOAN12-YCCD-039",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.5.10",
            "content": "Xác định tâm I và bán kính R của mặt cầu; viết phương trình mặt cầu biết tâm và tiếp xúc với mặt phẳng hoặc đi qua các điểm."
          },
          {
            "id": "TOAN12-YCCD-040",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.5.11",
            "content": "Xét vị trí tương đối giữa mặt cầu và mặt phẳng (cắt nhau theo đường tròn, tiếp xúc, không giao nhau) và viết phương trình tiếp diện."
          }
        ]
      }
    ]
  },
  {
    "id": "TOAN12-CH6",
    "subject": "Toan",
    "grade": 12,
    "textbook": "KNTT",
    "order": 6,
    "code": "CH6-TOAN12",
    "title": "Chương 6. Xác suất có điều kiện",
    "lessons": [
      {
        "id": "TOAN12-B18",
        "title": "Bài 18. Xác suất có điều kiện",
        "order": 18,
        "yccds": [
          {
            "id": "TOAN12-YCCD-041",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.6.1",
            "content": "Nêu định nghĩa xác suất có điều kiện P(A|B) = P(A ∩ B) / P(B) với P(B) > 0 và ý nghĩa thực tế."
          },
          {
            "id": "TOAN12-YCCD-042",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.6.2",
            "content": "Tính xác suất có điều kiện từ bảng số liệu thống kê 2x2 hoặc mô hình thực nghiệm đơn giản."
          }
        ]
      },
      {
        "id": "TOAN12-B19",
        "title": "Bài 19. Công thức xác suất toàn phần và công thức Bayes",
        "order": 19,
        "yccds": [
          {
            "id": "TOAN12-YCCD-043",
            "level": "NB",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.6.3",
            "content": "Nêu công thức xác suất toàn phần P(A) = ∑ P(Bi).P(A|Bi) và công thức Bayes P(Bk|A) = [P(Bk).P(A|Bk)] / P(A)."
          },
          {
            "id": "TOAN12-YCCD-044",
            "level": "TH",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.6.4",
            "content": "Vận dụng sơ đồ hình cây để phân tích và tính xác suất theo công thức xác suất toàn phần."
          },
          {
            "id": "TOAN12-YCCD-045",
            "level": "VD",
            "sourceDocument": "Thông tư 32/2018/TT-BGDĐT",
            "officialCode": "TOAN12.6.5",
            "content": "Vận dụng công thức Bayes tính xác suất một người thực sự mắc bệnh khi có kết quả xét nghiệm y tế dương tính."
          }
        ]
      }
    ]
  },
  ...CHEMISTRY_CURRICULUM,
  ...ENGLISH_CURRICULUM
];

export const CURRICULUM_DATABASE: StandardCurriculumChapter[] = RAW_CURRICULUM.map(ch => ({
  id: ch.id,
  name: ch.title,
  subject: ch.subject,
  grade: ch.grade,
  order: ch.order,
  lessons: ch.lessons.map(ls => ({
    id: ls.id,
    name: ls.title,
    order: ls.order,
    yccds: ls.yccds.map(y => ({
      id: y.id,
      subject: ch.subject,
      grade: ch.grade,
      chapterId: ch.id,
      chapterName: ch.title,
      lessonId: ls.id,
      lessonName: ls.title,
      defaultLevel: y.level,
      officialText: y.content,
      source: y.sourceDocument || 'Thông tư 32/2018/TT-BGDĐT',
      verified: true
    }))
  }))
}));

// Quick lookup map
const flatYccdMap = new Map<string, FlatYCCD>();
CURRICULUM_DATABASE.forEach(ch => {
  ch.lessons.forEach(ls => {
    ls.yccds.forEach(y => {
      flatYccdMap.set(y.id, y);
    });
  });
});

export function getYCCDById(id: string): FlatYCCD | undefined {
  return flatYccdMap.get(id);
}

export function getCurriculumBySubjectAndGrade(subject: string, grade: number): StandardCurriculumChapter[] {
  return CURRICULUM_DATABASE.filter(ch => ch.subject === subject && ch.grade === grade);
}
