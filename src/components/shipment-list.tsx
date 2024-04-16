import { Shipment } from '@/api/types.ts';
import { ShipmentListItem } from '@/components/shipment-list-item.tsx';

type ShipmentListProps = {
  shipments: Shipment[];
};

export const ShipmentList = ({ shipments }: ShipmentListProps) => {
  return (
    <div className={'space-y-4'}>
      {shipments.map((shipment) => (
        <ShipmentListItem shipment={shipment} />
      ))}
    </div>
  );
};
