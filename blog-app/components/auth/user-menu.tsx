import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Avatar } from "../ui/avatar";
import { User } from "better-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";

const UserMenu = ({ user }: { user: User }) => {
  const router = useRouter();

  const nameLabel = () =>
    user?.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  const handleLogout = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully");
          },
          onError: () => {
            toast.error("Error in logging out");
          },
        },
      });
      router.push("/auth");
    } catch (e) {
      toast.error("Error while logging out");
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center  dark:bg-card dark:text-white dark:border dark:border-gray-700">
            {nameLabel()}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-gray-50 rounded-lg p-2 border border-gray-100 dark:bg-card dark:text-white dark:border-gray-700"
        >
          <div className="w-full flex flex-col gap-2 p-2 leading-none">
            <p className="text-base font-semibold">{user?.name}</p>
            <p className="text-base text-muted-foreground">{user?.email}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={"/profile"}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild onClick={handleLogout}>
            <Link href={"#"}>Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
