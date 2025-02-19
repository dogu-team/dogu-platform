import { ProjectId } from '@dogu-private/types';
import { GetServerSideProps } from 'next';

export const buildQueryPraramsByObject = (obj: object, option?: { removeFalsy: boolean }) => {
  const param = new URLSearchParams();
  Object.keys(obj).forEach((key) => {
    if (option?.removeFalsy) {
      if (obj[key as keyof typeof obj] === undefined || obj[key as keyof typeof obj] === null) {
        return;
      }
    }
    param.append(key, `${obj[key as keyof typeof obj]}`);
  });

  return param.toString();
};

export const projectPageGetServerSideProps: GetServerSideProps = async (context) => {
  const projectId = context.query.pid;

  if (!projectId) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      projectId: projectId as ProjectId,
    },
  };
};
