import React from 'react'

type Props = {
    count: number;
};

function GeneralInformations({ count}: Props) {
  return (
      <div className="text-xl ml-2 text-[#01A2D6] bg-white p-8 rounded-xl sm:w-[1400px]">
          <span className="font-bold">Összesen: {count}</span>
      </div>
  );
}

export default GeneralInformations
