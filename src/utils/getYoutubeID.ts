export const getYoutubeID = (url: string) => {
  if (url.includes("www.youtube")) {
    const path = url.split("=");
    return path[path.length - 1];
  }

  if (url.includes("youtu.be")) {
    const part = url.split("?");
    const path = part[0].split("/");
    return path[path.length - 1];
  }
};
