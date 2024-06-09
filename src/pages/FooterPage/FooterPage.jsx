import React from 'react';
import '../../pages/FooterPage/style';
import { FooterContainer, FooterInfo, FooterLink, FooterList, FooterListItem, FooterSection, FooterTitle } from '../../pages/FooterPage/style';

const Footer = () => {
    return (
        <FooterContainer className="footer">
            <hr style={{ backgroundColor: '#f6422e', height: '5px', border: 'none' }} />
            <div className="grid wide">
                <div className="grid__row-footer row col-10">
                    <div className="grid__footer">
                        <FooterList className="grid__footer-list">
                            <FooterTitle>Thông tin chung</FooterTitle>
                            <FooterListItem className="grid__footer-list-item"><FooterLink href="#" className="grid__footer-list-item-link">Giới thiệu về công ty</FooterLink></FooterListItem>
                            <FooterListItem className="grid__footer-list-item"><FooterLink href="#" className="grid__footer-list-item-link">Câu hỏi thường gặp khi mua hàng</FooterLink></FooterListItem>
                            <FooterListItem className="grid__footer-list-item"><FooterLink href="#" className="grid__footer-list-item-link">Chính sách bảo mật</FooterLink></FooterListItem>
                            <FooterListItem className="grid__footer-list-item"><FooterLink href="#" className="grid__footer-list-item-link">Quy chế hoạt động</FooterLink></FooterListItem>
                            <FooterListItem className="grid__footer-list-item"><FooterLink href="#" className="grid__footer-list-item-link">Kiểm tra hóa đơn điện tử</FooterLink></FooterListItem>
                        </FooterList>
                    </div>
                    <div className="grid__footer">
                        <FooterList className="grid__footer-list">
                            <FooterTitle>Chính sách mua hàng</FooterTitle>
                            <FooterListItem className="grid__footer-list-item"><FooterLink href="#" className="grid__footer-list-item-link">Chính sách bảo hành</FooterLink></FooterListItem>
                            <FooterListItem className="grid__footer-list-item"><FooterLink href="#" className="grid__footer-list-item-link">Chính sách đổi trả hàng, hoàn tiền</FooterLink></FooterListItem>
                            <FooterListItem className="grid__footer-list-item"><FooterLink href="#" className="grid__footer-list-item-link">Phương thức thanh toán</FooterLink></FooterListItem>
                            <FooterListItem className="grid__footer-list-item"><FooterLink href="#" className="grid__footer-list-item-link">Vận chuyển lắp đặt</FooterLink></FooterListItem>
                        </FooterList>
                    </div>
                    <div className="grid__footer">
                        <FooterList className="grid__footer-list">
                            <FooterTitle>Hỗ trợ khách hàng</FooterTitle>
                            <FooterListItem className="grid__footer-list-item"><FooterLink href="#" className="grid__footer-list-item-link">Hướng dẫn mua hàng online</FooterLink></FooterListItem>
                            <FooterListItem className="grid__footer-list-item"><FooterLink href="#" className="grid__footer-list-item-link">Thông tin khuyến mại</FooterLink></FooterListItem>
                            <FooterListItem className="grid__footer-list-item"><FooterLink href="#" className="grid__footer-list-item-link">Gửi yêu cầu bảo hành</FooterLink></FooterListItem>
                            <FooterListItem className="grid__footer-list-item"><FooterLink href="#" className="grid__footer-list-item-link">Góp ý, khiếu nại</FooterLink></FooterListItem>
                        </FooterList>
                    </div>
                    <div className="grid__footer mobile__footer">
                        <FooterList className="grid__footer-list">
                            <FooterTitle>Liên hệ chúng tôi</FooterTitle>
                            <FooterListItem className="grid__footer-list-item">
                                <FooterLink href="#" className="grid__footer-list-item-link">
                                    <i className="icons-footer fa-brands fa-facebook-square" style={{ color: 'blue', width: '40px', fontSize: '24px', marginLeft: '2px' }}></i>Fanpage FPT Shop
                                </FooterLink>
                            </FooterListItem>
                            <FooterListItem className="grid__footer-list-item">
                                <FooterLink href="#" className="grid__footer-list-item-link">
                                    <i className="icons-footer fa-brands fa-youtube" style={{ color: '#DC143C', width: '40px' }}></i>Điện máy xanh
                                </FooterLink>
                            </FooterListItem>
                            <FooterListItem className="grid__footer-list-item">
                                <FooterLink href="#" className="grid__footer-list-item-link">
                                    <i className="icons-footer fa-brands fa-facebook-messenger" style={{ color: '#1E90FF', width: '40px', fontSize: '24px', marginLeft: '0px' }}></i>Chat với tư vấn viên
                                </FooterLink>
                            </FooterListItem>
                        </FooterList>
                    </div>
                </div>
            </div>
            <FooterInfo className="info-footer">
                © 2007 - 2021 Công Ty Cổ Phần Bán Lẻ Kỹ Thuật Số FPT / Địa chỉ: 261 - 263 Khánh Hội, P2, Q4, TP. Hồ Chí Minh / GPĐKKD số 0311609355 do Sở KHĐT TP.HCM cấp ngày 08/03/2012. GP số 47/GP-TTĐT do sở TTTT TP HCM cấp ngày 02/07/2018. Điện thoại: (028)73023456. Email: fptshop@fpt.com.vn. Chịu trách nhiệm nội dung: Nguyễn Trịnh Nhật Linh.
            </FooterInfo>
        </FooterContainer>
    );
}

export default Footer;
