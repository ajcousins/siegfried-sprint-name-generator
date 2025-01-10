import React, { useState, useEffect } from 'react'
import './App.scss';
import Result from './components/Result';
import { adjectives } from './words/adjectives'
import { nouns } from './words/nouns'

const REGENERATION_INTERVAL_IN_MS = 1000 * 60 * 60 * 24 * 12 // 12 Days

function App() {
  const [adjectivesList, setAdjectivesList] = useState<string[]>([]);
  const [nounsList, setNounsList] = useState<string[]>([]);
  const [sprintName, setSprintName] = useState<string | undefined>(undefined);
  const [shouldGenerate, setShouldGenerate] = useState<boolean>(false);
  const [generateButtonText, setGenerateButtonText] = useState<'Generate' | 'Regenerate'>('Generate');
  const [lastGenerated, setLastGenerated] = useState<string | undefined>(undefined);

  const intervalElapsed = (lastGenerated: string): boolean => (
    (Date.now() - (+lastGenerated)) > REGENERATION_INTERVAL_IN_MS
  )

  useEffect(() => {
    const lastGeneratedCookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("lastSprintNameGeneration="))
      ?.split("=")[1];

    const sprintNameCookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("currentSprintName="))
      ?.split("=")[1];

    setLastGenerated(lastGeneratedCookieValue);
    setAdjectivesList(adjectives);
    setNounsList(nouns);
    setSprintName(sprintNameCookieValue);
    setGenerateButtonText(sprintName ? 'Regenerate' : 'Generate');
    setShouldGenerate(!lastGenerated || !sprintName || intervalElapsed(lastGenerated))
    console.log("Last updated: 10/01/25");
  }, [lastGenerated, sprintName])

  const handleGenerate = () => {
    const selectedAdjIndex = Math.floor(Math.random() * adjectivesList.length);
    const selectedNounIndex = Math.floor(Math.random() * nounsList.length);
    const now = String(Date.now());
    const newSprintName = `${adjectivesList[selectedAdjIndex]} ${nounsList[selectedNounIndex]}`
    const newLastGeneratedCookie = `lastSprintNameGeneration=${now}`;
    const newCurrentSprintNameCookie = `currentSprintName=${newSprintName}`;

    document.cookie = newLastGeneratedCookie;
    document.cookie = newCurrentSprintNameCookie;

    setSprintName(newSprintName);
    setLastGenerated(now);
    setGenerateButtonText('Regenerate');
    setShouldGenerate(false);
  }


  return (
    <div className="App">
      <h3>Siegfried Sprint Name Generator</h3>
      {sprintName && (
        <>
          <>Siegfried's current sprint name is...</>
          <Result text={sprintName}/>
        </>
      )}
      <div>
        {shouldGenerate && (
          <div>
            <button onClick={handleGenerate}>{generateButtonText}</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
