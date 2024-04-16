import { xmlBuilder } from '@/lib/utils.ts';
import { createEnvelope } from '@/lib/polish-post/envelope.ts';

/**
 * Generates the XML request for tracking a single shipment.
 *
 * @param packageId - The ID of the package to track.
 * @returns The XML request string.
 */
export const trackSingleShipmentRequestXML = (packageId: string | number) => {
  return xmlBuilder.buildObject(
    createEnvelope({
      'soapenv:Body': {
        'sled:sprawdzPrzesylke': {
          'sled:numer': packageId
        }
      }
    })
  );
};
