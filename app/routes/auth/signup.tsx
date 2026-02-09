import type { Route } from "./+types/signup";
import { Signup } from "~/pages/auth/signup";


export function meta({}: Route.MetaArgs) {
  return [{ title: "Signup" }];
}

export default function Page() {
  return <Signup />;
}