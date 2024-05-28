import { useEffect, useState } from 'react';
import LanguageSelect from '@components/LanguageSelect/LanguageSelect';
import InfoPanel from '@components/InfoPanel/InfoPanel';
import Input from '@components/Input/Input';
import Output from '@components/Output/Output';
import getSupportedLanguages from '@helpers/languages';
import translate from '@helpers/translate';
import translateToRunes from '@helpers/translateRunes';
import Language from '@models/language';
import { StatusNumber } from '@helpers/apiStatusName';
import { maxInputLength } from '@helpers/constances';
import TargetLanguage from '@models/target-language';
import { StyledContainer, StyledWrapper } from './App.styled';

export default function App() {
  const [supportedLanguages, setSupportedLanguages] = useState<Language[]>([]);
  const [targetLanguage, setTargetLanguage] = useState<TargetLanguage>({ name: 'Runes', code: 'nord' });
  const [sourceData, setSourceData] = useState({ text: '', langCode: '' });
  const [translatedText, setTranslatedText] = useState('');
  const [apiStatus, setApiStatus] = useState<StatusNumber>(-1);

  useEffect(() => {
    (async () => {
      if (sourceData.text.length > maxInputLength && targetLanguage?.code) {
        setApiStatus(3);
        return;
      }
      if (sourceData.text.length > 0 && targetLanguage?.code === 'nord') {
        const result = translateToRunes(sourceData.text);
        setApiStatus(-1);
        setSourceData(prevState => ({ ...prevState, langCode: '' }));
        setTranslatedText(result);
        return;
      }
      if (sourceData.text.length > 0 && targetLanguage?.code) {
        console.log('translation sent...');
        setApiStatus(2);
        const response = await translate(sourceData.text, targetLanguage.code);
        console.log(response);
        if (response!.status === 200) {
          const translationData = response!.data[0];
          const detectedLanguageCode = translationData.detectedLanguage.language;
          const translation = translationData.translations[0].text;
          setSourceData(prevState => ({ ...prevState, langCode: detectedLanguageCode }));
          setTranslatedText(translation);
          setApiStatus(0);
        } else {
          setTranslatedText('');
          setApiStatus(1);
        }
      }
    })();
  }, [
    sourceData.text,
    targetLanguage
  ]);

  useEffect(() => {
    (async () => {
      const response = await getSupportedLanguages();
      if (response?.status === 200) {
        const langData = response?.data.translation;
        const temp = [];
        for (const key in langData) {
          const lang = new Language(langData[key].name, key);
          temp.push(lang);
        }
        temp.unshift(new Language('Runes', 'nord'));
        setSupportedLanguages(temp);
      } else {
        setApiStatus(0);
      }
    })();
  }, []);

  function onLanguageSelect(langName: string, langCode: string) {
    setTargetLanguage(
      new TargetLanguage(langName, langCode)
    );
  }

  function onInputTextEmit(text: string) {
    if (sourceData.text.length === 0) {
      setSourceData({ text: '', langCode: '' });
      setTranslatedText('');
      setApiStatus(-1);
    }
    setSourceData(prevState => ({ ...prevState, text: text }));
  }

  return (
    <StyledWrapper>
      <StyledContainer>
        <LanguageSelect
          languages={supportedLanguages}
          label="From"
          selected={targetLanguage.code === 'nord' ? { name: 'English', code: 'en' } : undefined}
          onLanguageSelect={onLanguageSelect}
        />
        <LanguageSelect
          languages={supportedLanguages}
          label="To"
          selected={targetLanguage}
          onLanguageSelect={onLanguageSelect}
        />
      </StyledContainer>
      <InfoPanel
        languageData={supportedLanguages}
        detectedLanguageCode={sourceData.langCode}
        statusNumber={apiStatus}
      />
      <StyledContainer>
        <Input onInputTextEmit={onInputTextEmit} />
        <Output text={translatedText} />
      </StyledContainer>
    </StyledWrapper>
  )
}
