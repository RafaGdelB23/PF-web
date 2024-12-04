import React from 'react';
import Header from '../components/Header/Header.jsx';
import ChangePassConf from '../components/ChangePassConf/ChangePassConf.jsx';
import Footer from '../components/Footer/Footer.jsx';

export const ChangePasswordConfirm = () => {
    return (
        <div>
            <Header />
            <ChangePassConf />
            <Footer />
        </div>
    );
}

export default ChangePasswordConfirm;