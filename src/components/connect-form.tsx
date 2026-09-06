"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  surname: z.string().min(2, "Surname must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ConnectForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      whatsapp: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    // Replace with your actual API call
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Form submitted:", values);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-sm border border-isdrc-green/30 bg-isdrc-green/5 p-8 text-center">
        <p className="font-heading text-lg font-bold tracking-wide text-isdrc-green uppercase">
          Thank you for reaching out!
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          We have received your message and will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-sm border border-border bg-white p-6 shadow-sm md:p-8"
        noValidate
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Name</FormLabel>
                <FormControl>
                  <Input
                    id="connect-name"
                    placeholder="Name"
                    {...field}
                    className="rounded-sm border-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Surname</FormLabel>
                <FormControl>
                  <Input
                    id="connect-surname"
                    placeholder="Surname"
                    {...field}
                    className="rounded-sm border-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input
                    id="connect-email"
                    type="email"
                    placeholder="Email"
                    {...field}
                    className="rounded-sm border-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Phone</FormLabel>
                <FormControl>
                  <Input
                    id="connect-phone"
                    type="tel"
                    placeholder="Phone"
                    {...field}
                    className="rounded-sm border-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="whatsapp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">WhatsApp</FormLabel>
                <FormControl>
                  <Input
                    id="connect-whatsapp"
                    placeholder="WhatsApp"
                    {...field}
                    className="rounded-sm border-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-5">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Message</FormLabel>
                <FormControl>
                  <Textarea
                    id="connect-message"
                    placeholder="Your message..."
                    rows={5}
                    {...field}
                    className="resize-none rounded-sm border-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="mt-6 w-full rounded-sm bg-isdrc-green font-bold tracking-widest text-white uppercase hover:bg-[#245628]"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
