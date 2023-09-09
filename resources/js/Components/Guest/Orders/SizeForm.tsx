import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";

type Props = {
    accordionTriggerCount: number;
    accordionTriggerText: string;
}
function SizeForm({ accordionTriggerCount, accordionTriggerText} : Props) {
    return (
        <div className="">
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="sm:w-[800px]">
                    <AccordionTrigger className="flex gap-8 hover:no-underline bg-[#ECEEFA] p-4 border-2 text-[#182452]">
                        <div className="flex flex-row items-center gap-8">
                            <div>
                                <span className="text-xl">{ accordionTriggerCount }</span>
                            </div>
                            <div className="flex flex-col items-start justify-start gap-2">
                                <span className="text-xl">
                                    { accordionTriggerText }
                                </span>
                                <span className="text-md">Kiválasztott: </span>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-white p-4">
                        <div className="flex">
                            <div>Méret</div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default SizeForm;
