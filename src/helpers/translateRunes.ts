const dictionary = {
  a: 'ᚨ', // ᚬ ᚭ
  b: 'ᛒ',
  c: 'ᚴ', // ᚲ ᚳ
  d: 'ᛞ',
  e: 'ᛖ',
  f: 'ᚠ',
  g: 'ᚷ',
  h: 'ᚻ', // ᚺ
  i: 'ᛁ',
  j: 'ᛃ',
  k: 'ᚴ',
  l: 'ᛚ',
  m: 'ᛗ',
  n: 'ᚾ',
  o: 'ᛟ', // ᚩ
  p: 'ᛈ',
  q: 'ᛩ',
  r: 'ᚱ',
  s: 'ᛋ', // ᛊ
  t: 'ᛏ',
  u: 'ᚢ',
  v: 'ᚹ',
  w: 'ᚹ',
  x: 'ᛪ',
  y: 'ᛇ', // ᚤ
  z: 'ᛉ',
  ' ': '᛫',
  //th: 'ᚦ'
};

function findThursChar(runeText: string) {
  if (runeText.includes('ᛏᚻ')) {
    return runeText.replace(/ᛏᚻ/g, 'ᚦ');
  }
  if (runeText.includes('ᛏᚺ')) {
    return runeText.replace(/ᛏᚺ/g, 'ᚦ');
  }
  return runeText;
}

export default function translateToRunes(englishText: string) {
  const temp: string[] = [];
  const supportedEnglishLetters = Object.keys(dictionary);

  for (const char of englishText.toLowerCase().split('')) {
    if (supportedEnglishLetters.includes(char)) {
      temp.push(dictionary[char as keyof typeof dictionary]);
    } else {
      temp.push(char);
    }
  }
  
  return findThursChar(temp.join(''));
}
