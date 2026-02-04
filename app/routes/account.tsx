import type { Route } from "./+types/account";
import { Account } from "../pages/account";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Account" }];
}

export default function Page() {
  return <Account />;
}