export interface Launch {
  id: string;
  launch_date_local: string;
  mission_name: string;
  launch_success?: string;
  launch_site?: {
    site_id: string;
    site_name: string
  }
}

type ShortLaunch = Pick<Launch, 'id'|'launch_date_local'|'mission_name'>;