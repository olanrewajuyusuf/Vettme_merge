import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export const EditPersonnelInformation = ({
   data, title, handleInputChange, handleRadioChange 
  }: { 
    data: any[]; 
    title: string;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }) => {
  return (
    <div className="mt-5">
        <Accordion type="single" collapsible>
          <div className="w-full rounded-xl bg-white border-[1px] border-stroke-clr overflow-hidden mb-[30px]">
            <AccordionItem value="personnel-info">
              <AccordionTrigger className="px-3 md:px-7">
                <p className="text-[16px] font-medium">{title}</p>
              </AccordionTrigger>
              <AccordionContent>
                {Array.isArray(data) ? (
                  data.map((item, index) => (
                    <div key={index} className="px-3 md:px-7 py-2 grid grid-cols-3 items-center border-t-[1px] border-stroke-clr">
                        <div>
                            <p className="text-gray-600 font-bold">{item.data}</p>
                            <p className="">{item.claim}</p>
                        </div>
                        <div className="col-span-2">
                            <label htmlFor={item.id} className="font-bold">Outcome</label>
                            <input 
                            type="text" 
                            id={item.id} 
                            name={item.id} 
                            onChange={handleInputChange}
                            className="w-full h-[40px] rounded-md border-[1px] border-stroke-clr"
                            />
                            <div className="flex justify-start items-center text-[12px] gap-5 mt-5">
                                <span className="font-bold">Verdict:</span>
                                <label htmlFor={`correct-${index}`} className="text-green-500 text-[12px]">
                                    <input 
                                    type="radio" 
                                    id={`correct-${index}`} 
                                    name={item.id} 
                                    className="mr-2" 
                                    onChange={handleRadioChange}
                                    />
                                    Correct
                                </label>
                                <label htmlFor={`wrong-${index}`} className="text-red-500 text-[12px]">
                                    <input 
                                    type="radio" 
                                    id={`wrong-${index}`} 
                                    name={item.id} 
                                    className="mr-2"
                                    onChange={handleRadioChange}
                                    />
                                    Wrong
                                </label>
                            </div>
                        </div>
                    </div>
                  ))
                ) : (
                  <p className="text-red-500">No data available</p>
                )}
              </AccordionContent>
            </AccordionItem>
          </div>
        </Accordion>
    </div>
  );
};
