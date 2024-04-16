import { envClientSchema } from '@/lib/polish-post/polish-post-env-schema.ts';

/**
 * Creates a SOAP envelope with the provided arguments and adds security headers
 * using credentials from the Polish Post environment schema.
 *
 * @param arg - Arguments to be included in the SOAP envelope
 * @returns A SOAP envelope with security headers and provided arguments
 */
export const createEnvelope = (arg: Record<string, any>) => ({
  'soapenv:Envelope': {
    $: {
      'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
      'xmlns:sled': 'http://sledzenie.pocztapolska.pl'
    },
    'soapenv:Header': {
      'wsse:Security': {
        $: {
          'soapenv:mustUnderstand': '1',
          'xmlns:wsse':
            'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd'
        },
        'wsse:UsernameToken': {
          $: {
            'xmlns:wsu':
              'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd'
          },
          'wsse:Username': envClientSchema.POLISH_POST_SERVICE_USERNAME,
          'wsse:Password': {
            $: {
              Type: 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText'
            },
            _: envClientSchema.POLISH_POST_SERVICE_PASSWORD
          }
        }
      }
    },
    ...arg
  }
});
