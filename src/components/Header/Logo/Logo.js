import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';
const Logo = ({ className }) => {
  const styles = className ? ['logo', className] : ['logo'];
  return (
    <Link className={styles.join(' ')} to="/">
      C
    </Link>
  );
};

export default Logo;
