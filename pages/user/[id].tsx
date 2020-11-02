import { PrismaClient } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';

type Props = {
    username: string;
    email: string;
}

const User = ({username, email}: Props) => (
    <div>
        This is generated at build time. You can stop the running docker DB to see that this data will stay present.
        <br/>
        {username}
        {email}
    </div>
);

const prisma = new PrismaClient();

export const getStaticPaths: GetStaticPaths = async () => {
    const users = await prisma.next_user.findMany();

    const userIds = users.map(({id}: { id: number }) => ({params: {id: `${id}`}}));

    return {
        paths: userIds,
        fallback: true
    };
};

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
    const user = await prisma.next_user.findOne({where: {id: +params?.id!}}) as any;

    return {props: {...user}};
};

export default User;
