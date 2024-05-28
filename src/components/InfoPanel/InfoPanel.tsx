import React from "react";
import Language from "@models/language";
import findLanguageName from "@helpers/findLanguageName";
import apiStatusName, { StatusNumber } from "@helpers/apiStatusName";
import { StyledContainer } from "./InfoPanel.styled";

type T = {
  languageData: Language[],
  detectedLanguageCode: string,
  statusNumber: StatusNumber,
};

const InfoPanel: React.FC<T> = ({ languageData, detectedLanguageCode, statusNumber }) => {
  const defaultText = "None";
  const detectedLangOutputText = findLanguageName(detectedLanguageCode, languageData) || defaultText;
  const statusOutputText = apiStatusName(statusNumber) || defaultText;

  return (
    <StyledContainer $status={statusNumber}>
      <small>
        Detected language:
        <strong>
          {detectedLangOutputText}
        </strong>
      </small>
      <small>
        API status:
        <strong className="api">
          {statusOutputText}
        </strong>
      </small>
    </StyledContainer>
  );
};

export default InfoPanel;