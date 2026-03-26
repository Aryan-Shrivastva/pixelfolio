import { useState, useEffect } from 'react';
import './index.css';

// Starry Background Component
const StarField = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      let starArr = [];
      for (let i = 0; i < 150; i++) {
        starArr.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1, // 1 to 3px
          duration: Math.random() * 3 + 2,
        });
      }
      setStars(starArr);
    };
    generateStars();
  }, []);

  return (
    <div className="star-field">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}vw`,
            top: `${star.y}vh`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
};

// Main App Component
function App() {
  const [activeSection, setActiveSection] = useState('HOME');

  const navLinks = ['HOME', 'ABOUT', 'EXPERIENCE', 'CONTACT'];

  const scrollToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id.toLowerCase()).scrollIntoView();
  };

  return (
    <div className="min-h-screen text-text uppercase relative">
      <StarField />
      
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full h-[80px] bg-[#05050A] border-b-4 border-primary shadow-hard z-50 flex items-center justify-between px-8">
        <div className="text-xl tracking-tighter">BINARY_ARCHIVE_v1.0</div>
        <div className="flex gap-8">
          {navLinks.map(link => (
            <button
              key={link}
              onClick={() => scrollToSection(link)}
              className={`text-sm ${activeSection === link ? 'text-primary' : 'hover:text-primary'} flex items-center gap-2 outline-none`}
            >
              <span className={`w-3 opacity-${activeSection === link ? '100' : '0'} transition-none`}>{'>'}</span>
              {link}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-[100px] px-8 max-w-7xl mx-auto flex flex-col gap-32 pb-32">
        
        {/* 1. Home (Terminal Hero) */}
        <section id="home" className="min-h-screen flex flex-col justify-center gap-12 pt-16">
          <div className="text-center flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-[60px] leading-tight text-white mb-4">
              ARYAN SHRIVASTVA
            </h1>
            
            {/* Terminal Subtitle */}
            <div className="inline-block mx-auto bg-surface border-4 border-muted p-6 text-primary max-w-3xl">
              <p className="text-base md:text-lg leading-loose">
                 {'> '}I'M A GAME DEVELOPER CONSTANTLY LEVELLING UP MY CODING SKILLS<span className="animate-pulse">█</span>
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button onClick={() => scrollToSection('EXPERIENCE')} className="bg-background text-primary border-4 border-primary px-8 py-4 text-xl shadow-hard hover:translate-y-1 hover:translate-x-1 hover:shadow-none bg-[#05050A]">
              {'>'} ENTER ARCADE
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {['EXPERIENCE', 'TECH_STACK', 'NETWORK'].map(feature => (
              <div key={feature} className="bg-surface border-4 border-muted p-8 text-center flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-primary mb-4" /> {/* Placeholder for Pixel Icon */}
                <h3 className="text-lg text-primary">{feature}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* 2. About (Character Stats) */}
        <section id="about" className="scroll-mt-[100px]">
          <h2 className="text-3xl border-b-4 border-primary inline-block pb-2 mb-12">DATA_LOG: PROFILE</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
            {/* Left Column */}
            <div className="md:col-span-1 flex flex-col items-center gap-6">
              <div className="w-[256px] h-[256px] border-4 border-white bg-surface relative flex justify-center items-center">
                {/* Placeholder Avatar */}
                <div className="text-muted text-sm">[AVATAR_IMAGE_FEED]</div>
                {/* LVL Badge */}
                <div className="absolute -bottom-4 -right-4 bg-primary text-[#05050A] border-4 border-white px-3 py-1 text-sm font-bold shadow-hard-grey">
                  LVL 99
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="md:col-span-2 flex flex-col gap-12">
              <div className="bg-surface border-4 border-muted p-8">
                <p className="leading-loose text-sm normal-case text-gray-300">
                  Initializing user profile...
                  <br/><br/>
                  Ever since I discovered the terminal, my life has been dedicated to crafting interactive worlds. I build digital experiences and games with pixel-perfect precision.
                  <br/><br/>
                  Whether I'm writing system architecture or rendering shaders, I treat every project like a boss battle. High performance, zero latency, maximum impact.
                </p>
              </div>

              <div>
                <h3 className="text-xl text-primary mb-6">{'>'} CORE_COMPETENCIES</h3>
                <div className="flex flex-col gap-6">
                  {[
                    { skill: 'JAVASCRIPT', level: 9 },
                    { skill: 'REACT', level: 8 },
                    { skill: 'UNITY / C#', level: 9 },
                    { skill: 'SYSTEM_DESIGN', level: 7 }
                  ].map(stat => (
                    <div key={stat.skill} className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="w-48 text-sm">{stat.skill}</div>
                      <div className="flex gap-1">
                        {[...Array(10)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-4 h-6 ${i < stat.level ? 'bg-primary' : 'bg-muted'}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Experience (Quest Log) */}
        <section id="experience" className="scroll-mt-[100px]">
          <h2 className="text-3xl border-b-4 border-primary inline-block pb-2 mb-12">QUEST_LOG</h2>
          
          <div className="relative pl-8 md:pl-16">
            {/* Timeline Line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-muted"></div>

            <div className="flex flex-col gap-12">
              {[
                { title: 'LEAD DEVELOPER', company: 'PIXEL LABS', lvl: 42, tech: ['REACT', 'NODE.JS', 'WEBGL'] },
                { title: 'GAME ENGINE DEV', company: 'RETRO STUDIOS', lvl: 35, tech: ['C#', 'UNITY'] },
                { title: 'JUNIOR PROGRAMMER', company: 'STARTUP INC', lvl: 15, tech: ['JS', 'HTML5'] }
              ].map((job, idx) => (
                <div key={idx} className="relative bg-surface border-4 border-primary p-6 md:p-8 shadow-hard">
                  {/* Timeline node */}
                  <div className="absolute -left-10 md:-left-[4.5rem] top-8 w-4 h-4 bg-primary"></div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl text-white mb-2">{job.title}</h3>
                      <div className="text-muted text-sm">{job.company}</div>
                    </div>
                    <div className="bg-primary text-[#05050A] px-2 py-1 text-xs">
                      LVL {job.lvl}
                    </div>
                  </div>
                  
                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {job.tech.map(t => (
                      <span key={t} className="bg-accent text-white px-2 py-1 text-xs">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 flex flex-col md:flex-row gap-8 items-center border-4 border-muted p-8 bg-surface">
              <div className="flex-1">
                <h3 className="text-primary mb-2">SKILL_TREE_PROGRESS</h3>
                <p className="text-sm text-muted">Current track: Full Stack Master</p>
              </div>
              <div className="bg-accent text-white border-2 border-white px-4 py-2 rotate-2">
                ACHIEVEMENT UNLOCKED: QUEST_MASTER
              </div>
            </div>
          </div>
        </section>

        {/* 4. Contact (Transmission Terminal) */}
        <section id="contact" className="scroll-mt-[100px] flex justify-center">
          <div className="w-full max-w-2xl bg-surface border-4 border-muted">
            {/* Terminal Top Bar */}
            <div className="bg-white text-background flex justify-between items-center px-4 py-2 border-b-4 border-muted">
              <span className="text-sm">TRANSMISSION_PROTOCOL.exe</span>
              <span className="text-sm tracking-widest">_ [] X</span>
            </div>

            {/* Terminal Body */}
            <div className="p-8 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-primary">USER_IDENTITY_STRING</label>
                <input 
                  type="text" 
                  className="bg-transparent border-b-2 border-muted focus:border-primary outline-none text-white py-2 text-sm transition-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-primary">CONTACT_RECEPTOR_NODE</label>
                <input 
                  type="email" 
                  className="bg-transparent border-b-2 border-muted focus:border-primary outline-none text-white py-2 text-sm transition-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-primary">TRANSMISSION_PAYLOAD</label>
                <textarea 
                  rows="4"
                  className="bg-transparent border-b-2 border-muted focus:border-primary outline-none text-white py-2 text-sm resize-none transition-none"
                />
              </div>

              <button className="mt-4 bg-background border-4 border-primary text-primary py-4 hover:bg-primary hover:text-background transition-none w-full text-lg">
                [ TRANSMIT ]
              </button>

              <div className="text-center text-xs mt-4">
                <span className="text-muted">STATUS: </span>
                <span className="animate-pulse text-white">AWAITING_INPUT_</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t-4 border-muted py-8 px-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#05050A]">
        <div className="text-sm text-muted">
          (C) {new Date().getFullYear()} ARYAN SHRIVASTVA
        </div>
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-primary transition-none">GITHUB</a>
          <a href="#" className="hover:text-primary transition-none">LINKEDIN</a>
          <a href="#" className="hover:text-primary transition-none">TERMINAL</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
