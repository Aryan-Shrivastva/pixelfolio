import { useState, useEffect, useRef } from 'react';
import './index.css';

// Canvas Starry Background Component matching reference images
const StarField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const stars = [];
    const colors = ['#ffffff', '#fffbd5', '#e0f0ff', '#aaaaa2'];

    // Generate specific shape stars matching images
    for (let i = 0; i < 200; i++) {
      const type = Math.random();
      stars.push({
        x: Math.random() * 100, // percentage
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: type < 0.7 ? 'dot' : type < 0.9 ? 'big-dot' : 'cross',
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.05 + 0.01,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
      });
    }

    let animationFrameId;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#05050A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(s => {
        // Update twinkle
        s.opacity += s.twinkleSpeed * s.twinkleDir;
        if (s.opacity > 1) { s.opacity = 1; s.twinkleDir = -1; }
        if (s.opacity < 0.2) { s.opacity = 0.2; s.twinkleDir = 1; }

        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.opacity;

        const px = (s.x / 100) * canvas.width;
        const py = (s.y / 100) * canvas.height;

        if (s.type === 'dot') {
          // 2x2 dot
          ctx.fillRect(px, py, 2, 2);
        } else if (s.type === 'big-dot') {
          // 4x4 dot
          ctx.fillRect(px, py, 4, 4);
        } else if (s.type === 'cross') {
          // Custom cross shape (+)
          ctx.fillRect(px + 2, py, 2, 6); // vertical
          ctx.fillRect(px, py + 2, 6, 2); // horizontal
        }
      });
      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="star-field-container" />;
};

const TypewriterHeading = ({ texts, delay = 150, pause = 1500 }) => {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timeout;
    const i = loopNum % texts.length;
    const text = texts[i];
    
    if (isDeleting) {
      if (currentText === '') {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }, pause / 3);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, delay / 2);
      }
    } else {
      if (currentText === text) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pause);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(text.slice(0, currentText.length + 1));
        }, delay);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, texts, loopNum, delay, pause]);

  return <span>{currentText}<span className="animate-pulse opacity-80">_</span></span>;
};

function App() {
  const [activeSection, setActiveSection] = useState('HOME');

  const navLinks = ['HOME', 'ABOUT', 'EXPERIENCE', 'PROJECTS', 'BLOG', 'CONTACT'];

  const scrollToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id.toLowerCase()).scrollIntoView();
  };

  return (
    <div className="min-h-screen text-text uppercase relative">
      <StarField />
      
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full h-[80px] bg-[#05050A] border-b-4 border-primary shadow-hard z-50 flex items-center justify-between px-8">
        <div className="text-xl tracking-tighter font-arcade">BINARY_ARCHIVE_v1.0</div>
        <div className="hidden md:flex gap-6">
          {navLinks.map(link => (
            <button
              key={link}
              onClick={() => scrollToSection(link)}
              className={`text-sm font-arcade ${activeSection === link ? 'text-primary' : 'hover:text-primary'} flex items-center gap-1 outline-none`}
            >
              <span className={`w-3 opacity-${activeSection === link ? '100' : '0'}`}>{'>'}</span>
              {link}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-[120px] px-8 max-w-7xl mx-auto flex flex-col gap-32 pb-32">
        
        {/* 1. Home (Terminal Hero) */}
        <section id="home" className="min-h-[80vh] flex flex-col justify-center gap-12 pt-16">
          <div className="text-center flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-[60px] leading-tight text-white mb-4 font-arcade min-h-[72px]">
              <TypewriterHeading 
                texts={[
                  "Aryan Shrivastva",
                  "I Software Developer",
                  "I Leetcode",
                  "I CodeChef",
                  "I like Formula 1",
                  "Daniel Riicciardoo"
                ]} 
                delay={100} 
                pause={1500} 
              />
            </h1>
            
            <div className="inline-block mx-auto bg-surface border-4 border-muted p-6 text-primary max-w-3xl">
              <p className="text-lg md:text-xl leading-loose font-vt323 tracking-wide">
                 {'> '}I SOFTWARE DEVELOPER, I code!!!<span className="animate-pulse">█</span>
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button onClick={() => scrollToSection('PROJECTS')} className="font-arcade bg-background text-primary border-4 border-primary px-8 py-4 text-sm shadow-hard hover:translate-y-1 hover:translate-x-1 hover:shadow-none bg-[#05050A]">
              {'>'} ENTER ARCADE
            </button>
          </div>
        </section>

        {/* 2. Projects Gallery (New) */}
        <section id="projects" className="scroll-mt-[100px] flex flex-col items-center">
          <h2 className="text-3xl font-arcade text-primary mb-16">PROJECTS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
            {/* Project Card 1 */}
            <div className="bg-[#0A0A0E] border border-gray-600 p-4 flex flex-col">
              <div className="w-full aspect-square bg-black border-2 border-black overflow-hidden mb-4">
                 <img src="/pixel_quest_1774637992816.png" className="w-full h-full object-cover" style={{ imageRendering: 'pixelated' }} alt="Pixel Quest" />
              </div>
              <h3 className="text-xl text-white font-vt323 tracking-widest mb-2 font-bold">PIXEL QUEST</h3>
              <p className="text-gray-400 font-vt323 text-lg normal-case leading-snug mb-6 flex-1">
                A turn-based RPG made in react. explore dungeons and fight with monsters!
              </p>
              <button className="w-full bg-black text-primary border border-primary py-2 font-vt323 text-xl hover:bg-[#1a1a00]">
                + VIEW PROJECT
              </button>
            </div>

            {/* Project Card 2 */}
            <div className="bg-[#0A0A0E] border border-gray-600 p-4 flex flex-col">
              <div className="w-full aspect-square bg-black border-2 border-black overflow-hidden mb-4">
                 <img src="/retro_website_1774638020838.png" className="w-full h-full object-cover" style={{ imageRendering: 'pixelated' }} alt="Retro Website" />
              </div>
              <h3 className="text-xl text-white font-vt323 tracking-widest mb-2 font-bold">RETRO WEBSITE</h3>
              <p className="text-gray-400 font-vt323 text-lg normal-case leading-snug mb-6 flex-1">
                A 90s-style personal website made with react. designed like an old computer!
              </p>
              <button className="w-full bg-black text-primary border border-primary py-2 font-vt323 text-xl hover:bg-[#1a1a00]">
                + VIEW PROJECT
              </button>
            </div>

            {/* Project Card 3 */}
            <div className="bg-[#0A0A0E] border border-gray-600 p-4 flex flex-col">
              <div className="w-full aspect-square bg-black border-2 border-black overflow-hidden mb-4">
                 <img src="/space_invaders_1774638044434.png" className="w-full h-full object-cover" style={{ imageRendering: 'pixelated' }} alt="Space Invaders JS" />
              </div>
              <h3 className="text-xl text-white font-vt323 tracking-widest mb-2 font-bold">SPACE INVADERS JS</h3>
              <p className="text-gray-400 font-vt323 text-lg normal-case leading-snug mb-6 flex-1">
                A classic Space Invaders game made with vanilla Javascript and canvas!
              </p>
              <button className="w-full bg-black text-primary border border-primary py-2 font-vt323 text-xl hover:bg-[#1a1a00]">
                + VIEW PROJECT
              </button>
            </div>
          </div>
          
          <button onClick={() => scrollToSection('HOME')} className="mt-12 border border-gray-400 text-white font-vt323 text-xl px-6 py-2 hover:bg-[#111]">
            BACK TO TOP
          </button>
        </section>

        {/* 3. Aryans Blog (New) */}
        <section id="blog" className="scroll-mt-[100px] flex flex-col items-center">
          <h2 className="text-3xl font-arcade text-primary mb-12">ARYANS BLOG</h2>
          
          <div className="w-full max-w-4xl border-t border-b border-gray-600 bg-background/80 relative pb-4">
            {/* Top corner accents */}
            <div className="absolute top-[-10px] left-4 border-b-[10px] border-b-gray-800 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent w-0 h-0"></div>
            <div className="absolute top-[-10px] right-4 border-b-[10px] border-b-gray-800 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent w-0 h-0"></div>
            
            <div className="flex flex-col">
              {/* Blog Post 1 */}
              <div className="p-8 border-b border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-white font-vt323 text-3xl font-bold tracking-widest mb-1">A BEGINNER'S GUIDE</h3>
                  <h3 className="text-primary font-vt323 text-3xl font-bold tracking-widest mb-4">TO PIXEL ART IN GAME DEVELOPMENT</h3>
                  <p className="text-gray-400 font-vt323 text-xl normal-case">
                    How to create 8-bit style pixel art for your own games or projects!
                  </p>
                </div>
                <div className="flex flex-col items-end gap-6 shrink-0">
                  <span className="text-gray-500 font-vt323 text-xl tracking-widest">APR 2024</span>
                  <button className="border border-primary text-primary px-6 py-2 font-vt323 text-xl hover:bg-[#1a1a00] hover:text-primary">
                    + READ MORE
                  </button>
                </div>
              </div>

              {/* Blog Post 2 */}
              <div className="p-8 border-b border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex-1 relative">
                  <h3 className="text-white font-vt323 text-3xl font-bold tracking-widest mb-1">LEVEL UP YOUR JAVASCRIPT</h3>
                  <h3 className="text-white font-vt323 text-3xl font-bold tracking-widest mb-4">SKILLS WITH THESE PROJECTS</h3>
                  <p className="text-gray-400 font-vt323 text-xl normal-case">
                    Projects to challenge your JS skills and boost your coding level!
                  </p>
                </div>
                <div className="flex flex-col items-end gap-6 shrink-0">
                  <span className="text-gray-500 font-vt323 text-xl tracking-widest">MAR 2024</span>
                  <button className="border border-primary text-primary px-6 py-2 font-vt323 text-xl hover:bg-[#1a1a00] hover:text-primary">
                    + READ MORE
                  </button>
                </div>
              </div>

              {/* Blog Post 3 */}
              <div className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative">
                <div className="absolute left-[-20px] top-12 text-primary font-bold">""</div>
                <div className="flex-1">
                  <h3 className="text-white font-vt323 text-3xl font-bold tracking-widest mb-4">GAME DEV TOOLS I CAN'T LIVE WITHOUT</h3>
                  <p className="text-gray-400 font-vt323 text-xl normal-case">
                    My must-have tools for indie game development!
                  </p>
                </div>
                <div className="flex flex-col items-end gap-6 shrink-0">
                  <span className="text-gray-500 font-vt323 text-xl tracking-widest">FEB 2024</span>
                  <button className="border border-primary text-primary px-6 py-2 font-vt323 text-xl hover:bg-[#1a1a00] hover:text-primary">
                    + READ MORE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Experience (Quest Log) */}
        <section id="experience" className="scroll-mt-[100px]">
          <h2 className="text-3xl font-arcade text-white border-b-4 border-primary inline-block pb-2 mb-12">QUEST_LOG</h2>
          
          <div className="relative pl-8 md:pl-16">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-muted"></div>
            <div className="flex flex-col gap-12">
              {[
                { title: 'LEAD DEVELOPER', company: 'PIXEL LABS', lvl: 42, tech: ['REACT', 'NODE.JS', 'WEBGL'] },
                { title: 'GAME ENGINE DEV', company: 'RETRO STUDIOS', lvl: 35, tech: ['C#', 'UNITY'] },
                { title: 'JUNIOR PROGRAMMER', company: 'STARTUP INC', lvl: 15, tech: ['JS', 'HTML5'] }
              ].map((job, idx) => (
                <div key={idx} className="relative bg-surface border-4 border-primary p-6 md:p-8 shadow-hard">
                  <div className="absolute -left-10 md:-left-[4.5rem] top-8 w-4 h-4 bg-primary"></div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-vt323 text-white mb-2">{job.title}</h3>
                      <div className="text-muted font-vt323 text-xl">{job.company}</div>
                    </div>
                    <div className="bg-primary text-[#05050A] px-2 py-1 text-xs font-arcade">
                      LVL {job.lvl}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-6">
                    {job.tech.map(t => (
                      <span key={t} className="bg-accent font-vt323 text-white px-2 py-1 text-lg">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Contact (Transmission Terminal) */}
        <section id="contact" className="scroll-mt-[100px] flex justify-center">
          <div className="w-full max-w-2xl bg-surface border-4 border-muted">
            <div className="bg-white text-background flex justify-between items-center px-4 py-2 border-b-4 border-muted">
              <span className="text-xs font-arcade">TRANSMISSION_PROTOCOL.exe</span>
              <span className="text-xs font-arcade tracking-widest">_ [] X</span>
            </div>
            <div className="p-8 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-vt323 text-primary">USER_IDENTITY_STRING</label>
                <input type="text" className="bg-transparent border-b-2 font-vt323 text-xl border-muted focus:border-primary outline-none text-white py-2 transition-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-vt323 text-primary">CONTACT_RECEPTOR_NODE</label>
                <input type="email" className="bg-transparent border-b-2 font-vt323 text-xl border-muted focus:border-primary outline-none text-white py-2 transition-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-vt323 text-primary">TRANSMISSION_PAYLOAD</label>
                <textarea rows="4" className="bg-transparent border-b-2 font-vt323 text-xl border-muted focus:border-primary outline-none text-white py-2 resize-none transition-none" />
              </div>
              <button className="mt-4 bg-background border-4 font-arcade border-primary text-primary py-4 hover:bg-primary hover:text-background transition-none w-full text-sm">
                [ TRANSMIT ]
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default App;
