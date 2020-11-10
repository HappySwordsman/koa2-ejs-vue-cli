import defaultSettings from "@/admin-settings";

const title = defaultSettings.title || "Koa Vue Element Admin";

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
