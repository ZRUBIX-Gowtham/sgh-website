import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure this is correctly installed via npm/yarn

function CommonFooter() {
  const appFooterData = { 
    mainLinks: [ 
      { label: 'Home', path: '/', iconClass: 'fa-solid fa-angle-right' },  
      { label: 'Departments', path: '/departments', iconClass: 'fa-solid fa-angle-right' },
      { label: 'Doctors', path: '/doctors', iconClass: 'fa-solid fa-angle-right' },
      { label: 'Labs', path: '/labs', iconClass: 'fa-solid fa-angle-right' },
    ],
    companyInfoLinks: [
      { label: 'About', path: '/about', iconClass: 'fa-solid fa-angle-right' },
      { label: 'Insurance', path: '/insurance', iconClass: 'fa-solid fa-angle-right' },
      { label: 'Privacy Policy', path: '/privacypolicy', iconClass: 'fa-solid fa-angle-right' },
    ],
    resourceLinks: [
      { label: 'Tamil Books', path: '', iconClass: 'fa-solid fa-angle-right' },
      { label: 'English Books', path: '', iconClass: 'fa-solid fa-angle-right' },
      { label: 'Blogs', path: '/blogs', iconClass: 'fa-solid fa-angle-right' },
    ],
    contactDetails: [
      { infoText: '23, B, Gopi Hospital,Ramakrishna Rd, Hasthampatti, Salem, Tamil Nadu 636007', iconClass: 'fas fa-map-marker-alt', linkPath: '#' },
      { infoText: '+91 9894352229', iconClass: 'fas fa-phone-alt', linkPath: 'tel:+15551234567' },
      { infoText: 'salemgopihosp@gmail.com', iconClass: 'fas fa-envelope', linkPath: 'mailto:info@example.com' },
    ],
    socialMediaLinks: [
      { iconClass: 'fab fa-facebook-f', linkPath: '#' },
      { iconClass: 'fab fa-twitter', linkPath: '#' },
      { iconClass: 'fab fa-linkedin-in', linkPath: '#' },
      { iconClass: 'fab fa-instagram', linkPath: '#' },
    ],
    copyrightInfo: {
      currentYear: '2025',
      companyName: 'Salem Gopi Hospital',
      sloganOne: 'Innovating for a better future.',
      sloganTwo: 'Excellence in every detail.',
    },
  };

  return (
    <>
      <div className="bg-slate-800 text-white">
        {/* Wave */}
        <div className="absolute w-full overflow-hidden leading-none h-12 pointer-events-none">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="block w-full h-full"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-white"
            />
          </svg>
        </div>

        <footer className="relative pt-20 pb-8">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-16">
              <div>
                <h3 className="text-lg text-white font-semibold mb-3">Common</h3>
                <div className="w-10 h-[2px] bg-white mb-4"></div>
                <ul className="space-y-4">
                  {appFooterData.mainLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.path}
                        className="text-white/80 hover:text-white transition-transform transform hover:translate-x-1 inline-flex items-center gap-3"
                      >
                        <i className={link.iconClass} aria-hidden="true"></i>
                        <span>{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg text-white font-semibold mb-3">Common</h3>
                <div className="w-10 h-[2px] bg-white mb-4"></div>
                <ul className="space-y-4">
                  {appFooterData.companyInfoLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.path}
                        className="text-white/80 hover:text-white transition-transform transform hover:translate-x-1 inline-flex items-center gap-3"
                      >
                        <i className={link.iconClass} aria-hidden="true"></i>
                        <span>{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg text-white font-semibold mb-3">Resources</h3>
                <div className="w-10 h-[2px] bg-white mb-4"></div>
                <ul className="space-y-4">
                  {appFooterData.resourceLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.path}
                        className="text-white/80 hover:text-white transition-transform transform hover:translate-x-1 inline-flex items-center gap-3"
                      >
                        <i className={link.iconClass} aria-hidden="true"></i>
                        <span>{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg text-white font-semibold mb-3">Contact Us</h3>
                <div className="w-10 h-[2px] bg-white mb-4"></div>
                <ul className="space-y-4">
                  {appFooterData.contactDetails.map((info, index) => (
                    <li key={index}>
                      <a
                        href={info.linkPath}
                        className="text-white/80 hover:text-white transition-transform transform hover:translate-x-1 inline-flex items-start gap-3"
                      >
                        <i className={info.iconClass} aria-hidden="true"></i>
                        <span className="text-sm">{info.infoText}</span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-4 mt-5">
                  {appFooterData.socialMediaLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.linkPath}
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                    >
                      <i className={link.iconClass} aria-hidden="true"></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-center text-white/70 text-sm">
              <p>&copy; {appFooterData.copyrightInfo.currentYear} {appFooterData.copyrightInfo.companyName}. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default CommonFooter;