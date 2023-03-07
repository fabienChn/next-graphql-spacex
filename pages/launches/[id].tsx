import client from '@/apollo-client';
import { getLaunchQuery } from '@/queries';
import { Launch } from '@/types';
import { GetStaticPaths, GetStaticPropsContext } from 'next';

interface LaunchDetailProps {
  launch: Launch;
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
  paths: [],
  fallback: 'blocking'
});

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { data } = await client.query({
    query: getLaunchQuery,
    variables: {
      launchId: params?.id,
    }
  });

  return {
    props: {
      launch: data.launch,
    }
  }
};

export default function LaunchDetail({ launch }: LaunchDetailProps): JSX.Element {
  return (
    <div>
      <h1 className="title">
        Details of launch {launch?.id}
      </h1>

      <div className="flex flex-col">
        <span>Mission: {launch?.mission_name}</span>
        <span>Date: {launch?.launch_date_local}</span>
        <span>Site: {launch?.launch_site?.site_name}</span>
        <span>Success: {launch?.launch_success}</span>
      </div>
    </div>
  );
}