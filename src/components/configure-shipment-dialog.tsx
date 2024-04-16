import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Shipment } from '@/api/types.ts';
import { toast } from 'sonner';
import { useShipmentStore } from '@/store/main.ts';

type ConfigureShipmentDialogProps = {
  shipment: Shipment | undefined;
  onOpenChange: () => void;
};

const FormSchema = z.object({
  alias: z.string()
});

const ConfigureShipmentDialog = (props: ConfigureShipmentDialogProps) => {
  const { onOpenChange, shipment } = props;
  const addShipment = useShipmentStore((state) => state.add);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      alias: ''
    }
  });

  function onSubmit({ alias }: z.infer<typeof FormSchema>) {
    addShipment({ ...shipment });
    toast('Dodano przesyłkę');
    onOpenChange();
  }

  useEffect(() => {
    form.reset();
  }, [shipment]);

  return (
    <Dialog open={Boolean(shipment)} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Konfiguracja przesyłki</DialogTitle>
          <DialogDescription>
            {shipment && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                  <FormField
                    control={form.control}
                    name="alias"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alias</FormLabel>
                        <FormControl>
                          <Input placeholder={shipment.numer} {...field} autoComplete={'off'} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Dodaj przesyłkę</Button>
                </form>
              </Form>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export { ConfigureShipmentDialog };
