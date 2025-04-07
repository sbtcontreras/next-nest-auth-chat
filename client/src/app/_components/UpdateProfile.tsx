"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { create } from "zustand";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Loader2, Save } from "lucide-react";
import { updateProfileSchema as formSchema } from "@/services/chat/dto";
import { useEffect } from "react";
import { useUpdateProfile } from "@/services/chat/hooks";

type DefaultValues = Partial<z.infer<typeof formSchema>>;

interface ModalState {
  open: boolean;
  defaultValues: DefaultValues;
  openModal: (values?: DefaultValues) => void;
  closeModal: () => void;
}

export const useSettingsModal = create<ModalState>((set) => ({
  open: false,
  defaultValues: {},
  openModal: (values) => set({ open: true, defaultValues: values }),
  closeModal: () => set({ open: false }),
}));

export function SettingsModal() {
  const { open, defaultValues, closeModal } = useSettingsModal();

  const f = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const m = useUpdateProfile();

  useEffect(() => {
    if (open) f.reset(defaultValues);
  }, [open, f, defaultValues]);

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="max-h-[80vh] w-full max-w-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifica tu usuario</DialogTitle>
          <DialogDescription>
            Actualiza tus parámetros aquí. <br />
            <strong className="text-destructive">
              Cambiar tu nombre de usuario cerrará tu sesión.
            </strong>
          </DialogDescription>
        </DialogHeader>
        <Form {...f}>
          <form
            onSubmit={f.handleSubmit((data) => m.mutateAsync(data))}
            className="grid gap-4"
          >
            <FormField
              control={f.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apodo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingresa tu apodo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={f.formState.isSubmitting}
            >
              {f.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 size-4" />
                  Save Settings
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
