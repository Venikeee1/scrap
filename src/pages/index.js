import { useState } from 'react';
import Head from 'next/head';
import css from '../styles/Home.module.css';
import peopleServices from '../services/people';
import NamesList from '../components/homepage/names';

export default function Home({ people = [] }) {
  const [query, setQuery] = useState('');
  const names = query ? people.filter((item) => item.includes(query)) : people;
  const handleSearch = (event) => {
    const { value } = event.target;
    setQuery(value);
  };

  return (
    <div className="container">
      <Head>
        <title>Search people</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={css.namesList}>
          <input
            type="search"
            className={css.search}
            placeholder="Search"
            onChange={handleSearch}
          />
          {names.length ? <NamesList names={names} /> : 'Ничего не найдено'}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await peopleServices.fetchNamesList();

  return {
    props: {
      people: Object.keys(data),
    },
  };
}
