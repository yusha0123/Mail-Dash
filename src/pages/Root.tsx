import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import MailIcon from "@/components/mail-icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Root = () => {
  return (
    <section className="min-h-[100dvh] w-full flex items-center justify-center bg-gray-100">
      <Card className="w-[90%] sm:w-[60%] max-w-md md:w-[50%] lg:w-[30%] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary tracking-[0.5px] flex flex-col items-center justify-center">
            <MailIcon className="h-10 w-10 mb-1" />
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
