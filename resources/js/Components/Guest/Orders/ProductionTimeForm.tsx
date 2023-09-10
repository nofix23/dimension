import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import {
    ArrowsRightLeftIcon,
    ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";

type Props = {
    accordionTriggerCount: number;
    accordionTriggerText: string;
    Defaults?: any;
};
function ProductionTimeForm({
    accordionTriggerCount,
    accordionTriggerText,
    Defaults = null,
}: Props) {
    return (
        <div className="">
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="sm:w-[1000px]">
                    <AccordionTrigger className="flex gap-8 hover:no-underline bg-[#ECEEFA] p-4 border-2 text-[#182452]">
                        <div className="flex flex-row items-center gap-8">
                            <div>
                                <span className="text-xl">
                                    {accordionTriggerCount}
                                </span>
                            </div>
                            <div className="flex flex-col items-start justify-start gap-2">
                                <span className="text-xl">
                                    {accordionTriggerText}
                                </span>
                                <span className="text-md">Kiválasztott: </span>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-white p-8">
                        {Defaults && <Defaults />}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default ProductionTimeForm;
