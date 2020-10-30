import { GetStaticProps } from "next";

type Props = {
  users: any[];
};

const Test: React.FC<Props> = ({ users }) => {
  return <div>
      {users && users.map((user) => 
        <div>
            <div>{user.name}</div>
        <div>{user.email}</div>
        </div>
      )}
    </div>;
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`http://localhost:${process.env.PORT}/api/users`);
  const users = await res.json();
  return {
    props: { users },
  };
};

export default Test;