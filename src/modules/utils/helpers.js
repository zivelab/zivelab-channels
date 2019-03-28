import warning from "warning";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

export function titleize(string) {
  warning(
    typeof string === "string" && string.length > 0,
    "titleize(string) expects a non empty string argument."
  );

  return string
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function pageToTitle(page) {
  if (page.title === false) {
    return null;
  }

  if (page.title) {
    return page.title;
  }

  const name = page.pathname.replace(/.*\//, "");

  if (page.pathname.indexOf("/api/") !== -1) {
    return upperFirst(camelCase(name));
  }

  return titleize(name);
}

export function pageToTitleI18n(page, t) {
  return (
    t(`pages.${page.pathname}`, { ignoreWarning: true }) || pageToTitle(page)
  );
}

export function getCookie(name) {
  const regex = new RegExp(`(?:(?:^|.*;*)${name}*=*([^;]*).*$)|^.*$`);
  return document.cookie.replace(regex, "$1");
}
