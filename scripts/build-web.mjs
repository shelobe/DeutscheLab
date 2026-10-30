// Build a self-contained copy of the existing site for Capacitor without altering the live site.
import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';
const root = process.cwd();
const output = join(root, 'www');
const ignored = new Set(['.git','.github','node_modules','www','android','ios','docs','scripts','package.json','package-lock.json','capacitor.config.json','.gitignore','README-android.md']);
await rm(output,{recursive:true,force:true});
await mkdir(output,{recursive:true});
for (const entry of await readdir(root)) {
  if (ignored.has(entry) || entry.startsWith('.')) continue;
  const source = join(root,entry);
  const details = await stat(source);
  if (details.isFile() || details.isDirectory()) await cp(source,join(output,entry),{recursive:true});
}
console.log('Built DeutschLab web assets in www/');
