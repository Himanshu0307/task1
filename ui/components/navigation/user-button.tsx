"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "../ui/avatar";
import Image from "next/image";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  LogOut,
  Monitor,
  Moon,
  SettingsIcon,
  Sun,
  TruckIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Notification from "./notification";

export default function UserButton({
  user,
}: {
  user: { email: string; name: string; image?: string };
}) {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  function switchTheme() {
    switch (theme) {
      case "dark":
        return setChecked(true);
      case "light":
        return setChecked(false);
      default:
        return setChecked(false);
    }
  }

  return (
    <div className="flex gap-2 text-center align-text-bottom">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Avatar>
            {user?.image && (
              <Image
                src={user?.image}
                alt={"user-image"}
                height={25}
                width={25}
              />
            )}
            <AvatarFallback className="bg-primary h-full w-full items-center">
              <div className="font-bold text-3xl text-white h-full w-full ">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className=" m-3 bg-primary/30 text-center rounded-sm">
            <div className="flex p-2  justify-center items-center flex-col">
              <Avatar>
                {user?.image && (
                  <Image
                    src={user?.image}
                    alt={"user-image"}
                    height={36}
                    width={36}
                  />
                )}
                <AvatarFallback className="bg-primary h-full w-full items-center">
                  <div className="font-bold text-center text-3xl text-white h-full w-full ">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="font-medium text-sm">{user?.name}</div>
            <div>{user?.email}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="py-2 group  cursor-pointer"
            onClick={() => router.push("dashboard/orders")}
          >
            <TruckIcon
              className="mr-2 group-hover:translate-x-1 transition-all duration-100"
              size={14}
            />
            Orders
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/dashboard/settings")}
            className="py-2  group cursor-pointer"
          >
            <SettingsIcon
              className="mr-2 group-hover:rotate-180 transition-all duration-100 ease-in-out"
              size={14}
            />
            Setting
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={(e) => {
              if (e) {
                if (theme === "dark") {
                  setTheme("light");
                } else if (theme === "light") {
                  setTheme("system");
                } else if (theme == "system") {
                  setTheme("dark");
                }
              }
              e.stopPropagation();
            }}
            className="py-2  group cursor-pointer"
          >
            {theme == "light" && (
              <>
                <Sun
                  size={14}
                  className="mr-2 group-hover:scale-75 transition-all duration-100 ease-in-out group-hover:text-yellow-300"
                />
                <span>Light Mode</span>
              </>
            )}
            {theme == "dark" && (
              <>
                <Moon
                  size={14}
                  className="mr-2 group-hover:scale-75 transition-all duration-100 ease-in-out group-hover:text-blue-500"
                />
                <span> Dark Mode</span>
              </>
            )}
            {theme == "system" && (
              <>
                <Monitor
                  size={14}
                  className="mr-2 group-hover:scale-75 transition-all duration-100 ease-in-out "
                />

                <span>System theme</span>
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            // onClick={() => signOut()}
            className="py-2 group cursor-pointer hover:bg-destructive/40"
          >
            <LogOut
              size={14}
              className="mr-2 group-hover:scale-75 transition-all duration-100 ease-in-out  "
            />
            Signout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
