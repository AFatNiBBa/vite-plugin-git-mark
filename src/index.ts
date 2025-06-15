
import { getCommentGenerator, HTML_COMMENT_GENERATOR, run } from "./util";
import { name } from "../package.json";
import { Plugin } from 'vite';

/** Creates an instance of the plugin */
export default function gitMarkPlugin(): Plugin {
    var comment: string;
    return {
        name,
        apply: "build",

        async config() {
            const [ commit, branch, pending ] = await Promise.all([
                run("git rev-parse HEAD"),
                run("git rev-parse --abbrev-ref HEAD"),
                run("git status --porcelain").then(Boolean)
            ]);
            const meta: Metadata = { commit, branch, pending, time: new Date().toJSON() };
            comment = `Git metadata: ${JSON.stringify(meta)}`;
        },

        transformIndexHtml(html) {
            return `${HTML_COMMENT_GENERATOR(comment)}\n${html}`;
        },

        generateBundle(_, bundle) {
            for (const file of Object.values(bundle)) {
                if (file.type !== "chunk" || !file.isEntry) continue;
                const f = getCommentGenerator(file.fileName);
                if (!f) continue;
                file.code =  `${f(comment)}\n${file.code}`;
            }
        }
    };
}

/** Type that represents the metadata that will be added to the entry points */
export interface Metadata {
    
    /** The full hash of the current git commit at build time */
    commit: string;
    
    /** The name of the current git branch at build time */
    branch: string;
    
    /** Tells whether the build has been made while there were some pending changes */
    pending: boolean;
    
    /** The moment at which the build was started */
    time: string;
}