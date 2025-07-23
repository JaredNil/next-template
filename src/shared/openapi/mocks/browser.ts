import { setupWorker } from "msw/browser";

import { authHandlers } from "./handlers/auth";
import { boardHandlers } from "./handlers/boards";


export const worker = setupWorker(...boardHandlers, ...authHandlers);
