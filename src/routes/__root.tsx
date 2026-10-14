import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import CustomCursor from "@/components/custom-cursor";
import Grain from "@/components/grain";
import { SmoothScrollProvider } from "@/context/smooth-scroll-context";

export const Route = createRootRoute({
  component: () => (
    <SmoothScrollProvider>
      <Grain />
      <CustomCursor />
      <Outlet />
      <TanStackRouterDevtools />
    </SmoothScrollProvider>
  ),
});
