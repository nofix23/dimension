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

function NewCustomerRequestsTable() {
    const { customerRequestItems } = useCustomerRequestStore();

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
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customerRequestItems.map((request: CustomerRequest) => (
                        <TableRow className="hover:bg-[#01A2D6]/10 hover:cursor-pointer hover:text-[#01A2D6]">
                            <TableCell>
                                <CompanyRequestSheet side="left" title="Beérkezett árajánlat">
                                    <EyeIcon className="h-5 " />
                                </CompanyRequestSheet>
                            </TableCell>
                            <TableCell>{request.name}</TableCell>
                            <TableCell>{request.email_address}</TableCell>{" "}
                            <TableCell>{request.subject}</TableCell>{" "}
                            <TableCell>{request.status}</TableCell>{" "}
                            <TableCell>
                                {new Date(request.created_at).toLocaleString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default NewCustomerRequestsTable;
