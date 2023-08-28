import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import huLocale from "@fullcalendar/core/locales/hu";
import { useState } from "react";
import ProjectSheet from "./ProjectSheet";
import AddEvent from "./AddEventSheet";
import { set } from "react-hook-form";
import AddEventSheet from "./AddEventSheet";

function Calendar() {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDateClick = (info: any) => {
        setSelectedDate(info.dateStr);
        setIsModalOpen(true);
    };

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
        <div className="md:w-[1400px]">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridWeek"
                headerToolbar={{
                    left: "prev,next",
                    center: "title",
                    right: "dayGridMonth,dayGridWeek,dayGridDay",
                }}
                eventClassNames={
                    "bg-[#01A2D6] hover:bg-[#01A2D6]/80 border-none cursor-pointer"
                }
                dayCellClassNames={"cursor-pointer hover:bg-[#01A2D6]/10"}
                dateClick={handleDateClick}
                viewClassNames={"bg-gray-50 text-xs sm:text-lg"}
                
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

            {isModalOpen ? (
                <AddEventSheet show={isModalOpen} setShow={setIsModalOpen} />
            ) : (
                ""
            )}
        </div>
    );
}

export default Calendar;
