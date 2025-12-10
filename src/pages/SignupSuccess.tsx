import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const SignupSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="container relative min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl">Account Created Successfully!</CardTitle>
                    <CardDescription>
                        Your account has been created successfully.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground">
                        You can now login with your credentials to access the dashboard.
                    </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Button className="w-full" onClick={() => navigate("/")}>
                        Go to Login
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                        &copy; {new Date().getFullYear()}
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignupSuccess;
