import { BuildingOfficeIcon, ExclamationCircleIcon, EyeIcon, InformationCircleIcon, PlusIcon, UserIcon } from '@heroicons/react/24/outline';
import React from 'react'
import CreateProfile from '../Forms/CreateProfile';
import CreateCompanyForm from '../Forms/CreateCompanyForm';
import { Link } from '@inertiajs/react';

function Quickbar() {
  return (
      <div className="bg-white md:w-[1400px] p-8 rounded-xl shadow-lg shadow-slate-200">
          <div>
              <div>
                  <span className="text-xl">Gyors műveletek</span>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex flex-col gap-4 items-center justify-center border-slate-200 border-2 shadow-md shadow-slate-50 rounded-xl w-full sm:w-64 cursor-pointer p-4 hover:border-[#01A2D6]">
                      <UserIcon className="h-8" />
                      <CreateProfile
                          triggerText="Felhasználó hozzáadása"
                          TriggerIcon={PlusIcon}
                          triggerClass=""
                      />
                  </div>

                  <div className="flex flex-col gap-4 items-center justify-center border-slate-200 border-2 shadow-md shadow-slate-50 rounded-xl w-full sm:w-64 cursor-pointer p-4 hover:border-[#01A2D6]">
                      <BuildingOfficeIcon className="h-8" />
                      <CreateCompanyForm
                          triggerText="Cég hozzáadása"
                          TriggerIcon={PlusIcon}
                          triggerClass=""
                      />
                  </div>

                  <div className="flex flex-col gap-4 items-center justify-center border-slate-200 border-2 shadow-md shadow-slate-50 rounded-xl w-full sm:w-64 cursor-pointer p-4 hover:border-[#01A2D6]">
                      <ExclamationCircleIcon className="h-8" />
                      <div className="flex flex-row items-center gap-2">
                          <InformationCircleIcon className="h-4" />
                          <Link href="/activity" className="font-semibold text-sm">Aktivitás</Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default Quickbar
