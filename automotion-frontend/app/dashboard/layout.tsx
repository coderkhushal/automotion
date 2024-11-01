"use client"
import { SidebarLink } from "@/components/web/sidebar/SidebarLink"

import { motion } from "framer-motion"
import { Sidebar, SidebarBody } from "@/components/web/sidebar/sidebar"
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconPlus
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image"
import { User } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { usePathname } from "next/navigation";



const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuthContext()
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Create",
      href: "/dashboard/create",
      icon: (
        <IconPlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },


  ];
  const [open, setOpen] = useState(false);
  const pathname = usePathname()
  return (


    <div className="flex flex-col lg:flex-row min-h-full lg:h-full github.com/coderkhushal/go-grpc-graphql-microservicesw-full  ">

      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} className={pathname==link.href  ? "font-bold bg-lime-100 ": ""}/>
              ))}
            </div>
          </div>
          <div>

            <SidebarLink
              link={{
                label: user?.name ? user.name : "demo",
                href: "/dashboard",
                icon: (
                  <Image
                  src="/display.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),

              }}
            />
            <div onClick={logout}>

              <SidebarLink link={{
                label: "Logout",
                href: "#",
                icon: (
                  <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                ),
              }} />
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>

  )
}
 const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      {/* <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" /> */}
      <Image src="/logo.png" height={5} width={6} alt="Logo" className="h-5 w-6" unoptimized />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        AutoMotion
      </motion.span>
    </Link>
  );
};
 const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
export default MainLayout