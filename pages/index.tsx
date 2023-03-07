import { ChangeEvent, KeyboardEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
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
      order: 'asc', // @TODO: order doesn't seem to work
      offset: 0,
      limit: 30,
    }
  });

  return {
    props: {
      initialLaunches: data.launches,
    }
  };
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
      setPage(1);
      filterLaunches();
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    filterLaunches();
  };

  const filterLaunches = async () => {
    const text = search.toLocaleLowerCase();

    const limit = 30;

    // @TODO: the query returns a CORS error when running on client side
    const { data } = await client.query({
      query: getLaunchesQuery,
      variables: {
        sort: 'launch_data_local',
        order: 'asc', // @TODO: order doesn't seem to work
        offset: limit * (page - 1),
        limit: limit,
        find: {
          // @TODO: the endpoint doesn't seem to filter at all
          launch_date_local: text,
          mission_name: text,
        }
      }
    });
    
    setIsLastPage(data.launches.count < limit)
    setLaunches(data.launches);
  };

  return (
    <div>
      <h1 className="title">
        Launches:
      </h1>
      
      <div className="my-2">
        <input 
          className="input border-orange-100"
          value={search} 
          placeholder="Search by name or date" 
          onChange={handleSearchChange} 
          onKeyDown={handleInputKeyDown}
        />
      </div>

      <div className="flex flex-col gap-3">
        {launches?.map((launch) => (
          <div key={launch.id} className="p-1">
            <Link href={`/launches/${launch.id}`}>
              {dayjs(launch.launch_date_local).format('YYYY-MM-DD HH:mm')}: <strong>{launch.mission_name}</strong>
            </Link>
          </div>
        ))}
      </div>

      <Pagination 
        currentPage={page} 
        isLastPage={isLastPage} 
        onPageChange={handlePageChange}
      />
    </div>
  );
}
