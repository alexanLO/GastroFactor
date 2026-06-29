#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const args = new Set(process.argv.slice(2));
const checkMode = args.has('--check');

const statsPath = path.resolve(rootDir, 'dist/GastroFactor/stats.json');
const baselinePath = path.resolve(rootDir, 'tools/perf/bundle-size-baseline.json');

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function normalizeBundleName(output) {
  if (!output.entryPoint) {
    return null;
  }

  const entryPoint = output.entryPoint;

  if (entryPoint === 'src/main.ts') {
    return 'main';
  }

  const fileName = path.basename(entryPoint);
  const withoutExtension = fileName.replace(/\.[^.]+$/, '');

  return withoutExtension.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase();
}

function collectBundleSizes(stats) {
  const bundleSizes = new Map();

  for (const output of Object.values(stats.outputs ?? {})) {
    const name = normalizeBundleName(output);

    if (!name || typeof output.bytes !== 'number') {
      continue;
    }

    bundleSizes.set(name, output.bytes);
  }

  return bundleSizes;
}

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  return `${(bytes / 1024).toFixed(2)} kB`;
}

function printReport(currentSizes, baseline) {
  const baselineBundles = baseline.bundles ?? {};
  const names = Array.from(new Set([...Object.keys(baselineBundles), ...currentSizes.keys()])).sort();

  console.log('Bundle size report');
  console.log('------------------');

  for (const name of names) {
    const current = currentSizes.get(name);
    const base = baselineBundles[name];

    if (typeof current !== 'number') {
      console.log(`${name}: missing in current build (baseline ${formatBytes(base)})`);
      continue;
    }

    if (typeof base !== 'number') {
      console.log(`${name}: ${formatBytes(current)} (new bundle)`);
      continue;
    }

    const delta = current - base;
    const deltaPct = base === 0 ? 0 : (delta / base) * 100;
    const signal = delta > 0 ? '+' : '';

    console.log(
      `${name}: ${formatBytes(current)} (baseline ${formatBytes(base)}, ${signal}${deltaPct.toFixed(2)}%)`
    );
  }
}

function runCheck(currentSizes, baseline) {
  const baselineBundles = baseline.bundles ?? {};
  const maxRegressionPercent = Number(baseline.maxRegressionPercent ?? 10);
  const failures = [];

  for (const [name, baselineBytes] of Object.entries(baselineBundles)) {
    const currentBytes = currentSizes.get(name);

    if (typeof currentBytes !== 'number') {
      failures.push(`${name}: bundle not found in current build`);
      continue;
    }

    const limit = baselineBytes * (1 + maxRegressionPercent / 100);

    if (currentBytes > limit) {
      const growth = ((currentBytes - baselineBytes) / baselineBytes) * 100;
      failures.push(
        `${name}: ${formatBytes(currentBytes)} is above ${formatBytes(limit)} (${growth.toFixed(2)}% growth)`
      );
    }
  }

  if (failures.length > 0) {
    console.error('Bundle regression check failed:');

    for (const failure of failures) {
      console.error(`- ${failure}`);
    }

    process.exit(1);
  }

  console.log('Bundle regression check passed.');
}

try {
  const stats = readJson(statsPath);
  const baseline = readJson(baselinePath);
  const currentSizes = collectBundleSizes(stats);

  printReport(currentSizes, baseline);

  if (checkMode) {
    runCheck(currentSizes, baseline);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
