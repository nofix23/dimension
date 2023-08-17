import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import huLocale from "@fullcalendar/core/locales/hu";
import { useState } from "react";
import ProjectSheet from "./ProjectSheet";
import AddEvent from "./AddEvent";
import { set } from "react-hook-form";

function Calendar() {

    const [show, setShow] = useState<boolean>(false);

    function handleAddClick() {
        setShow(!show);
    }



    function renderEventContent(eventInfo: any) {
        return (
            <ProjectSheet projectId={eventInfo.event.extendedProps.description}>
                <div className="flex flex-col gap-4 p-3 mt-3">
                    <div className="flex flex-row gap-2 items-center">
                        <b>{eventInfo.event.extendedProps.time}</b>
                        <i>{eventInfo.event.title}</i>
                    </div>
                </div>
            </ProjectSheet>
        );
    }

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next",
                    center: "title",
                    right: "dayGridMonth,dayGridWeek,dayGridDay",
                }}
                eventClassNames={
                    "bg-green-400 hover:bg-green-500 border-none cursor-pointer"
                }
                dateClick={handleAddClick}
                viewClassNames={"bg-gray-50"}
                locale={huLocale}
                eventContent={renderEventContent}
                events={[
                    {
                        title: "Átadás",
                        date: "2023-08-17",
                        extendedProps: {
                            time: "18:00",
                            description: "Ericsson cégtábla átadása ügyfélnek.",
                        },
                    },
                    {
                        title: "Átadás",
                        date: "2023-08-19",
                        extendedProps: {
                            time: "08:00",
                            description: "Google cégtábla átadása",
                        },
                    },
                ]}
            />
            <AddEvent show={show} setShow={() => handleAddClick()} />;
        </>
    );
}





export default Calendar;
