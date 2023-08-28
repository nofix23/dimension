import React from 'react'

type Props = {
    count: number;
};

function GeneralInformations({ count}: Props) {
  return (
      <div className="text-xl ml-2 mb-4 text-[#01A2D6]">
          <span className="font-bold">Összesen: {count}</span>
      </div>
  );
}

export default GeneralInformations
