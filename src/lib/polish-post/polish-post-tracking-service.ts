import * as http from '@tauri-apps/plugin-http';
import { trackSingleShipmentRequestXML } from '@/lib/polish-post/actions.ts';
import { xmlParser } from '@/lib/utils.ts';

import type { APIResponse } from '@/api/types.ts';

/**
 * Tracks a single shipment using the provided package ID.
 *
 * @param packageId - The ID of the package to track.
 * @returns A Promise resolving to the parsed API response.
 */
export const trackSingleShipment = (packageId: string) => {
  return http
    .fetch(`http://tt.poczta-polska.pl/Sledzenie/services/Sledzenie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml'
      },
      body: trackSingleShipmentRequestXML(packageId)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.text();
    })
    .then((response) => {
      return xmlParser.parse(response) as APIResponse;
    });
};
