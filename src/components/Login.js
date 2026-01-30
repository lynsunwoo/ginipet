import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login(props) {
  //상태 변수 선언
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  //회원 비회원 폼 변경 상태 변수
  const [memberType, setMemberType] = useState('member');

  //입력폼에 입력시 실행되는 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev, [name]: value
    }))
    setError(''); //에러 초기화
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.post('http://localhost:9070/login', form)
    axios.post('https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/ginipet/login', form)
    
      .then(res => {
        //JWT 토근 저장
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', form.username); //사용자 아이디 저장

        alert('로그인이 완료 되었습니다. 메인페이지로 이동합니다.');
        navigate('/');
      })
      .catch(err => {
        console.error(err);
        setError('로그인 실패: 아이디와 패스워드가 존재하지 않습니다.')
      });
  };

  //휴대폰 본인 인증 ui 
  const handlePhoneAuth = () =>{
    alert('휴대폰 본인 인증')
  }
  return (
    <main>
      <section className='login_box'>
        <h2>로그인</h2>
        <form onSubmit={handleSubmit} className="login_form">
          <p className='form_p'>

            <label htmlFor="member">
              <input
                type="radio"
                id='member'
                name='memberGroup'
                value='member'
                checked={memberType === 'member'}
                onChange={(e) => setMemberType(e.target.value)}
              />
              회원
            </label>

            <label htmlFor="nomember">
              <input
                type="radio"
                id='nomember'
                name='memberGroup'
                value='nomember'
                checked={memberType === 'nomember'}
                onChange={(e) => setMemberType(e.target.value)}
              />
              비회원
            </label>
          </p>
          {memberType === 'member' && (
            <>
              <p className='form_p'>
                <label htmlFor="username">아이디</label>
                <input
                  type="text"
                  id='username'
                  name='username'
                  placeholder='아이디'
                  required
                  onChange={handleChange}
                  value={form.username}
                />
              </p>

              <p className='form_p'>
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id='password'
                  name='password'
                  placeholder='패스워드'
                  required
                  onChange={handleChange}
                  value={form.password}
                />
              </p>

              <p className='id_save'>
                <label htmlFor="username_check">
                  <input
                    type="checkbox"
                    id='username_check'
                  />아이디 저장
                </label>
              </p>

              <p className='submit_btn'>
                {/* <input type="submit" value="로그인" /> 
            button 태그 - 확장 가능한 버튼, 문자, 이미지, 아이콘 , html 요소 모두 사용이 가능하여 자유롭게 css로 서식이 변경가능함. 스타일 적용이 쉬워 리액트에서 주로 많이 사용함.
            input typw="submit" - 내용을 단순하게 전송하기 위한 목적, 버튼안에 텍스트만 들어가며 아이콘, 이미지, 로딩바 적용이 쉽지 않음.
            */}
                <button type='submit'>로그인</button>
              </p>

              <p className='link_group'>
                <Link to="/id_search">아이디 찾기</Link> &#10072;
                <Link to="/pw_search">비밀번호 찾기</Link> &#10072;
                <Link to="/join">회원가입</Link>
              </p>

              {error && <p style={{ color: '#f00' }}>{error}</p>}
            </>
          )}
          {memberType === 'nomember' && (
            <>
              <p className='auth_p'>본인 인증수단을 통해 인증 후 비회원 주문 및 구매내역을 확인하실 수 있습니다.</p>
              <p className='phone_auth'>
                <button type='submit' onClick={handlePhoneAuth}>휴대폰 본인 인증</button>
              </p>
            </>
          )}
        </form>
      </section>
    </main>
  );
}


export default Login;
