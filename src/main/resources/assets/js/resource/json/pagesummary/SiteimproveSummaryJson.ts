import {PageDciJson} from './PageDciJson';
import {PageStatusJson} from './PageStatusJson';
import {AccessibilitySummaryJson} from './AccessibilitySummaryJson';
import {QASummaryJson} from './QASummaryJson';
import {SEOSummaryJson} from './SEOSummaryJson';

export interface SiteimproveSummaryJson {
    dci: PageDciJson;
    status: PageStatusJson;
    accessibility: AccessibilitySummaryJson;
    qa: QASummaryJson;
    seo: SEOSummaryJson;
}
