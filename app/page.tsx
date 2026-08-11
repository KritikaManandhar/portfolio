export default function Home() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Header Section */}
      <header className="bg-slate-100 p-6 rounded-lg mb-8 text-center border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">Kritika Manandhar</h1>
        <p className="text-gray-600 mt-2">B.Sc. CSIT Student </p>
        <p className="text-sm text-gray-500 mt-1">Kathmandu, Nepal</p>
  
        <div className="mt-4 flex justify-center gap-4 text-sm font-medium text-blue-600">
      {/* Displaying actual email address */}
        <a href="mailto:kri.mdhr@gmail.com" className="hover:underline">kri.mdhr@gmail.com</a>
        <span>|</span>
        <a href="https://github.com/KritikaManandhar" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
    </div>
      </header>

      {/* About Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-3">About Me</h2>
        <p className="text-gray-700 leading-relaxed">
          I am a motivated IT student currently studying at Padmakanya Multiple Campus, Tribhuvan University. 
          I am interested in software development and web development, and I am looking for a developer internship 
          to learn and gain practical industry experience.
        </p>
      </section>

      {/* Skills Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-3">Technical Skills</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Programming Languages:</strong> C, C++, JavaScript, PHP, Java</li>
          <li><strong>Web & Databases:</strong> HTML, CSS, MySQL, SQL Server</li>
          <li><strong>Design Tools:</strong> Figma, Canva</li>
        </ul>
      </section>

      {/* Projects Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-4">My Projects</h2>
        
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-md bg-white">
            <h3 className="text-lg font-bold text-gray-800">E-Commerce Website</h3>
            <p className="text-sm text-gray-600 mb-2">Technologies used: PHP, MySQL, HTML, CSS</p>
            <p className="text-gray-700 text-sm mb-3">
              A dynamic online store where users can browse products, add items to a cart or wishlist, and log into their account.
            </p>
            <a 
              href="https://github.com/KritikaManandhar/E-commerce-website" 
              target="_blank" 
              rel="noreferrer" 
              className="text-sm text-blue-600 font-semibold hover:underline"
            >
              View on GitHub &rarr;
            </a>
          </div>

          <div className="p-4 border border-gray-200 rounded-md bg-white">
            <h3 className="text-lg font-bold text-gray-800">Registration and Login System</h3>
            <p className="text-sm text-gray-600 mb-2">Technologies used: HTML, CSS, PHP</p>
            <p className="text-gray-700 text-sm mb-3">
              A web form that collects student registration details with input validation for user experience.
            </p>
            <a 
              href="https://github.com/KritikaManandhar/Website" 
              target="_blank" 
              rel="noreferrer" 
              className="text-sm text-blue-600 font-semibold hover:underline"
            >
              View on GitHub &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-3">Education & Training</h2>
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-gray-800">Bachelor in Computer Science and Information Technology</h3>
            <p className="text-sm text-gray-600">Padmakanya Multiple Campus, Tribhuvan University (2022 - 2026)</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Web Design Training (1 Month)</h3>
            <p className="text-sm text-gray-600">Broadway Infosys (Sept 2024 - Oct 2024)</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 pt-6 border-t border-gray-200">
        <p>Created by Kritika Manandhar using Next.js</p>
      </footer>

    </div>
  );
}