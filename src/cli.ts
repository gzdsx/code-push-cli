#!/usr/bin/env node

// Suppress deprecation warnings from Node.js built-in modules (Node.js 21+)
const _emitWarning = process.emitWarning;
const SUPPRESSED_WARNINGS = ['punycode', 'Array.isArray'];
process.emitWarning = function (warning: string | Error, options?: any, ...rest: any[]): void {
    if (typeof warning === 'string' && SUPPRESSED_WARNINGS.some((w) => warning.includes(w))) {
        return;
    }
    return _emitWarning.apply(process, [warning, options, ...rest].filter(Boolean) as any);
} as typeof process.emitWarning;

import { command, showHelp } from './command-parser';
import { execute } from './command-executor';
import chalk from 'chalk';

function run(): void {
    if (!command) {
        showHelp(/*showRootDescription*/ false);
        return;
    }

    execute(command).catch((error: any): void => {
        console.error(chalk.red('[Error]  ' + error.message));
        process.exit(1);
    });
}

run();
