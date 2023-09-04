import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { useCustomerRequestStore } from "@/store/CustomerRequestStore";
import { CustomerRequest } from "@/types";
import { EyeIcon } from "lucide-react";
import CompanyRequestSheet from "./CompanyRequestSheet";
import { twMerge } from "tailwind-merge";

function NewCustomerRequestsTable() {
    const { customerRequestItems, setSelectedItem } = useCustomerRequestStore();

    return (
        <div>
            <Table className=" text-gray-500 mt-6">
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-extralight"></TableHead>
                        <TableHead className="font-extralight">Név</TableHead>
                        <TableHead className="font-extralight">
                            E-mail cím
                        </TableHead>
                        <TableHead className="font-extralight">Tárgy</TableHead>

                        <TableHead className="font-extralight">
                            Státusz
                        </TableHead>

                        <TableHead className="font-extralight">
                            Beérkezés dátuma
                        </TableHead>
                        <TableHead className="font-extralight">
                            Feladat ügyintézője
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customerRequestItems.map((request: CustomerRequest) => (
                        <TableRow className="hover:bg-[#01A2D6]/10 hover:cursor-pointer hover:text-[#01A2D6]">
                            <TableCell>
                                <CompanyRequestSheet
                                    side="left"
                                    title="Megrendelői árajánlat"
                                >
                                    <EyeIcon
                                        className="h-5 "
                                        onClick={() => setSelectedItem(request)}
                                    />
                                </CompanyRequestSheet>
                            </TableCell>
                            <TableCell>{request.name}</TableCell>
                            <TableCell>{request.email_address}</TableCell>
                            <TableCell>{request.subject}</TableCell>
                            <TableCell>
                                <div>
                                    {request.status == 0 && (
                                        <span className="flex justify-center bg-blue-100 p-2 text-blue-600 sm:w-1/2 rounded-xl">
                                            Árajánlatra vár
                                        </span>
                                    )}
                                </div>
                                <div>
                                    {request.status == -1 && (
                                        <span className="flex justify-center bg-red-100 p-2 text-red-600 sm:w-1/2 rounded-xl">
                                            Árajánlat elutasítva
                                        </span>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>
                                {new Date(request.created_at).toLocaleString()}
                            </TableCell>
                            <TableCell>
                                <div
                                    className={twMerge(
                                        "flex justify-center p-2 sm:w-1/2 rounded-xl",
                                        request.accepted_by ?
                                            "bg-green-100 text-green-600"
                                            :""
                                    )}
                                >
                                    {request.accepted_by}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default NewCustomerRequestsTable;
