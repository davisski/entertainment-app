import type { Route } from "./+types/show";
import { Show } from "~/pages/media/show";

export function meta({params}: Route.MetaArgs) {
  return [{ title: `Media ${params.mediaId}` }];
}

export default function Page({params}: Route.ComponentProps) {
  return <Show mediaId={params.mediaId} media={params.mediaType || ''} />;
}