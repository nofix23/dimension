import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { useToast } from '@/Components/ui/use-toast';
import { User } from '@/types';
import { EllipsisHorizontalIcon, PencilIcon } from '@heroicons/react/24/outline';
import { router } from '@inertiajs/react';
import { TrashIcon } from '@radix-ui/react-icons';
import React, { PropsWithChildren } from 'react'

type Props = {
    user: User;
}
function UserDropdown({ user, children} :PropsWithChildren<Props>) {

    const { toast } = useToast();

    type ToastType = {
        type: "success" | "failed";
        title: string;
        description: string;
    };

    const showToast = ({ type, title, description }: ToastType) => {
        if (type === "failed") {
            toast({
                variant: "destructive",
                title: title,
                description: description,
                className: "bg-red-100 text-red-900 font-bold",
            });
        }

        if (type === "success") {
            toast({
                title: title,
                description: description,
                className: "bg-green-100 text-green-900 font-bold text-xl",
            });
        }
    };

    function handleDeleteUser(
        slug: string,
        method: "get" | "post" | "put" | "patch" | "delete",
        onBefore?: string,
        values?: any
    ) {
        router[method](slug, values, {
            onBefore: () => {
                if (onBefore) {
                    const reply = confirm(onBefore);
                    if (!reply) {
                        // setLoading(false);
                        return false;
                    }
                }
            },

            onSuccess: () => {
                showToast({
                    type: "success",
                    title: "Sikeres művelet!",
                    description: "Adatok frissítve!",
                });
            },

            onError: (resp: any) => {
                showToast({
                    type: "failed",
                    title: "Hiba!",
                    description: resp.errors,
                });
            },

            onFinish: () => {},
        });
    }
  return (
      <div className="flex items-center">
          <DropdownMenu>
              <DropdownMenuTrigger>
                  <EllipsisHorizontalIcon className="h-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white w-64">
                  <DropdownMenuLabel>
                      <span>Műveletek</span>
                  </DropdownMenuLabel>
                  <hr></hr>
                  <div>
                      <div
                          className="flex flex-row gap-2 items-center hover:bg-red-200 bg-red-100 text-red-900 hover:cursor-pointer p-2 text-sm"
                          onClick={() =>
                              handleDeleteUser(
                                  "/user/delete",
                                  "post",
                                  "Biztosan törlöd ezt a hozzáférést?",
                                  { user_id: user.id }
                              )
                          }
                      >
                          <TrashIcon className="h-4" />
                          <span>Hozzáférés törlése</span>
                      </div>
                  </div>
              </DropdownMenuContent>
          </DropdownMenu>
      </div>
  );
}

export default UserDropdown
