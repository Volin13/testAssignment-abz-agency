import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import WorkersSection from './components/WorkersSection/WorkersSection';
import Title from './components/Title/Title';
import WorkerDataForm from './components/WorkerDataForm/WorkerDataForm';
import { useRef } from 'react';

function App() {
  const usersSectionRef = useRef(null);
  const signUpSectionRef = useRef(null);
  const handleUsersSectionІScroll = () => {
    usersSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const handleSignUpSectionScroll = () => {
    signUpSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div>
      <Header
        handleUsersSectionІScroll={handleUsersSectionІScroll}
        handleSignUpSectionScroll={handleSignUpSectionScroll}
      />
      <Hero handleSignUpSectionScroll={handleSignUpSectionScroll} />
      <Title text="Working with GET request" ref={usersSectionRef} />
      <WorkersSection />
      <Title text="Working with POST request" ref={signUpSectionRef} />
      <WorkerDataForm />
    </div>
  );
}

export default App;
