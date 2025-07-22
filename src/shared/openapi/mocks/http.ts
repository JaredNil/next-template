import { createOpenApiHttp } from "openapi-msw";

import type { ApiPaths } from "../schema";
import { envResolver } from "@/shared/env/env.resolver";


export const http = createOpenApiHttp<ApiPaths>({
  baseUrl: envResolver.VITE_API_BASE_URL,
});
