import SizeForm from "@/Components/Guest/Orders/SizeForm";
import WebpageLayout from "@/Layouts/WebpageLayout";

function CompanySign() {
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
                    />

                    <SizeForm
                        accordionTriggerCount={2}
                        accordionTriggerText="Válassz reklámtábla alapanyagot!"
                    />

                    <SizeForm
                        accordionTriggerCount={3}
                        accordionTriggerText="Válassz konfekcionálást!"
                    />
                </div>
            </div>
        </WebpageLayout>
    );
}

export default CompanySign;
