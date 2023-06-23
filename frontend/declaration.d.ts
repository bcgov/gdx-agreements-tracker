/**
 * TypeScript does not know that there are files other than .tsor .tsx so it will throw an error if an import has an unknown file suffix.
 *
 * If you have a webpack config that allows you to import other types of files, you have to tell the TypeScript compiler that these files exist.
 * To do so add a declaration file in which you declare modules with fitting names.
 */

declare module "*.scss";
