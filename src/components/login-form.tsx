import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import introVideo1 from "@/assets/bgIntroVideo.mp4_compressed.mp4"
import introVideo2 from "@/assets/bgintrovideo2.mp4_compressed.mp4"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {useDispatch, useSelector} from "react-redux";
import {addUserInfo, setLoggedInUser} from "@/Redux/userInfoSlice.js";
import {useLocation, useNavigate} from "react-router";
import {FaApple, FaGoogle} from "react-icons/fa";
import {FaMeta} from "react-icons/fa6";

function LoginForm({ onSwitchToSignup, redirectPath }: { onSwitchToSignup: () => void; redirectPath: string }) {
    const registeredUsers = useSelector((state:any)=> state.userInfo.userInfo)
    const navigate = useNavigate()
    const dispatch :any  = useDispatch()
    const [emailLogin ,setEmailLogin] = useState<string>("")
    const [passwordLogin ,setPasswordLogin] = useState<string>("")

    // login function
    const handleLogin = (e:any) => {
        e.preventDefault()
        console.log('Login attempt with redirect path:', redirectPath); // Debug log

        const foundUser = registeredUsers.find((user:any) => user.email === emailLogin)
        if(foundUser){
            if(foundUser.password === passwordLogin){
                console.log('Login successful, dispatching user and navigating to:', redirectPath); // Debug log
                dispatch(setLoggedInUser(foundUser));

                // Use setTimeout to ensure state is updated before navigation
                setTimeout(() => {
                    console.log('Navigating now to:', redirectPath); // Debug log
                    navigate(redirectPath, { replace: true });
                }, 0);

                setEmailLogin("");
                setPasswordLogin("");
                e.target.reset();
            } else{
                alert("Wrong password")
                setPasswordLogin("");
                e.target.reset();
            }
        }else{
            setEmailLogin("");
            setPasswordLogin("");
            e.target.reset();
            alert("User not found! Please register")
        }
    }

    const handleSwitch = () => {
        setEmailLogin("")
        setPasswordLogin("")
        onSwitchToSignup()
    }

    return (
        <form onSubmit={handleLogin}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="p-6 md:p-8">
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-muted-foreground text-balance">
                                    Login to your Acme Inc account
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    value={emailLogin}
                                    onChange={(e) => setEmailLogin(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                        style={{ color: '#E83035' }}
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={passwordLogin}
                                    onChange={(e) => setPasswordLogin(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    style={{ backgroundColor: '#E83035', color: 'white' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d02830'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E83035'}
                                >
                                    Login
                                </Button>
                            </Field>
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>
                            <Field className="grid grid-cols-3 gap-4">
                                <Button variant="outline" type="button">
                                    <span className="sr-only">Login with Apple</span>
                                    <FaApple />
                                </Button>
                                <Button variant="outline" type="button">
                                    <span className="sr-only">Login with Google</span>
                                    <FaGoogle />
                                </Button>
                                <Button variant="outline" type="button">
                                    <span className="sr-only">Login with Meta</span>
                                    <FaMeta />
                                </Button>
                            </Field>
                            <FieldDescription className="text-center">
                                Don&apos;t have an account?{" "}
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleSwitch()
                                    }}
                                    style={{ color: '#E83035' }}
                                    className="font-medium hover:underline"
                                >
                                    Sign up
                                </a>
                            </FieldDescription>
                        </FieldGroup>
                    </div>
                    <div className="bg-muted relative hidden md:block">
                        <video
                            src={introVideo1}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}

function SignupForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
    const [registeringName, setRegisteringName] = useState('');
    const [registeringEmail, setRegisteringEmail] = useState('');
    const [registeringPassword, setRegisteringPassword] = useState('');
    const [registeringConfirmPassword, setRegisteringConfirmPassword] = useState('');
    const dispatch = useDispatch()
    const registeredUsers = useSelector((state:any)=> state.userInfo.userInfo)

    const registeringHandler = (e:any) =>{
        e.preventDefault()
        if(registeringPassword !== registeringConfirmPassword){
            alert("Passwords do not match")
        } else {
            if (registeredUsers.some((user:any) => user.email === registeringEmail)) {
                alert("Email already exists");
            } else {
                dispatch(addUserInfo({
                    name: registeringName,
                    email: registeringEmail,
                    password: registeringPassword,
                }))
                alert("Registration successful! You can now log in.");
                setRegisteringName('');
                setRegisteringEmail('');
                setRegisteringPassword('');
                setRegisteringConfirmPassword('');
            }
        }
    }

    const handleSwitch = () => {
        setRegisteringName('');
        setRegisteringEmail('');
        setRegisteringPassword('');
        setRegisteringConfirmPassword('');
        onSwitchToLogin();
    };

    return (
        <form onSubmit={registeringHandler}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="bg-muted relative hidden md:block">
                        <video
                            src={introVideo2}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-6 md:p-8">
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Create an account</h1>
                                <p className="text-muted-foreground text-balance">
                                    Sign up for your Acme Inc account
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="signup-name">Full Name</FieldLabel>
                                <Input
                                    id="signup-name"
                                    type="text"
                                    placeholder="Muhammad Faizan"
                                    required
                                    value={registeringName}
                                    onChange={(e) => setRegisteringName(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="signup-email">Email</FieldLabel>
                                <Input
                                    id="signup-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    value={registeringEmail}
                                    onChange={(e) => setRegisteringEmail(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="signup-password">Password</FieldLabel>
                                <Input
                                    id="signup-password"
                                    type="password"
                                    required
                                    value={registeringPassword}
                                    onChange={(e) => setRegisteringPassword(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="signup-confirm-password">Confirm Password</FieldLabel>
                                <Input
                                    id="signup-confirm-password"
                                    type="password"
                                    required
                                    value={registeringConfirmPassword}
                                    onChange={(e) => setRegisteringConfirmPassword(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    style={{ backgroundColor: '#E83035', color: 'white' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d02830'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E83035'}
                                >
                                    Sign Up
                                </Button>
                            </Field>
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>
                            <Field className="grid grid-cols-3 gap-4">
                                <Button variant="outline" type="button">
                                    <span className="sr-only">Sign up with Apple</span>
                                    <FaApple />
                                </Button>
                                <Button variant="outline" type="button">
                                    <span className="sr-only">Sign up with Google</span>
                                    <FaGoogle />
                                </Button>
                                <Button variant="outline" type="button">
                                    <span className="sr-only">Sign up with Meta</span>
                                    <FaMeta />
                                </Button>
                            </Field>
                            <FieldDescription className="text-center">
                                Already have an account?{" "}
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleSwitch()
                                    }}
                                    style={{ color: '#E83035' }}
                                    className="font-medium hover:underline"
                                >
                                    Login
                                </a>
                            </FieldDescription>
                        </FieldGroup>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}

export default function AuthForm({
                                     className,
                                     ...props
                                 }: React.ComponentProps<"div">) {
    const [isSignup, setIsSignup] = useState(false)
    const location = useLocation()

    // Capture the redirect path once at the top level and preserve it
    const redirectPath = location.state?.from || "/";

    console.log('AuthForm location state:', location.state); // Debug log
    console.log('Captured redirect path:', redirectPath); // Debug log

    const handleSwitchToSignup = () => setIsSignup(true)
    const handleSwitchToLogin = () => setIsSignup(false)

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="relative overflow-hidden">
                <div
                    className="transition-all duration-500 ease-in-out"
                    style={{
                        opacity: !isSignup ? 1 : 0,
                        transform: !isSignup ? 'translateX(0)' : 'translateX(-100%)',
                        position: !isSignup ? 'relative' : 'absolute',
                        width: '100%',
                        pointerEvents: !isSignup ? 'auto' : 'none'
                    }}
                >
                    <LoginForm onSwitchToSignup={handleSwitchToSignup} redirectPath={redirectPath} />
                </div>
                <div
                    className="transition-all duration-500 ease-in-out"
                    style={{
                        opacity: isSignup ? 1 : 0,
                        transform: isSignup ? 'translateX(0)' : 'translateX(100%)',
                        position: isSignup ? 'relative' : 'absolute',
                        top: 0,
                        width: '100%',
                        pointerEvents: isSignup ? 'auto' : 'none'
                    }}
                >
                    <SignupForm onSwitchToLogin={handleSwitchToLogin} />
                </div>
            </div>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our{" "}
                <a href="#" style={{ color: '#E83035' }} className="hover:underline">
                    Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" style={{ color: '#E83035' }} className="hover:underline">
                    Privacy Policy
                </a>.
            </FieldDescription>
        </div>
    )
}
