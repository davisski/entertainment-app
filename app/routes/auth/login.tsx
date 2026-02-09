import type { Route } from "./+types/auth/login";
import { Login } from "~/pages/auth/login";


export function meta({}: Route.MetaArgs) {
  return [{ title: "Login" }];
}

export default function Page() {
  return <Login />;
}