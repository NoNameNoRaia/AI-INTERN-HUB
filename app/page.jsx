"use client";

import { useEffect } from 'react';
import '../app/css/github.css';
import '../app/css/intro.css';



function updateCardGlow(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
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
    if (relationsEl) relationsEl.innerHTML = `<strong>Quan hệ & Ràng buộc:</strong> ${data.relations}`;

    if (tbodyEl) {
        tbodyEl.innerHTML = '';
        data.fields.forEach(f => {
            tbodyEl.innerHTML += `
                <tr>
                <td className="field-name">${f.name}</td>
                <td className="field-type">${f.type}</td>
                <td className="field-desc">${f.desc}</td>
                </tr>
            `;
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


export default function HomePage() {


  useEffect(() => {
    // 1. MINIMALIST INTRO
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const progressFill = document.getElementById('intro-progress-fill');
    const progressLabel = document.getElementById('intro-progress-label');

    // Progress bar
    let progress = 0;
    const labels = ['Khởi tạo hệ thống', 'Tải tài nguyên', 'Chuẩn bị dữ liệu', 'Sẵn sàng'];
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 6;
      if (progress > 100) progress = 100;
      if (progressFill) progressFill.style.width = `${progress}%`;
      if (progressLabel) {
        const idx = Math.min(Math.floor(progress / 30), labels.length - 1);
        progressLabel.textContent = labels[idx];
      }
      if (progress === 100) {
        clearInterval(interval);
        // Trigger fade out
        setTimeout(() => {
            if (preloader) preloader.classList.add('fade-out');
            if (mainContent) mainContent.classList.add('visible');
            
            // Clean up
            setTimeout(() => {
                if (preloader) preloader.remove();
            }, 800); // Wait for transition to finish
        }, 300); // Short delay before sliding out
      }
    }, 120);

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
            
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            petal.style.left = `${left}%`;
            petal.style.transform = `rotate(${rotation}deg)`;
            petal.style.animationDuration = `${duration}s`;
            petal.style.animationDelay = `${delay}s`;
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
  }, []);
  return (
    <>

    {/*  PRELOADER — Minimalist Theme  */}
    <div id="preloader" className="preloader-v2">
        {/* Centered content */}
        <div className="intro-stage">
            <div className="intro-logo-reveal">
                <div className="intro-logo-container">
                    <img src="/images/logo.png?v=2" alt="AI Intern Hub Logo" className="intro-logo-img" />
                </div>
            </div>

            <div className="intro-brand">
                <span className="intro-brand-ai">AI</span>
                <span className="intro-brand-text">INTERN HUB</span>
            </div>

            <div className="intro-tagline">
                Nền tảng kết nối Sinh viên – Doanh nghiệp – AI Phỏng vấn
            </div>

            <div className="intro-progress-wrap">
                <div className="intro-progress-track">
                    <div className="intro-progress-fill" id="intro-progress-fill"></div>
                </div>
                <div className="intro-progress-label" id="intro-progress-label">Khởi tạo hệ thống...</div>
            </div>
        </div>
    </div>

    {/*  MAIN CONTENT  */}
    <main id="main-content" className="main-content">
        {/*  Background elements  */}
        <div className="pattern-bg"></div>
        <div className="petals" id="petals"></div>

        {/*  Header  */}
        <header className="glass-header">
            <div className="nav-container">
                <div className="logo">
                    <img src="/images/logo.png?v=2" alt="AI Intern Hub Logo" className="header-logo" />
                    <span className="logo-text">AI INTERN <span className="text-red">HUB</span></span>
                </div>
                <nav className="desktop-nav">
                    <a href="#about">Về Nền Tảng</a>
                    <a href="#features">Tính Năng</a>
                    <a href="#solutions">Giải Pháp</a>
                    <a href="#contact">Liên Hệ</a>
                </nav>
                <div className="nav-actions">
                    <a href="/auth" className="btn btn-outline">Đăng Nhập</a>
                    <a href="/auth" className="btn btn-primary">Dùng Thử Miễn Phí</a>
                </div>
            </div>
        </header>

        {/*  Hero Section  */}
        <section className="hero">
            <div className="hero-container">
                <div className="hero-text">
                    <div className="badge">
                        <span className="badge-dot"></span>
                        Tiên phong công nghệ EdTech
                    </div>
                    <h1 className="hero-title">Nền tảng kết nối Sinh viên – Doanh nghiệp & <br /><span className="text-red gradient-text">AI Phỏng vấn</span></h1>
                    <p className="hero-desc">
                        AI INTERN HUB cung cấp giải pháp chuyển đổi số toàn diện, giúp sinh viên phát triển nghề nghiệp, nhà trường quản lý chất lượng và doanh nghiệp tuyển dụng đúng nhân tài.
                    </p>
                    <div className="hero-actions">
                        <a href="#features" className="btn btn-primary btn-large">
                            Khám phá ngay
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </a>
                        {/*  <a href="#" className="btn btn-video">
                            <div className="play-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                            </div>
                            Xem Video
                        </a>  */}
                    </div>
                    <div className="stats">
                        <div className="stat-item">
                            <h3>AI</h3>
                            <p>Mô phỏng phỏng vấn</p>
                        </div>
                        <div className="stat-item">
                            <h3>CV</h3>
                            <p>Tạo hồ sơ online</p>
                        </div>
                        <div className="stat-item">
                            <h3>Match</h3>
                            <p>Kết nối hiệu quả</p>
                        </div>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="glass-card dashboard-mockup">
                        <div className="mockup-header">
                            <div className="dots">
                                <span></span><span></span><span></span>
                            </div>
                            <div className="mockup-title">AI_Intern_Hub_Dashboard.ai</div>
                        </div>
                        <div className="mockup-body">
                            {/*  Abstract SVG Dashboard  */}
                            <svg viewBox="0 0 400 300" width="100%" height="100%">
                                <defs>
                                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#E60012', stopOpacity: '0.8',  }} />
                                        <stop offset="100%" style={{ stopColor: '#FF4D4D', stopOpacity: '0.2',  }} />
                                    </linearGradient>
                                </defs>
                                <rect x="20" y="20" width="100" height="80" rx="10" fill="url(#grad1)" opacity="0.1"/>
                                <rect x="140" y="20" width="240" height="80" rx="10" fill="url(#grad1)" opacity="0.1"/>
                                <rect x="20" y="120" width="240" height="150" rx="10" fill="url(#grad1)" opacity="0.1"/>
                                <rect x="280" y="120" width="100" height="150" rx="10" fill="url(#grad1)" opacity="0.1"/>
                                
                                {/*  Lines and graphs  */}
                                <path d="M 40 220 Q 100 150 140 180 T 240 150" fill="none" stroke="#E60012" strokeWidth="4" strokeLinecap="round"/>
                                <circle cx="40" cy="220" r="6" fill="#E60012"/>
                                <circle cx="140" cy="180" r="6" fill="#E60012"/>
                                <circle cx="240" cy="150" r="6" fill="#E60012"/>
                                
                                {/*  Decorative elements  */}
                                <rect x="40" y="40" width="60" height="10" rx="5" fill="#1A1A1C" opacity="0.2"/>
                                <rect x="40" y="60" width="40" height="10" rx="5" fill="#1A1A1C" opacity="0.1"/>
                                
                                <rect x="160" y="40" width="150" height="10" rx="5" fill="#1A1A1C" opacity="0.2"/>
                                <rect x="160" y="60" width="100" height="10" rx="5" fill="#1A1A1C" opacity="0.1"/>
                            </svg>
                            
                            {/*  Floating AI Scanning effect  */}
                            <div className="scan-line"></div>
                        </div>
                    </div>
                    {/*  Decorative Japanese/Tech Art  */}
                    <div className="art-circle-1"></div>
                    <div className="art-circle-2"></div>
                </div>
            </div>
        </section>
        
        
<section id="vision">
    <div className="container">
      <div className="section-header">
        <h2>Bối Cảnh & Tầm Nhìn Dự Án</h2>
        <p>Thực trạng, nghịch lý giáo dục hiện nay và sứ mệnh đổi mới sáng tạo mà AI Intern Hub hướng tới.</p>
      </div>

      {/*  Current Painpoints  */}
      <div className="grid-3">
        <div className="card" onMouseMove={(e) => updateCardGlow(e, e.currentTarget)}>
          <div className="card-icon"><i className="fa-solid fa-user-graduate"></i></div>
          <h3>Đối Với Sinh Viên</h3>
          <p>Thông tin tuyển dụng phân tán trên nhiều nền tảng. Không biết doanh nghiệp nào phù hợp với chuyên ngành. Thiếu kinh nghiệm phỏng vấn và không có cơ hội luyện tập trước khi ứng tuyển.</p>
        </div>
        <div className="card" onMouseMove={(e) => updateCardGlow(e, e.currentTarget)}>
          <div className="card-icon"><i className="fa-solid fa-building"></i></div>
          <h3>Đối Với Doanh Nghiệp</h3>
          <p>Khó tiếp cận nguồn thực tập sinh chất lượng. Mất nhiều thời gian sàng lọc CV. Tốn chi phí và nhân lực cho vòng phỏng vấn sơ bộ. Khó đánh giá đúng năng lực nếu chỉ dựa vào CV hay GPA.</p>
        </div>
        <div className="card" onMouseMove={(e) => updateCardGlow(e, e.currentTarget)}>
          <div className="card-icon"><i className="fa-solid fa-school"></i></div>
          <h3>Đối Với Nhà Trường</h3>
          <p>Hệ thống cấp một tài khoản Admin để quản lý toàn bộ dữ liệu sinh viên. Thêm mới, cập nhật thông tin, theo dõi trạng thái thực tập, giúp quản lý tập trung, minh bạch và hiệu quả.</p>
        </div>
      </div>

      {/*  Paradox Stacked Compare (No Tabs)  */}
      <div style={{ marginTop: '80px',  }}>
        <h3 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '8px', color: 'var(--text-dark)',  }}>Chuyển Đổi Quá Trình Đánh Giá & Kết Nối</h3>
        <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: '40px', fontSize: '0.95rem',  }}>So sánh quy trình cũ truyền thống và quy trình chuyển đổi số toàn diện mới bằng AI Intern Hub.</p>
        
        <div className="compare-container">
          {/*  Traditional flow (Top)  */}
          <div className="compare-section">
            <div className="compare-section-title" style={{ color: 'var(--danger)',  }}>
              <i className="fa-solid fa-circle-xmark"></i> Quy Trình Đánh Giá Truyền Thống (Trước Chuyển Đổi Số)
            </div>
            <div className="compare-flow traditional">
              <div className="flow-step">
                <div className="flow-step-number">01</div>
                <h4>Học Tập & Thi Cử</h4>
                <p>Thiết kế đề kiểm tra thủ công, chủ yếu là thi giấy và lý thuyết.</p>
              </div>
              <div className="flow-step">
                <div className="flow-step-number">02</div>
                <h4>Đánh Giá Bằng GPA</h4>
                <p>Điểm số học thuật tổng hợp được lưu trữ thủ công bằng Excel.</p>
              </div>
              <div className="flow-step">
                <div className="flow-step-number">03</div>
                <h4>Hồ Sơ CV PDF</h4>
                <p>Sinh viên viết CV tự khai, thiếu chứng minh thực tế thuyết phục.</p>
              </div>
              <div className="flow-step">
                <div className="flow-step-number">04</div>
                <h4>Tự Tìm Kiếm Việc</h4>
                <p>Rải CV đại trà, tỉ lệ kết hợp phù hợp doanh nghiệp rất thấp.</p>
              </div>
            </div>
            <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--danger)', fontSize: '0.9rem', fontWeight: '600',  }}>
              <i className="fa-solid fa-triangle-exclamation"></i> Hệ quả: Năng lực thực tế không được phản ánh đầy đủ, gây lãng phí tài nguyên tuyển dụng và đào tạo.
            </p>
          </div>

          {/*  Modern flow (Bottom)  */}
          <div className="compare-section">
            <div className="compare-section-title" style={{ color: '#10b981',  }}>
              <i className="fa-solid fa-circle-check"></i> Quy Trình Đánh Giá Mới (Sau Chuyển Đổi Số Với AI Intern Hub)
            </div>
            <div className="compare-flow modern active">
              <div className="flow-step">
                <div className="flow-step-number"><i className="fa-solid fa-bolt"></i></div>
                <h4>AI Tạo Đề Tự Động</h4>
                <p>AI sinh đề thi cá nhân hóa dựa trên slide giảng dạy và nhu cầu thực của thị trường.</p>
              </div>
              <div className="flow-step">
                <div className="flow-step-number"><i className="fa-solid fa-address-card"></i></div>
                <h4>Skill Passport Số</h4>
                <p>Mỗi sinh viên sở hữu một hồ sơ năng lực số cập nhật điểm kỹ năng thực tế.</p>
              </div>
              <div className="flow-step">
                <div className="flow-step-number"><i className="fa-solid fa-brain"></i></div>
                <h4>AI Career Advisor</h4>
                <p>AI phân tích ưu nhược điểm cá nhân để định hướng công việc chuẩn nhất.</p>
              </div>
              <div className="flow-step">
                <div className="flow-step-number"><i className="fa-solid fa-handshake"></i></div>
                <h4>AI Matching Độc Quyền</h4>
                <p>Doanh nghiệp tự động khớp nối ứng viên sở hữu điểm kỹ năng chính xác.</p>
              </div>
            </div>
            <p style={{ textAlign: 'center', marginTop: '24px', color: '#10b981', fontSize: '0.9rem', fontWeight: '600',  }}>
              <i className="fa-solid fa-rocket"></i> Kết quả: Đánh giá đúng thực chất, tiết kiệm thời gian lọc hồ sơ, kết nối chuẩn xác dựa trên dữ liệu kỹ năng thật.
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>

  {/*  Core Features Section (No Tabs - Grid/List View)  */}
  <section id="features">
    <div className="container">
      <div className="section-header">
        <h2>Chức Năng Cốt Lõi</h2>
        <p>Hệ sinh thái tính năng đột phá định hình dòng chảy dữ liệu kỹ năng từ lúc học cho tới lúc tuyển dụng.</p>
      </div>

      <div className="features-list">
        
        {/*  Feature 1: AI Testgen  */}
        <div className="feature-card">
          <div className="feature-content">
            <h3><i className="fa-solid fa-file-invoice"></i> 1. AI Tạo Đề Kiểm Tra Tự Động</h3>
            <p>Hệ thống hỗ trợ giảng viên soạn đề chỉ trong vài giây. AI tự động đọc hiểu dữ liệu và xây dựng ngân hàng đề thi đa chiều, bám sát nhu cầu doanh nghiệp thực tế.</p>
            <div className="feature-details">
              <div className="feature-detail-box">
                <h4>Đầu vào xử lý</h4>
                <ul>
                  <li><i className="fa-solid fa-caret-right"></i> Slide bài giảng giảng viên</li>
                  <li><i className="fa-solid fa-caret-right"></i> Chuẩn đầu ra (Syllabus)</li>
                  <li><i className="fa-solid fa-caret-right"></i> Đề thi mẫu & Ngân hàng cũ</li>
                  <li><i className="fa-solid fa-caret-right"></i> Yêu cầu tuyển dụng chi tiết</li>
                </ul>
              </div>
              <div className="feature-detail-box">
                <h4>Đầu ra AI sinh đề</h4>
                <ul>
                  <li><i className="fa-solid fa-caret-right"></i> Câu hỏi trắc nghiệm đa phương</li>
                  <li><i className="fa-solid fa-caret-right"></i> Tự luận & Trả lời ngắn</li>
                  <li><i className="fa-solid fa-caret-right"></i> Case Study thực tế doanh nghiệp</li>
                  <li><i className="fa-solid fa-caret-right"></i> Bài tập mô phỏng tình huống</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="feature-visual">
            <svg width="180" height="180" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="40" y="40" width="160" height="180" rx="12" fill="var(--card-bg)" stroke="var(--primary-red)" strokeWidth="2" />
              <line x1="60" y1="80" x2="180" y2="80" stroke="var(--text-dark)" strokeWidth="4" strokeLinecap="round" />
              <line x1="60" y1="110" x2="150" y2="110" stroke="var(--text-light)" strokeWidth="3" strokeLinecap="round" />
              <line x1="60" y1="140" x2="170" y2="140" stroke="var(--text-light)" strokeWidth="3" strokeLinecap="round" />
              <line x1="60" y1="170" x2="130" y2="170" stroke="var(--text-light)" strokeWidth="3" strokeLinecap="round" />
              <circle cx="180" cy="180" r="28" fill="var(--text-light)" />
              <path d="M172 180H188M180 172V188" stroke="var(--text-dark)" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/*  Feature 2: Assess  */}
        <div className="feature-card">
          <div className="feature-content">
            <h3><i className="fa-solid fa-award"></i> 2. Đánh Giá Năng Lực Toàn Diện</h3>
            <p>Hệ thống không chỉ đánh giá kiến thức lý thuyết sách vở. AI đo lường tổng hợp cả kỹ năng chuyên môn sâu và các chỉ số kỹ năng mềm thông qua các hoạt động tương tác.</p>
            <div className="feature-details">
              <div className="feature-detail-box">
                <h4>Kỹ Năng Chuyên Môn</h4>
                <ul>
                  <li><i className="fa-solid fa-caret-right"></i> Công nghệ thông tin (SQL, Python, Web)</li>
                  <li><i className="fa-solid fa-caret-right"></i> Digital Marketing & SEO</li>
                  <li><i className="fa-solid fa-caret-right"></i> Tài chính & Kế toán</li>
                  <li><i className="fa-solid fa-caret-right"></i> Phân tích dữ liệu kinh doanh (BA)</li>
                </ul>
              </div>
              <div className="feature-detail-box">
                <h4>Kỹ Năng Mềm</h4>
                <ul>
                  <li><i className="fa-solid fa-caret-right"></i> Khả năng Giao tiếp & Thuyết phục</li>
                  <li><i className="fa-solid fa-caret-right"></i> Làm việc nhóm & Giải quyết xung đột</li>
                  <li><i className="fa-solid fa-caret-right"></i> Năng lực Lãnh đạo & Tổ chức</li>
                  <li><i className="fa-solid fa-caret-right"></i> Giải quyết vấn đề phức tạp</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="feature-visual">
            <svg width="180" height="180" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="120" cy="120" r="90" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="4" />
              <polygon points="120,30 206,80 206,170 120,210 34,170 34,80" fill="none" stroke="var(--primary-red)" strokeWidth="2" />
              <polygon points="120,50 180,90 180,150 120,190 60,150 60,90" fill="rgba(139, 92, 246, 0.2)" stroke="var(--text-light)" strokeWidth="2" />
              <circle cx="120" cy="30" r="6" fill="var(--text-dark)" />
              <circle cx="206" cy="80" r="6" fill="var(--text-dark)" />
              <circle cx="206" cy="170" r="6" fill="var(--text-dark)" />
              <circle cx="120" cy="210" r="6" fill="var(--text-dark)" />
              <circle cx="34" cy="170" r="6" fill="var(--text-dark)" />
              <circle cx="34" cy="80" r="6" fill="var(--text-dark)" />
            </svg>
          </div>
        </div>

        {/*  Feature 3: Passport  */}
        <div className="feature-card">
          <div className="feature-content">
            <h3><i className="fa-solid fa-passport"></i> 3. Skill Passport (Hồ Sơ Năng Lực Số)</h3>
            <p>Skill Passport đại diện cho danh tính kỹ năng số của sinh viên. Hệ thống tự động đúc kết tất cả các điểm số kỹ năng đã được kiểm duyệt và tích hợp các minh chứng năng lực thực tế.</p>
            <div className="feature-details">
              <div className="feature-detail-box">
                <h4>Biểu đồ Kỹ năng</h4>
                <ul>
                  <li><i className="fa-solid fa-caret-right"></i> Trực quan hóa điểm kỹ năng từ 0 - 100</li>
                  <li><i className="fa-solid fa-caret-right"></i> Chứng thực trực tiếp bởi Blockchain/AI</li>
                  <li><i className="fa-solid fa-caret-right"></i> Thay thế hoàn toàn CV tự viết</li>
                </ul>
              </div>
              <div className="feature-detail-box">
                <h4>Talent Portfolio</h4>
                <ul>
                  <li><i className="fa-solid fa-caret-right"></i> Tải dự án cá nhân thực tế</li>
                  <li><i className="fa-solid fa-caret-right"></i> Tích hợp trực tiếp link GitHub, Web</li>
                  <li><i className="fa-solid fa-caret-right"></i> Chứng chỉ quốc tế & Đề án học thuật</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="feature-visual">
            <svg width="180" height="180" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="30" y="50" width="180" height="140" rx="14" fill="var(--card-bg)" stroke="#10b981" strokeWidth="2" />
              <circle cx="70" cy="100" r="24" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="1.5" />
              <path d="M70 95V105M65 100H75" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
              <rect x="115" y="80" width="75" height="10" rx="4" fill="var(--text-dark)" />
              <rect x="115" y="100" width="55" height="8" rx="4" fill="var(--text-light)" />
              <line x1="50" y1="150" x2="190" y2="150" stroke="rgba(0,0,0,0.08)" strokeWidth="2" />
              <rect x="50" y="165" width="140" height="10" rx="4" fill="rgba(16, 185, 129, 0.2)" />
            </svg>
          </div>
        </div>

        {/*  Feature 4: Advisor  */}
        <div className="feature-card">
          <div className="feature-content">
            <h3><i className="fa-solid fa-user-tie"></i> 4. AI Career Advisor</h3>
            <p>Đóng vai trò như một mentor ảo chuyên nghiệp. AI phân tích toàn bộ ma trận kỹ năng trên Skill Passport để phát hiện thế mạnh ẩn giấu và đưa ra định hướng nghề nghiệp cụ thể.</p>
            <div className="feature-details">
              <div className="feature-detail-box">
                <h4>Phân tích & Khuyến nghị</h4>
                <ul>
                  <li><i className="fa-solid fa-caret-right"></i> Tự động so sánh dữ liệu điểm</li>
                  <li><i className="fa-solid fa-caret-right"></i> Gợi ý lộ trình bù đắp lỗ hổng kỹ năng</li>
                  <li><i className="fa-solid fa-caret-right"></i> Đề xuất 3 công việc phù hợp nhất</li>
                </ul>
              </div>
              <div className="feature-detail-box">
                <h4>Minh họa thực tế</h4>
                <ul>
                  <li><i className="fa-solid fa-caret-right"></i> Điểm SQL (90), Logic (92), Python (88)</li>
                  <li><i className="fa-solid fa-caret-right"></i> Khuyên nghị: Data Analyst, BA</li>
                  <li><i className="fa-solid fa-caret-right"></i> Xác định xác suất trúng tuyển dự kiến</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="feature-visual">
            <svg width="180" height="180" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="120" cy="120" r="70" fill="rgba(139, 92, 246, 0.05)" stroke="var(--text-light)" strokeWidth="1.5" strokeDasharray="6 6" />
              <rect x="75" y="85" width="90" height="70" rx="10" fill="var(--card-bg)" stroke="var(--text-light)" strokeWidth="2" />
              <circle cx="120" cy="115" r="14" fill="rgba(139, 92, 246, 0.2)" stroke="var(--text-light)" strokeWidth="2" />
              <path d="M100 150C100 142 105 138 120 138C135 138 140 142 140 150" stroke="var(--text-light)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/*  Feature 5: Matching  */}
        <div className="feature-card">
          <div className="feature-content">
            <h3><i className="fa-solid fa-arrows-split-up-and-left"></i> 5. Matching Doanh Nghiệp Tự Động</h3>
            <p>Hệ thống đảo chiều quy trình tuyển dụng. Doanh nghiệp không cần đăng tin chờ nộp CV, AI sẽ tự quét kho hồ sơ Skill Passport và đề xuất các ứng viên có điểm thực tế khớp với tiêu chí công việc.</p>
            <div className="feature-details">
              <div className="feature-detail-box">
                <h4>Yêu Cầu Doanh Nghiệp</h4>
                <ul>
                  <li><i className="fa-solid fa-caret-right"></i> Thiết lập ngưỡng kỹ năng tối thiểu</li>
                  <li><i className="fa-solid fa-caret-right"></i> Ví dụ: SQL &gt; 70, Excel &gt; 80, Logic &gt; 75</li>
                  <li><i className="fa-solid fa-caret-right"></i> Tự động xếp hạng độ tương thích</li>
                </ul>
              </div>
              <div className="feature-detail-box">
                <h4>Quy trình AI Matching</h4>
                <ul>
                  <li><i className="fa-solid fa-caret-right"></i> Phân tích đa đối tượng song song</li>
                  <li><i className="fa-solid fa-caret-right"></i> Đề xuất ngay lập tức danh sách ứng viên</li>
                  <li><i className="fa-solid fa-caret-right"></i> Kết nối trực tiếp phỏng vấn trong 1 chạm</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="feature-visual">
            <svg width="180" height="180" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="25" y="80" width="60" height="80" rx="8" fill="var(--card-bg)" stroke="var(--text-light)" strokeWidth="1.5" />
              <rect x="155" y="80" width="60" height="80" rx="8" fill="var(--card-bg)" stroke="var(--text-light)" strokeWidth="1.5" />
              <circle cx="120" cy="120" r="30" fill="var(--grad-primary)" />
              <path d="M112 120H128M120 112V128" stroke="var(--text-dark)" strokeWidth="2" strokeLinecap="round" />
              <path d="M90 120H150" stroke="var(--primary-red)" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  </section>

  {/*  Process / Stepper Section  */}
  <section id="process">
    <div className="container">
      <div className="section-header">
        <h2>Quy Trình Hoạt Động (7 Bước Demo)</h2>
        <p>Mô tả chi tiết cách hệ thống vận hành trơn tru từ khi sinh viên bắt đầu học tập cho tới lúc trúng tuyển chính thức.</p>
      </div>

      <div className="timeline">
        {/*  Step 1  */}
        <div className="timeline-item active">
          <div className="timeline-badge">1</div>
          <div className="timeline-content">
            <h3>Đăng nhập & Xác thực</h3>
            <p>Sinh viên sử dụng tài khoản trường liên kết để đăng nhập vào hệ thống AI Intern Hub.</p>
          </div>
        </div>

        {/*  Step 2  */}
        <div className="timeline-item active">
          <div className="timeline-badge">2</div>
          <div className="timeline-content">
            <h3>AI Khảo sát & Tạo bài đánh giá</h3>
            <p>AI tiến hành đọc chuẩn đầu ra môn học hiện tại và sinh đề đánh giá năng lực cá nhân hóa.</p>
          </div>
        </div>

        {/*  Step 3  */}
        <div className="timeline-item active">
          <div className="timeline-badge">3</div>
          <div className="timeline-content">
            <h3>Thực hiện bài kiểm tra</h3>
            <p>Sinh viên làm bài online. Hệ thống giám sát trực tiếp chống gian lận bằng các giải thuật hành vi.</p>
          </div>
        </div>

        {/*  Step 4  */}
        <div className="timeline-item">
          <div className="timeline-badge">4</div>
          <div className="timeline-content">
            <h3>Chấm điểm & Phân tích tự động</h3>
            <p>AI quét bài làm, chấm điểm chuẩn hóa theo các thang đo chi tiết chuyên môn và kỹ năng mềm.</p>
          </div>
        </div>

        {/*  Step 5  */}
        <div className="timeline-item">
          <div className="timeline-badge">5</div>
          <div className="timeline-content">
            <h3>Đúc Kết Skill Passport Số</h3>
            <p>Điểm số tự động đồng bộ vào Hồ sơ năng lực số. Sinh viên tải lên thêm các dự án thực tế bổ trợ.</p>
          </div>
        </div>

        {/*  Step 6  */}
        <div className="timeline-item">
          <div className="timeline-badge">6</div>
          <div className="timeline-content">
            <h3>AI Tư Vấn & Gợi Ý Nghề Nghiệp</h3>
            <p>AI Career Advisor tự động phát hiện thế mạnh, gợi ý vị trí thực tập và học phần cần bổ túc.</p>
          </div>
        </div>

        {/*  Step 7  */}
        <div className="timeline-item">
          <div className="timeline-badge">7</div>
          <div className="timeline-content">
            <h3>Kết Nối Doanh Nghiệp (Matching)</h3>
            <p>Hệ thống đề xuất hồ sơ sinh viên sang bộ phận nhân sự của các doanh nghiệp đang có nhu cầu tương khớp.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  Technical Architecture & Database Schema  */}
  <section id="architecture" style={{ background: 'rgba(255, 255, 255, 0.01)',  }}>
    <div className="container">
      <div className="section-header">
        <h2>Yêu Cầu Kỹ Thuật & Kiến Trúc</h2>
        <p>Hệ thống được thiết kế trên những công nghệ hiện đại, kết hợp cơ sở hạ tầng backend thời gian thực mạnh mẽ.</p>
      </div>

      {/*  Core Tech Stack  */}
      <div className="arch-grid">
        <div className="arch-card">
          <div className="arch-icon"><i className="fa-solid fa-code"></i></div>
          <h3>Frontend</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '12px',  }}>Xây dựng giao diện web hiện đại, tối ưu SEO và responsive.</p>
          <div className="arch-tech">
            <span className="tech-tag">Next.js</span>
            <span className="tech-tag">TailwindCSS</span>
          </div>
        </div>

        <div className="arch-card">
          <div className="arch-icon"><i className="fa-solid fa-server"></i></div>
          <h3>Backend</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '12px',  }}>Hạ tầng Backend-as-a-Service (BaaS) linh hoạt và bảo mật.</p>
          <div className="arch-tech">
            <span className="tech-tag">Supabase</span>
            <span className="tech-tag">Supabase Edge Functions</span>
          </div>
        </div>

        <div className="arch-card">
          <div className="arch-icon"><i className="fa-solid fa-database"></i></div>
          <h3>Database</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '12px',  }}>Cơ sở dữ liệu quan hệ PostgreSQL được tích hợp sẵn của Supabase.</p>
          <div className="arch-tech">
            <span className="tech-tag">Supabase DB</span>
            <span className="tech-tag">PostgreSQL</span>
            <span className="tech-tag">Supabase Storage</span>
          </div>
        </div>

        <div className="arch-card">
          <div className="arch-icon"><i className="fa-solid fa-brain"></i></div>
          <h3>AI Engine</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '12px',  }}>Mô hình ngôn ngữ lớn xử lý tạo đề, chấm bài và đề xuất.</p>
          <div className="arch-tech">
            <span className="tech-tag">Gemini API</span>
            <span className="tech-tag">DeepSeek API</span>
          </div>
        </div>
      </div>

      {/*  Interactive DB Schema Explorer  */}
      <div style={{ marginTop: '60px',  }}>
        <h3 style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '24px', color: 'var(--text-dark)',  }}>Mô Hình Dữ Liệu Thực Tế</h3>
        
        <div className="db-container">
          {/*  DB List  */}
          <div className="db-list">
            <div className="db-item active" onClick={(e) => showDbSchema('sinhvien', e.currentTarget)}>
              <div>
                <div className="db-item-name">Bảng Sinh viên</div>
                <div className="db-item-desc">Lưu thông tin định danh sinh viên trường</div>
              </div>
              <i className="fa-solid fa-chevron-right" style={{ color: 'var(--primary-red)',  }}></i>
            </div>
            
            <div className="db-item" onClick={(e) => showDbSchema('kynang', e.currentTarget)}>
              <div>
                <div className="db-item-name">Bảng Kỹ năng</div>
                <div className="db-item-desc">Lưu danh mục kỹ năng chuẩn hóa của hệ thống</div>
              </div>
              <i className="fa-solid fa-chevron-right" style={{ color: 'var(--primary-red)',  }}></i>
            </div>

            <div className="db-item" onClick={(e) => showDbSchema('ketqua', e.currentTarget)}>
              <div>
                <div className="db-item-name">Bảng Kết quả đánh giá</div>
                <div className="db-item-desc">Lưu điểm năng lực chi tiết của từng sinh viên</div>
              </div>
              <i className="fa-solid fa-chevron-right" style={{ color: 'var(--primary-red)',  }}></i>
            </div>

            <div className="db-item" onClick={(e) => showDbSchema('doanhnghiep', e.currentTarget)}>
              <div>
                <div className="db-item-name">Bảng Doanh nghiệp</div>
                <div className="db-item-desc">Lưu thông tin vị trí và ngưỡng kỹ năng tuyển dụng</div>
              </div>
              <i className="fa-solid fa-chevron-right" style={{ color: 'var(--primary-red)',  }}></i>
            </div>
          </div>

          {/*  DB detail viewer  */}
          <div className="db-detail" id="db-detail-panel">
            <div className="db-detail-header">
              <div className="db-detail-title" id="db-title">Bảng Sinh viên</div>
            </div>
            <table className="db-fields-table">
              <thead>
                <tr>
                  <th>Thuộc tính (Column)</th>
                  <th>Kiểu dữ liệu (Type)</th>
                  <th>Mô tả chi tiết (Description)</th>
                </tr>
              </thead>
              <tbody id="db-tbody">
                {/*  Dynamically populated  */}
              </tbody>
            </table>
            <div className="db-relations" id="db-relations">
              {/*  Dynamically populated  */}
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>

  {/*  Risks & Mitigation & Challenges  */}
  <section id="risks">
    <div className="container">
      <div className="section-header">
        <h2>Rủi Ro, Thách Thức & Biện Pháp Khắc Phục</h2>
        <p>Phân tích các tình huống thực tế có thể phát sinh trong quá trình vận hành hệ thống và giải pháp khắc phục triệt để.</p>
      </div>

      <div className="risk-accordion">
        
        {/*  Risk 1  */}
        <div className="risk-item">
          <div className="risk-header" onClick={(e) => toggleRisk(e.currentTarget)}>
            <div className="risk-title-wrapper">
              <span className="risk-badge">Rủi Ro 1</span>
              <span className="risk-title">AI đánh giá không chính xác năng lực thực của sinh viên</span>
            </div>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
          <div className="risk-body">
            <div className="risk-content">
              <div className="risk-content-col">
                <h5 className="cause-title"><i className="fa-solid fa-triangle-exclamation"></i> Nguyên nhân & Ảnh hưởng</h5>
                <ul>
                  <li>AI chỉ dựa vào một vài bài trắc nghiệm nhanh, chưa bao quát được các kỹ năng thực tế phức tạp.</li>
                  <li>Ảnh hưởng: Skill Passport có điểm lệch thực tế, khiến doanh nghiệp mất niềm tin vào chất lượng hệ thống.</li>
                </ul>
              </div>
              <div className="risk-content-col">
                <h5 className="mitigation-title"><i className="fa-solid fa-circle-check"></i> Biện pháp khắc phục</h5>
                <ul>
                  <li>Kết hợp đa chiều 3 nguồn dữ liệu: Điểm học tập chính khóa + Điểm bài test AI + Kết quả dự án thực tế & Đánh giá từ thực tập doanh nghiệp.</li>
                  <li>Giảng viên có quyền hậu kiểm, xem xét và hiệu chỉnh thủ công điểm số nếu phát hiện sai lệch.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/*  Risk 2  */}
        <div className="risk-item">
          <div className="risk-header" onClick={(e) => toggleRisk(e.currentTarget)}>
            <div className="risk-title-wrapper">
              <span className="risk-badge">Rủi Ro 2</span>
              <span className="risk-title">Sinh viên gian lận trong quá trình thực hiện bài kiểm tra</span>
            </div>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
          <div className="risk-body">
            <div className="risk-content">
              <div className="risk-content-col">
                <h5 className="cause-title"><i className="fa-solid fa-triangle-exclamation"></i> Nguyên nhân & Ảnh hưởng</h5>
                <ul>
                  <li>Sinh viên tra cứu tài liệu ngoài, sử dụng AI khác trợ giúp hoặc nhờ người làm hộ trong lúc kiểm tra trực tuyến.</li>
                  <li>Ảnh hưởng: Điểm năng lực ảo, làm sai lệch giá trị lõi của Skill Passport.</li>
                </ul>
              </div>
              <div className="risk-content-col">
                <h5 className="mitigation-title"><i className="fa-solid fa-circle-check"></i> Biện pháp khắc phục</h5>
                <ul>
                  <li>Sử dụng ngân hàng câu hỏi ngẫu nhiên và tự động đảo đề ở mức độ câu hỏi lẫn đáp án.</li>
                  <li>Giới hạn thời gian làm bài tối ưu; tích hợp AI theo dõi phát hiện các hành vi bất thường (chuyển tab, chuyển hướng chuột).</li>
                  <li>Đẩy mạnh hình thức làm bài tập lớn, dự án thực tế để đánh giá thay vì chỉ làm bài lý thuyết thuần túy.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/*  Risk 3  */}
        <div className="risk-item">
          <div className="risk-header" onClick={(e) => toggleRisk(e.currentTarget)}>
            <div className="risk-title-wrapper">
              <span className="risk-badge">Rủi Ro 3</span>
              <span className="risk-title">Doanh nghiệp hoài nghi và không tin tưởng kết quả đánh giá AI</span>
            </div>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
          <div className="risk-body">
            <div className="risk-content">
              <div className="risk-content-col">
                <h5 className="cause-title"><i className="fa-solid fa-triangle-exclamation"></i> Nguyên nhân & Ảnh hưởng</h5>
                <ul>
                  <li>Doanh nghiệp đã quen với quy trình truyền thống: lọc CV tay và tự tổ chức các vòng test kỹ năng riêng biệt.</li>
                  <li>Ảnh hưởng: Không khai thác hệ thống, không tuyển dụng sinh viên qua AI Intern Hub.</li>
                </ul>
              </div>
              <div className="risk-content-col">
                <h5 className="mitigation-title"><i className="fa-solid fa-circle-check"></i> Biện pháp khắc phục</h5>
                <ul>
                  <li>Cung cấp đầy đủ bằng chứng đánh giá: Cho phép nhà tuyển dụng xem lại chi tiết bài làm, lịch sử code, dự án thực tế đã nộp của sinh viên.</li>
                  <li>Tích hợp các kết quả thực tập thực tế được xác nhận bởi các đối tác uy tín trước đó để đối chiếu chéo.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/*  Risk 4  */}
        <div className="risk-item">
          <div className="risk-header" onClick={(e) => toggleRisk(e.currentTarget)}>
            <div className="risk-title-wrapper">
              <span className="risk-badge">Rủi Ro 4</span>
              <span className="risk-title">Thiếu dữ liệu hệ thống trong giai đoạn đầu vận hành (Cold Start)</span>
            </div>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
          <div className="risk-body">
            <div className="risk-content">
              <div className="risk-content-col">
                <h5 className="cause-title"><i className="fa-solid fa-triangle-exclamation"></i> Nguyên nhân & Ảnh hưởng</h5>
                <ul>
                  <li>Nhà trường chưa chia sẻ dữ liệu điểm học thuật cũ; số lượng sinh viên tham gia hệ thống ban đầu còn ít.</li>
                  <li>Ảnh hưởng: AI không có đủ dữ liệu học sâu để tối ưu hóa gợi ý nghề nghiệp và matching.</li>
                </ul>
              </div>
              <div className="risk-content-col">
                <h5 className="mitigation-title"><i className="fa-solid fa-circle-check"></i> Biện pháp khắc phục</h5>
                <ul>
                  <li>Giai đoạn đầu: Sử dụng các tập dữ liệu giả lập (mock data) chuẩn mực ngành để huấn luyện các thuật toán ban đầu.</li>
                  <li>Triển khai chương trình chạy thử nghiệm (Pilot) quy mô nhỏ tại 1-2 khoa có lượng sinh viên năng động để thu thập dữ liệu thật, rồi mở rộng dần.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/*  Risk 5  */}
        <div className="risk-item">
          <div className="risk-header" onClick={(e) => toggleRisk(e.currentTarget)}>
            <div className="risk-title-wrapper">
              <span className="risk-badge">Rủi Ro 5</span>
              <span className="risk-title">Rò rỉ dữ liệu thông tin cá nhân và điểm số của sinh viên</span>
            </div>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
          <div className="risk-body">
            <div className="risk-content">
              <div className="risk-content-col">
                <h5 className="cause-title"><i className="fa-solid fa-triangle-exclamation"></i> Nguyên nhân & Ảnh hưởng</h5>
                <ul>
                  <li>Hệ thống lưu giữ nhiều thông tin nhạy cảm: Điểm số học tập, hồ sơ cá nhân, đánh giá nội bộ của doanh nghiệp.</li>
                  <li>Ảnh hưởng: Vi phạm pháp luật về bảo vệ dữ liệu cá nhân, gây ảnh hưởng uy tín nghiêm trọng của nhà trường.</li>
                </ul>
              </div>
              <div className="risk-content-col">
                <h5 className="mitigation-title"><i className="fa-solid fa-circle-check"></i> Biện pháp khắc phục</h5>
                <ul>
                  <li>Áp dụng mã hóa dữ liệu đầu cuối (AES-256) khi lưu trữ và truyền tải thông tin nhạy cảm.</li>
                  <li>Phân quyền truy cập đa tầng chặt chẽ (Role-Based Access Control). Ẩn các thông tin định danh cá nhân khi hiển thị matching diện rộng.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/*  Risk 6  */}
        <div className="risk-item">
          <div className="risk-header" onClick={(e) => toggleRisk(e.currentTarget)}>
            <div className="risk-title-wrapper">
              <span className="risk-badge">Rủi Ro 6</span>
              <span className="risk-title">Chi phí vận hành API AI quá cao khi mở rộng số lượng sinh viên</span>
            </div>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
          <div className="risk-body">
            <div className="risk-content">
              <div className="risk-content-col">
                <h5 className="cause-title"><i className="fa-solid fa-triangle-exclamation"></i> Nguyên nhân & Ảnh hưởng</h5>
                <ul>
                  <li>Hoạt động tạo đề thi, chấm bài tự luận và chạy thuật toán so khớp đều liên tục gọi API của LLM thương mại (OpenAI, Gemini).</li>
                  <li>Ảnh hưởng: Chi phí vận hành máy chủ tăng phi mã, gây khó khăn cho việc duy trì hệ thống lâu dài.</li>
                </ul>
              </div>
              <div className="risk-content-col">
                <h5 className="mitigation-title"><i className="fa-solid fa-circle-check"></i> Biện pháp khắc phục</h5>
                <ul>
                  <li>Chỉ áp dụng AI ở những bước phức tạp (như chấm bài tự luận/case study). Các bước trắc nghiệm sẽ dùng logic chấm tự động thuần túy.</li>
                  <li>Triển khai cơ chế Cache thông minh cho các câu hỏi và đề thi tương đồng.</li>
                  <li>Tiến hành fine-tune các mô hình mã nguồn mở (như Llama, Mistral) để chạy độc lập trên hạ tầng riêng khi dữ liệu đạt ngưỡng lớn.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/*  FAQ Chatbox Question  */}
      <div className="faq-chat">
        <div className="chat-bubble user">
          <div className="chat-avatar"><i className="fa-solid fa-user"></i></div>
          <div className="chat-text">
            <strong>Câu hỏi đặt ra từ giảng viên & doanh nghiệp:</strong><br />
            "Nếu hệ thống AI đánh giá sai lệch năng lực thực tế của sinh viên thì sao? Chúng ta có thể tin tưởng hoàn toàn vào kết quả này không?"
          </div>
        </div>

        <div className="chat-bubble ai">
          <div className="chat-avatar ai"><i className="fa-solid fa-robot"></i></div>
          <div className="chat-text" id="ai-typing-response">
            <span style={{ color: 'var(--primary-red)', fontWeight: '700',  }}>AI Intern Hub trả lời:</span><br />
            "Hệ thống không sinh ra để thay thế hoàn toàn vai trò của giảng viên hay nhà tuyển dụng. AI đóng vai trò là một trợ lý thông minh hỗ trợ phân tích dữ liệu đa chiều. Điểm số cuối cùng trên Skill Passport được hình thành từ nhiều nguồn: điểm học tập chính khóa, kết quả bài test khách quan của AI, dự án thực tế do sinh viên nộp và đánh giá từ đơn vị thực tập. Giảng viên luôn nắm quyền hậu kiểm và doanh nghiệp có thể xem trực tiếp minh chứng thực tế. Cách tiếp cận này giúp giảm thiểu tối đa sai lệch của AI và phản ánh năng lực toàn diện hơn rất nhiều so với chỉ nhìn vào một trang giấy CV."
          </div>
        </div>
      </div>

      {/*  Challenges Table  */}
      <div style={{ marginTop: '60px',  }}>
        <h3 style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '24px', color: 'var(--text-dark)',  }}>Thách Thức Triển Khai & Giải Pháp</h3>
        <table className="challenge-table">
          <thead>
            <tr>
              <th>Thách thức phát sinh</th>
              <th>Giải pháp tháo gỡ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="col-challenge">Trường học ngại thay đổi quy trình đánh giá hiện có</td>
              <td className="col-solution">Áp dụng chiến lược cuốn chiếu: Thử nghiệm trước tại 1 khoa năng động (ví dụ CNTT) để chứng minh hiệu quả trước khi nhân rộng.</td>
            </tr>
            <tr>
              <td className="col-challenge">Giảng viên chưa quen thao tác với các công cụ AI</td>
              <td className="col-solution">Xây dựng giao diện tối giản, tổ chức các buổi đào tạo ngắn hạn và cung cấp tài liệu hướng dẫn cụ thể kèm video demo trực quan.</td>
            </tr>
            <tr>
              <td className="col-challenge">Doanh nghiệp chưa tin tưởng dữ liệu đánh giá ban đầu</td>
              <td className="col-solution">Cung cấp báo cáo dữ liệu minh bạch, hiển thị rõ ràng bằng chứng năng lực (bài làm thực tế, mã nguồn dự án) thay vì chỉ hiện điểm.</td>
            </tr>
            <tr>
              <td className="col-challenge">Sinh viên ít hào hứng tham gia làm bài đánh giá thêm</td>
              <td className="col-solution">Tích hợp Gamification (huy hiệu kỹ năng, bảng xếp hạng), đồng thời biến Skill Passport thành chứng nhận kỹ năng có giá trị tuyển dụng trực tiếp.</td>
            </tr>
            <tr>
              <td className="col-challenge">Thiếu hụt dữ liệu mẫu ban đầu để AI học</td>
              <td className="col-solution">Thu thập dữ liệu điểm số, chương trình đào tạo của từng học kỳ để bồi đắp kho tri thức của AI dần dần theo thời gian.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </section>

  {/*  Value Proposition Section  */}
  <section id="values">
    <div className="container">
      <div className="section-header">
        <h2>Giá Trị Hệ Thống Mang Lại</h2>
        <p>Tạo ra mô hình kinh tế tri thức giáo dục khép kín, mang lại lợi ích thực chất cho cả 3 chân kiềng tham gia.</p>
      </div>

      <div className="value-grid">
        <div className="value-card">
          <div className="value-icon student"><i className="fa-solid fa-graduation-cap"></i></div>
          <h3>Đối Với Sinh Viên</h3>
          <ul>
            <li><i className="fa-solid fa-circle-check"></i> Hiểu rõ điểm mạnh, điểm yếu kỹ năng thực tế.</li>
            <li><i className="fa-solid fa-circle-check"></i> Được định hướng công việc phù hợp năng lực học tập.</li>
            <li><i className="fa-solid fa-circle-check"></i> Sở hữu Skill Passport uy tín chứng thực trước nhà tuyển dụng.</li>
            <li><i className="fa-solid fa-circle-check"></i> Tiếp cận các cơ hội việc làm thực tế mà không cần rải CV mù quáng.</li>
          </ul>
        </div>

        <div className="value-card">
          <div className="value-icon school"><i className="fa-solid fa-school-flag"></i></div>
          <h3>Đối Với Nhà Trường</h3>
          <ul>
            <li><i className="fa-solid fa-circle-check"></i> Số hóa toàn diện quy trình kiểm tra, đo lường chuẩn đầu ra.</li>
            <li><i className="fa-solid fa-circle-check"></i> Nắm bắt chính xác xu hướng kỹ năng doanh nghiệp đang cần.</li>
            <li><i className="fa-solid fa-circle-check"></i> Nâng cao tỷ lệ sinh viên ra trường có việc làm đúng ngành.</li>
            <li><i className="fa-solid fa-circle-check"></i> Tối ưu hóa chương trình giảng dạy dựa trên phản hồi dữ liệu thật.</li>
          </ul>
        </div>

        <div className="value-card">
          <div className="value-icon enterprise"><i className="fa-solid fa-handshake-simple"></i></div>
          <h3>Đối Với Doanh Nghiệp</h3>
          <ul>
            <li><i className="fa-solid fa-circle-check"></i> Tiếp cận nguồn ứng viên có năng lực thực tế đã qua kiểm chứng.</li>
            <li><i className="fa-solid fa-circle-check"></i> Tiết kiệm 95% thời gian và chi phí cho các vòng lọc hồ sơ.</li>
            <li><i className="fa-solid fa-circle-check"></i> Giảm thiểu tối đa rủi ro tuyển sai người, tăng hiệu quả thử việc.</li>
            <li><i className="fa-solid fa-circle-check"></i> Đồng hành cùng nhà trường đào tạo nguồn nhân lực chất lượng cao.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  {/*  Conclusion Section  */}
  <section id="conclusion" style={{ textAlign: 'center', background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 0%, transparent 60%)',  }}>
    <div className="container" style={{ maxWidth: '800px',  }}>
      <h2 style={{ fontSize: '2.2rem', marginBottom: '20px', color: 'var(--text-dark)',  }}>Kết Luận</h2>
      <p style={{ fontSize: '1.15rem', color: 'var(--text-light)', marginBottom: '40px', lineHeight: '1.8',  }}>
        <strong>AI Intern Hub</strong> không chỉ dừng lại ở một ứng dụng học tập trực tuyến hay một cổng thông tin tuyển dụng đơn thuần. Đây là giải pháp chuyển đổi số đột phá trong giáo dục, đánh giá chuẩn xác năng lực học viên, kiến tạo chứng nhận kỹ năng số uy tín, và tạo ra chiếc cầu nối dữ liệu vững chắc kết nối giữa nhà trường, sinh viên và thị trường lao động thời kỳ đại công nghệ AI.
      </p>
      <a href="#features" className="btn btn-primary btn-lg"><i className="fa-solid fa-wand-magic-sparkles"></i> Khám phá các chức năng của AI Intern Hub</a>
    </div>
  </section>

  {/*  Footer  */}
  <footer>
    <div className="container">
      <div className="footer-logo">
        <i className="fa-solid fa-graduation-cap"></i> AI Intern Hub
      </div>
      <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto 24px',  }}>
        Hệ thống chuyển đổi số đánh giá kỹ năng sinh viên và kết nối doanh nghiệp bằng Trí tuệ nhân tạo.
      </p>
      <ul className="footer-links">
        <li><a href="#vision">Tầm Nhìn</a></li>
        <li><a href="#features">Chức Năng</a></li>
        <li><a href="#architecture">Kiến Trúc Kỹ Thuật</a></li>
        <li><a href="#risks">Rủi Ro & Khắc Phục</a></li>
      </ul>
      <div className="copyright">
        &copy; 2026 AI Intern Hub. Bản quyền tài liệu thuộc dự án Nghiên Cứu và Chuyển Đổi Số Giáo Dục.
      </div>
    </div>
  </footer>
</main>

    

    </>
  );
}
