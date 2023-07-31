import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { useForm } from "react-hook-form";
import { router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/Components/ui/use-toast";
import { useGeneralStore } from "@/store/GeneralStore";
import { SheetClose } from "@/Components/ui/sheet";

function CreateCompanyForm() {
    const form = useForm();

    const { toast } = useToast();

    const { isLoading, setLoading } = useGeneralStore();

    type ToastType = {
        type: "success" | "failed";
        title: string;
        description: string;
    };

    const showToast = ({ type, title, description }: ToastType) => {
        if (type === "failed") {
            toast({
                variant: "destructive",
                title: title,
                description: description,
                className: "bg-red-500 text-white font-bold",
            });
        }

        if (type === "success") {
            toast({
                title: title,
                description: description,
                className: "bg-green-500 text-white font-bold text-xl",
            });
        }
    };

    function onSubmit(
        slug: string,
        method: "get" | "post" | "put" | "patch" | "delete",
        onBefore?: string
    ) {
        setLoading(true);

        router[method](
            slug,
            form.getValues(),
            {
                onBefore: () => {
                    if (onBefore) {
                        const reply = confirm(onBefore);
                        if (!reply) {
                            // setLoading(false);
                            return false;
                        }
                    }
                },

                onSuccess: () => {
                    showToast({
                        type: "success",
                        title: "Sikeres művelet!",
                        description: "Cég sikeresen létrehozva!",
                    });
                    setLoading(false);
                },

                onError: (resp: any) => {
                    showToast({
                        type: "failed",
                        title: "Hiba!",
                        description: resp.errors,
                    });
                },

                onFinish: () => {
                    setLoading(false);
                },
            }
        );
    }

    return (
        <div className="">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(() =>
                        onSubmit("/company/create", "post")
                    )}
                    className="space-y-4 text-3"
                >
                    <FormField
                        control={form.control}
                        name="company_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cég neve</FormLabel>
                                <FormControl>
                                    <Input placeholder="Google" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ország</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Magyarország"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Város</FormLabel>
                                <FormControl>
                                    <Input placeholder="Budapest" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="postal_code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Irányítószám</FormLabel>
                                <FormControl>
                                    <Input placeholder="4111" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Utca</FormLabel>
                                <FormControl>
                                    <Input placeholder="Utca" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="house_number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Házszám</FormLabel>
                                <FormControl>
                                    <Input placeholder="Házszám" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="door_bell"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ajtó csengő</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ajtó csengő"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email_address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email-cím</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="test@test.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Telefonszám</FormLabel>
                                <FormControl>
                                    <Input placeholder="+3620" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SheetClose>
                        <Button className="bg-green-500 hover:bg-green-500 text-white">
                            Hozzáadás
                        </Button>
                    </SheetClose>
                </form>
            </Form>
        </div>
    );
}

export default CreateCompanyForm;
