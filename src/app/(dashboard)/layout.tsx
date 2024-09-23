import SideNav from "@/components/Dashboard/SideNav";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex  flex-col md:flex-row md:overflow-hidden">
      <div className="">
        <SideNav />
      </div>
      {children}
    </div>
  );
}
