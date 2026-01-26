import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Join(props) {
  //변수 선언
  const [form, setForm] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
    tel: ''
  });

  //회원가입 실패 변수
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  //페이지 이동
  const navigate = useNavigate();

  //아이디 중복체크
  const checkUsername = () => {
    // if(!form.username){
    //   alert('아이디를 입력하세요');
    //   return;
    // }

    // axios.get(`http://localhost:9070/check-username/${form.username}`)
    // .then(res => {
    //   setSuccess('사용 가능한 아이디입니다.');
    // })
    // .catch(()=>{
    //   setError('이미 사용중인 아이디입니다');
    // });
    axios.post('http://localhost:9070/check-username', {
      username: form.username
    })
      .then(res => {
        if (res.data.exists) {
          setError('이미 사용중인 아이디입니다.');
        } else {
          setSuccess('사용 가능한 아이디입니다.');
        }
      });
  };

  //회원가입 성공 변수
  const [agree, setAgree] = useState(false);

  //입력한 값 저장하기
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev, [name]: value
    }))

    //데이터가 없으면 에러를 띄우기
    setError(''); //에러 초기화
    setSuccess(''); //성공 초기화
  }

  //회원가입 버튼 클릭시 해당 값들을 서버측으로 전송함
  const handleSubmit = (e) => {
    e.preventDefault();

    //비밀번호, 비밀번호 확인 
    if (form.password !== form.password2) {
      setError('비밀번호가 일치하지 않습니다');
      return;
    }

    //약관 동의 체크
    if (!agree) {
      alert('개인 정보처리 방침에 동의해주세요');
      return;
    }
    axios.post('http://localhost:9070/register', form)
      .then(res => {
        alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/login');
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
        setError('회원가입 실패 : 아이디가 이미 존재하거나 서버 오류입니다.');
      });
  };

  return (
    <main>
      <section className='join_box'>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit} className="join_form">
          <p className='join_p'>
            <label htmlFor="username">아이디 :</label>
            <input
              type="text"
              id='username'
              name='username'
              placeholder='아이디 입력'
              value={form.username}
              onChange={handleChange}
              required
            />
            <button type='button' onClick={checkUsername}>중복확인</button>
          </p>

          <p className='join_p'>
            <label htmlFor="password">패스워드 :</label>
            <input
              type="password"
              id='password'
              name='password'
              placeholder='패스워드 입력'
              value={form.password}
              onChange={handleChange}
              required
            />
          </p>

          <p className='join_p'>
            <label htmlFor="password2">패스워드 확인 :</label>
            <input
              type="password"
              id='password2'
              name='password2'
              placeholder='패스워드 입력'
              value={form.password2}
              onChange={handleChange}
              required
            />
          </p>

          <p className='join_p'>
            <label htmlFor="email">이메일 주소 :</label>
            <input
              type="email"
              id='email'
              name='email'
              placeholder='id@domain.co.kr'
              value={form.email}
              onChange={handleChange}
              required
            />
          </p>

          <p className='join_p'>
            <label htmlFor="tel">전화번호 :</label>
            <input
              type="tel"
              id='tel'
              name='tel'
              placeholder='000-0000-0000'
              value={form.tel}
              onChange={handleChange}
              required
            />
          </p>

          <p className='check_save'>
            <input
              type="checkbox"
              required
              id="agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label htmlFor="agree">이용약관, 개인정보 수집 및 이용, 마케팅 활용 선택에 모두 동의합니다.</label>
          </p>
          <p className='submit_btn'>
            <button type='submit'>회원가입</button>
          </p>

          {/* 회원가입이 실패하면 나오는 문구 */}
          {error && <p style={{ color: '#f00' }}>{error}</p>}
          {success && <p style={{ color: '#0f0' }}>{success}</p>}
        </form>
      </section>
    </main>
  );
}

export default Join;