import { GetServerSideProps } from 'next';

type Props = {
    users: any[];
};

const Test: React.FC<Props> = ({users}) => {
    return <div className='users'>
        This is loaded per request, meaning it is SSR.
        <br/>
        {users && users.map((user) =>
            <div key={user.username}>
                <div>Username: {user.username}</div>
                <div>Email: {user.email}</div>
                <br/>
            </div>
        )}
    </div>;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const users = await fetch(`http://localhost:${process.env.PORT}/api/users`)
        .then(res => res.json());
    return {
        props: {users}
    };
};

export default Test;
