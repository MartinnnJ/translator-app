import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { StyledContainer, StyledLabel, StyledLanguage, StyledOptions, StyledSearch, StyledSelect } from "./LanguageSelect.styled";
import Language from "@models/language";
import TargetLanguage from "@models/target-language";

type T = {
  languages: Language[],
  label: string,
  selected: TargetLanguage | undefined,
  onLanguageSelect: (langName: string, langCode: string) => void,
};

const LanguageSelect: React.FC<T> = ({ languages, label, selected, onLanguageSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef(null);

  const clearSearchInputHandler = useCallback((e: KeyboardEvent) => {
    if (
      isOpen &&
      document.activeElement === searchInputRef.current &&
      e.code === 'Escape'
    ) {
      setSearchText('');
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('keydown', clearSearchInputHandler);

    return () => {
      window.removeEventListener('keydown', clearSearchInputHandler);
    }
  }, [clearSearchInputHandler]);

  const selectOutputText = !selected ? 'Autodetect language' : selected.name;
  const isSelectOpenable = label === 'To';
  
  const languagesRendered = languages.filter(lang => {
    const lowerCaseLangName = lang.langName.toLowerCase();
    return lowerCaseLangName.includes(searchText.toLowerCase())
  }).map((lang, index) => {
    return (
      <StyledLanguage
        key={index}
        onClick={() => languageClickHandler(lang.langName, lang.langCode)}
      >
        {lang.langName}
      </StyledLanguage>
    );
  })

  function selectClickHandler() {
    setIsOpen(prevState => !prevState);
    setSearchText('');
  }

  function languageClickHandler(name: string, code: string) {
    onLanguageSelect(name, code);
    setSearchText('');
    setIsOpen(false);
  }

  function searchInputChangeHandler(e: ChangeEvent) {
    const inputEl = e.target as HTMLInputElement;
    setSearchText(inputEl.value);
  }

  return (
    <StyledContainer>
      <StyledLabel>
        {label}:
      </StyledLabel>
      <StyledSelect
        onClick={isSelectOpenable ? selectClickHandler : undefined}
        $isOpenable={isSelectOpenable}
        $open={isOpen}
      >
        {selectOutputText}
        {isSelectOpenable && (
          <IoIosArrowDown className={isOpen ? 'rotate rotate-animate' : 'rotate'} />
        )}
      </StyledSelect>
      <StyledOptions
        $isOpenable={isSelectOpenable}
        $open={isOpen}
      >
        <StyledSearch
          type="text"
          placeholder="Search for a language"
          onChange={searchInputChangeHandler}
          value={searchText}
          ref={searchInputRef}
        />
        {languagesRendered.length > 0 ? (
          languagesRendered
        ) : (
          <small>
            No languages matches search filter
          </small>
        )}
      </StyledOptions>
    </StyledContainer>
  );
};

export default LanguageSelect;