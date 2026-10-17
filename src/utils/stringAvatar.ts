import { stringToColor } from "@/utils/stringToColor";


export function stringAvatar(name: string) {
  const nameParts = name.split(" ");
  let initials = "";

  if (nameParts.length === 1) {
    initials = `${nameParts[0][0]}${nameParts[0][1] || ""}`.toUpperCase();
  } else {
    initials = `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}
