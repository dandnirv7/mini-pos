import { formattedString } from "./formattedString";

export const formatFileName = (fileName: string): string => {
  const extname = fileName.split(".").pop();

  const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf("."));

  const formattedName = formattedString(nameWithoutExtension);

  const timestamp = Date.now();

  return `${formattedName}-${timestamp}.${extname}`;
};
