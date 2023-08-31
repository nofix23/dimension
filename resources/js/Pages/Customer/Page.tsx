import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Input from "@/Components/Share/Input";
import { useToast } from "@/Components/ui/use-toast";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

function Page() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        phone_number: "",
        email_address: "",
        subject: "",
        materials: "",
        comments: "",
    });

    const { toast } = useToast();

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
                className: "bg-red-100 text-red-900 font-bold",
            });
        }

        if (type === "success") {
            toast({
                title: title,
                description: description,
                className: "bg-green-100 text-green-900 font-bold text-xl",
            });
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        post("/customer/request", {
            onSuccess: () => {
                showToast({
                    type: "success",
                    title: "Sikeres művelet!",
                    description: "Árajánlat elküldve!",
                });
            },

            onError: (resp: any) => {
                showToast({
                    type: "failed",
                    title: "Hiba!",
                    description: resp.errors,
                });
            },

            onFinish: () => {},
        });
    };

    return (
        <GuestLayout comment="">
            <Head title="Árajánlat kérése" />
            <div>
                <div className="flex justify-center flex-wrap sm:flex-row items-center gap-4">
                    <form onSubmit={handleSubmit} className="">
                        <div className="flex flex-col gap-3 items-center justify-center">
                            <div className="flex flex-row items-center gap-4">
                                <InputLabel
                                    htmlFor="name"
                                    value="Név"
                                    className="w-[80px]"
                                />
                                <Input
                                    className=""
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                {errors.name && <div>{errors.name}</div>}
                            </div>

                            <div className="flex flex-row items-center gap-4">
                                <InputLabel
                                    htmlFor="phone_number"
                                    value="Telefonszám"
                                    className="w-[80px]"
                                />
                                <Input
                                    type="text"
                                    value={data.phone_number}
                                    onChange={(e) =>
                                        setData("phone_number", e.target.value)
                                    }
                                />
                                {errors.phone_number && (
                                    <div>{errors.phone_number}</div>
                                )}
                            </div>

                            <div className="flex flex-row items-center gap-4">
                                <InputLabel
                                    htmlFor="email_address"
                                    value="E-mail"
                                    className="w-[80px]"
                                />
                                <Input
                                    type="email"
                                    value={data.email_address}
                                    onChange={(e) =>
                                        setData("email_address", e.target.value)
                                    }
                                />
                                {errors.phone_number && (
                                    <div>{errors.phone_number}</div>
                                )}
                            </div>
                            <div className="flex flex-row items-center gap-4">
                                <InputLabel
                                    htmlFor="subject"
                                    value="Tárgy"
                                    className="w-[80px]"
                                />
                                <Input
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) =>
                                        setData("subject", e.target.value)
                                    }
                                />
                                {errors.subject && <div>{errors.subject}</div>}
                            </div>
                            <div className="flex flex-row items-center gap-4">
                                <InputLabel
                                    htmlFor="materials"
                                    value="Anyag"
                                    className="w-[80px]"
                                />
                                <Input
                                    type="text"
                                    value={data.materials}
                                    onChange={(e) =>
                                        setData("materials", e.target.value)
                                    }
                                />
                                {errors.materials && (
                                    <div>{errors.materials}</div>
                                )}
                            </div>
                            <div className="flex flex-row items-center gap-4">
                                <InputLabel
                                    htmlFor="comments"
                                    value="Miben segíthetünk?"
                                    className="w-[80px]"
                                />
                                <Input
                                    type="textarea"
                                    value={data.comments}
                                    onChange={(e) =>
                                        setData("comments", e.target.value)
                                    }
                                />
                                {errors.comments && (
                                    <div>{errors.comments}</div>
                                )}
                            </div>
                        </div>
                        <div className="mt-8 flex justify-center">
                            <PrimaryButton
                                className="bg-[#01A2D6] text-white hover:bg-blue-400 border-slate-300"
                                disabled={processing}
                            >
                                Árajánlat kérése
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}

export default Page;
