import { create } from 'zustand';
import { Shipment } from '@/api/types.ts';

interface ShipmentStore {
  shipments: Shipment[];
  add: (shipment: Shipment) => void;
  remove: (shipment: Shipment) => void;
  update: (shipment: Shipment) => void;
}

const useShipmentStore = create<ShipmentStore>((set) => ({
  shipments: [],
  add: (shipment) => set((state) => ({ shipments: [...state.shipments, shipment] })),
  remove: (shipment) =>
    set((state) => ({ shipments: state.shipments.filter((itm) => itm.numer !== shipment.numer) })),
  update: (shipment) =>
    set((state) => ({
      shipments: state.shipments.map((itm) => (itm.numer === shipment.numer ? shipment : itm))
    }))
}));

export { useShipmentStore };
