import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import Section from './Section.jsx';
import { QUIZ } from '../data/content.js';

export default function Quiz() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = QUIZ[i];

  const choose = (idx) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (i + 1 >= QUIZ.length) setDone(true);
    else { setI(i + 1); setPicked(null); }
  };
  const restart = () => { setI(0); setPicked(null); setScore(0); setDone(false); };

  return (
    <Section id="quiz" eyebrow="Section 8" title="Test Your Understanding" lead="Answer a few questions to check what you learned.">
      <div className="glass quiz">
        {done ? (
          <div style={{ textAlign: 'center' }} aria-live="polite">
            <div className="score">{score} / {QUIZ.length}</div>
            <p>{score === QUIZ.length ? 'Excellent! You are ready for your seminar.' : score >= QUIZ.length * 0.6 ? 'Good work! Review the topics you missed and try again.' : 'Keep going! Revisit the sections above and try again.'}</p>
            <button className="btn primary" onClick={restart}><RotateCcw size={16} /> Restart Quiz</button>
          </div>
        ) : (
          <>
            <div className="q-progress"><span>Question {i + 1} of {QUIZ.length}</span><span>Score: {score}</span></div>
            <div className="progress" role="progressbar" aria-valuenow={i + 1} aria-valuemin={1} aria-valuemax={QUIZ.length} aria-label="Quiz progress"><span style={{ width: `${((i + (picked !== null ? 1 : 0)) / QUIZ.length) * 100}%` }} /></div>
            <h3 style={{ marginTop: 16 }}>{q.q}</h3>
            {q.options.map((o, idx) => {
              const cls = picked === null ? '' : idx === q.answer ? 'right' : idx === picked ? 'wrong' : '';
              return <button key={o} className={`opt ${cls}`} disabled={picked !== null} onClick={() => choose(idx)}>{String.fromCharCode(65 + idx)}. {o}</button>;
            })}
            {picked !== null && (
              <div className="feedback" aria-live="polite" style={{ borderColor: picked === q.answer ? 'var(--green)' : 'var(--red)' }}>
                <b>{picked === q.answer ? 'Correct!' : 'Not quite.'}</b> {picked === q.answer ? q.why : `${q.wrong} ${q.why}`}
              </div>
            )}
            <div style={{ marginTop: 14 }}>
              <button className="btn primary" disabled={picked === null} onClick={next}>{i + 1 >= QUIZ.length ? 'See Final Score' : 'Next Question'}</button>
            </div>
          </>
        )}
      </div>
    </Section>
  );
}
