import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

const Profiledetails = async () => {
  const { user } = await auth.api.getSession({ headers: await headers() });
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div className="flex flex-col">
              <span>Your Profile Information</span>
              <span className="text-base font-light text-muted-foreground">
                Only relevant details can be viewed here
              </span>
            </div>
            <Button>
              <Link href="/post/create">Create Post</Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="border-t border-t-gray-200 p-6">
          <div> Name: {user.name}</div>
          <div> Email: {user.email}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profiledetails;
