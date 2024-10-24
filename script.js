document.addEventListener('DOMContentLoaded', () => {
  const inputTextArea = document.getElementById('inputText');
  const focusKeywordInput = document.getElementById('focusKeyword');
  const statsOutput = document.getElementById('statsOutput');
  const metaDescriptionOutput = document.getElementById('metaDescription');
  const headlineOutput = document.getElementById('headlineOutput');

  const updateStats = () => {
    const inputText = inputTextArea.value;
    const words = inputText.trim().split(/\s+/).filter(word => word.length > 0);
    const sentences = inputText.split(/[.!?]+/).filter(sentence => sentence.length > 0);
    const paragraphs = inputText.split('\n\n').filter(para => para.length > 0);
    
    const stats = {
      characters: inputText.length,
      words: words.length,
      sentences: sentences.length,
      paragraphs: paragraphs.length,
      readingTime: Math.ceil(words.length / 225),
    };

    // Update stats output
    statsOutput.innerHTML = `
      <div>Characters: ${stats.characters}</div>
      <div>Words: ${stats.words}</div>
      <div>Sentences: ${stats.sentences}</div>
      <div>Paragraphs: ${stats.paragraphs}</div>
      <div>Reading Time: ${stats.readingTime} min</div>
    `;

    // Generate meta description
    const metaDescription = words.slice(0, 30).join(' ') + '...';
    metaDescriptionOutput.textContent = metaDescription.slice(0, 155);

    // Generate headline variations
    const headlineVariations = generateHeadlines(words);
    headlineOutput.innerHTML = headlineVariations.map(h => `<div>${h}</div>`).join('');
  };

  const generateHeadlines = (words) => {
    if (words.length === 0) return [];
    const baseText = words.join(' ').split('\n')[0];
    return [
      `How to ${baseText}`,
      `${baseText}: A Complete Guide`,
      `${baseText} - Everything You Need to Know`,
      `The Ultimate Guide to ${baseText}`,
      `Why ${baseText} Matters`,
      `${baseText}: Tips & Tricks`,
    ];
  };

  inputTextArea.addEventListener('input', updateStats);
  focusKeywordInput.addEventListener('input', updateStats);
});
