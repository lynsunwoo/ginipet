import React from 'react';

function Main(props) {
  return (
    <main>
      <section>
        <h2>메인 슬라이드</h2>
        {/* <video muted autoPlay loop style={{width:'100%'}}>
          <source src={`${process.env.PUBLIC_URL}/movie/top.mp4`} />
        </video> */}
        <img src={`${process.env.PUBLIC_URL}/images/main1.jpg`} alt="메인1" />
      </section>

      <section>
        <h2>지니펫 쇼핑하러 가기</h2>
        <img src={`${process.env.PUBLIC_URL}/images/shop.jpg`} alt="쇼핑하러 가기" />
      </section>

      <section>
        <h2>지니펫 스토리</h2>
        <img src={`${process.env.PUBLIC_URL}/images/story.jpg`} alt="지니펫 스토리" />
      </section>

      <section>
        <h2>지니펫in 스타</h2>
        <img src={`${process.env.PUBLIC_URL}/images/in_star.jpg`} alt="지니펫in 스타" />
      </section>
    </main>
  );
}

export default Main;