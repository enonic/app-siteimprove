declare type HTMLImports = { currentScript: { ownerDocument?: Document } };
declare type WindowWithImports = Window & { HTMLImports: HTMLImports };
declare type CurrentScript = HTMLScriptElement | SVGScriptElement | null;
declare type ScriptWithImport = CurrentScript & { __importElement?: CurrentScript };

export type DocumentData = {
    uid: string
};

function getDocument(): Document {
    const win: WindowWithImports = <WindowWithImports>window;
    let script = win.HTMLImports ? win.HTMLImports.currentScript : undefined;

    if (!script && document.currentScript) {
        const currentScript: ScriptWithImport = <ScriptWithImport>document.currentScript;
        script = currentScript.__importElement || currentScript;
    }

    return script ? script.ownerDocument : document;
}

function getUID(doc: Document): string {
    const re = /(?:uid=)((?:(?!&).)+)/;
    const result = doc.baseURI.match(re);
    return result ? result[1] : null;
}

export function getDocumentData(): DocumentData {
    const doc = getDocument();
    const uid = getUID(doc);

    return {uid};
}
