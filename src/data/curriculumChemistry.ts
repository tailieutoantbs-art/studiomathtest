import { Chapter } from '../types/curriculum';

export const CHEMISTRY_CURRICULUM: Chapter[] = [
  // ==========================================
  // HÓA HỌC LỚP 10
  // ==========================================
  {
    id: 'HOA10-CH1',
    subject: 'Hoa',
    grade: 10,
    textbook: 'KNTT',
    order: 1,
    code: 'CH1-HOA10',
    title: 'Chương 1. Cấu tạo nguyên tử',
    lessons: [
      {
        id: 'HOA10-B1',
        title: 'Bài 1. Thành phần của nguyên tử',
        order: 1,
        yccds: [
          {
            id: 'HOA10-YCCD-001',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.1.1',
            content: 'Nêu được các thành phần cấu tạo nên nguyên tử (hạt electron, proton, neutron); điện tích và khối lượng của từng loại hạt.'
          },
          {
            id: 'HOA10-YCCD-002',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.1.2',
            content: 'So sánh được khối lượng của electron với proton và neutron; kích thước của hạt nhân với kích thước toàn nguyên tử.'
          },
          {
            id: 'HOA10-YCCD-003',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.1.3',
            content: 'Tính toán được khối lượng nguyên tử tuyệt đối và khối lượng nguyên tử tương đối (amu) dựa vào số hạt cấu thành.'
          }
        ]
      },
      {
        id: 'HOA10-B2',
        title: 'Bài 2. Nguyên tố hoá học',
        order: 2,
        yccds: [
          {
            id: 'HOA10-YCCD-004',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.1.4',
            content: 'Phát biểu được khái niệm nguyên tố hoá học, số hiệu nguyên tử (Z), số khối (A) và kí hiệu nguyên tử.'
          },
          {
            id: 'HOA10-YCCD-005',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.1.5',
            content: 'Giải thích được khái niệm đồng vị; phân biệt được các đồng vị của cùng một nguyên tố hoá học.'
          },
          {
            id: 'HOA10-YCCD-006',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.1.6',
            content: 'Tính được nguyên tử khối trung bình của một nguyên tố hoá học dựa vào thành phần phần trăm số nguyên tử của các đồng vị.'
          }
        ]
      },
      {
        id: 'HOA10-B3',
        title: 'Bài 3. Cấu trúc lớp vỏ electron nguyên tử',
        order: 3,
        yccds: [
          {
            id: 'HOA10-YCCD-007',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.1.7',
            content: 'Nêu được khái niệm orbital nguyên tử (AO), hình dạng của AO s và AO p; các lớp và phân lớp electron.'
          },
          {
            id: 'HOA10-YCCD-008',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.1.8',
            content: 'Trình bày và áp dụng được các nguyên lí vững bền, nguyên lí Pauli và quy tắc Hund để điền electron vào các AO.'
          },
          {
            id: 'HOA10-YCCD-009',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.1.9',
            content: 'Viết được cấu hình electron nguyên tử cho 20 nguyên tố đầu tiên và ion tương ứng; dự đoán tính chất kim loại, phi kim, khí hiếm.'
          }
        ]
      }
    ]
  },
  {
    id: 'HOA10-CH2',
    subject: 'Hoa',
    grade: 10,
    textbook: 'KNTT',
    order: 2,
    code: 'CH2-HOA10',
    title: 'Chương 2. Bảng tuần hoàn các nguyên tố hoá học',
    lessons: [
      {
        id: 'HOA10-B4',
        title: 'Bài 4. Cấu tạo bảng tuần hoàn các nguyên tố hoá học',
        order: 1,
        yccds: [
          {
            id: 'HOA10-YCCD-010',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.2.1',
            content: 'Nêu được nguyên tắc sắp xếp các nguyên tố trong bảng tuần hoàn; khái niệm ô nguyên tố, chu kì và nhóm (nhóm A, nhóm B).'
          },
          {
            id: 'HOA10-YCCD-011',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.2.2',
            content: 'Mô tả được mối quan hệ giữa cấu hình electron nguyên tử với vị trí (ô, chu kì, nhóm) của nguyên tố trong bảng tuần hoàn.'
          }
        ]
      },
      {
        id: 'HOA10-B5',
        title: 'Bài 5. Xu hướng biến đổi một số tính chất của nguyên tử và hợp chất',
        order: 2,
        yccds: [
          {
            id: 'HOA10-YCCD-012',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.2.3',
            content: 'Nêu được xu hướng biến đổi bán kính nguyên tử, độ âm điện, tính kim loại và tính phi kim trong một chu kì và trong một nhóm A.'
          },
          {
            id: 'HOA10-YCCD-013',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.2.4',
            content: 'Giải thích được xu hướng biến đổi tính acid, tính base của các oxide và hydroxide theo chu kì và nhóm A.'
          },
          {
            id: 'HOA10-YCCD-014',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.2.5',
            content: 'So sánh được tính chất hoá học (tính kim loại, phi kim, tính acid - base) của các nguyên tố và hợp chất dựa vào vị trí trong bảng tuần hoàn.'
          }
        ]
      }
    ]
  },
  {
    id: 'HOA10-CH3',
    subject: 'Hoa',
    grade: 10,
    textbook: 'KNTT',
    order: 3,
    code: 'CH3-HOA10',
    title: 'Chương 3. Liên kết hoá học',
    lessons: [
      {
        id: 'HOA10-B6',
        title: 'Bài 6. Quy tắc octet và liên kết ion',
        order: 1,
        yccds: [
          {
            id: 'HOA10-YCCD-015',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.3.1',
            content: 'Nêu được quy tắc octet; định nghĩa liên kết ion và bản chất của liên kết ion.'
          },
          {
            id: 'HOA10-YCCD-016',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.3.2',
            content: 'Trình bày được sự hình thành liên kết ion trong các hợp chất đơn giản (ví dụ NaCl, MgO, CaCl2).'
          }
        ]
      },
      {
        id: 'HOA10-B7',
        title: 'Bài 7. Liên kết cộng hoá trị',
        order: 2,
        yccds: [
          {
            id: 'HOA10-YCCD-017',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.3.3',
            content: 'Nêu được định nghĩa liên kết cộng hoá trị (không cực, có cực); liên kết cho - nhận; liên kết đơn, đôi, ba.'
          },
          {
            id: 'HOA10-YCCD-018',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.3.4',
            content: 'Mô tả được sự tạo thành liên kết cộng hoá trị thông qua sự xen phủ orbital (xen phủ trục sigma, xen phủ bên pi).'
          },
          {
            id: 'HOA10-YCCD-019',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.3.5',
            content: 'Dựa vào hiệu độ âm điện để dự đoán loại liên kết (ion, cộng hoá trị không cực, cộng hoá trị có cực) trong phân tử.'
          }
        ]
      },
      {
        id: 'HOA10-B8',
        title: 'Bài 8. Liên kết hydrogen và tương tác van der Waals',
        order: 3,
        yccds: [
          {
            id: 'HOA10-YCCD-020',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.3.6',
            content: 'Trình bày được bản chất của liên kết hydrogen và tương tác van der Waals giữa các phân tử.'
          },
          {
            id: 'HOA10-YCCD-021',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.3.7',
            content: 'Giải thích được ảnh hưởng của liên kết hydrogen đến nhiệt độ sôi, nhiệt độ nóng chảy và độ tan trong nước của H2O, HF, NH3, ethanol.'
          }
        ]
      }
    ]
  },
  {
    id: 'HOA10-CH4',
    subject: 'Hoa',
    grade: 10,
    textbook: 'KNTT',
    order: 4,
    code: 'CH4-HOA10',
    title: 'Chương 4. Phản ứng oxi hoá – khử',
    lessons: [
      {
        id: 'HOA10-B9',
        title: 'Bài 9. Phản ứng oxi hoá – khử',
        order: 1,
        yccds: [
          {
            id: 'HOA10-YCCD-022',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.4.1',
            content: 'Nêu được quy tắc xác định số oxi hoá của các nguyên tố trong đơn chất và hợp chất.'
          },
          {
            id: 'HOA10-YCCD-023',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.4.2',
            content: 'Phân biệt được chất khử, chất oxi hoá, quá trình khử (sự khử), quá trình oxi hoá (sự oxi hoá) trong một phản ứng cụ thể.'
          },
          {
            id: 'HOA10-YCCD-024',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.4.3',
            content: 'Cân bằng được phản ứng oxi hoá – khử theo phương pháp thăng bằng electron (kể cả môi trường và phản ứng tự oxi hoá - khử).'
          }
        ]
      }
    ]
  },
  {
    id: 'HOA10-CH5',
    subject: 'Hoa',
    grade: 10,
    textbook: 'KNTT',
    order: 5,
    code: 'CH5-HOA10',
    title: 'Chương 5. Năng lượng hoá học',
    lessons: [
      {
        id: 'HOA10-B10',
        title: 'Bài 10. Biến thiên enthalpy của phản ứng hoá học',
        order: 1,
        yccds: [
          {
            id: 'HOA10-YCCD-025',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.5.1',
            content: 'Nêu được định nghĩa phản ứng toả nhiệt, thu nhiệt; khái niệm biến thiên enthalpy chuẩn (ΔrHo298) và nhiệt tạo thành chuẩn (ΔfHo298).'
          },
          {
            id: 'HOA10-YCCD-026',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.5.2',
            content: 'Trình bày được ý nghĩa dấu của biến thiên enthalpy (ΔrHo298 < 0 là toả nhiệt, ΔrHo298 > 0 là thu nhiệt) đối với mức độ thuận lợi của phản ứng.'
          },
          {
            id: 'HOA10-YCCD-027',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.5.3',
            content: 'Tính được biến thiên enthalpy của phản ứng dựa vào nhiệt tạo thành chuẩn của các chất hoặc năng lượng liên kết (Eb).'
          }
        ]
      }
    ]
  },
  {
    id: 'HOA10-CH6',
    subject: 'Hoa',
    grade: 10,
    textbook: 'KNTT',
    order: 6,
    code: 'CH6-HOA10',
    title: 'Chương 6. Tốc độ phản ứng hoá học',
    lessons: [
      {
        id: 'HOA10-B11',
        title: 'Bài 11. Tốc độ phản ứng và các yếu tố ảnh hưởng',
        order: 1,
        yccds: [
          {
            id: 'HOA10-YCCD-028',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.6.1',
            content: 'Nêu được khái niệm tốc độ phản ứng hoá học và tốc độ trung bình của phản ứng; định luật tác dụng khối lượng.'
          },
          {
            id: 'HOA10-YCCD-029',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.6.2',
            content: 'Trình bày và giải thích được các yếu tố ảnh hưởng đến tốc độ phản ứng: nồng độ, nhiệt độ, áp suất, diện tích tiếp xúc và chất xúc tác.'
          },
          {
            id: 'HOA10-YCCD-030',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.6.3',
            content: 'Vận dụng hệ số nhiệt độ Van’t Hoff để tính tốc độ phản ứng khi thay đổi nhiệt độ; giải thích các ứng dụng thực tế về kiểm soát tốc độ phản ứng.'
          }
        ]
      }
    ]
  },
  {
    id: 'HOA10-CH7',
    subject: 'Hoa',
    grade: 10,
    textbook: 'KNTT',
    order: 7,
    code: 'CH7-HOA10',
    title: 'Chương 7. Nguyên tố nhóm VIIA (Nhóm halogen)',
    lessons: [
      {
        id: 'HOA10-B12',
        title: 'Bài 12. Đơn chất halogen và hydrogen halide',
        order: 1,
        yccds: [
          {
            id: 'HOA10-YCCD-031',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.7.1',
            content: 'Nêu được trạng thái tự nhiên, tính chất vật lí và tính chất hoá học đặc trưng của các đơn chất halogen (F2, Cl2, Br2, I2).'
          },
          {
            id: 'HOA10-YCCD-032',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.7.2',
            content: 'So sánh được xu hướng biến đổi tính oxi hoá của các halogen từ F2 đến I2; tính acid và tính khử của các hydrohalic acid (HF đến HI).'
          },
          {
            id: 'HOA10-YCCD-033',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA10.7.3',
            content: 'Vận dụng phản ứng nhận biết các ion halide (Cl-, Br-, I-) bằng dung dịch AgNO3; viết phương trình phản ứng minh hoạ.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // HÓA HỌC LỚP 11
  // ==========================================
  {
    id: 'HOA11-CH1',
    subject: 'Hoa',
    grade: 11,
    textbook: 'KNTT',
    order: 1,
    code: 'CH1-HOA11',
    title: 'Chương 1. Cân bằng hoá học',
    lessons: [
      {
        id: 'HOA11-B1',
        title: 'Bài 1. Khái niệm về cân bằng hoá học',
        order: 1,
        yccds: [
          {
            id: 'HOA11-YCCD-001',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.1.1',
            content: 'Nêu được khái niệm phản ứng thuận nghịch và trạng thái cân bằng hoá học; biểu thức hằng số cân bằng Kc.'
          },
          {
            id: 'HOA11-YCCD-002',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.1.2',
            content: 'Vận dụng nguyên lí chuyển dịch cân bằng Le Chatelier để dự đoán chiều chuyển dịch khi thay đổi nhiệt độ, nồng độ, áp suất.'
          },
          {
            id: 'HOA11-YCCD-003',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.1.3',
            content: 'Tính toán nồng độ các chất ở trạng thái cân bằng và hằng số cân bằng Kc trong các hệ phản ứng đồng thể, dị thể.'
          }
        ]
      },
      {
        id: 'HOA11-B2',
        title: 'Bài 2. Cân bằng trong dung dịch nước và pH',
        order: 2,
        yccds: [
          {
            id: 'HOA11-YCCD-004',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.1.4',
            content: 'Nêu được thuyết acid - base của Brønsted - Lowry; định nghĩa chất điện li mạnh, chất điện li yếu.'
          },
          {
            id: 'HOA11-YCCD-005',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.1.5',
            content: 'Xác định được chất cho proton (acid) và chất nhận proton (base) trong các phản ứng acid - base.'
          },
          {
            id: 'HOA11-YCCD-006',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.1.6',
            content: 'Tính được nồng độ ion H+, OH- và giá trị pH của dung dịch acid mạnh, base mạnh; ý nghĩa của pH trong thực tiễn và nông nghiệp.'
          }
        ]
      }
    ]
  },
  {
    id: 'HOA11-CH2',
    subject: 'Hoa',
    grade: 11,
    textbook: 'KNTT',
    order: 2,
    code: 'CH2-HOA11',
    title: 'Chương 2. Nitrogen và Sulfur',
    lessons: [
      {
        id: 'HOA11-B3',
        title: 'Bài 3. Đơn chất nitrogen và ammonia',
        order: 1,
        yccds: [
          {
            id: 'HOA11-YCCD-007',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.2.1',
            content: 'Nêu được tính kém hoạt động hoá học của N2 ở nhiệt độ thường; tính base và tính khử của NH3.'
          },
          {
            id: 'HOA11-YCCD-008',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.2.2',
            content: 'Giải thích được cấu tạo liên kết ba bền vững trong phân tử N2; viết phương trình phản ứng tạo muối ammonium.'
          }
        ]
      },
      {
        id: 'HOA11-B4',
        title: 'Bài 4. Nitric acid và sulfuric acid',
        order: 2,
        yccds: [
          {
            id: 'HOA11-YCCD-009',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.2.3',
            content: 'Nêu được tính acid mạnh và tính oxi hoá mạnh đặc trưng của HNO3 và H2SO4 đặc.'
          },
          {
            id: 'HOA11-YCCD-010',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.2.4',
            content: 'Mô tả hiện tượng và viết phương trình khi cho Cu tác dụng với HNO3 đặc/loãng, H2SO4 đặc nóng.'
          },
          {
            id: 'HOA11-YCCD-011',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.2.5',
            content: 'Phân tích nguyên nhân và hậu quả của hiện tượng mưa acid; biện pháp giảm thiểu khí thải SO2, NOx ra môi trường.'
          }
        ]
      }
    ]
  },
  {
    id: 'HOA11-CH3',
    subject: 'Hoa',
    grade: 11,
    textbook: 'KNTT',
    order: 3,
    code: 'CH3-HOA11',
    title: 'Chương 3. Đại cương hoá học hữu cơ',
    lessons: [
      {
        id: 'HOA11-B5',
        title: 'Bài 5. Hợp chất hữu cơ và cấu trúc phân tử',
        order: 1,
        yccds: [
          {
            id: 'HOA11-YCCD-012',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.3.1',
            content: 'Nêu được khái niệm nhóm chức, đồng đẳng, đồng phân (đồng phân cấu tạo: mạch carbon, vị trí nhóm chức).'
          },
          {
            id: 'HOA11-YCCD-013',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.3.2',
            content: 'Phân biệt được công thức đơn giản nhất, công thức phân tử và công thức cấu tạo của hợp chất hữu cơ.'
          },
          {
            id: 'HOA11-YCCD-014',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.3.3',
            content: 'Xác định công thức phân tử từ kết quả phân tích nguyên tố (%C, %H, %O) và phổ khối lượng (MS).'
          }
        ]
      }
    ]
  },
  {
    id: 'HOA11-CH4',
    subject: 'Hoa',
    grade: 11,
    textbook: 'KNTT',
    order: 4,
    code: 'CH4-HOA11',
    title: 'Chương 4. Hydrocarbon',
    lessons: [
      {
        id: 'HOA11-B6',
        title: 'Bài 6. Alkane, Alkene và Alkyne',
        order: 1,
        yccds: [
          {
            id: 'HOA11-YCCD-015',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.4.1',
            content: 'Nêu định nghĩa, công thức chung và đặc điểm liên kết của alkane, alkene, alkyne.'
          },
          {
            id: 'HOA11-YCCD-016',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.4.2',
            content: 'Trình bày tính chất hoá học đặc trưng: phản ứng thế của alkane; phản ứng cộng (cộng H2, Br2, H2O) và trùng hợp của alkene; quy tắc Markovnikov.'
          },
          {
            id: 'HOA11-YCCD-017',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.4.3',
            content: 'Nhận biết alk-1-yne bằng dung dịch AgNO3/NH3; phân biệt alkane, alkene và alkyne bằng thuốc thử thích hợp.'
          }
        ]
      },
      {
        id: 'HOA11-B7',
        title: 'Bài 7. Arene (Hydrocarbon thơm)',
        order: 2,
        yccds: [
          {
            id: 'HOA11-YCCD-018',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.4.4',
            content: 'Nêu định nghĩa arene, công thức phân tử và cấu tạo vòng benzene.'
          },
          {
            id: 'HOA11-YCCD-019',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.4.5',
            content: 'Giải thích tính thơm: dễ thế, khó cộng, bền với các chất oxi hoá thông thường; phản ứng thế brom và nitro hoá toluene.'
          }
        ]
      }
    ]
  },
  {
    id: 'HOA11-CH5',
    subject: 'Hoa',
    grade: 11,
    textbook: 'KNTT',
    order: 5,
    code: 'CH5-HOA11',
    title: 'Chương 5. Dẫn xuất halogen – Alcohol – Phenol',
    lessons: [
      {
        id: 'HOA11-B8',
        title: 'Bài 8. Alcohol và Phenol',
        order: 1,
        yccds: [
          {
            id: 'HOA11-YCCD-020',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.5.1',
            content: 'Nêu định nghĩa alcohol, phenol; bậc của alcohol; ảnh hưởng của liên kết hydrogen liên phân tử đến nhiệt độ sôi.'
          },
          {
            id: 'HOA11-YCCD-021',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.5.2',
            content: 'So sánh tính acid của phenol với alcohol và carbonic acid; phản ứng của alcohol với Na, phản ứng tách nước và oxi hoá không hoàn toàn bởi CuO.'
          },
          {
            id: 'HOA11-YCCD-022',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.5.3',
            content: 'Nhận biết glycerol và polyalcohol có 2 nhóm -OH kề nhau bằng Cu(OH)2 tạo phức xanh lam thẫm.'
          }
        ]
      }
    ]
  },
  {
    id: 'HOA11-CH6',
    subject: 'Hoa',
    grade: 11,
    textbook: 'KNTT',
    order: 6,
    code: 'CH6-HOA11',
    title: 'Chương 6. Hợp chất carbonyl – Carboxylic acid',
    lessons: [
      {
        id: 'HOA11-B9',
        title: 'Bài 9. Aldehyde, Ketone và Carboxylic acid',
        order: 1,
        yccds: [
          {
            id: 'HOA11-YCCD-023',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.6.1',
            content: 'Nêu định nghĩa hợp chất carbonyl (>C=O), carboxylic acid (-COOH); danh pháp thay thế của aldehyde, ketone, acid.'
          },
          {
            id: 'HOA11-YCCD-024',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.6.2',
            content: 'Trình bày phản ứng tráng bạc của aldehyde với thuốc thử Tollens; phản ứng tạo kết tủa Cu2O với Cu(OH)2/OH- đun nóng.'
          },
          {
            id: 'HOA11-YCCD-025',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA11.6.3',
            content: 'Viết phương trình phản ứng ester hoá giữa carboxylic acid và alcohol; điều kiện xúc tác acid và tính thuận nghịch.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // HÓA HỌC LỚP 12
  // ==========================================
  {
    id: 'HOA12-CH1',
    subject: 'Hoa',
    grade: 12,
    textbook: 'KNTT',
    order: 1,
    code: 'CH1-HOA12',
    title: 'Chương 1. Ester – Lipid. Xà phòng và chất giặt rửa',
    lessons: [
      {
        id: 'HOA12-B1',
        title: 'Bài 1. Ester và Lipid',
        order: 1,
        yccds: [
          {
            id: 'HOA12-YCCD-001',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA12.1.1',
            content: 'Nêu được khái niệm ester, chất béo (triglyceride), acid béo no, acid béo không no thường gặp (palmitic, stearic, oleic, linoleic acid).'
          },
          {
            id: 'HOA12-YCCD-002',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA12.1.2',
            content: 'Trình bày tính chất hoá học đặc trưng của ester và chất béo: phản ứng thuỷ phân trong môi trường acid và môi trường kiềm (phản ứng xà phòng hoá).'
          },
          {
            id: 'HOA12-YCCD-003',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA12.1.3',
            content: 'Tính lượng xà phòng thu được từ phản ứng xà phòng hoá chất béo; giải thích cơ chế tẩy rửa của xà phòng và chất giặt rửa tổng hợp.'
          }
        ]
      }
    ]
  },
  {
    id: 'HOA12-CH2',
    subject: 'Hoa',
    grade: 12,
    textbook: 'KNTT',
    order: 2,
    code: 'CH2-HOA12',
    title: 'Chương 2. Carbohydrate',
    lessons: [
      {
        id: 'HOA12-B2',
        title: 'Bài 2. Glucose, Fructose, Saccharose, Tinh bột và Cellulose',
        order: 1,
        yccds: [
          {
            id: 'HOA12-YCCD-004',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA12.2.1',
            content: 'Phân loại được carbohydrate thành monosaccharide, disaccharide và polysaccharide; cấu tạo dạng mạch vòng và mạch hở của glucose, fructose.'
          },
          {
            id: 'HOA12-YCCD-005',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA12.2.2',
            content: 'Mô tả được tính chất hoá học của glucose (tính polyalcohol, tính khử với Tollens/Cu(OH)2); phản ứng thuỷ phân saccharose, tinh bột, cellulose.'
          },
          {
            id: 'HOA12-YCCD-006',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA12.2.3',
            content: 'Vận dụng phản ứng màu của hồ tinh bột với iodine để nhận biết; tính hiệu suất quá trình lên men glucose tạo ethanol.'
          }
        ]
      }
    ]
  },
  {
    id: 'HOA12-CH3',
    subject: 'Hoa',
    grade: 12,
    textbook: 'KNTT',
    order: 3,
    code: 'CH3-HOA12',
    title: 'Chương 3. Hợp chất chứa nitrogen (Amine, Amino acid, Peptide, Protein)',
    lessons: [
      {
        id: 'HOA12-B3',
        title: 'Bài 3. Amine, Amino acid và Protein',
        order: 1,
        yccds: [
          {
            id: 'HOA12-YCCD-007',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA12.3.1',
            content: 'Nêu định nghĩa amine (bậc I, II, III), alpha-amino acid thiên nhiên, liên kết peptide và protein.'
          },
          {
            id: 'HOA12-YCCD-008',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA12.3.2',
            content: 'Giải thích tính lưỡng tính của amino acid; tính base của aniline so với amine no và ammonia.'
          },
          {
            id: 'HOA12-YCCD-009',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA12.3.3',
            content: 'Nhận biết protein bằng phản ứng màu biuret và sự đông tụ protein dưới tác dụng của nhiệt độ hoặc acid/kiềm.'
          }
        ]
      }
    ]
  },
  {
    id: 'HOA12-CH4',
    subject: 'Hoa',
    grade: 12,
    textbook: 'KNTT',
    order: 4,
    code: 'CH4-HOA12',
    title: 'Chương 4. Polymer và vật liệu polymer',
    lessons: [
      {
        id: 'HOA12-B4',
        title: 'Bài 4. Đại cương polymer và vật liệu polymer',
        order: 1,
        yccds: [
          {
            id: 'HOA12-YCCD-010',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA12.4.1',
            content: 'Nêu khái niệm polymer, mắt xích, monome, độ trùng hợp; phân loại chất dẻo, cao su, tơ sợi (thiên nhiên, tổng hợp, bán tổng hợp).'
          },
          {
            id: 'HOA12-YCCD-011',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA12.4.2',
            content: 'Phân biệt phản ứng trùng hợp (từ monome có liên kết bội) và phản ứng trùng ngưng (từ monome có từ hai nhóm chức phản ứng trở lên).'
          }
        ]
      }
    ]
  },
  {
    id: 'HOA12-CH5',
    subject: 'Hoa',
    grade: 12,
    textbook: 'KNTT',
    order: 5,
    code: 'CH5-HOA12',
    title: 'Chương 5. Pin điện và Điện phân',
    lessons: [
      {
        id: 'HOA12-B5',
        title: 'Bài 5. Thế điện cực, Pin điện hoá và Điện phân',
        order: 1,
        yccds: [
          {
            id: 'HOA12-YCCD-012',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA12.5.1',
            content: 'Nêu định nghĩa cặp oxi hoá – khử, thế điện cực chuẩn (Eo) và suất điện động chuẩn của pin điện hoá.'
          },
          {
            id: 'HOA12-YCCD-013',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA12.5.2',
            content: 'Mô tả quá trình oxi hoá ở anode và quá trình khử ở cathode trong pin điện hoá (Galvani) và trong bình điện phân.'
          },
          {
            id: 'HOA12-YCCD-014',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA12.5.3',
            content: 'Tính suất điện động chuẩn của pin E°pin = E°cathode - E°anode; dự đoán thứ tự phóng điện ở các điện cực khi điện phân dung dịch.'
          }
        ]
      }
    ]
  },
  {
    id: 'HOA12-CH6',
    subject: 'Hoa',
    grade: 12,
    textbook: 'KNTT',
    order: 6,
    code: 'CH6-HOA12',
    title: 'Chương 6. Đại cương về kim loại và Ăn mòn kim loại',
    lessons: [
      {
        id: 'HOA12-B6',
        title: 'Bài 6. Tính chất kim loại và Phương pháp chống ăn mòn',
        order: 1,
        yccds: [
          {
            id: 'HOA12-YCCD-015',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA12.6.1',
            content: 'Nêu tính chất vật lí chung của kim loại (tính dẻo, dẫn điện, dẫn nhiệt, ánh kim); tính chất hoá học đặc trưng là tính khử.'
          },
          {
            id: 'HOA12-YCCD-016',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA12.6.2',
            content: 'Phân biệt ăn mòn hoá học và ăn mòn điện hoá học; nêu các điều kiện xảy ra ăn mòn điện hoá.'
          },
          {
            id: 'HOA12-YCCD-017',
            level: 'VD',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA12.6.3',
            content: 'Giải thích nguyên tắc các phương pháp bảo vệ kim loại chống ăn mòn (phương pháp cách li bề mặt, phương pháp điện hoá bảo vệ catot).'
          }
        ]
      }
    ]
  },
  {
    id: 'HOA12-CH7',
    subject: 'Hoa',
    grade: 12,
    textbook: 'KNTT',
    order: 7,
    code: 'CH7-HOA12',
    title: 'Chương 7. Sơ lược về phức chất và kim loại chuyển tiếp',
    lessons: [
      {
        id: 'HOA12-B7',
        title: 'Bài 7. Sơ lược về phức chất',
        order: 1,
        yccds: [
          {
            id: 'HOA12-YCCD-018',
            level: 'NB',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA12.7.1',
            content: 'Nêu khái niệm phức chất, nguyên tử trung tâm, phối tử (ligand) và số phối trí.'
          },
          {
            id: 'HOA12-YCCD-019',
            level: 'TH',
            sourceDocument: 'Thông tư 32/2018/TT-BGDĐT',
            officialCode: 'HOA12.7.2',
            content: 'Xác định nguyên tử trung tâm, phối tử, điện tích cầu nội và số phối trí trong các phức chất đơn giản như [Cu(H2O)6]2+, [Ag(NH3)2]+.'
          }
        ]
      }
    ]
  }
];
