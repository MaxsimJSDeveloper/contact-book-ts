import { LogoIcon } from "@/components/ui/icons/LogoIcon";

export const Logo = () => {
  return (
    <div className="absolute left-[5%] top-[5%] flex h-[40px] w-[90px] items-center">
      <LogoIcon />
      <p className="pl-[3px] text-[10px] uppercase leading-[1.2] text-[#fafafa]">
        contact book
      </p>
    </div>
  );
};
