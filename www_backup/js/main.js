document.addEventListener('DOMContentLoaded', () => {
    // 1. PRELOADER LOGIC
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const loaderProgressCircle = document.querySelector('.loader-progress');
    const mainContent = document.getElementById('main-content');
    
    // Calculate stroke dashoffset for the SVG circle
    // Circumference = 2 * PI * r = 2 * 3.14159 * 45 ≈ 283
    const circumference = 283;
    
    let progress = 0;
    // Simulate loading time (e.g., 2-3 seconds total)
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5; // increment by 5-20
        
        if (progress > 100) {
            progress = 100;
        }
        
        // Update text and bar width
        progressBar.style.width = `${progress}%`;
        progressText.innerText = `${progress}%`;
        
        // Update SVG circle
        const offset = circumference - (progress / 100) * circumference;
        loaderProgressCircle.style.strokeDashoffset = offset;
        
        if (progress === 100) {
            clearInterval(interval);
            
            // Finish loading, transition out
            setTimeout(() => {
                preloader.classList.add('hidden');
                
                // Show main content after preloader starts moving up
                setTimeout(() => {
                    mainContent.classList.add('visible');
                    // Remove preloader from DOM to save memory
                    setTimeout(() => preloader.remove(), 1000);
                }, 300);
            }, 800); // short delay to show 100%
        }
    }, 150); // Tick every 150ms

    // 2. SAKURA PETALS BACKGROUND (Like 404 page)
    const petalsContainer = document.getElementById('petals');
    if (petalsContainer) {
        const petalCount = 20;

        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            
            const size = Math.random() * 12 + 6; 
            const left = Math.random() * 100; 
            const duration = Math.random() * 8 + 6; 
            const delay = Math.random() * 5; 
            const rotation = Math.random() * 360;
            
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            petal.style.left = `${left}%`;
            petal.style.transform = `rotate(${rotation}deg)`;
            petal.style.animationDuration = `${duration}s`;
            petal.style.animationDelay = `${delay}s`;
            
            petalsContainer.appendChild(petal);
        }
    }

    // 3. STICKY HEADER EFFECT
    const header = document.querySelector('.glass-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

/* =========================================
   NEW SECTIONS LOGIC (From GitHub)
========================================= */

/* Card mouse move background glow effect */
function updateCardGlow(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
}

/* Database Schema Explorer Data */
const schemaDetails = {
    sinhvien: {
    title: "Bảng Sinh viên (Student Table)",
    fields: [
        { name: "ID", type: "uuid", desc: "Id" },
        { name: "MaSinhVien", type: "text", desc: "Mã số sinh viên" },
        { name: "HoTen", type: "text", desc: "Họ và tên đầy đủ của sinh viên." },
        { name: "Truong", type: "text", desc: "Trường Đại học hoặc Cao đẳng đang theo học." },
        { name: "NganhHoc", type: "text", desc: "Tên ngành đào tạo học thuật (Ví dụ: CNTT, Marketing...)." },
        { name: "GPA", type: "numeric(3, 2)", desc: "Điểm trung bình tích lũy học tập của sinh viên." },
        { name: "ThanhTich", type: "text", desc: "Thành tích, chứng chỉ đạt được, hoạt động nghiên cứu khoa học hoặc ngoại khóa nổi bật." },
        { name: "CV", type: "text", desc: "File CV của sinh viên." },
        { name: "DanhGiaTongQuan", type: "text", desc: "Điểm đánh giá tổng quan của AI đối với sinh viên." },
        { name: "GoiYViec", type: "text[]", desc: "Gợi ý công việc cho sinh viên." }
    ],
    relations: "Liên kết trực tiếp <b>1 - Nhiều</b> với bảng <i>Kết quả đánh giá</i> trong Supabase qua trường khóa ngoại <b>MaSinhVien</b>."
    },
    kynang: {
    title: "Bảng Kỹ năng (Skill Table)",
    fields: [
        { name: "ID", type: "uuid", desc: "Id" },
        { name: "TenKyNang", type: "text", desc: "Tên kỹ năng (Ví dụ: SQL, Python, Giải quyết vấn đề...)." }
    ],
    relations: "Liên kết trực tiếp <b>1 - Nhiều</b> với bảng <i>Kết quả đánh giá</i> qua trường khóa ngoại <b>SkillID</b>."
    },
    ketqua: {
    title: "Bảng Kết quả đánh giá (Assessment Results)",
    fields: [
        { name: "ID", type: "uuid", desc: "Id" },
        { name: "MaSinhVien", type: "text", desc: "Khóa ngoại tham chiếu tới cột MaSinhVien của bảng Sinh viên." },
        { name: "SkillID", type: "uuid", desc: "Khóa ngoại tham chiếu tới cột SkillID của bảng Kỹ năng." },
        { name: "DiemSo", type: "int4", desc: "Điểm số năng lực đạt được của sinh viên đối với kỹ năng đó (0 - 100)." },
        { name: "DanhGiaAI", type: "text", desc: "Kết quả đánh giá của AI đối với kỹ năng của sinh viên." }
    ],
    relations: "Đóng vai trò bảng trung gian trong Supabase giải quyết quan hệ Nhiều - Nhiều giữa bảng <b>Sinh viên</b> và bảng <b>Kỹ năng</b>."
    },
    doanhnghiep: {
    title: "Bảng Doanh nghiệp (Enterprise Job Postings)",
    fields: [
        { name: "ID", type: "uuid", desc: "Id" },
        { name: "CongTy", type: "text", desc: "Tên công ty đăng tuyển dụng." },
        { name: "ViTriTuyenDung", type: "text[]", desc: "Vị trí công việc đang tuyển (Ví dụ: Business Analyst, Data Analyst...)." },
        { name: "YeuCauKyNang", type: "jsonb", desc: "Dữ liệu JSONB chứa yêu cầu kỹ năng tối thiểu của tin tuyển dụng lưu trong Supabase (Ví dụ: SQL: 70, Excel: 80)." }
    ],
    relations: "Lưu trong Supabase, được truy vấn bằng AI và thuật toán Matching so khớp với điểm số từ bảng <b>Kết quả đánh giá</b>."
    }
};

function showDbSchema(tableKey, element) {
    // Set active list item
    const items = document.querySelectorAll('.db-item');
    items.forEach(i => i.classList.remove('active'));
    element.classList.add('active');

    // Update content
    const data = schemaDetails[tableKey];
    document.getElementById('db-title').innerText = data.title;
    document.getElementById('db-relations').innerHTML = `<strong>Quan hệ & Ràng buộc:</strong> ${data.relations}`;

    const tbody = document.getElementById('db-tbody');
    tbody.innerHTML = '';
    data.fields.forEach(f => {
    tbody.innerHTML += `
        <tr>
        <td class="field-name">${f.name}</td>
        <td class="field-type">${f.type}</td>
        <td class="field-desc">${f.desc}</td>
        </tr>
    `;
    });
}

// Initialize DB Explorer safely
document.addEventListener('DOMContentLoaded', () => {
    const defaultDbItem = document.querySelector('.db-item');
    if (defaultDbItem) {
        showDbSchema('sinhvien', defaultDbItem);
    }
});

/* Risks Accordion Logic */
function toggleRisk(header) {
    const item = header.parentElement;
    const body = item.querySelector('.risk-body');
    
    if (item.classList.contains('open')) {
    body.style.maxHeight = '0px';
    item.classList.remove('open');
    } else {
    // Close others
    const allItems = document.querySelectorAll('.risk-item');
    allItems.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.risk-body').style.maxHeight = '0px';
    });

    item.classList.add('open');
    body.style.maxHeight = body.scrollHeight + 'px';
    }
}
