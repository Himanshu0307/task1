import Logo from "../logo/logo";
import UserButton from "@/components/navigation/user-button";
import Notification from "./notification";

export default function NavBar() {
  return (
    <div className="flex justify-between flex-row p-3 border-gray-600 border mb-3">
      <Logo />
      <div className="flex justify-between flex-row gap-4 ">
        <Notification />
        <UserButton user={{ email: "user@email.com", name: "user" }} />
      </div>
    </div>
  );
}
