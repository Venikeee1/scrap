import Head from 'next/head';
import peopleServices from '../../services/people';
import UserList from '../../components/users/List';

export default function Home({ people }) {
  return (
    <div>
      <Head>
        <title>Person list</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container">
          <UserList users={people} />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { name } = query;
  const { data } = await peopleServices.fetchPeopleListByName(name);

  return {
    props: {
      people: Object.values(data),
    },
  };
}
