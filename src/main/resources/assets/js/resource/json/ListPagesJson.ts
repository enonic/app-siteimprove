import {PageApiJson} from './PageApiJson';

export interface ListPagesJson {
    items: PageApiJson[];
    total_items: number;
    total_pages: number;
}
