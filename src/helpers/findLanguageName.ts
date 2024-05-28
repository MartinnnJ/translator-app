import Language from "@models/language";

export default function findLanguageName(code: string, arr: Language[]) {
  const langObj = arr.find(obj => {
    return obj.langCode === code;
  });

  return langObj?.langName;
}