"use client";

import { ArrowLeft, Edit, MapPin, CreditCard, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { signOut } from "next-auth/react";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container max-w-5xl p-4 mx-auto">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <Link href="/user">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center mb-6 text-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage
                      src="/placeholder.svg?height=96&width=96"
                      alt="User"
                    />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">John Doe</h2>
                  <p className="text-muted-foreground">john.doe@example.com</p>
                  <div className="flex items-center mt-2">
                    <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Jakarta, Indonesia
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <Separator className="my-4" />

                <nav className="space-y-1">
                  <Link
                    href="/user/profile"
                    className="flex items-center px-3 py-2 text-white bg-black rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Profile
                  </Link>
                  <Link
                    href="/user/settings"
                    className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </Link>
                  <Link
                    href="/user/orders"
                    className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    My Orders
                  </Link>
                  <Button
                    variant="default"
                    className="flex items-start justify-start w-full px-3 py-2 text-red-600 bg-transparent border-none shadow-none hover:bg-red-50"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Profile Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="payment">Payment Methods</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Manage your personal details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <div className="flex items-center justify-between px-3 py-2 mt-1 border rounded-md">
                          <span>John Doe</span>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <div className="flex items-center justify-between px-3 py-2 mt-1 border rounded-md">
                          <span>john.doe@example.com</span>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <div className="flex items-center justify-between px-3 py-2 mt-1 border rounded-md">
                          <span>+62 812 3456 7890</span>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Date of Birth
                        </label>
                        <div className="flex items-center justify-between px-3 py-2 mt-1 border rounded-md">
                          <span>January 15, 1990</span>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <div className="flex items-center justify-between px-3 py-2 mt-1 border rounded-md">
                        <span>
                          123 Coffee Street, Jakarta, Indonesia, 12345
                        </span>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Coffee Preferences</CardTitle>
                    <CardDescription>
                      Customize your coffee experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="mb-2 text-sm font-medium text-gray-700">
                          Favorite Coffee Type
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant="outline"
                            className="text-white bg-black"
                          >
                            Espresso
                          </Badge>
                          <Badge variant="outline">Cappuccino</Badge>
                          <Badge variant="outline">Latte</Badge>
                          <Badge variant="outline">Americano</Badge>
                          <Badge variant="outline">Cold Brew</Badge>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 text-sm font-medium text-gray-700">
                          Roast Preference
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">Light</Badge>
                          <Badge
                            variant="outline"
                            className="text-white bg-black"
                          >
                            Medium
                          </Badge>
                          <Badge variant="outline">Dark</Badge>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 text-sm font-medium text-gray-700">
                          Milk Preference
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">Whole Milk</Badge>
                          <Badge
                            variant="outline"
                            className="text-white bg-black"
                          >
                            Oat Milk
                          </Badge>
                          <Badge variant="outline">Almond Milk</Badge>
                          <Badge variant="outline">Soy Milk</Badge>
                          <Badge variant="outline">No Milk</Badge>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 text-sm font-medium text-gray-700">
                          Sweetness Level
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">No Sugar</Badge>
                          <Badge variant="outline">Light</Badge>
                          <Badge
                            variant="outline"
                            className="text-white bg-black"
                          >
                            Medium
                          </Badge>
                          <Badge variant="outline">Sweet</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      Manage your payment options
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 mr-3 bg-black rounded-md">
                            <CreditCard className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-muted-foreground">
                              Expires 12/25
                            </p>
                          </div>
                        </div>
                        <Badge>Default</Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 mr-3 bg-gray-100 rounded-md">
                            <CreditCard className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Mastercard ending in 8888
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Expires 10/24
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Set as Default
                        </Button>
                      </div>

                      <Button className="w-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Add New Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}
