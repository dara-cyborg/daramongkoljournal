import { useEffect, useRef, useState } from 'react';

const navItems = ['Home', 'Resume', 'Timelines', 'Latest Activity', 'Digital Certs', 'Writeups'];
const timelineEntries = [
  { year: '2024', title: 'The Beginning', body: 'Graduated as an average student ranked in D. Holding regrets not getting the expected result. Enrolled into RUPP as a CS student. Overclocked the knowledge limitation then discovered "Cybersecurity".', tag: 'FOUNDATION' },
  { year: 'June 2024', title: 'Breaking the Ground', body: 'Enrolled into CCNA to build the networking foundation and strengthen real-world skills in routing, switching, and secure infrastructure.', tag: 'NETWORKING' },
  { year: 'October 2024', title: 'UYFC Competition', body: 'Without any prior experience, joined a competition hosted by UYFC on topic - "Empowering Young Entrepreneurs"', tag: 'ENTREPRENEURSHIP' },
  { year: 'January 2025', title: 'Practical CCNA', body: 'Formed a study group within the class helping classmates on the basic principles of TCP/IP Model, IPv4, Subnetting, VLANs.', tag: 'PRACTICAL' },
  { year: 'May 2025', title: '4th Runner Up - UYFC', body: 'Didn\'t do a handy job, but did what could be done. Plus, gaining experience and meeting new talented people.', tag: 'LESSON' },
  { year: 'November 2025', title: 'Top 10 - KOHKER OSINT CTF Competition', body: 'Passed round 1 against 100 competitors, and got 9th place in round 2 on OSINT topic. Learned how to maintain the momentum, be calm, graph out clue from pieces to build one giant piece of information.', tag: 'OSINT' },
  { year: 'December 2025', title: 'Building the Skill', body: 'Enrolled into Certified Ethical Hacker (CEHv13) class to build not only practical skills, but theories to form a complete ethical understanding of the hacking world.', tag: 'CEHv13' },
  { year: 'February 2026', title: 'Ego - DELUX', body: 'Built a digital tool solving online sellers\' long existing problem of doing the repetitve tasks during their live streams. Generating them more sales during lives.', tag: 'DELUX' },
];
const digitalCerts = [
  { name: 'ITE', description: 'Cisco IT Essentials', file: 'ITEssentialsUpdate20260118-31-zafgmi.pdf' },
  { name: 'CCNA ITN', description: 'Introduction to Networking', file: 'CCNAITNUpdated20260118-32-mxyrla.pdf' },
  { name: 'CCNA SRWE', description: 'Switching, Routing, and Wireless Essentials', file: 'CCNASRWEUpdate20260118-31-88nmya.pdf' },
  { name: 'CCNA ENSA', description: 'Enterprise Networking, Security, and Automation', file: 'CCNAENSAUpdate20260118-31-y9wi9h.pdf' },
  { name: 'THM Certificate', description: 'Pre-Security: how technology works from the ground up', file: 'THM-9Z3AQY70RY.pdf' },
  { name: 'CEHv13', description: 'Certified Ethical Hacker (CEHv13) — upcoming certification.', file: null, comingSoon: true },
];
const GOALS = [
  '-rwx------ To become a professional offensive security officer',
  '-rwx------ To gain hand-on experience on web app security',
  '-rwx------ To protect old and new users with proper privacy standards',
  '-rwx------ To provide the best performance to the team',
];
const TEXT_CLASS = 'text-lg text-zinc-300 sm:text-xl';

function useTypewriter() {
  const promptRef = useRef(null);
  const outputRef = useRef(null);
  const nextPromptRef = useRef(null);
  const nextPromptTextRef = useRef(null);
  const nextOutputRef = useRef(null);
  const cursorRef = useRef(null);
  const goalRefs = useRef([]);

  useEffect(() => {
    const prompt = promptRef.current;
    const output = outputRef.current;
    const nextPrompt = nextPromptRef.current;
    const nextPromptText = nextPromptTextRef.current;
    const nextOutput = nextOutputRef.current;
    const cursor = cursorRef.current;

    if (!prompt || !output || !nextPrompt || !nextPromptText || !nextOutput) return undefined;

    const commands = [
      { text: 'whoami', output: 'CHEA CHANDARAMONGKOL' },
      { text: 'ls -la goals', output: GOALS[0] },
    ];

    let step = 0;
    let charIndex = 0;
    let timeoutId;

    const typeCommand = () => {
      const current = commands[step];

      if (charIndex < current.text.length) {
        charIndex += 1;
        prompt.textContent = current.text.slice(0, charIndex);
        timeoutId = setTimeout(typeCommand, 80);
        return;
      }

      if (step === 0) {
        output.textContent = commands[0].output;
        output.classList.remove('hidden');
        cursor?.classList.add('hidden');
        nextPrompt.classList.remove('hidden');
        nextPromptText.textContent = '';

        timeoutId = setTimeout(() => {
          step = 1;
          charIndex = 0;

          const typeSecond = () => {
            const nextCommand = commands[step];

            if (charIndex < nextCommand.text.length) {
              charIndex += 1;
              nextPromptText.textContent = nextCommand.text.slice(0, charIndex);
              timeoutId = setTimeout(typeSecond, 80);
              return;
            }

            nextOutput.textContent = nextCommand.output;
            nextOutput.classList.remove('hidden');
            goalRefs.current.forEach((line) => line?.classList.remove('hidden'));
          };

          typeSecond();
        }, 900);
        return;
      }

      if (step === 1) {
        nextOutput.textContent = commands[1].output;
        nextOutput.classList.remove('hidden');
        goalRefs.current.forEach((line) => line?.classList.remove('hidden'));
      }
    };

    prompt.textContent = '';
    output.classList.add('hidden');
    nextPrompt.classList.add('hidden');
    nextOutput.classList.add('hidden');
    goalRefs.current.forEach((line) => line?.classList.add('hidden'));
    timeoutId = setTimeout(typeCommand, 150);

    return () => clearTimeout(timeoutId);
  }, []);

  return { promptRef, outputRef, nextPromptRef, nextPromptTextRef, nextOutputRef, cursorRef, goalRefs };
}

function useScrollReveal(selector) {
  useEffect(() => {
    const cards = document.querySelectorAll(selector);
    if (!cards.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-x-0');
            entry.target.classList.remove('opacity-0', 'translate-x-6', '-translate-x-6');
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [selector]);
}

function NavBar() {
  const [open, setOpen] = useState(false);

  const renderLinks = () =>
    navItems.map((item) => {
      const href = item === 'Writeups'
        ? 'https://ctf-writeups.dara-crawler.xyz/'
        : item === 'Resume'
          ? '/certs/RESUME_V3.pdf'
          : item === 'Timelines'
            ? '#timeline'
            : `#${item.toLowerCase().replace(/\s+/g, '-')}`;

      return (
        <a
          key={item}
          href={href}
          target={item === 'Writeups' || item === 'Resume' ? '_blank' : undefined}
          rel={item === 'Writeups' || item === 'Resume' ? 'noreferrer' : undefined}
          onClick={() => setOpen(false)}
          className={`border border-zinc-800 px-3 py-1.5 text-left transition hover:border-emerald-500 hover:text-emerald-500 ${item === 'Resume' ? 'bg-emerald-500 text-black' : ''}`}
        >
          {item}
        </a>
      );
    });

  return (
    <header className="no-print sticky top-0 z-20 border border-zinc-800 bg-black/95 backdrop-blur-none">
      <nav className="border-b border-zinc-800 px-4 py-3 text-[11px] uppercase tracking-[0.25em] text-zinc-500">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-emerald-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>My Sandbox/Portfolio</span>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-zinc-800 text-zinc-300 transition hover:border-emerald-500 hover:text-emerald-500 md:hidden"
          >
            <span className="block h-0.5 w-5 rounded bg-current" />
            <span className="sr-only">Menu</span>
          </button>

          <div className="hidden items-center gap-2 text-zinc-300 md:flex">{renderLinks()}</div>
        </div>

        {open && (
          <div className="mt-3 flex flex-col gap-2 border-t border-zinc-800 pt-3 md:hidden">{renderLinks()}</div>
        )}
      </nav>
    </header>
  );
}

function HeroTerminal() {
  const { promptRef, outputRef, nextPromptRef, nextPromptTextRef, nextOutputRef, cursorRef, goalRefs } = useTypewriter();

  return (
    <article className="border-b border-zinc-800 p-5 text-sm text-zinc-300 sm:p-6 lg:p-8">
      <div className="rounded-lg bg-zinc-950/90 p-6 font-mono text-base leading-7 text-zinc-200">
        <p className={TEXT_CLASS}>
          <span className="font-semibold text-emerald-500">root@dara.sec</span>
          <span className="font-semibold text-white">:~# </span>
          <span ref={promptRef} className="inline-block min-h-[1.4em] text-white" />
          <span ref={cursorRef} className="typing-cursor text-emerald-500">█</span>
        </p>
        <p ref={outputRef} className={`mt-2 hidden ${TEXT_CLASS}`}>CHEA CHANDARAMONGKOL</p>
        <p ref={nextPromptRef} className={`mt-3 hidden ${TEXT_CLASS}`}>
          <span className="font-semibold text-emerald-500">root@dara.sec</span>
          <span className="font-semibold text-white">:~# </span>
          <span ref={nextPromptTextRef} className="inline-block min-h-[1.4em] text-white" />
          <span className="typing-cursor text-emerald-500">█</span>
        </p>
        <p ref={nextOutputRef} className={`mt-2 hidden ${TEXT_CLASS}`}>{GOALS[0]}</p>
        {GOALS.slice(1).map((goal, index) => (
          <p
            key={goal}
            ref={(node) => {
              goalRefs.current[index] = node;
            }}
            className={`goal-line mt-1 hidden ${TEXT_CLASS}`}
          >
            {goal}
          </p>
        ))}
      </div>
    </article>
  );
}

function CurrentPosition() {
  return (
    <section id="current-position" className="border-t border-zinc-800 p-4 sm:p-6 lg:p-8">
      <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">current position</p>
      <div className="mt-4 space-y-6 text-zinc-300">
        <article className="border border-zinc-800 bg-zinc-950/90 p-5">
          <p className="text-lg font-semibold text-emerald-500">DELUX&apos;s Founder</p>
          <p className="mt-2 text-sm text-zinc-400">An on-demand tool to solve the long existing problem of online sellers enabling them to generate more sales by mitigating the repetitive tasks during their live streams.</p>
          <a className="mt-3 inline-flex text-sm text-amber-500 hover:text-amber-400" href="https://features.dara-crawler.xyz/" target="_blank" rel="noreferrer">https://features.dara-crawler.xyz/</a>
        </article>

        <article className="border border-zinc-800 bg-zinc-950/90 p-5">
          <p className="text-lg font-semibold text-emerald-500">Technical Support Engineer, WiseStep</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
            <li>Served as the first/second line of defense for incoming technical queries via email, phone, chat.</li>
            <li>Diagnosed, troubleshot, and resolved software faults (application requirements, crashes, freezes, network connectivity) and customer&apos;s hardware issues.</li>
            <li>Set up, configured applications for new customers.</li>
            <li>Installed, updated, and configured licensed software, operating systems (Windows, macOS, Linux), and security tools.</li>
            <li>Worked continuously on tasks until resolved with proper lesson-learned documentation.</li>
            <li>Researched, tested new softwares, frameworks, devices for product improvement.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

function TimelineSection() {
  useScrollReveal('.timeline-card');

  return (
    <section id="timeline" className="border-t border-zinc-800 bg-black p-4 sm:p-6 lg:p-8">
      <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">timeline</p>
      <div className="relative mt-8 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 sm:p-6 lg:p-8">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-zinc-800 md:block" />
        <div className="space-y-14 md:space-y-16">
          {timelineEntries.map((entry, index) => {
            const isEven = index % 2 === 0;

            return (
              <article
                key={entry.year}
                className={`timeline-card relative flex items-center opacity-0 transition-all duration-700 ease-out md:min-h-[180px] ${isEven ? 'md:justify-start' : 'md:justify-end'} ${index % 2 === 0 ? 'translate-x-6' : '-translate-x-6'}`}
              >
                <div className="w-full rounded-xl border border-zinc-800 bg-black p-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)] md:w-[45%] md:p-5">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-emerald-500">{entry.year}</p>
                  <h3 className="mt-2 text-base font-semibold text-zinc-100">{entry.title}</h3>
                  <p className="mt-3 text-xs leading-6 text-zinc-400">{entry.body}</p>
                  <span className="mt-4 inline-flex rounded-full bg-emerald-500/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.35em] text-emerald-400">{entry.tag}</span>
                </div>
                <span className="absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(52,211,153,0.12)] md:block" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CertsSection() {
  return (
    <section id="digital-certs" className="border-t border-zinc-800 p-4 sm:p-6 lg:p-8">
      <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">digital certs</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {digitalCerts.map((cert) => (
          <article key={cert.name} className="border border-zinc-800 bg-zinc-950/90 p-4 text-zinc-300">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-500">{cert.name}</p>
            <p className="mt-1 text-sm text-zinc-400">{cert.description}</p>
            {!cert.comingSoon && (
              <iframe
                title={cert.name}
                src={`/certs/${cert.file}`}
                loading="lazy"
                className="mt-3 h-48 w-full rounded border border-zinc-800 bg-white"
              />
            )}
            {cert.comingSoon ? (
              <button
                type="button"
                className="mt-4 inline-flex cursor-not-allowed items-center rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-500"
                disabled
              >
                Coming Soon...
              </button>
            ) : (
              <a
                href={`/certs/${cert.file}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center rounded border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-400 transition hover:border-emerald-400 hover:bg-emerald-500/20"
              >
                Open certificate
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-zinc-800 p-4 text-sm text-zinc-400 sm:p-6 lg:p-8">
      <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">contact</p>
      <p className="mt-3">Email: <a className="text-emerald-500 hover:text-emerald-400" href="mailto:daramongkol.chan@gmail.com">daramongkol.chan@gmail.com</a></p>
      <p>GitHub: <a className="text-amber-500 hover:text-amber-400" href="https://github.com/dara-cyborg" target="_blank" rel="noreferrer">github.com/dara-cyborg</a></p>
      <p>Writeups: <a className="text-emerald-500 hover:text-emerald-400" href="https://ctf-writeups.dara-crawler.xyz/" target="_blank" rel="noreferrer">ctf-writeups.dara-crawler.xyz</a></p>
    </footer>
  );
}

export default function Layout() {
  return (
    <main className="min-h-screen bg-black text-zinc-300 selection:bg-emerald-900/40">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <NavBar />

        <section className="terminal-shell mt-6 rounded-xl border border-zinc-800 bg-black shadow-terminal">
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 no-print">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-zinc-500">dara.sec</span>
          </div>

          <HeroTerminal />
          <CurrentPosition />
          <TimelineSection />
          <CertsSection />
          <Footer />
        </section>
      </div>
    </main>
  );
}
