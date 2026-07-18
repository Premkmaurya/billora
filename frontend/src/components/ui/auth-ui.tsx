"use client";

import * as React from "react";
import { useState, useId, useEffect } from "react";
import { Link } from "react-router-dom";
import { Slot } from "@radix-ui/react-slot";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TypewriterProps {
  text: string | string[];
  speed?: number;
  cursor?: string;
  loop?: boolean;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
}

export function Typewriter({
  text,
  speed = 100,
  cursor = "|",
  loop = false,
  deleteSpeed = 50,
  delay = 1500,
  className,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);

  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textArrayIndex] || "";

  useEffect(() => {
    if (!currentText) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < currentText.length) {
            setDisplayText((prev) => prev + currentText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else if (loop) {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText((prev) => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(0);
            setTextArrayIndex((prev) => (prev + 1) % textArray.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    );

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    isDeleting,
    currentText,
    loop,
    speed,
    deleteSpeed,
    delay,
    displayText,
    text,
  ]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">{cursor}</span>
    </span>
  );
}

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input dark:border-input/50 bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary-foreground/60 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-6",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-input dark:border-input/50 bg-background px-3 py-3 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:bg-accent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}
const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, ...props }, ref) => {
    const id = useId();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    return (
      <div className="grid w-full items-center gap-2">
        {label && <Label htmlFor={id}>{label}</Label>}
        <div className="relative">
          <Input id={id} type={showPassword ? "text" : "password"} className={cn("pe-10", className)} ref={ref} {...props} />
          <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 end-0 flex h-full w-10 items-center justify-center text-muted-foreground/80 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? (<EyeOff className="size-4" aria-hidden="true" />) : (<Eye className="size-4" aria-hidden="true" />)}
          </button>
        </div>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

function SignInForm() {
  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); console.log("UI: Sign In form submitted"); };
  return (
    <form onSubmit={handleSignIn} autoComplete="on" className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center text-white">
        {/* Mini Brand Monogram */}
        <div className="w-9 h-9 rounded-xl bg-cyber-yellow flex items-center justify-center font-black text-dark-text text-xl mb-2 select-none shadow-lg">
          B
        </div>
        <h1 className="text-2xl font-bold">Sign in to your account</h1>
        <p className="text-balance text-sm text-gray-400">Enter your email below to sign in</p>
      </div>
      <div className="grid gap-4 text-white">
        <div className="grid gap-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" placeholder="m@example.com" required autoComplete="email" /></div>
        <PasswordInput name="password" label="Password" required autoComplete="current-password" placeholder="Password" />
        <Button type="submit" variant="outline" className="mt-2 text-white border-white/10 hover:bg-white/5 cursor-pointer">Sign In</Button>
      </div>
    </form>
  );
}

function SignUpForm() {
  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); console.log("UI: Sign Up form submitted"); };
  return (
    <form onSubmit={handleSignUp} autoComplete="on" className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center text-white">
        {/* Mini Brand Monogram */}
        <div className="w-9 h-9 rounded-xl bg-cyber-yellow flex items-center justify-center font-black text-dark-text text-xl mb-2 select-none shadow-lg">
          B
        </div>
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-balance text-sm text-gray-400">Enter your details below to sign up</p>
      </div>
      <div className="grid gap-4 text-white">
        <div className="grid gap-1"><Label htmlFor="name">Full Name</Label><Input id="name" name="name" type="text" placeholder="John Doe" required autoComplete="name" /></div>
        <div className="grid gap-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" placeholder="m@example.com" required autoComplete="email" /></div>
        <PasswordInput name="password" label="Password" required autoComplete="new-password" placeholder="Password"/>
        <Button type="submit" variant="outline" className="mt-2 text-white border-white/10 hover:bg-white/5 cursor-pointer">Sign Up</Button>
      </div>
    </form>
  );
}

function AuthFormContainer({ mode }: { mode: 'signin' | 'signup'; }) {
    const isSignIn = mode === 'signin';
    return (
        <div className="mx-auto grid w-[350px] gap-2 text-white my-auto">
            {isSignIn ? <SignInForm /> : <SignUpForm />}
            <div className="text-center text-sm mt-6">
                {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
                <Link to={isSignIn ? "/signup" : "/login"} className="pl-1 text-cyber-yellow hover:text-white font-bold transition-colors">
                    {isSignIn ? "Sign up" : "Sign in"}
                </Link>
            </div>
            <div className="relative text-center text-sm my-4 after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-white/10">
                <span className="relative z-10 bg-dark-bg px-2 text-gray-500 font-bold">Or continue with</span>
            </div>
            <Button variant="outline" type="button" className="border-white/10 text-white hover:bg-white/5 cursor-pointer" onClick={() => console.log("UI: Google button clicked")}>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google icon" className="mr-2 h-4 w-4" />
                Continue with Google
            </Button>
        </div>
    )
}

interface AuthContentProps {
    image?: {
        src: string;
        alt: string;
    };
    quote?: {
        text: string;
        author: string;
    }
}

interface AuthUIProps {
    mode: 'signin' | 'signup';
    signInContent?: AuthContentProps;
    signUpContent?: AuthContentProps;
}

const defaultSignInContent = {
    image: {
        src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        alt: "Vibrant abstract shapes layout"
    },
    quote: {
        text: "Welcome Back! Serve customers and tally profits.",
        author: "Billora Desk"
    }
};

const defaultSignUpContent = {
    image: {
        src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
        alt: "Vibrant gradient structures"
    },
    quote: {
        text: "Create an account. Set up checkout lines in under 10 seconds.",
        author: "Billora POS"
    }
};

export function AuthUI({ mode, signInContent = {}, signUpContent = {} }: AuthUIProps) {
  const isSignIn = mode === 'signin';

  useEffect(() => {
    const lockBodyScroll = () => {
      const isDesktop = window.innerWidth >= 768;
      document.documentElement.style.overflow = isDesktop ? 'hidden' : '';
      document.documentElement.style.height = isDesktop ? '100vh' : '';
      document.body.style.overflow = isDesktop ? 'hidden' : '';
      document.body.style.height = isDesktop ? '100vh' : '';
      
      const root = document.getElementById('root');
      if (root) {
        root.style.overflow = isDesktop ? 'hidden' : '';
        root.style.height = isDesktop ? '100vh' : '';
      }
    };

    lockBodyScroll();
    window.addEventListener('resize', lockBodyScroll);

    return () => {
      window.removeEventListener('resize', lockBodyScroll);
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
      const root = document.getElementById('root');
      if (root) {
        root.style.overflow = '';
        root.style.height = '';
      }
    };
  }, []);

  const finalSignInContent = {
      image: { ...defaultSignInContent.image, ...signInContent.image },
      quote: { ...defaultSignInContent.quote, ...signInContent.quote },
  };
  const finalSignUpContent = {
      image: { ...defaultSignUpContent.image, ...signUpContent.image },
      quote: { ...defaultSignUpContent.quote, ...signUpContent.quote },
  };

  const currentContent = isSignIn ? finalSignInContent : finalSignUpContent;

  return (
    <div className="w-full min-h-screen md:h-screen md:overflow-hidden md:grid md:grid-cols-12 bg-dark-bg">
      <style>{`
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear {
          display: none;
        }
        .custom-auth-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .custom-auth-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-auth-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
        }
        .custom-auth-scroll::-webkit-scrollbar-thumb:hover {
          background: #FDE047;
        }
      `}</style>
      
      {/* Left panel: scrolls on desktop/tablet, normal flow on mobile */}
      <div className="w-full min-h-screen md:min-h-0 md:h-screen md:col-span-5 lg:col-span-5 md:overflow-y-auto md:overflow-x-hidden custom-auth-scroll scroll-smooth flex flex-col items-center justify-start p-6 md:py-12">
        <AuthFormContainer mode={mode} />
      </div>

      {/* Right panel: fixed in place on desktop/tablet, hidden on mobile */}
      <div
        className="hidden md:flex md:col-span-7 md:h-screen md:overflow-hidden relative bg-cover bg-center transition-all duration-500 ease-in-out flex-col justify-end p-8"
        style={{ backgroundImage: `url(${currentContent.image.src})` }}
        key={currentContent.image.src}
      >
        <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />
        
        <div className="relative z-10 text-center text-white bg-black/30 backdrop-blur-md border border-white/10 p-6 rounded-2xl max-w-md mx-auto">
            <blockquote className="space-y-2">
              <p className="text-lg font-medium leading-relaxed">
                “<Typewriter
                    key={currentContent.quote.text}
                    text={currentContent.quote.text}
                    speed={60}
                    loop={false}
                  />”
              </p>
              <cite className="block text-sm font-bold text-cyber-yellow not-italic mt-2">
                  — {currentContent.quote.author}
              </cite>
            </blockquote>
        </div>
      </div>
    </div>
  );
}
