#!/usr/bin/env node

// Suppress the punycode module deprecation warning (Node.js 21+)
const _emitWarning = process.emitWarning;
process.emitWarning = function (warning: string | Error, options?: any, ...rest: any[]): void {
    if (typeof warning === 'string' && warning.includes('punycode')) {
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
