import Link from 'next/link';
import Logo from './Logo';
import css from './Header.module.css';

const Header = () => {
  return (
    <header className={css.header}>
      <div className="container">
        <Link href="/">
          <a>
            <Logo className={css.logo} />
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
