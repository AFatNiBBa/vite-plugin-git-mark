
import { exec } from "child_process";
import { extname } from "path";

/**
 * Converts a string into an HTML comment
 * @param x  The string to convert
 */
export const HTML_COMMENT_GENERATOR = (x: string) => `<!-- ${x} -->`;

/**
 * Runs a command asynchronously and returns its output
 * @param command The command to run
 */
export function run(command: string): Promise<string> {
    return new Promise((t, c) => {
        exec(command, (error, stdout, stderr) => {
            if (error) c(error);
            else if (stderr) c(new Error(`Command error: ${stderr.trim()}`));
            else t(stdout.trim());
        });
    });
}

/**
 * Gets a function that converts a string into a comment based on the extension of {@link file}
 * @param file The file from which to get the extension
 */
export function getCommentGenerator(file: string): ((x: string) => string) | undefined {
    switch (extname(file).toLowerCase()) {
        case ".html":
            return HTML_COMMENT_GENERATOR;
        case ".css":
            return x => `/* ${x} */`;
        case ".js":
        case ".mjs":
        case ".cjs":
        case ".ts":
        case ".mts":
        case ".cts":
        case ".scss":
        case ".sass":
            return x => `// ${x}`;
    }
}