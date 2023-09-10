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
    DefaultSizes?: any;
};
function SizeForm({
    accordionTriggerCount,
    accordionTriggerText,
    DefaultSizes = null,
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
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-row items-center gap-4">
                                        <span className="text-lg">
                                            Vízszintes méret
                                        </span>
                                        <ArrowsRightLeftIcon className="h-5" />
                                    </div>
                                    <div className="border-[#D7DDF6] border-2 rounded-2xl p-3 font-semibold w-[300px] flex gap-3 justify-between">
                                        <input
                                            type="number"
                                            className="focus:outline-none w-full"
                                        />
                                        <span className="flex">cm</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-row items-center gap-4">
                                        <span className="text-lg">
                                            Függőleges méret
                                        </span>
                                        <ArrowsUpDownIcon className="h-5" />
                                    </div>
                                    <div className="border-[#D7DDF6] border-2 rounded-2xl p-3 font-semibold w-[300px] flex gap-3 justify-between">
                                        <input
                                            type="number"
                                            className="focus:outline-none w-full"
                                        />
                                        <span className="flex">cm</span>
                                    </div>
                                </div>
                            </div>

                            {DefaultSizes && <DefaultSizes />}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default SizeForm;
