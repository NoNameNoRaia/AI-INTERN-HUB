"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../app/css/404.css';

export default function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
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
            
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            petal.style.left = `${left}%`;
            petal.style.transform = `rotate(${rotation}deg)`;
            petal.style.animationDuration = `${duration}s`;
            petal.style.animationDelay = `${delay}s`;
            petalsContainer.appendChild(petal);
        }
    }
  }, []);
  return (
    <>


    <div className="pattern-bg"></div>
    <div className="petals" id="petals"></div>

    <div className="container">
        <div className="content">
            <div className="brand-badge">AI INTERN HUB</div>
            <h1 className="error-code">404</h1>
            <h2 className="japanese-title">ページが見つかりません</h2>
            <h3 className="vietnamese-title">Hành trình học tập tạm gián đoạn</h3>
            <p className="description">
                Bài học hoặc trang bạn đang tìm kiếm có thể đã được di chuyển, đổi tên hoặc không còn tồn tại trong hệ thống đào tạo của chúng tôi.
            </p>
            <div className="actions">
                <Link href="/" className="btn btn-primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    Trang chủ
                </Link>
                <button onClick={() => router.back()} className="btn btn-secondary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    Quay lại
                </button>
            </div>
        </div>
        <div className="visual">
            <div className="art-container">
                <div className="circle-art circle-art-2"></div>
                <div className="circle-art"></div>
                {/*  Education/Corporate SVG Icon (A combination of book and tech/structure)  */}
                <svg className="icon-education" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                    <path d="M8 7h6"/>
                    <path d="M8 11h8"/>
                    <circle cx="15" cy="15" r="3" strokeWidth="1.5"/>
                    <path d="m17 17 2 2"/>
                </svg>
            </div>
        </div>
    </div>

    

    </>
  );
}
