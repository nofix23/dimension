import { useUserStore } from "@/store/UserStore";
import { User } from "@/types";
import React from "react";
import Group from "./Group";

function Groups() {
    const { userItems } = useUserStore();

    const admin_accounts = userItems.filter((user) => user.role === "admin");

    const company_accounts = userItems.filter(
        (user) => user.role === "company"
    );

    const employee_accounts = userItems.filter(
        (user) => user.role === "employee"
    );
    const customer_accounts = userItems.filter(
        (user) => user.role === "customer"
    );

    return (
        <div>
            <div className="flex flex-wrap gap-8">
                <Group groupName="Adminisztrátor" users={admin_accounts} />
                <Group groupName="Alkalmazott" users={employee_accounts} />
                <Group groupName="Cég" users={company_accounts} />
                <Group groupName="Vásárló" users={customer_accounts} />
            </div>
        </div>
    );
}

export default Groups;
