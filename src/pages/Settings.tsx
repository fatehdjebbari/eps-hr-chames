import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { User, Lock, Bell, Palette, Upload } from "lucide-react";

const Settings = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: "Settings saved",
                description: "Your changes have been saved successfully.",
            });
        }, 1000);
    };

    return (
        <MainLayout title="Settings" subtitle="Manage your application preferences">
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <div className="flex-1 lg:max-w-4xl">
                    <Tabs defaultValue="profile" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-4 md:w-auto">
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="appearance">Appearance</TabsTrigger>
                            <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        </TabsList>

                        {/* Profile Tab */}
                        <TabsContent value="profile" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Information</CardTitle>
                                    <CardDescription>
                                        Update your photo and personal details here.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center gap-6">
                                        <Avatar className="h-24 w-24">
                                            <AvatarImage src="/placeholder-user.jpg" alt="User" />
                                            <AvatarFallback className="text-lg">JD</AvatarFallback>
                                        </Avatar>
                                        <Button variant="outline" className="gap-2">
                                            <Upload className="h-4 w-4" />
                                            Change Photo
                                        </Button>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First name</Label>
                                            <Input id="firstName" defaultValue="John" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last name</Label>
                                            <Input id="lastName" defaultValue="Doe" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Textarea
                                            id="bio"
                                            placeholder="Tell us a little bit about yourself"
                                            className="min-h-[100px]"
                                            defaultValue="I am a healthcare professional dedicated to patient care."
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={handleSave} disabled={isLoading}>
                                        {isLoading ? "Saving..." : "Save Changes"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        {/* Account Tab */}
                        <TabsContent value="account" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Account Security</CardTitle>
                                    <CardDescription>
                                        Manage your password and account settings.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="current-password">Current Password</Label>
                                        <Input id="current-password" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">New Password</Label>
                                        <Input id="new-password" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm Password</Label>
                                        <Input id="confirm-password" type="password" />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline" className="text-destructive hover:text-destructive">
                                        Delete Account
                                    </Button>
                                    <Button onClick={handleSave} disabled={isLoading}>
                                        Update Password
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        {/* Appearance Tab */}
                        <TabsContent value="appearance" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Appearance</CardTitle>
                                    <CardDescription>
                                        Customize the look and feel of the application.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between space-x-2">
                                        <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
                                            <span>Dark Mode</span>
                                            <span className="font-normal leading-snug text-muted-foreground">
                                                Switch between light and dark themes.
                                            </span>
                                        </Label>
                                        <Switch id="dark-mode" />
                                    </div>
                                    <div className="flex items-center justify-between space-x-2">
                                        <Label htmlFor="compact-mode" className="flex flex-col space-y-1">
                                            <span>Compact Mode</span>
                                            <span className="font-normal leading-snug text-muted-foreground">
                                                Reduce spacing for higher information density.
                                            </span>
                                        </Label>
                                        <Switch id="compact-mode" />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Notifications Tab */}
                        <TabsContent value="notifications" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Notifications</CardTitle>
                                    <CardDescription>
                                        Configure how you receive alerts and updates.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between space-x-2">
                                        <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                                            <span>Email Notifications</span>
                                            <span className="font-normal leading-snug text-muted-foreground">
                                                Receive daily summaries of your activity.
                                            </span>
                                        </Label>
                                        <Switch id="email-notifications" defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between space-x-2">
                                        <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
                                            <span>Push Notifications</span>
                                            <span className="font-normal leading-snug text-muted-foreground">
                                                Receive real-time alerts on your device.
                                            </span>
                                        </Label>
                                        <Switch id="push-notifications" />
                                    </div>
                                    <div className="flex items-center justify-between space-x-2">
                                        <Label htmlFor="marketing-emails" className="flex flex-col space-y-1">
                                            <span>Marketing Emails</span>
                                            <span className="font-normal leading-snug text-muted-foreground">
                                                Receive news and special offers.
                                            </span>
                                        </Label>
                                        <Switch id="marketing-emails" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={handleSave} disabled={isLoading}>
                                        Save Preferences
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </MainLayout>
    );
};

export default Settings;
