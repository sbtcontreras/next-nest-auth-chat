"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, UserPlus } from "lucide-react";
import { registerSchema } from "@/services/auth/dto";
import type { z } from "zod";
import Link from "next/link";
import { useUserMustBeLoggedOut } from "@/services/auth/hooks";

export default function SignUpPage() {
  const { register } = useUserMustBeLoggedOut();

  const f = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { nickname: "", username: "", password: "" },
  });

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    try {
      await register(data);
      toast.success("Registro exitoso");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error al registrarse", {
          description: error.message,
        });
        return;
      }
      toast.error("Error al registrarse", {
        description: "Ocurrió un error inesperado",
      });
    }
  }

  return (
    <Card className="w-full max-w-lg rounded-none md:rounded-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">¡Regístrate! 🎉</CardTitle>
        <CardDescription>
          Crea una cuenta para comenzar a usar nuestro servicio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...f}>
          <form onSubmit={f.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={f.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apodo</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={f.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="johndoe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={f.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="********" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-4"
              disabled={f.formState.isSubmitting}
            >
              {f.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  Registrando...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2" />
                  Registrarse
                </>
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/auth/login" className="text-primary underline">
            Inicia sesión
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
