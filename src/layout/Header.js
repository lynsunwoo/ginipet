import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header(props) {
  // 1. 상태변경함수
  const [menuOpen, setMenuOpen] = useState(false);

  //로컬 저장소에 있는 아이디값을 변수에 저장
  const username = localStorage.getItem('username');

  const location = useLocation();

  //로그인 상태 함수
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogin(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLogin(false);

    // window.location.reload();상태 갱신을 위해 새로고침 (선택)
  };

  return (
    <header className="header">
      <h1>
        <Link to="/" title="메인페이지로 바로가기">
          <img src={`${process.env.PUBLIC_URL}/images/logo_clr.png`} alt="상단로고" />
        </Link>
      </h1>

      <button className="toggle_btn" onClick={() => setMenuOpen(true)}>
        <img src={`${process.env.PUBLIC_URL}/images/topIcon_burger.png`} alt="전체메뉴" />
      </button>

      <Link to='/cart' tile="장바구니" className="cart_btn">
        <img src={`${process.env.PUBLIC_URL}/images/topIcon_cart.png`} alt="장바구니" />
      </Link>

      {/*  모바일 내비게이션  */}
      <nav className="navi"
        style={{ left: menuOpen ? '0%' : '-100%' }}
      //삼항조건연산자 = 조건식?참인값:거짓인값
      >
        <button className="close_btn" onClick={() => setMenuOpen(false)}>
          <img src={`${process.env.PUBLIC_URL}/images/btn_close.png`} alt="닫기" />
        </button>

        <p className='member_name'>
          <b>{username}</b>
          {isLogin ? ('님 환영합니다.'):('')}
        </p>

        <ul className="gnb">
          <li><Link to='/' onClick={() => setMenuOpen(false)}>지니펫 쇼핑몰</Link></li>
          <li><Link to='/intro' onClick={() => setMenuOpen(false)}>브랜드 소개</Link></li>
          <li><Link to='/info' onClick={() => setMenuOpen(false)}>반려견 정보</Link></li>
          <li><Link to='/event' onClick={() => setMenuOpen(false)}>이벤트</Link></li>
          <li><Link to='/customer' onClick={() => setMenuOpen(false)}>고객지원</Link></li>
        </ul>
        <ul className="form_navi">
          {isLogin ? (
            <>
              <li>
                <Link
                  to="/login"
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                >
                  로그아웃
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  로그인
                </Link>
              </li>
              <li>
                <Link to="/join" onClick={() => setMenuOpen(false)}>
                  회원가입
                </Link>
              </li>
            </>
          )}

          <li><Link to='/order' onClick={() => setMenuOpen(false)}>주문조회</Link></li>
          <li><Link to='/cart' onClick={() => setMenuOpen(false)}>장바구니</Link></li>
        </ul>
      </nav>
    </header >
  );
}

export default Header;