import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';

type Props = {
    users: any[];
};

const Test: React.FC<Props> = ({users}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return <div className='users'>
        This is loaded per request, meaning it is SSR.
        <br/>
        {users && users.map(({username, email}) =>
            <div key={username}>
                <Image
        src="/default-image.png"
        alt="Picture of the author"
        width={50}
        height={50}
      />
                <div>Username: {username}</div>
                <div>Email: {email}</div>
                <br/>
            </div>
        )}
    </div>;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const users = await fetch(`http://localhost:${process.env.PORT}/api/user`)
        .then(res => res.json());
    return {
        props: {users}
    };
};

export default Test;
