import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "./components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "./components/ui/breadcrumb";
import { Outlet } from "react-router";
import LandingPage from "@/pages/LandingPage";
import { useState } from "react";

type User = {
  _id: number;
  name: string;
  email: string;
};

const demoUser = {
  _id: 1,
  name: "Tasnimul Hasan",
  email: "2408020@student.ruet.ac.bd",
};

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      {user ? (
        <SidebarProvider>
          <div className="flex w-full min-h-screen">
            <AppSidebar />

            <SidebarInset>
              <header className="sticky top-0 bg-white flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                  />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbPage>Home</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <Outlet />
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      ) : (
        <LandingPage onLogin={() => setUser(demoUser)} />
      )}
    </>
  );
}

export default App;
