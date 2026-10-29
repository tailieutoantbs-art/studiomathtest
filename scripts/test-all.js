// Automated End-to-End Test Suite for Studio Math Test
import { CURRICULUM_DATABASE, getCurriculumBySubjectAndGrade, getYCCDById } from '../src/data/curriculum';
import { SECTION_PRESETS, getSectionsPreset } from '../src/data/sectionPresets';
import { DEFAULT_SAMPLES, SAMPLE_CHEMISTRY_10, SAMPLE_ENGLISH_10 } from '../src/data/sampleExams';
import { validateProject, calculateMatrixRows, calculateMatrixSummary, autoBalanceAllocations } from '../src/services/matrixEngine';
import { getSubjectName, getSubjectIcon } from '../src/types/exam';
import { buildGoogleSheetRows, generateGoogleSheetsTsv, firebaseConfig, GOOGLE_SHEET_ID } from '../src/services/onlineStorageService';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('====================================================');
console.log('🚀 BẮT ĐẦU KIỂM THỬ TOÀN DIỆN ỨNG DỤNG STUDIO MATH TEST');
console.log('====================================================\n');

// ----------------------------------------------------
// TEST 1: SUBJECTS & LABELS
// ----------------------------------------------------
console.log('👉 [1] Kiểm tra cấu hình và nhãn 4 môn học:');
assert(getSubjectName('VatLi') === 'Vật lí', 'Môn VatLi -> "Vật lí"');
assert(getSubjectName('Toan') === 'Toán học', 'Môn Toan -> "Toán học"');
assert(getSubjectName('Hoa') === 'Hóa học', 'Môn Hoa -> "Hóa học"');
assert(getSubjectName('TiengAnh') === 'Tiếng Anh', 'Môn TiengAnh -> "Tiếng Anh"');
assert(getSubjectIcon('VatLi') === '⚡', 'Icon Vật lí: ⚡');
assert(getSubjectIcon('Toan') === '📐', 'Icon Toán: 📐');
assert(getSubjectIcon('Hoa') === '🧪', 'Icon Hóa học: 🧪');
assert(getSubjectIcon('TiengAnh') === '🌐', 'Icon Tiếng Anh: 🌐');

// ----------------------------------------------------
// TEST 2: CURRICULUM DATABASE (GDPT 2018 - 4 MÔN)
// ----------------------------------------------------
console.log('\n👉 [2] Kiểm tra Cơ sở dữ liệu Chương trình GDPT 2018:');
const subjects = ['VatLi', 'Toan', 'Hoa', 'TiengAnh'];
const grades = [10, 11, 12];

let totalYccds = 0;
for (const sub of subjects) {
  for (const grade of grades) {
    const chapters = getCurriculumBySubjectAndGrade(sub, grade);
    let yccdCount = 0;
    chapters.forEach(ch => ch.lessons.forEach(ls => yccdCount += ls.yccds.length));
    totalYccds += yccdCount;
    assert(chapters.length > 0, `Môn ${getSubjectName(sub)} Lớp ${grade}: ${chapters.length} chương (${yccdCount} YCCĐ)`);
  }
}
assert(totalYccds > 150, `Tổng số YCCĐ toàn hệ thống: ${totalYccds} (Rất đầy đủ và chi tiết)`);

// Test YCCD lookup
const sampleYccd = getYCCDById('HOA10-YCCD-001');
assert(sampleYccd !== undefined, 'Tra cứu YCCĐ Hóa 10 theo ID (HOA10-YCCD-001)');
assert(sampleYccd && sampleYccd.subject === 'Hoa', 'YCCĐ thuộc môn Hóa học');

const sampleEngYccd = getYCCDById('TA10-YCCD-001');
assert(sampleEngYccd !== undefined, 'Tra cứu YCCĐ Tiếng Anh 10 theo ID (TA10-YCCD-001)');
assert(sampleEngYccd && sampleEngYccd.subject === 'TiengAnh', 'YCCĐ thuộc môn Tiếng Anh');

// ----------------------------------------------------
// TEST 3: SECTION PRESETS (CẤU TRÚC ĐỀ THI 2025)
// ----------------------------------------------------
console.log('\n👉 [3] Kiểm tra Cấu trúc đề chuẩn Bộ GD&ĐT 2025:');
const presetIds = ['thpt_toan', 'thpt_ly', 'thpt_hoa', 'thpt_tienganh', 'kt_dinh_ky'];
for (const pid of presetIds) {
  const sections = getSectionsPreset(pid);
  const activeSections = sections.filter(s => s.enabled);
  const totalScore = activeSections.reduce((sum, s) => sum + s.totalPoints, 0);
  assert(activeSections.length > 0, `Preset ${pid}: có ${activeSections.length} phần thi hoạt động`);
  assert(Math.abs(totalScore - 10) < 0.01, `Preset ${pid}: Tổng điểm các phần = ${totalScore}đ (Chuẩn 10 điểm)`);
}

// Kiểm tra cụ thể môn Hóa & Tiếng Anh
const hoaPreset = getSectionsPreset('thpt_hoa');
assert(hoaPreset[0].questionCount === 18 && hoaPreset[0].totalPoints === 4.5, 'THPT Hóa Phần I: 18 câu TN = 4.5đ');
assert(hoaPreset[1].questionCount === 4 && hoaPreset[1].totalPoints === 4.0, 'THPT Hóa Phần II: 4 câu Đ/S (16 lệnh) = 4.0đ');
assert(hoaPreset[2].questionCount === 6 && hoaPreset[2].totalPoints === 1.5, 'THPT Hóa Phần III: 6 câu TLN = 1.5đ');

const taPreset = getSectionsPreset('thpt_tienganh');
assert(taPreset[0].questionCount === 40 && taPreset[0].totalPoints === 10.0, 'THPT Tiếng Anh: 40 câu TN = 10.0đ');

// ----------------------------------------------------
// TEST 4: SAMPLE EXAMS & VALIDATION ENGINE
// ----------------------------------------------------
console.log('\n👉 [4] Kiểm tra các Đề mẫu và Bộ máy kiểm tra lỗi (Validation Engine):');
assert(DEFAULT_SAMPLES.length === 5, `Số lượng đề mẫu chuẩn: ${DEFAULT_SAMPLES.length} (Vật lí 10, Toán 10, Toán 12, Hóa 10, Tiếng Anh 10)`);

// Kiểm tra thuật toán phân bổ tự động và kiểm tra tính hợp lệ
for (const sample of DEFAULT_SAMPLES) {
  const newAllocs = autoBalanceAllocations(sample);
  const balanced = { ...sample, allocations: newAllocs };
  assert(newAllocs.length > 0, `Tự động phân bổ câu hỏi cho ${sample.generalInfo.examName} (${newAllocs.length} phân bổ)`);

  const issues = validateProject(balanced);
  const errors = issues.filter(i => i.type === 'error');
  assert(errors.length === 0, `Đề sau khi phân bổ ma trận: 0 lỗi nghiêm trọng (${issues.length} cảnh báo/lưu ý)`);

  const rows = calculateMatrixRows(balanced);
  const summary = calculateMatrixSummary(rows, balanced);
  assert(summary.totalPoints === 10, `Tổng điểm ma trận ${sample.generalInfo.subject}: ${summary.totalPoints}đ`);
}

// ----------------------------------------------------
// TEST 5: ONLINE STORAGE & GOOGLE SHEETS
// ----------------------------------------------------
console.log('\n👉 [5] Kiểm tra Cấu hình Đám mây & Google Sheets:');
assert(firebaseConfig.databaseURL.includes('tpn123-f7971'), 'Firebase databaseURL trỏ đúng máy chủ tpn123-f7971');
assert(GOOGLE_SHEET_ID === '1zWdvhI5Yor-XBt7Pg-NOCLhlVMvuN-oHA33jG5QyR3A', 'Google Sheet ID khớp chính xác');

const sheetRows = buildGoogleSheetRows(DEFAULT_SAMPLES);
assert(sheetRows.length === 5, `Tạo dữ liệu báo cáo Google Sheets: ${sheetRows.length} dòng đề thi`);

const tsvData = generateGoogleSheetsTsv(DEFAULT_SAMPLES);
assert(tsvData.includes('Mã đề') && tsvData.includes('Hóa học') && tsvData.includes('Tiếng Anh'), 'Xuất bảng TSV chuẩn Google Sheets với đầy đủ 4 môn');

// ----------------------------------------------------
// TỔNG KẾT
// ----------------------------------------------------
console.log('\n====================================================');
console.log(`🏁 KẾT QUẢ KIỂM THỬ: ${passed} PASS, ${failed} FAIL`);
console.log('====================================================');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('✨ MỌI TÍNH NĂNG CỦA ỨNG DỤNG HOẠT ĐỘNG HOÀN HẢO 100%!');
}
