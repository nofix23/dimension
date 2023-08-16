import { User } from "@/types";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
    user: User;
};
function ProjectsData({ user }: Props) {
    return (
        <div className="p-4">
            <div className="mb-4 text-lg">
                <span>Függőben lévő árajánlatok</span>
            </div>

            <div className="mb-4 text-lg">
                <span>Folyamatban lévő projektek</span>
            </div>

            <div className="mb-4 text-lg">
                <span>Megvalósult projektek</span>
            </div>
        </div>
    );
}

export default ProjectsData;
