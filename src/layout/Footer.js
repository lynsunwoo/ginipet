import React from 'react';

function Footer(props) {
  return (
    <footer>
      <img src={`${process.env.PUBLIC_URL}/images/footer.jpg`} alt="푸터내용" />
      {/* <address>Copyright&copy;2025 지니펫 allrights reserved.</address> */}
    </footer>
  );
}

export default Footer;