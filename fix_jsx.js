const fs = require('fs');

let pageContent = fs.readFileSync('app/page.jsx', 'utf8');

// Replace inline handlers
pageContent = pageContent.replace(/onmousemove="updateCardGlow\(event, this\)"/g, 'onMouseMove={(e) => updateCardGlow(e, e.currentTarget)}');
pageContent = pageContent.replace(/onclick="showDbSchema\('([^']+)', this\)"/g, 'onClick={(e) => showDbSchema(\'$1\', e.currentTarget)}');
pageContent = pageContent.replace(/onclick="toggleRisk\(this\)"/g, 'onClick={(e) => toggleRisk(e.currentTarget)}');
pageContent = pageContent.replace(/class=/g, 'className='); // Just in case any class= was missed

// Get the JS logic from main.js
let mainJs = fs.readFileSync('www_backup/js/main.js', 'utf8');

// We need to remove the DOMContentLoaded wrapper
mainJs = mainJs.replace(/document\.addEventListener\('DOMContentLoaded', \(\) => {/g, '');
mainJs = mainJs.replace(/}\);\s*\/\* ====/g, '\n/* ====');

// We will put the event listeners into useEffect
let useEffectBody = `
    // 1. PRELOADER LOGIC
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const loaderProgressCircle = document.querySelector('.loader-progress');
    const mainContent = document.getElementById('main-content');
    
    if (preloader && progressBar && progressText && loaderProgressCircle) {
      const circumference = 283;
      let progress = 0;
      const interval = setInterval(() => {
          progress += Math.floor(Math.random() * 15) + 5; 
          if (progress > 100) progress = 100;
          
          progressBar.style.width = \`\${progress}%\`;
          progressText.innerText = \`\${progress}%\`;
          
          const offset = circumference - (progress / 100) * circumference;
          loaderProgressCircle.style.strokeDashoffset = offset;
          
          if (progress === 100) {
              clearInterval(interval);
              setTimeout(() => {
                  preloader.classList.add('hidden');
                  setTimeout(() => {
                      if(mainContent) mainContent.classList.add('visible');
                      setTimeout(() => preloader.remove(), 1000);
                  }, 300);
              }, 800);
          }
      }, 150);
    }

    // 2. SAKURA PETALS
    const petalsContainer = document.getElementById('petals');
    if (petalsContainer && petalsContainer.children.length === 0) {
        for (let i = 0; i < 20; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            const size = Math.random() * 12 + 6; 
            const left = Math.random() * 100; 
            const duration = Math.random() * 8 + 6; 
            const delay = Math.random() * 5; 
            const rotation = Math.random() * 360;
            
            petal.style.width = \`\${size}px\`;
            petal.style.height = \`\${size}px\`;
            petal.style.left = \`\${left}%\`;
            petal.style.transform = \`rotate(\${rotation}deg)\`;
            petal.style.animationDuration = \`\${duration}s\`;
            petal.style.animationDelay = \`\${delay}s\`;
            petalsContainer.appendChild(petal);
        }
    }

    // 3. STICKY HEADER
    const header = document.querySelector('.glass-header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
`;

// Extract the functions from main.js (updateCardGlow, schemaDetails, showDbSchema, toggleRisk)
let globalFunctions = `
function updateCardGlow(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--x', \`\${x}px\`);
    card.style.setProperty('--y', \`\${y}px\`);
}

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
    const items = document.querySelectorAll('.db-item');
    items.forEach(i => i.classList.remove('active'));
    element.classList.add('active');

    const data = schemaDetails[tableKey];
    const titleEl = document.getElementById('db-title');
    const relationsEl = document.getElementById('db-relations');
    const tbodyEl = document.getElementById('db-tbody');
    
    if (titleEl) titleEl.innerText = data.title;
    if (relationsEl) relationsEl.innerHTML = \`<strong>Quan hệ & Ràng buộc:</strong> \${data.relations}\`;

    if (tbodyEl) {
        tbodyEl.innerHTML = '';
        data.fields.forEach(f => {
            tbodyEl.innerHTML += \`
                <tr>
                <td className="field-name">\${f.name}</td>
                <td className="field-type">\${f.type}</td>
                <td className="field-desc">\${f.desc}</td>
                </tr>
            \`;
        });
    }
}

function toggleRisk(header) {
    const item = header.parentElement;
    const body = item.querySelector('.risk-body');
    
    if (item.classList.contains('open')) {
        body.style.maxHeight = '0px';
        item.classList.remove('open');
    } else {
        const allItems = document.querySelectorAll('.risk-item');
        allItems.forEach(i => {
            i.classList.remove('open');
            const b = i.querySelector('.risk-body');
            if(b) b.style.maxHeight = '0px';
        });

        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
    }
}
`;

// Insert into page.jsx
pageContent = pageContent.replace(/export default function HomePage\(\) {/g, `
${globalFunctions}

export default function HomePage() {
`);

pageContent = pageContent.replace(/useEffect\(\(\) => {\s*\/\/ TODO: Paste logic from corresponding JS file here\s*}\), \[\]\);/g, `
  useEffect(() => {
${useEffectBody}
  }, []);
`);

// Also fix standard SVG attributes
pageContent = pageContent.replace(/viewbox=/gi, 'viewBox=');
pageContent = pageContent.replace(/stroke-width=/gi, 'strokeWidth=');
pageContent = pageContent.replace(/stroke-linecap=/gi, 'strokeLinecap=');
pageContent = pageContent.replace(/stroke-linejoin=/gi, 'strokeLinejoin=');
pageContent = pageContent.replace(/stroke-dashoffset=/gi, 'strokeDashoffset=');
pageContent = pageContent.replace(/stroke-opacity=/gi, 'strokeOpacity=');
pageContent = pageContent.replace(/fill-opacity=/gi, 'fillOpacity=');
pageContent = pageContent.replace(/stop-color=/gi, 'stopColor=');
pageContent = pageContent.replace(/stop-opacity=/gi, 'stopOpacity=');

fs.writeFileSync('app/page.jsx', pageContent);

// Fix auth page
let authContent = fs.readFileSync('app/auth/page.jsx', 'utf8');
authContent = authContent.replace(/onclick="toggleForm\(\)"/g, 'onClick={() => toggleForm()}');

let authGlobal = `
function toggleForm() {
    const container = document.getElementById('auth-container');
    if (container) {
        container.classList.toggle('sign-up-mode');
    }
}
`;

authContent = authContent.replace(/export default function AuthPage\(\) {/g, `
${authGlobal}
export default function AuthPage() {
`);

authContent = authContent.replace(/useEffect\(\(\) => {\s*\/\/ TODO: Paste logic from corresponding JS file here\s*}\), \[\]\);/g, `
  useEffect(() => {
    const toggleBtn = document.querySelector('.toggle-btn');
    if (toggleBtn) {
        // Not used, using onclick
    }
  }, []);
`);
fs.writeFileSync('app/auth/page.jsx', authContent);

// Fix 404 page
let notFoundContent = fs.readFileSync('app/not-found.jsx', 'utf8');
notFoundContent = notFoundContent.replace(/viewbox=/gi, 'viewBox=');
notFoundContent = notFoundContent.replace(/stroke-width=/gi, 'strokeWidth=');
notFoundContent = notFoundContent.replace(/stroke-linecap=/gi, 'strokeLinecap=');
notFoundContent = notFoundContent.replace(/stroke-linejoin=/gi, 'strokeLinejoin=');

let notFoundEffect = `
    const petalsContainer = document.getElementById('petals');
    if (petalsContainer && petalsContainer.children.length === 0) {
        for (let i = 0; i < 30; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            const size = Math.random() * 15 + 8; 
            const left = Math.random() * 100; 
            const duration = Math.random() * 8 + 4; 
            const delay = Math.random() * 5; 
            const rotation = Math.random() * 360;
            
            petal.style.width = \`\${size}px\`;
            petal.style.height = \`\${size}px\`;
            petal.style.left = \`\${left}%\`;
            petal.style.transform = \`rotate(\${rotation}deg)\`;
            petal.style.animationDuration = \`\${duration}s\`;
            petal.style.animationDelay = \`\${delay}s\`;
            petalsContainer.appendChild(petal);
        }
    }
`;

notFoundContent = notFoundContent.replace(/useEffect\(\(\) => {\s*\/\/ TODO: Paste logic from corresponding JS file here\s*}\), \[\]\);/g, `
  useEffect(() => {
${notFoundEffect}
  }, []);
`);
fs.writeFileSync('app/not-found.jsx', notFoundContent);

console.log('Fixed JS logic in React pages');
