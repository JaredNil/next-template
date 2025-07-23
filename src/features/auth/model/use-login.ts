import { useNavigate } from "react-router-dom";

import { rqClient } from "@/shared/openapi/instance";
import type { ApiSchemas } from "@/shared/openapi/schema";
import { ROUTES } from "@/shared/routes/routes";

export function useLogin() {
  const navigate = useNavigate();

  const loginMutation = rqClient.useMutation("post", "/auth/login", {
    onSuccess() {
      navigate(ROUTES.HOME);
    },
  });

  const login = (data: ApiSchemas["LoginRequest"]) => {
    loginMutation.mutate({ body: data });
  };

  const errorMessage = loginMutation.isError
    ? loginMutation.error.message
    : undefined;

  return {
    login,
    isPending: loginMutation.isPending,
    errorMessage,
  };
}
