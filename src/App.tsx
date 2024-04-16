import { useEffect, useState, useRef } from 'react';
import * as fs from '@tauri-apps/plugin-fs';
import './App.css';
import { BaseDirectory } from '@tauri-apps/api/path';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { ThemeProvider } from '@/components/theme-provider.tsx';
import { Toaster } from '@/components/ui/sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Shipment, ShipmentStatus } from '@/api/types.ts';
import { trackSingleShipment } from '@/lib/polish-post/polish-post-tracking-service.ts';
import { ShipmentList } from '@/components/shipment-list.tsx';
import { useShipmentStore } from '@/store/main.ts';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConfigureShipmentDialog } from '@/components/configure-shipment-dialog.tsx';

function App() {
  const shipments = useShipmentStore((state) => state.shipments);
  const [code, setCode] = useState('');
  const ref = useRef(false);
  const [configuredShipment, setConfiguredShipment] = useState<Shipment | undefined>(undefined);

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      return;
    }
    console.log({ shipments });
    (async () => {
      const encoder = new TextEncoder();

      try {
        await fs.writeFile('shipments.json', encoder.encode(JSON.stringify(shipments, null, 2)), {
          baseDir: BaseDirectory.AppData
        });
        console.log(`written to file`);
      } catch (err) {
        console.error(`writing to file failed`, err);
      }
    })();
  }, [shipments]);

  useEffect(() => {
    (async () => {
      try {
        const packages = await readPackages();
        useShipmentStore.setState({ shipments: packages });
      } catch (err) {
        console.error(`smth went wrong`, err);
      }
    })();
  }, []);

  console.log({ shipments });

  const readPackages = async () => {
    const content = await fs.readFile('shipments.json', { baseDir: BaseDirectory.AppData });
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(content));
  };

  const submitHandler = async () => {
    const toastId = toast.loading('Pobieranie informacji o przesyłce');
    try {
      const res = await trackSingleShipment(code);
      if (!res) {
        throw new Error();
      }

      if (res.Envelope.Body.sprawdzPrzesylkeResponse.return.status !== ShipmentStatus.Ok) {
        throw new Error();
      }

      setConfiguredShipment(res.Envelope.Body.sprawdzPrzesylkeResponse.return.danePrzesylki);
      setCode('');
      toast.dismiss(toastId);
    } catch (err) {
      toast.error('Wystąpił błąd', {
        id: toastId
      });
    }
  };

  return (
    <ThemeProvider defaultTheme={'dark'} storageKey={'vite-ui-theme'}>
      <div className="container py-8">
        <form
          className="flex gap-x-2"
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler();
          }}>
          <Input
            id="greet-input"
            value={code}
            onChange={(e) => setCode(e.currentTarget.value)}
            placeholder="Identyfikator śledzenia"
            autoComplete={'off'}
          />
          <Select defaultValue={'poland_post'}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="poland_post">Poczta Polska</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit">Dodaj przesyłkę</Button>
        </form>

        <ConfigureShipmentDialog
          shipment={configuredShipment}
          onOpenChange={() => setConfiguredShipment(undefined)}
        />

        <div className={'pt-4'}>
          <Tabs defaultValue="active">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active">Aktywne</TabsTrigger>
              <TabsTrigger value="archive">Archiwum</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <ShipmentList shipments={shipments} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
