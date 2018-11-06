import {SiteJson} from './SiteJson';

export interface ListSitesJson {
    items: SiteJson[];
    total_items: number;
    total_pages: number;
}
