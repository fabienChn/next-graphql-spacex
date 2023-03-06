import { ChangeEvent, KeyboardEvent, useContext, useMemo, useState } from 'react'
import Link from 'next/link';
import { ShortLaunch } from '@/types';
import client from "@/apollo-client";
import { getLaunchesQuery } from '@/queries';
import Pagination from '@/components/pagination';

interface HomeProps {
  initialLaunches: ShortLaunch[];
}

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: getLaunchesQuery,
    variables: {
      sort: 'launch_date_local',
      order: 'asc',
      offset: 0,
      limit: 30,
    }
  });

  return {
    props: {
      initialLaunches: data.launches,
    }
  }
};

export default function Home({ initialLaunches }: HomeProps): JSX.Element {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [launches, setLaunches] = useState<ShortLaunch[]>(initialLaunches);

  const handleSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };

  const handleInputKeyDown = ({ code }: KeyboardEvent<HTMLInputElement>) => {
    if (code === 'Enter') {
      filterLaunches();
    }
  }

  const filterLaunches = async () => {
    const text = search.toLocaleLowerCase();

    const limit = 30;

    const { data } = await client.query({
      query: getLaunchesQuery,
      variables: {
        sort: 'launch_data_local',
        order: 'asc',
        offset: limit * (page - 1),
        limit: limit,
        find: {
          // @TODO: the endpoint doesn't seem to filter at all
          launch_date_local: text,
          mission_name: text,
        }
      }
    })
    
    setIsLastPage(data.launches.count < limit)
    setLaunches(data.launches);
  };

  const filteredLaunches = useMemo((): ShortLaunch[] => {
    return launches.filter(launch => (
      launch.mission_name?.includes(search) || launch.launch_date_local?.includes(search)
    ));
  }, [launches, search]);

  return (
    <>
        <div>
          <h1 className="text-xl mb-4">
            Launches:
          </h1>
          
          <div className="my-2">
            <input 
              className="p-2 rounded-lg border-orange-100 border-2"
              value={search} 
              onChange={handleSearchChange} 
              placeholder="Search by name or date" 
              onKeyDown={handleInputKeyDown}
            />
          </div>

          <div className="flex flex-col">
            {filteredLaunches?.map((launch) => (
              <div key={launch.id}>
                <Link href={`/launches/${launch.id}`}>
                  {launch.id} - {launch.mission_name} - {launch.launch_date_local}
                </Link>
              </div>
            ))}
          </div>

          <Pagination currentPage={page} isLastPage={isLastPage} onPageChange={setPage} />
        </div>
    </>
  )
}
