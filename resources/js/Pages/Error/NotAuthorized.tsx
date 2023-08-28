import { FaceFrownIcon } from "@heroicons/react/24/outline";
import React from "react";

function NotAuthorized() {
    return (
        <div className="bg-[#01A2D6] text-white h-screen">
            <div className="flex flex-col gap-3 items-center justify-center h-full">
                <span className="sm:text-2xl font-extralight">Nincs jogosultságod az oldal megtekintéséhez!</span>
                <FaceFrownIcon className="h-8" />
            </div>
        </div>
    );
}

export default NotAuthorized;
