import { User } from '@/types';
import React from 'react'
import UpdateUserForm from './UpdateUserForm';

type Props = {
    user: User;
}
function AccountData({ user}: Props) {
  return (
      <div className="">
          <div className="mb-4 text-lg font-bold">
              <span>Általános adatok</span>
          </div>

          <div className="flex flex-col gap-4 text-left">
              <div className="flex flex-row items-center gap-3 ml-4">
                  <div className="w-[200px]">
                      <span>Név:</span>
                  </div>
                  <div className="bg-gray-50 p-2 w-[500px] rounded-xl">
                      <span className="ml-2">{user.name}</span>
                  </div>
              </div>

              <div className="flex flex-row items-center gap-3 ml-4">
                  <div className="w-[200px]">
                      <span>E-mail:</span>
                  </div>
                  <div className="bg-gray-50 p-2 w-[500px] rounded-xl">
                      <span className="ml-2">{user.email}</span>
                  </div>
              </div>

              <div className="flex flex-row items-center gap-3 ml-4">
                  <div className="w-[200px]">
                      <span>Jogosultság:</span>
                  </div>
                  <div className="bg-gray-50 p-2 w-[500px] rounded-xl">
                      <span className="ml-2">
                          {user.role == "admin" ? "Adminisztrátor" : ""}
                          {user.role == "employee" ? "Alkalmazott" : ""}
                          {user.role == "company" ? "Cég" : ""}
                          {user.role == "customer" ? "Vásárló" : ""}
                      </span>
                  </div>
              </div>

              <div className="flex flex-row items-center gap-3 ml-4">
                  <div className="w-[200px]">
                      <span>Létrehozás dátuma:</span>
                  </div>
                  <div className="bg-gray-50 p-2 w-[500px] rounded-xl">
                      <span className="ml-2">
                          {new Date(user.created_at).toLocaleString()}
                      </span>
                  </div>
              </div>
              <div className="">
                  <UpdateUserForm user={user} triggerText="Szerkesztés" />
              </div>
          </div>
      </div>
  );
}

export default AccountData
