import {Title} from './Title';

export class PageTitle
    extends Title {

    constructor(url: string, lastSeenDate: string) {
        super(url);

        this.addDataLine('Last checked', lastSeenDate);
    }
}
