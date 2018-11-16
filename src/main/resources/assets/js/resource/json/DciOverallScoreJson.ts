import {AccessibilityScoreJson} from './dcioverallscore/AccessibilityScoreJson';
import {QAScoreJson} from './dcioverallscore/QAScoreJson';
import {SEOScoreJson} from './dcioverallscore/SEOScoreJson';

export interface DciOverallScoreJson {
    accessibility: AccessibilityScoreJson;
    qa: QAScoreJson;
    seo: SEOScoreJson;
    total: number;
}
