const fs = require('fs');

let page = fs.readFileSync('app/page.jsx', 'utf8');

// 1. Branding replacements
page = page.replace(/TALENTLENS AI/g, 'AI INTERN HUB');
page = page.replace(/TALENTLENS <span className="text-red">AI<\/span>/g, 'AI INTERN <span className="text-red">HUB</span>');
page = page.replace(/TalentLens AI/g, 'AI Intern Hub');
page = page.replace(/TalentLens_Dashboard/g, 'AI_Intern_Hub_Dashboard');

// 2. Hero Section
page = page.replace(/Đánh giá năng lực sinh viên & <br \/>Kết nối doanh nghiệp bằng <span className="text-red gradient-text">Trí Tuệ Nhân Tạo<\/span>/g, 'Nền tảng kết nối Sinh viên – Doanh nghiệp & <br /><span className="text-red gradient-text">AI Phỏng vấn</span>');
page = page.replace(/TALENTLENS AI cung cấp giải pháp chuyển đổi số toàn diện, giúp sinh viên phát triển nghề nghiệp, nhà trường quản lý chất lượng và doanh nghiệp tuyển dụng đúng nhân tài\./g, 'AI Intern Hub giúp sinh viên tìm kiếm cơ hội thực tập, tạo CV online, và luyện tập phỏng vấn với AI. Doanh nghiệp dễ dàng tìm kiếm ứng viên và đánh giá năng lực một cách hiệu quả.');

// 3. Stats section
page = page.replace(/<h3>99%<\/h3>\s*<p>Độ chính xác AI<\/p>/g, '<h3>AI</h3>\n                            <p>Mô phỏng phỏng vấn</p>');
page = page.replace(/<h3>10K\+<\/h3>\s*<p>Sinh viên sử dụng<\/p>/g, '<h3>CV</h3>\n                            <p>Tạo hồ sơ online</p>');
page = page.replace(/<h3>500\+<\/h3>\s*<p>Doanh nghiệp đối tác<\/p>/g, '<h3>Match</h3>\n                            <p>Kết nối hiệu quả</p>');

// 4. Bối cảnh & Tầm nhìn (Vision)
page = page.replace(/Thực trạng, nghịch lý giáo dục hiện nay và sứ mệnh đổi mới sáng tạo mà TalentLens AI hướng tới\./g, 'Hiện nay sinh viên và doanh nghiệp gặp rất nhiều khó khăn trong quá trình kết nối thực tập và tuyển dụng.');

// Update cards in vision
page = page.replace(/Học tập chăm chỉ nhưng mơ hồ về năng lực thực tế\. GPA học thuật chưa phản ánh được kỹ năng thực chiến, khó khăn trong định hướng nghề nghiệp và thiếu cơ hội trực tiếp chạm tới doanh nghiệp\./g, 'Thông tin tuyển dụng phân tán trên nhiều nền tảng. Không biết doanh nghiệp nào phù hợp với chuyên ngành. Thiếu kinh nghiệm phỏng vấn và không có cơ hội luyện tập trước khi ứng tuyển.');

page = page.replace(/Mất nhiều tài nguyên để sàng lọc thủ công hàng trăm CV PDF sáo rỗng\. Khó đánh giá chính xác năng lực thực tế trước khi thử việc, dẫn đến tỉ lệ tuyển dụng sai người cực kỳ cao\./g, 'Khó tiếp cận nguồn thực tập sinh chất lượng. Mất nhiều thời gian sàng lọc CV. Tốn chi phí và nhân lực cho vòng phỏng vấn sơ bộ. Khó đánh giá đúng năng lực nếu chỉ dựa vào CV hay GPA.');

page = page.replace(/Gặp khó khăn lớn trong việc đo lường chuẩn đầu ra thực tế của sinh viên\. Chưa có kho dữ liệu kỹ năng số toàn diện và khó đánh giá mức độ đáp ứng của chương trình với nhu cầu doanh nghiệp\./g, 'Hệ thống cấp một tài khoản Admin để quản lý toàn bộ dữ liệu sinh viên. Thêm mới, cập nhật thông tin, theo dõi trạng thái thực tập, giúp quản lý tập trung, minh bạch và hiệu quả.');


// 5. Database Schema Replacement
const newSchemaDetails = `const schemaDetails = {
    sinhvien: {
    title: "Bảng Sinh viên (Student Table)",
    fields: [
        { name: "StudentID", type: "uuid", desc: "Id định danh sinh viên" },
        { name: "HoTen", type: "text", desc: "Họ và tên sinh viên" },
        { name: "Email", type: "text", desc: "Email liên hệ" },
        { name: "TruongHoc", type: "text", desc: "Trường đang theo học" },
        { name: "ChuyenNganh", type: "text", desc: "Chuyên ngành đào tạo" }
    ],
    relations: "Liên kết với bảng Ứng tuyển và AI Interview."
    },
    doanhnghiep: {
    title: "Bảng Doanh nghiệp (Company Table)",
    fields: [
        { name: "CompanyID", type: "uuid", desc: "Id công ty" },
        { name: "TenCongTy", type: "text", desc: "Tên doanh nghiệp" },
        { name: "DiaChi", type: "text", desc: "Địa chỉ trụ sở" },
        { name: "Website", type: "text", desc: "Website công ty" }
    ],
    relations: "Liên kết với bảng JD."
    },
    jd: {
    title: "Bảng JD (Job Description Table)",
    fields: [
        { name: "JobID", type: "uuid", desc: "Id tin tuyển dụng" },
        { name: "ViTri", type: "text", desc: "Vị trí tuyển dụng" },
        { name: "MoTa", type: "text", desc: "Mô tả công việc" },
        { name: "YeuCau", type: "text", desc: "Yêu cầu công việc" }
    ],
    relations: "Thuộc về Doanh nghiệp, liên kết với Ứng tuyển."
    },
    ungtuyen: {
    title: "Bảng Ứng tuyển (Application Table)",
    fields: [
        { name: "ApplicationID", type: "uuid", desc: "Id đơn ứng tuyển" },
        { name: "StudentID", type: "uuid", desc: "Khóa ngoại Sinh viên" },
        { name: "JobID", type: "uuid", desc: "Khóa ngoại JD" }
    ],
    relations: "Lưu trữ lịch sử apply của sinh viên."
    },
    aiinterview: {
    title: "Bảng AI Interview (Interview Result Table)",
    fields: [
        { name: "InterviewID", type: "uuid", desc: "Id bài phỏng vấn" },
        { name: "StudentID", type: "uuid", desc: "Khóa ngoại Sinh viên" },
        { name: "DiemSo", type: "int4", desc: "Điểm đánh giá tự động" },
        { name: "NhanXetAI", type: "text", desc: "Phân tích và gợi ý cải thiện" }
    ],
    relations: "Đánh giá ứng viên từ AI."
    }
};`;

page = page.replace(/const schemaDetails = \{[\s\S]*?    \}\n\};/m, newSchemaDetails);

// Replace Database UI tabs
const dbHtml = `
          <div className="db-sidebar">
            <div className="db-item active" onClick={(e) => showDbSchema('sinhvien', e.currentTarget)}>
              <i className="fa-solid fa-user"></i> Sinh viên
            </div>
            <div className="db-item" onClick={(e) => showDbSchema('doanhnghiep', e.currentTarget)}>
              <i className="fa-solid fa-building"></i> Doanh nghiệp
            </div>
            <div className="db-item" onClick={(e) => showDbSchema('jd', e.currentTarget)}>
              <i className="fa-solid fa-briefcase"></i> Tin tuyển dụng (JD)
            </div>
            <div className="db-item" onClick={(e) => showDbSchema('ungtuyen', e.currentTarget)}>
              <i className="fa-solid fa-paper-plane"></i> Ứng tuyển
            </div>
            <div className="db-item" onClick={(e) => showDbSchema('aiinterview', e.currentTarget)}>
              <i className="fa-solid fa-robot"></i> AI Interview
            </div>
          </div>
`;

page = page.replace(/<div className="db-sidebar">[\s\S]*?<\/div>/m, dbHtml);

fs.writeFileSync('app/page.jsx', page);

// Update Auth Page
let auth = fs.readFileSync('app/auth/page.jsx', 'utf8');
auth = auth.replace(/TalentLens AI/g, 'AI Intern Hub');
auth = auth.replace(/TALENTLENS AI/g, 'AI INTERN HUB');
fs.writeFileSync('app/auth/page.jsx', auth);

console.log("Replaced successfully!");
