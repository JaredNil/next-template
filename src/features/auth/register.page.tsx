import { Link } from "react-router-dom";

import { AuthLayout } from "./ui/auth-layout";
import { RegisterForm } from "./ui/register-form";
import { ROUTES } from "@/shared/routes/routes";

function RegisterPage() {
  return (
    <AuthLayout
      title="Регистрация"
      description="Введите ваш email и пароль для регистрации в системе"
      form={<RegisterForm />}
      footerText={
        <>
          Уже есть аккаунт? <Link to={ROUTES.LOGIN}>Войти</Link>
        </>
      }
    />
  );
}

export const Component = RegisterPage;
