import { useMemo } from 'react';
import { Shipment } from '@/api/types.ts';
import { trackSingleShipment } from '@/lib/polish-post/polish-post-tracking-service.ts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { toast } from 'sonner';
import { useShipmentStore } from '@/store/main.ts';
import { ArchiveIcon, TrashIcon } from '@radix-ui/react-icons';

type ShipmentListItemProps = {
  shipment: Shipment;
};

export const ShipmentListItem = ({ shipment }: ShipmentListItemProps) => {
  const updateShipment = useShipmentStore((state) => state.update);
  const removeShipment = useShipmentStore((state) => state.remove);
  // const clickHandler = async (packageId: string) => {
  //   toast.promise(trackSingleShipment(packageId), {
  //     loading: 'Pobieranie statusu przesyłki...',
  //     success: (data) => {
  //       updateShipment(data.Envelope.Body.sprawdzPrzesylkeResponse.return.danePrzesylki);
  //       return `Zaktualizowano przesyłkę`;
  //     },
  //     error: () => {
  //       return `Błąd podczas pobierania statusu przesyłki`;
  //     }
  //   });
  // };

  const event = useMemo(() => {
    const endingEventIndex = shipment.zdarzenia.zdarzenie.findIndex((event) => event.konczace);
    if (endingEventIndex !== -1) {
      return shipment.zdarzenia.zdarzenie[endingEventIndex];
    }
    return shipment.zdarzenia.zdarzenie[shipment.zdarzenia.zdarzenie.length - 1];
  }, [shipment]);

  const deleteHandler = () => {
    removeShipment(shipment);
    toast('Usunięto przesyłkę');
  };

  const archiveHandler = () => {};

  return (
    <Card>
      <CardHeader>
        <div className={'flex items-center'}>
          <div>
            <CardTitle>{shipment.numer}</CardTitle>
            <CardDescription>Poczta Polska</CardDescription>
          </div>
          <div className={'flex ml-auto gap-2'}>
            <Button onClick={deleteHandler} size="icon" variant="outline">
              <TrashIcon />
            </Button>
            <Button onClick={archiveHandler} size="icon" variant="outline">
              <ArchiveIcon />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          <li className="ms-4" key={event.czas}>
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {event.czas}
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{event.nazwa}</h3>
            {Boolean(event.jednostka.nazwa) && (
              <span className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {event.jednostka.nazwa}
              </span>
            )}
          </li>
        </ol>
      </CardContent>
      <CardFooter className={'flex gap-x-4'}>
        {/*<Button*/}
        {/*  onClick={() => {*/}
        {/*    clickHandler(shipment.numer);*/}
        {/*  }}>*/}
        {/*  Pobierz status*/}
        {/*</Button>*/}
      </CardFooter>
    </Card>
  );
};
