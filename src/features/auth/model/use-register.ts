import { useNavigate } from "react-router-dom";

import { rqClient } from "@/shared/openapi/instance";
import type { ApiSchemas } from "@/shared/openapi/schema";
import { ROUTES } from "@/shared/routes/routes";

export function useRegister() {
  const navigate = useNavigate();

  const registerMutation = rqClient.useMutation("post", "/auth/register", {
    onSuccess() {
      navigate(ROUTES.HOME);
    },
  });

  const register = (data: ApiSchemas["RegisterRequest"]) => {
    registerMutation.mutate({ body: data });
  };

  const errorMessage = registerMutation.isError
    ? registerMutation.error.message
    : undefined;

  return {
    register,
    isPending: registerMutation.isPending,
    errorMessage,
  };
}
