import css from './List.module.css';
import cx from 'classnames';

const BASE_EXTERNAL_LINK =
  'https://businessportal.vistra.com/business-information/director-search#!search/';

const List = ({ users }) => {
  return (
    <table className={css.table}>
      <caption>Таблица клиентов</caption>
      <thead>
        <tr>
          <th className={css.cell}>Имя</th>
          <th className={css.cell}>Ссылка на сайт 192</th>
          <th className={css.cell}>Ссылка на внешний ресурс</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ name, link }) => {
          const match = link.replace('https://').split('/');
          const externalLink = `${BASE_EXTERNAL_LINK}${match[4]}/${match[3]}/${match[5]}`;

          return (
            <tr key={name + link}>
              <td className={cx(css.cell, css.name)}>{name}</td>
              <td className={cx(css.cell, css.cellLink)}>
                <a
                  href={link}
                  className={css.link}
                  title={link}
                  target="_blank"
                >
                  {link}
                </a>
              </td>
              <td className={cx(css.cell, css.cellLink)}>
                <a
                  href={externalLink}
                  className={css.link}
                  title={externalLink}
                  target="_blank"
                >
                  {externalLink}
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default List;
