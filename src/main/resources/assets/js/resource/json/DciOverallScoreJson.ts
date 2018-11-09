import {AccessibilityScoreJson} from './AccessibilityScoreJson';
import {QAScoreJson} from './QAScoreJson';
import {SEOScoreJson} from './SEOScoreJson';

export interface DciOverallScoreJson {
    accessibility: AccessibilityScoreJson;
    qa: QAScoreJson;
    seo: SEOScoreJson;
    total: number;
}
