import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellIcon } from "lucide-react";
export default function Notification() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <BellIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="py-2 group  cursor-pointer">
          This is notification 1
        </DropdownMenuItem>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuItem className="py-2 group  cursor-pointer">
          This is notification 2
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
