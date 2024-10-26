"use client";
import Annoucement from "@/components/Annoucement";
import EventCalender from "@/components/EventCalender";
import Events from "@/components/Events";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserCard from "@/components/UserCard";

const page = async () => {
  const numsOfClass = 10;
  // await prisma.class.count()

  return (
    <div className="p-4 gap-4 flex flex-col lg:flex-row">
      <div className="w-full lg:w-2/3">
        {/* User cards */}
        <div className="flex gap-4 justify-around flex-wrap">
          <UserCard type="Teacher" />
          <UserCard type="Student" />
          <UserCard type="Staff" />
        </div>

        <Tabs defaultValue="account">
          <TabsList className=" w-full flex">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="page">Page</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when youre done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, youll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="page"></TabsContent>
        </Tabs>
      </div>

      {/* Right */}
      <div className="w-full lg:w-1/3 flex flex-col">
        <EventCalender />
        <Events />
        <Annoucement />
      </div>
      {/* Suggest */}
    </div>
  );
};

export default page;
