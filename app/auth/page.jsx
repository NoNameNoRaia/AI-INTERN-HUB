"use client";

import { useState, useEffect } from 'react';
import '../../app/css/auth.css';

export default function AuthPage() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  useEffect(() => {
  }, []);
  return (
    <>


    {/*  Background Elements  */}
    <div className="pattern-bg"></div>
    <div className="petals" id="petals"></div>

    <div className="auth-wrapper">
        <a href="/" className="back-home">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            Quay lại trang chủ
        </a>

        <div className={`auth-container glass-card ${isSignUpMode ? 'right-panel-active' : ''}`} id="auth-container">
            {/*  Sign Up Form  */}
            <div className="form-container sign-up-container">
                <form action="#">
                    <h2>Tạo Tài Khoản</h2>
                    <p className="subtitle">Bắt đầu hành trình của bạn với AI</p>
                    <div className="social-container">
                        <a href="#" className="social"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg></a>
                        <a href="#" className="social"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" fill="#1877F2"/></svg></a>
                        <a href="#" className="social"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" fill="#0A66C2"/></svg></a>
                    </div>
                    <span className="divider">hoặc sử dụng email</span>
                    
                    <div className="input-group">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <input type="text" placeholder="Họ và tên" required />
                    </div>
                    <div className="input-group">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        <input type="email" placeholder="Email" required />
                    </div>
                    <div className="input-group">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <input type="password" placeholder="Mật khẩu" required />
                    </div>
                    <button className="btn btn-primary auth-btn">Đăng Ký</button>
                    
                    <div className="mobile-toggle">
                        Đã có tài khoản? <a href="#" onClick={(e) => { e.preventDefault(); setIsSignUpMode(false); }}>Đăng nhập</a>
                    </div>
                </form>
            </div>

            {/*  Sign In Form  */}
            <div className="form-container sign-in-container">
                <form action="#">
                    <div className="form-logo">
                        <img src="/images/logo.png?v=2" alt="AI Intern Hub Logo" />
                    </div>
                    <h2>Chào mừng trở lại</h2>
                    <p className="subtitle">Đăng nhập vào hệ thống AI Intern Hub</p>
                    <div className="social-container">
                        <a href="#" className="social"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg></a>
                        <a href="#" className="social"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" fill="#1877F2"/></svg></a>
                        <a href="#" className="social"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" fill="#0A66C2"/></svg></a>
                    </div>
                    <span className="divider">hoặc đăng nhập bằng tài khoản</span>
                    
                    <div className="input-group">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        <input type="email" placeholder="Email" required />
                    </div>
                    <div className="input-group">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <input type="password" placeholder="Mật khẩu" required />
                    </div>
                    <a href="#" className="forgot-pass">Quên mật khẩu?</a>
                    <button className="btn btn-primary auth-btn">Đăng Nhập</button>

                    <div className="mobile-toggle">
                        Chưa có tài khoản? <a href="#" onClick={(e) => { e.preventDefault(); setIsSignUpMode(true); }}>Đăng ký</a>
                    </div>
                </form>
            </div>

            {/*  Overlay Panel for Sliding Animation  */}
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h2>Chào mừng trở lại!</h2>
                        <p>Để tiếp tục kết nối, vui lòng đăng nhập bằng thông tin cá nhân của bạn</p>
                        <button className="btn btn-outline overlay-btn" id="signIn" onClick={() => setIsSignUpMode(false)}>Đăng Nhập</button>
                        
                        {/*  Premium abstract graphics inside overlay  */}
                        <div className="overlay-graphic">
                            <div className="circle-sm"></div>
                            <div className="circle-md"></div>
                        </div>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h2>Xin chào!</h2>
                        <p>Nhập thông tin của bạn để bắt đầu hành trình đánh giá năng lực cùng AI</p>
                        <button className="btn btn-outline overlay-btn" id="signUp" onClick={() => setIsSignUpMode(true)}>Đăng Ký</button>

                        <div className="overlay-graphic">
                            <div className="circle-sm right"></div>
                            <div className="circle-md right"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/*  Re-use main.js for petals animation  */}
    
    

    </>
  );
}
