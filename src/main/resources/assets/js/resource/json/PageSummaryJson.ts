import {SiteimproveSummaryJson} from './pagesummary/SiteimproveSummaryJson';
import {SiteimproveLinksJson} from './pagesummary/SiteimproveLinksJson';

export interface PageSummaryJson {
    id: number;
    title: string;
    url: string;
    summary: SiteimproveSummaryJson;
    siteimproveLinks: SiteimproveLinksJson;
}
