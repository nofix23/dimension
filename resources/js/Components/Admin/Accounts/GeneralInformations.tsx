import React from 'react'

type Props = {
    count: number;
};

function GeneralInformations({ count}: Props) {
  return (
    <div className="text-xl ml-2 mb-4">
        <span className="font-bold">Összes: {count}</span>
    </div>
  )
}

export default GeneralInformations