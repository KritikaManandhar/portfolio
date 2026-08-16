import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight text-indigo-400">Kritika Manandhar</h1>
          <div className="space-x-6 text-sm font-medium">
            <a href="#about" className="hover:text-indigo-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-indigo-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-indigo-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero / About Section */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-20 md:py-28 flex flex-col items-start gap-6">
        <span className="px-3 py-1 text-xs font-semibold tracking-wider text-indigo-400 bg-indigo-950/60 rounded-full border border-indigo-800">
          Aspiring Software Developer
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Hi, I&apos;m <span className="text-indigo-400">Kritika Manandhar</span>.
        </h2>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
          Motivated IT student currently pursuing a Bachelor in Computer Science and Information Technology (B.Sc. CSIT) at Padmakanya Multiple Campus, Tribhuvan University. Passionate about software development, web design, and building user-friendly applications.
        </p>
        <div className="flex gap-4 pt-2">
          <a
            href="#projects"
            className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-medium text-white transition-all shadow-lg shadow-indigo-500/20"
          >
            View My Projects
          </a>
          <a
            href="mailto:kri.mdhr@gmail.com"
            className="px-6 py-3 rounded-lg border border-slate-700 hover:border-slate-500 bg-slate-800/50 font-medium text-slate-200 transition-all"
          >
            Get In Touch
          </a>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-slate-950/50 py-16 border-y border-slate-800/50">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-8 text-indigo-400">Technical Skills & Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-800">
              <h4 className="font-semibold text-lg text-slate-200 mb-3">Programming</h4>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'PHP', 'C', 'C++', 'Java'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm bg-slate-800 rounded-md text-slate-300 border border-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-800">
              <h4 className="font-semibold text-lg text-slate-200 mb-3">Web & Databases</h4>
              <div className="flex flex-wrap gap-2">
                {['HTML5', 'CSS3', 'MySQL', 'SQL Server'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm bg-slate-800 rounded-md text-slate-300 border border-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-800">
              <h4 className="font-semibold text-lg text-slate-200 mb-3">Design & Training</h4>
              <div className="flex flex-wrap gap-2">
                {['Figma', 'Canva', 'Web Design (Broadway Infosys)'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm bg-slate-800 rounded-md text-slate-300 border border-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-20">
        <h3 className="text-2xl font-bold mb-2 text-indigo-400">Featured Projects</h3>
        <p className="text-slate-400 mb-10">Hands-on applications I have developed.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project 1 */}
          <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-bold text-slate-100 mb-2">E-Commerce Website</h4>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                Developed a dynamic online store featuring product listings, shopping cart functionality, wishlist support, and user authentication with MySQL integration.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs px-2.5 py-1 bg-indigo-950/80 text-indigo-300 rounded border border-indigo-800/50">PHP</span>
                <span className="text-xs px-2.5 py-1 bg-indigo-950/80 text-indigo-300 rounded border border-indigo-800/50">MySQL</span>
                <span className="text-xs px-2.5 py-1 bg-indigo-950/80 text-indigo-300 rounded border border-indigo-800/50">HTML/CSS</span>
              </div>
            </div>
            <a
              href="https://github.com/KritikaManandhar/E-commerce-website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-semibold text-indigo-400 hover:text-indigo-300"
            >
              View Repository &rarr;
            </a>
          </div>

          {/* Project 2 */}
          <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-bold text-slate-100 mb-2">Registration and Login System</h4>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                Created a student registration form and login authentication system featuring layout design and input validation for optimized user experience.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs px-2.5 py-1 bg-indigo-950/80 text-indigo-300 rounded border border-indigo-800/50">PHP</span>
                <span className="text-xs px-2.5 py-1 bg-indigo-950/80 text-indigo-300 rounded border border-indigo-800/50">HTML</span>
                <span className="text-xs px-2.5 py-1 bg-indigo-950/80 text-indigo-300 rounded border border-indigo-800/50">CSS</span>
              </div>
            </div>
            <a
              href="https://github.com/KritikaManandhar/Website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-semibold text-indigo-400 hover:text-indigo-300"
            >
              View Repository &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Education & Contact Footer */}
      <footer id="contact" className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h4 className="text-lg font-bold text-slate-200 mb-2">Education</h4>
            <p className="text-sm text-slate-300 font-medium">B.Sc. Computer Science & IT</p>
            <p className="text-xs text-slate-500">Padmakanya Multiple Campus, TU (2022 – 2026)</p>
            <p className="text-xs text-slate-500 mt-2">Mhepi, Kathmandu, Nepal</p>
          </div>
          <div className="md:text-right space-y-2">
            <h4 className="text-lg font-bold text-slate-200">Connect With Me</h4>
            <div className="flex md:justify-end gap-4 text-sm text-indigo-400">
              <a href="mailto:kri.mdhr@gmail.com" className="hover:underline">kri.mdhr@gmail.com</a>
              <span>•</span>
              <a href="https://github.com/KritikaManandhar" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
            </div>
            <p className="text-xs text-slate-600 pt-4">&copy; {new Date().getFullYear()} Kritika Manandhar. Built with Next.js.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}