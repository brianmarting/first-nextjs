import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";

type Props = {
  something: any[];
};

const Test: React.FC<Props> = ({ something }) => {
  return <div>
      {something && something.map((thing) => 
        <div>
            <div>{thing.name}</div>
        <div>{thing.email}</div>
        </div>
      )}
    </div>;
};

const prisma = new PrismaClient();

export const getStaticProps: GetStaticProps = async () => {
  const something = await prisma.nextjs_user.findMany();
  console.log(something, 'sth')
  return {
    props: { something },
  };
};

export default Test;