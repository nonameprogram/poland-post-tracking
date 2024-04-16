export type Shipment = {
  danaNadania: string;
  format: string;
  kodKrajuNadania: string;
  kodKrajuPrzezn: string;
  kodRodzPrzes: string;
  masa: string;
  numer: string;
  proceduraSerwis: string;
  rodzPrzes: string;
  urzadNadania: {
    daneSzczegolowe: string;
    nazwa: string;
  };
  zdarzenia: {
    zdarzenie: Event[];
  };
};

export type Procedure = {
  kod: string;
  kopertaFirmowa: string;
  nazwa: string;
};

export type LinkedShipments = {
  nrPrzesylkiPowiazanej: string;
};

export type Event = {
  czas: string;
  nazwa: string;
  kod: string;
  konczace: boolean;
  jednostka: {
    daneSzczegolowe: string;
    nazwa: string;
  };
};

export type Reason = {
  nazwa: string;
  kod: string;
};

export enum ResponseStatus {
  Ok = 0,
  TooManyShipmentsQuery = -1,
  LackMultiShipmentAccess = -2,
  InvalidDatesError = -3,
  OtherError = -99
}

export enum ShipmentStatus {
  Ok = 0,
  DuplicateShipmentNumber = 1,
  NoEventsInSpecifiedPeriod = 2,
  NoShipmentFoundInSystem = -1,
  IncorrectShipmentNumber = -2
}

export type APIResponse = {
  Envelope: {
    Body: {
      sprawdzPrzesylkeResponse: {
        return: {
          danePrzesylki: Shipment;
          numer: string;
          status: ShipmentStatus;
        };
      };
    };
  };
};
