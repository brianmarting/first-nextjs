import { GetStaticProps } from "next";

type Props = {
  users: any[];
};

const Test: React.FC<Props> = ({ users }) => {
  return <div>
      {users && users.map((user) => 
        <div>
            <div>{user.username}</div>
        <div>{user.email}</div>
        </div>
      )}
    </div>;
};

export const getStaticProps: GetStaticProps = async () => {
  const users = await fetch(`http://localhost:${process.env.PORT}/api/users`)
      .then(res => res.json());
  return {
    props: { users },
  };
};

export default Test;
