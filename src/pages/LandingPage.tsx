import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Stethoscope, Mail, Phone, Lock, Eye, EyeOff, Moon, Sun } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "@/components/theme/ThemeProvider";

const LandingPage = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [isSignup, setIsSignup] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [usePhone, setUsePhone] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isForgotPassword) {
            // Forgot password - validate email or phone
            if (usePhone) {
                if (!phone) {
                    toast({
                        title: "Error",
                        description: "Please enter your phone number.",
                        variant: "destructive",
                    });
                    return;
                }
            } else {
                if (!email) {
                    toast({
                        title: "Error",
                        description: "Please enter your email address.",
                        variant: "destructive",
                    });
                    return;
                }
            }
            // Show success message
            toast({
                title: "Password reset link sent!",
                description: usePhone
                    ? "Check your SMS for instructions to reset your password."
                    : "Check your email for instructions to reset your password.",
            });
            // Reset to login view
            setIsForgotPassword(false);
            setEmail("");
            setPhone("");
        } else if (isSignup) {
            // Signup validation
            if (usePhone) {
                if (!name || !phone || !password) {
                    toast({
                        title: "Error",
                        description: "Please fill in all fields.",
                        variant: "destructive",
                    });
                    return;
                }
            } else {
                if (!name || !email || !password) {
                    toast({
                        title: "Error",
                        description: "Please fill in all fields.",
                        variant: "destructive",
                    });
                    return;
                }
            }
            localStorage.setItem("isAuthenticated", "true");
            navigate("/signup-success");
        } else {
            // Login validation
            if (usePhone) {
                if (!phone || !password) {
                    toast({
                        title: "Error",
                        description: "Please enter both phone number and password.",
                        variant: "destructive",
                    });
                    return;
                }
            } else {
                if (!email || !password) {
                    toast({
                        title: "Error",
                        description: "Please enter both email and password.",
                        variant: "destructive",
                    });
                    return;
                }
            }
            localStorage.setItem("isAuthenticated", "true");
            navigate("/dashboard");
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left side - Image */}
            <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-zinc-900" />
                <img
                    src="/hero.png"
                    alt="Healthcare Team"
                    className="absolute inset-0 h-full w-full object-cover opacity-60"
                />
                <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur">
                            <Stethoscope className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-semibold">EPSP HR</span>
                    </div>
                    <div>
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                "Streamlining healthcare workforce management with modern tools and efficient processes."
                            </p>
                            <footer className="text-sm text-white/80">Healthcare Management System</footer>
                        </blockquote>
                    </div>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12 relative">
                <div className="w-full max-w-md">
                    {/* Logo for mobile */}
                    <div className="text-center mb-8 lg:hidden relative">
                        {/* Theme toggle for mobile - top right of logo section */}
                        <div className="absolute top-0 right-0">
                            <Button variant="ghost" size="icon" onClick={toggleTheme}>
                                {theme === "light" ? (
                                    <Moon className="h-5 w-5" />
                                ) : (
                                    <Sun className="h-5 w-5" />
                                )}
                            </Button>
                        </div>

                        <div className="inline-flex items-center gap-2 mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                                <Stethoscope className="h-6 w-6 text-primary-foreground" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight dark:text-white">EPSP HR</h1>
                    </div>

                    {/* Form */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 p-8">
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-semibold mb-2 dark:text-white">
                                {isForgotPassword ? "Reset Password" : isSignup ? "Create an account" : "Sign In"}
                            </h2>
                            <p className="text-sm text-muted-foreground dark:text-gray-400">
                                {isForgotPassword
                                    ? "Enter your email to receive a password reset link"
                                    : isSignup
                                        ? "Enter your details to create your account"
                                        : "to continue to your EPSP HR account"}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {isSignup && !isForgotPassword && (
                                <div>
                                    <Input
                                        type="text"
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="h-12 rounded-xl"
                                        required
                                    />
                                </div>
                            )}

                            {/* For Signup: Show both email and phone */}
                            {isSignup && !isForgotPassword ? (
                                <>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="h-12 rounded-xl pl-10"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground dark:text-gray-400">
                                            <Phone className="h-4 w-4" />
                                            <span>+213</span>
                                        </div>
                                        <Input
                                            type="tel"
                                            placeholder="5XX XX XX XX"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="h-12 rounded-xl pl-20"
                                            pattern="[5-7][0-9]{8}"
                                            required
                                        />
                                    </div>
                                </>
                            ) : (
                                /* For Login/Forgot Password: Show toggle */
                                <>
                                    {!isForgotPassword && (
                                        <div className="relative bg-gray-100 dark:bg-gray-700 p-1 rounded-xl mb-2">
                                            <div className="grid grid-cols-2 gap-1 relative">
                                                {/* Sliding background */}
                                                <div
                                                    className={`absolute top-0 h-full w-1/2 bg-white dark:bg-gray-600 rounded-lg shadow-sm transition-transform duration-200 ease-out ${usePhone ? 'translate-x-full' : 'translate-x-0'
                                                        }`}
                                                />

                                                {/* Email button */}
                                                <button
                                                    type="button"
                                                    onClick={() => setUsePhone(false)}
                                                    className={`relative z-10 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-colors duration-200 ${!usePhone
                                                        ? 'text-primary dark:text-white font-medium'
                                                        : 'text-muted-foreground dark:text-gray-300 hover:text-foreground dark:hover:text-white'
                                                        }`}
                                                >
                                                    <Mail className="h-4 w-4" />
                                                    <span className="text-sm">Email</span>
                                                </button>

                                                {/* Phone button */}
                                                <button
                                                    type="button"
                                                    onClick={() => setUsePhone(true)}
                                                    className={`relative z-10 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-colors duration-200 ${usePhone
                                                        ? 'text-primary dark:text-white font-medium'
                                                        : 'text-muted-foreground dark:text-gray-300 hover:text-foreground dark:hover:text-white'
                                                        }`}
                                                >
                                                    <Phone className="h-4 w-4" />
                                                    <span className="text-sm">Phone</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {usePhone ? (
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground dark:text-gray-400">
                                                <Phone className="h-4 w-4" />
                                                <span>+213</span>
                                            </div>
                                            <Input
                                                type="tel"
                                                placeholder="5XX XX XX XX"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="h-12 rounded-xl pl-20"
                                                pattern="[5-7][0-9]{8}"
                                                required
                                            />
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                                            <Input
                                                type="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="h-12 rounded-xl pl-10"
                                                required
                                            />
                                        </div>
                                    )}
                                </>
                            )}

                            {!isForgotPassword && (
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-12 rounded-xl pl-10 pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-white transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium"
                            >
                                {isForgotPassword ? "Send Reset Link" : isSignup ? "Create Account" : "Continue"}
                            </Button>
                        </form>

                        {!isSignup && !isForgotPassword && (
                            <div className="mt-4 text-center">
                                <button
                                    type="button"
                                    onClick={() => setIsForgotPassword(true)}
                                    className="text-sm text-muted-foreground hover:text-foreground underline"
                                >
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        {isForgotPassword && (
                            <div className="mt-4 text-center">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsForgotPassword(false);
                                        setEmail("");
                                    }}
                                    className="text-sm text-muted-foreground hover:text-foreground underline"
                                >
                                    Back to Sign In
                                </button>
                            </div>
                        )}

                        {!isForgotPassword && (
                            <div className="mt-8 pt-6 border-t text-center">
                                <p className="text-sm text-muted-foreground">
                                    {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsSignup(!isSignup);
                                            setName("");
                                            setEmail("");
                                            setPhone("");
                                            setPassword("");
                                        }}
                                        className="text-primary font-medium hover:underline"
                                    >
                                        {isSignup ? "Sign in" : "Sign up"}
                                    </button>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <p className="mt-8 text-center text-xs text-muted-foreground dark:text-gray-400">
                        &copy; {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
