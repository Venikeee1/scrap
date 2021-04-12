import css from './Homepage.module.css';
import Link from 'next/link';

const NamesList = ({ names }) => {
  return (
    <ul className={css.list}>
      {names.map((name) => {
        return (
          <li key={name} className={css.item}>
            <Link href={`/users/${name}`}>
              <a className={css.link}>{name}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NamesList;
