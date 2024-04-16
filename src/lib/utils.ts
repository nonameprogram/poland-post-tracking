import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { XMLParser } from 'fast-xml-parser';
import { Builder } from 'xml2js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const xmlParser = new XMLParser({
  ignoreAttributes: true,
  removeNSPrefix: true
});

export const xmlBuilder = new Builder();
