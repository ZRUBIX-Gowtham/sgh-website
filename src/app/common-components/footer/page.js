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
      <style>
        {`
          :root {
              --primary: #2563eb;
              --primary-dark: #1e40af;
              --secondary: #1e293b;
              --accent: #06b6d4;
              --accent-light: #a5f3fc;
              --light: #f8fafc;
              --dark: #1e293b;
              --gray: #64748b;
              --light-gray: #e2e8f0;
              --salem: #10b981;
              --salem-light: #d1fae5;
          }
          
          /* Scoped universal reset for footer elements */
          .app-footer-container * { /* Renamed */
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          }
          
          
          /* New wrapper class for footer-specific body styles */
          .app-footer-wrapper { /* Renamed */
              color: var(--dark);
              line-height: 1.6;
              background-color: #f9fafb; /* This might be overridden by parent body styles */
          }
          
          .app-footer-inner-container { /* Renamed */
              max-width: 1200px;
              margin: 0 auto;
              padding: 0 20px;
          }
          
          /* Footer */
          .app-footer-container { /* Renamed */
              background: var(--secondary);
              color: white;
              padding: 80px 0 30px;
              position: relative;
          }
          
          .app-footer-wave { /* Renamed */
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              overflow: hidden;
              line-height: 0;
          }
          
          .app-footer-wave svg { /* Renamed */
              position: relative;
              display: block;
              width: calc(100% + 1.3px);
              height: 50px;
          }
          
          .app-footer-wave .shape-fill { /* Renamed */
              fill: #FFFFFF;
          }
          
          .app-footer-content { /* Renamed */
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 40px;
              margin-bottom: 60px;
          }
          
          .app-footer-column h3 { /* Renamed */
              font-size: 1.125rem;
              margin-bottom: 25px;
              color: #fff;
              position: relative;
              padding-bottom: 10px;
          }
          
          .app-footer-column h3:after { /* Renamed */
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              width: 40px;
              height: 2px;
              background: #fff;
          }
          
          .app-footer-column ul { /* Renamed */
              list-style: none;
          }
          
          .app-footer-column ul li { /* Renamed */
              margin-bottom: 15px;
          }
          
          .app-footer-column ul li a { /* Renamed */
              color: rgba(255, 255, 255, 0.8);
              text-decoration: none;
              transition: all 0.3s ease;
              display: flex;
              align-items: center;
              gap: 10px;
          }
          
          .app-footer-column ul li a:hover { /* Renamed */
              color: white;
              transform: translateX(5px);
          }
          
          .app-footer-column ul li a i { /* Renamed */
              font-size: 14px;
              font-family: "Font Awesome 5 Free"; /* For solid/regular icons */
              font-weight: 900; /* For solid icons */
          }

          /* Specific for brand icons */
          .app-footer-column .app-social-links a i { /* Renamed */
              font-family: "Font Awesome 5 Brands"; /* For brand icons */
              font-weight: 400; /* For brand icons */
          }
          
          .app-footer-column .app-social-links { /* Renamed */
              display: flex;
              gap: 15px;
              margin-top: 20px;
          }
          
          .app-footer-column .app-social-links a { /* Renamed */
              display: flex;
              align-items: center;
              justify-content: center;
              width: 40px;
              height: 40px;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 50%;
              color: white;
              transition: all 0.3s ease;
          }
          
          .app-footer-column .app-social-links a:hover { /* Renamed */
              background:#007bff;
              transform: translateY(-3px);
          }
          
          .app-footer-copyright { /* Renamed */
              text-align: center;
              padding-top: 30px;
              border-top: 1px solid rgba(255, 255, 255, 0.1);
              color: rgba(255, 255, 255, 0.6);
              font-size: 0.875rem;
          }
          
          .app-footer-copyright p { /* Renamed */
              margin-bottom: 10px;
          }
          
          .app-footer-copyright .app-highlight { /* Renamed */
              color: #fff;
              font-weight: 600;
          }
          
          /* Responsive */
          @media (max-width: 768px) {
              .app-footer-content { /* Renamed */
                  grid-template-columns: 1fr;
                  text-align: center;
              }
              .app-footer-column h3:after { /* Renamed */
                  left: 50%;
                  transform: translateX(-50%);
              }
              .app-footer-column ul { /* Renamed */
                  padding-left: 0;
              }
              .app-footer-column ul li a { /* Renamed */
                  justify-content: center;
              }
              .app-footer-column .app-social-links { /* Renamed */
                  justify-content: center;
              }
          }
        `}
      </style>
      <div className="app-footer-wrapper"> {/* Renamed */}
        <footer className="app-footer-container"> {/* Renamed */}
          <div className="app-footer-wave"> {/* Renamed */}
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
          </div>
          <div className="app-footer-inner-container"> {/* Renamed */}
            <div className="app-footer-content"> {/* Renamed */}
              <div className="app-footer-column"> {/* Renamed */}
                <h3>Common</h3>
                <ul>
                  {appFooterData.mainLinks.map((link, index) => ( // Renamed
                    <li key={index}>
                      <a href={link.path}>
                        <i className={link.iconClass}></i> {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="app-footer-column"> {/* Renamed */}
                <h3>Common</h3>
                <ul>
                  {appFooterData.companyInfoLinks.map((link, index) => ( // Renamed
                    <li key={index}>
                      <a href={link.path}>
                        <i className={link.iconClass}></i> {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="app-footer-column"> {/* Renamed */}
                <h3>Resources</h3>
                <ul>
                  {appFooterData.resourceLinks.map((link, index) => ( // Renamed
                    <li key={index}>
                      <a href={link.path}>
                        <i className={link.iconClass}></i> {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="app-footer-column"> {/* Renamed */}
                <h3>Contact Us</h3>
                <ul>
                  {appFooterData.contactDetails.map((info, index) => ( // Renamed
                    <li key={index}>
                      <a href={info.linkPath}>
                        <i className={info.iconClass}></i> {info.infoText}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="app-social-links"> {/* Renamed */}
                  {appFooterData.socialMediaLinks.map((link, index) => ( // Renamed
                    <a key={index} href={link.linkPath}>
                      <i className={link.iconClass}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="app-footer-copyright"> {/* Renamed */}
              <p>&copy; {appFooterData.copyrightInfo.currentYear} {appFooterData.copyrightInfo.companyName}. All rights reserved.</p> {/* Renamed */}
              {/* <p>From {appFooterData.copyrightInfo.companyName} - {appFooterData.copyrightInfo.sloganOne}</p>
              <p className="app-highlight">{appFooterData.copyrightInfo.sloganTwo}</p> */}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default CommonFooter;