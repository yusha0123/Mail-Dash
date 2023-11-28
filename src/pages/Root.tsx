import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MailOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Root = () => {
  return (
    <section className="min-h-[100dvh] w-full flex items-center justify-center bg-gray-100">
      <Card className="w-[90%] sm:w-[60%] max-w-md md:w-[50%] lg:w-[30%] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary tracking-[0.5px] flex items-center gap-1 justify-center">
            <MailOpen />
            Mail Dash
          </CardTitle>
        </CardHeader>
        <Separator className="mb-4" />
        <CardContent>
          <Tabs defaultValue="sign-up" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-up">
              <Signup />
            </TabsContent>
            <TabsContent value="login">
              <Login />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
};

export default Root;
