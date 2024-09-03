import AuthCard from "@/components/auth/auth-card";
import LoginForm from "@/components/auth/login-form";
import Image from "next/image";
export default function LoginPage() {
  return (
    <AuthCard
      cardTitle="Welcome Back.... 💐"
      backhref=""
      backTitle="Don't have any account? Create new account"
      showSocial={false}
    >
      <LoginForm></LoginForm>
    </AuthCard>
  );
}
