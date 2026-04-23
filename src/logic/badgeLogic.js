import { getBadgeColors } from "@/src/services/database/badgeColorsService";

export const fetchBadgeColors = async () => {
  return await getBadgeColors();
};
