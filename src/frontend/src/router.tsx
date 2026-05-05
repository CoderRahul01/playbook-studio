import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/Home"));
const PlaybookViewPage = lazy(() => import("@/pages/PlaybookView"));
const LibraryPage = lazy(() => import("@/pages/Library"));

const PageLoader = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-4">
    <Skeleton className="h-8 w-48" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-64 w-full rounded-xl" />
  </div>
);

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const playbookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/playbook/$id",
  component: PlaybookViewPage,
});

const libraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/library",
  component: LibraryPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  playbookRoute,
  libraryRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
