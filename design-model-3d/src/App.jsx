import React from 'react';
import Sidebar from './components/Sidebar.jsx';
import Hero from './components/Hero.jsx';
import Introduction from './components/Introduction.jsx';
import { ProcessDimension, AbstractionDimension } from './components/Dimensions.jsx';
import Principles from './components/Principles.jsx';
import Elements from './components/Elements.jsx';
import Demo from './components/Demo.jsx';
import Workflow from './components/Workflow.jsx';
import Sequence from './components/Sequence.jsx';
import Quiz from './components/Quiz.jsx';
import Seminar from './components/Seminar.jsx';
import { useApp } from './context/AppContext.jsx';

export default function App() {
  const { seminar } = useApp();
  return (
    <>
      <a href="#introduction" className="sr-only">Skip to content</a>
      <div aria-hidden={seminar} inert={seminar ? '' : undefined}>
        <Sidebar />
        <main>
          <Hero />
          <Introduction />
          <ProcessDimension />
          <AbstractionDimension />
          <Principles />
          <Elements />
          <Demo />
          <Workflow />
          <Sequence />
          <Quiz />
          <footer>Software Engineering Design Model · Interactive 3D learning for MCA students · Example: Restaurant Food Ordering System</footer>
        </main>
      </div>
      <Seminar />
    </>
  );
}
