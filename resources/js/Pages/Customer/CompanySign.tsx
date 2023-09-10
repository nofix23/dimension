import RawMaterialForm from "@/Components/Guest/Orders/RawMaterialForm";
import SizeForm from "@/Components/Guest/Orders/SizeForm";
import WebpageLayout from "@/Layouts/WebpageLayout";
import CompanySignLogo from ".././../../../storage/app/public/img/cegtabla.webp";
import ConfectionForm from "@/Components/Guest/Orders/ConfectionForm";
import StraightCutLogo from "../../../../storage/app/public/img/egyenes_vagas.webp"
import ShapeCutLogo from "../../../../storage/app/public/img/formavagott_vagas.webp";
import ProductionTimeForm from "@/Components/Guest/Orders/ProductionTimeForm";


function CompanySign() {
    const DefaultSizes = () => {
        return (
            <div className="">
                <span className="text-2xl font-semibold flex justify-center">
                    Gyakori méretek
                </span>
                <div className="flex flex-wrap gap-2 items-center justify-center mt-6">
                    <div className="border-[#D7DDF6] border-2 rounded-xl flex justify-center items-center p-6 w-[150px] hover:border-[#3956D1] hover:cursor-pointer">
                        <span>50 x 50 cm</span>
                    </div>

                    <div className="border-[#D7DDF6] border-2 rounded-xl flex justify-center items-center p-6 w-[150px] hover:border-[#3956D1] hover:cursor-pointer">
                        <span>100 x 50 cm</span>
                    </div>

                    <div className="border-[#D7DDF6] border-2 rounded-xl flex justify-center items-center p-6 w-[150px] hover:border-[#3956D1] hover:cursor-pointer">
                        <span>100 x 100 cm</span>
                    </div>

                    <div className="border-[#D7DDF6] border-2 rounded-xl flex justify-center items-center p-6 w-[150px] hover:border-[#3956D1] hover:cursor-pointer">
                        <span>150 x 100 cm</span>
                    </div>

                    <div className="border-[#D7DDF6] border-2 rounded-xl flex justify-center items-center p-6 w-[150px] hover:border-[#3956D1] hover:cursor-pointer">
                        <span>150 x 150 cm</span>
                    </div>

                    <div className="border-[#D7DDF6] border-2 rounded-xl flex justify-center items-center p-6 w-[150px] hover:border-[#3956D1] hover:cursor-pointer">
                        <span>200 x 50 cm</span>
                    </div>
                </div>
            </div>
        );
    };

    const DefaultRawMaterials = () => {
        return (
            <div>
                <div className="flex flex-row gap-3 text-[#182452] h-full">
                    <div className="border-[#D7DDF6] border-2 rounded-xl flex flex-col p-4 hover:border-[#3956D1] hover:cursor-pointer">
                        <img src={CompanySignLogo} />
                        <div className="flex flex-col justify-start">
                            <span className="text-[16px] font-bold">
                                3mm vastag PVC tábla
                            </span>

                            <ul className="list-disc ml-8 text-lg font-extralight">
                                <li>Hajlékony</li>
                                <li>Prémium, nyomtatott fólia (polimer)</li>
                                <li>Hosszútávú megoldás</li>
                                <li>Elsősorban beltéri használatra</li>
                            </ul>
                            <div className="flex flex-col justify-center items-center mt-4">
                                <span className="text-xl text-[#3956D1] font-bold">
                                    6175 Ft-tól
                                </span>
                                <span>(/ db)</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-[#D7DDF6] border-2 rounded-xl flex flex-col p-4 hover:border-[#3956D1] hover:cursor-pointer">
                        <img src={CompanySignLogo} />
                        <div className="flex flex-col justify-start">
                            <span className="text-[16px] font-bold">
                                5mm vastag PVC tábla
                            </span>

                            <ul className="list-disc ml-8 text-lg font-extralight">
                                <li>Kevésbé hajlékony</li>
                                <li>Prémium, nyomtatott fólia (polimer)</li>
                                <li>Kültéri/beltéri használatra</li>
                            </ul>

                            <div className="flex flex-col justify-center items-center mt-4">
                                <span className="text-xl text-[#3956D1] font-bold">
                                    7425 Ft-tól
                                </span>
                                <span>(/ db)</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-[#D7DDF6] border-2 rounded-xl flex flex-col p-4 hover:border-[#3956D1] hover:cursor-pointer">
                        <img src={CompanySignLogo} />
                        <div className="flex flex-col justify-start">
                            <span className="text-[16px] font-bold">
                                3mm vastag alukompompozit tábla
                            </span>

                            <ul className="list-disc ml-8 text-lg font-extralight">
                                <li>Kemény, törhetetlen</li>
                                <li>Prémium, nyomtatott fólia (polimer)</li>
                                <li>Kültéri/beltéri használatra</li>
                                <li>Nem hullámosodik kültéren sem</li>
                            </ul>

                            <div className="flex flex-col justify-center items-center mt-4">
                                <span className="text-xl text-[#3956D1] font-bold">
                                    9825 Ft-tól
                                </span>
                                <span>(/ db)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const DefaultConfections = () => {
        return (
            <div>
                <div className="flex flex-row gap-3 text-[#182452] h-full">
                    <div className="border-[#D7DDF6] border-2 rounded-xl flex flex-col gap-4 p-4 hover:border-[#3956D1] hover:cursor-pointer w-[250px]">
                        <img src={StraightCutLogo} />
                        <div className="flex flex-col justify-start">
                            <span className="text-[16px] font-bold">
                                Egyenes vágás
                            </span>

                            <ul className="list-disc ml-8 text-lg font-extralight">
                                <li>Téglalap</li>
                                <li>Négyzet</li>
                                <li>Rombusz</li>
                                <li>Trapéz</li>
                                <li>Paralelogramma formák vágása</li>
                            </ul>
                            <div className="flex flex-col justify-center items-center mt-4">
                                <span className="text-xl text-[#3956D1] font-bold">
                                    350 Ft
                                </span>
                                <span>(/ m)</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-[#D7DDF6] border-2 rounded-xl flex flex-col gap-4 p-4 hover:border-[#3956D1] hover:cursor-pointer w-[250px]">
                        <img src={ShapeCutLogo} />
                        <div className="flex flex-col justify-start">
                            <span className="text-[16px] font-bold">
                                Formavágott reklámtábla
                            </span>

                            <ul className="list-disc ml-8 text-lg font-extralight">
                                <li>
                                    Bármilyen íves és szögletes vonalak
                                    kombinálása lehetséges
                                </li>
                                <li>
                                    CNC marógépel végzett, precíz formavágás
                                </li>
                            </ul>

                            <div className="flex flex-col justify-center items-center mt-4">
                                <span className="text-xl text-[#3956D1] font-bold">
                                    8500 Ft-tól
                                </span>
                                <span>(/ m2)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const DefaultProductionTimes = () => {
        return (
            <div>
                <div className="flex flex-row gap-3 text-[#182452] h-full">
                    <div className="border-[#D7DDF6] border-2 rounded-xl flex flex-col gap-4 p-4 hover:border-[#3956D1] hover:cursor-pointer w-full">
                        <div className="flex flex-col gap-3">
                            <span className="text-[16px] font-bold">
                                Normál
                            </span>
                            <span>3-6 munkanap</span>


                        </div>
                    </div>

                    <div className="border-[#D7DDF6] border-2 rounded-xl flex flex-col gap-4 p-4 hover:border-[#3956D1] hover:cursor-pointer w-full">
                        <div className="flex flex-col gap-3">
                            <span className="text-[16px] font-bold">
                                Express
                            </span>
                            <span>1 munkanap</span>


                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <WebpageLayout>
            <div>
                <div>
                    <span className="text-2xl">Cégtáblák</span>
                </div>
                <div className="flex flex-col gap-4 mt-8">
                    <SizeForm
                        accordionTriggerCount={1}
                        accordionTriggerText="Válassz méretet!"
                        DefaultSizes={DefaultSizes}
                    />

                    <RawMaterialForm
                        accordionTriggerCount={2}
                        accordionTriggerText="Válassz reklámtábla alapanyagot!"
                        Defaults={DefaultRawMaterials}
                    />

                    <ConfectionForm
                        accordionTriggerCount={3}
                        accordionTriggerText="Válassz konfekcionálást!"
                        Defaults={DefaultConfections}
                    />

                    <ProductionTimeForm
                        accordionTriggerCount={4}
                        accordionTriggerText="Válassz gyártási időt!"
                        Defaults={DefaultProductionTimes}
                    />
                </div>
            </div>
        </WebpageLayout>
    );
}

export default CompanySign;
