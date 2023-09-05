import { BuildingOfficeIcon, EyeIcon, UserIcon } from '@heroicons/react/24/outline';
import React from 'react'

function Quickbar() {
  return (
      <div className="bg-white md:w-[1400px] p-8 rounded-xl shadow-lg shadow-slate-200">
          <div>
              <div>
                  <span className="text-xl">Gyors műveletek</span>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex flex-col gap-4 items-center justify-center border-slate-200 border-2 shadow-md shadow-slate-50 rounded-xl w-full sm:w-64 cursor-pointer p-4 hover:border-[#01A2D6] hover:text-[#01A2D6]">
                      <UserIcon className="h-8" />
                      <span>Felhasználó hozzáadása</span>
                  </div>

                  <div className="flex flex-col gap-4 items-center justify-center border-slate-200 border-2 shadow-md shadow-slate-50 rounded-xl w-full sm:w-64 cursor-pointer p-4 hover:border-[#01A2D6] hover:text-[#01A2D6]">
                      <BuildingOfficeIcon className="h-8" />
                      <span>Cég hozzáadása</span>
                  </div>

                  <div className="flex flex-col gap-4 items-center justify-center border-slate-200 border-2 shadow-md shadow-slate-50 rounded-xl w-full sm:w-64 cursor-pointer p-4 hover:border-[#01A2D6] hover:text-[#01A2D6]">
                      <EyeIcon className="h-8" />
                      <span>Felhasználói aktivitás</span>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default Quickbar
