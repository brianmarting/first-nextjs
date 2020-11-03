import prisma from 'database/client';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image'

type Props = {
    username: string;
    email: string;
    location: {
        street: string;
        streetNumber: string,
        postalCode: string;
        town: string;
        country: string;
    }
}

const User = ({username, email, location: {street, streetNumber, postalCode, town, country}}: InferGetStaticPropsType<typeof getStaticProps>) => (
    <div>
        This is generated at build time. You can stop the running docker DB to see that this data will stay present.
        <br/>
        <Image
        src="/default-image.png"
        alt="Picture of the author"
        width={50}
        height={50}
      />
        <div>Username: {username}</div>
        <div>Email: {email}</div>
        <div>Street: {street} {streetNumber}</div>
        <div>Postal code: {postalCode}</div>
        <div>Town: {town}</div>
        <div>Country: {country}</div>
    </div>
);


export const getStaticPaths: GetStaticPaths = async () => {
    const users = await prisma.next_user.findMany({
        select: {id: true}
    });
console.log(users)
    const userIds = users.map(({id}: { id: number }) => ({params: {id: `${id}`}}));

    return {
        paths: userIds,
        fallback: true
    };
};

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
    const user = await prisma.next_user.findOne({
        where: {id: +params?.id!},
        include: {
            location: true
        }
    });

    console.log(user)

    return {props: {...user}};
};

export default User;
