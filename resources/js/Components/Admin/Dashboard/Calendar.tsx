import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import huLocale from "@fullcalendar/core/locales/hu";
import { useState } from "react";

function Calendar() {
    const [showEventInfo, setShowEventInfo] = useState<any>({
        show: false,
        defId: -1,
    });


    function renderEventContent(eventInfo: any) {
        return (
            <div className="flex flex-col gap-4 p-3 mt-3">
                <div className="flex flex-row gap-2 items-center">
                    <b>{eventInfo.event.extendedProps.time}</b>
                    <i>{eventInfo.event.title}</i>
                </div>


            </div>
        );
    }

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
            eventClick={handleEventClick}
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
    );
}

function handleEventClick(eventInfo: any) {
    alert("Esemény: " + eventInfo.event.extendedProps.description);
}

function handleAddClick(eventInfo: any) {
    alert("Hozzáadás: " + eventInfo.dateStr);
}

export default Calendar;
