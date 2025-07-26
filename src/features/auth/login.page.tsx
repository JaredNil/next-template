import { Link } from "react-router-dom";

import { AuthLayout } from "./ui/authLayout";
import { LoginForm } from "./ui/loginForm";
import { ROUTES } from "@/shared/routes/routes";

function LoginPage() {
  return (
    <AuthLayout
      title="Вход в систему"
      description="Введите ваш email и пароль для входа в систему"
      form={<LoginForm />}
      footerText={
        <>
          Нет аккаунта? <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>
        </>
      }
    />
  );
}

export const Component = LoginPage;
