'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faPhoneAlt, faEnvelope, faMapMarkerAlt,
  faPlus, faMinus, faChevronDown, faPhone
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function HeaderComponent({ showScrolledVariant = true }) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isContactOverlayOpen, setIsContactOverlayOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const sideMenuRef = useRef(null);
  const contactOverlayRef = useRef(null);
  const openSideMenuRef = useRef(null);
  const openContactOverlayRef = useRef(null);

  const menuItems = [
    { name: 'Home', link: '/' },
    {
      name: 'About',
      link: '/about',
      dropdown: [
        { name: 'Insurance', link: '/insurance' },
        { name: 'Privacy Policy', link: '/privacy-policy' },
      ]
    },
    { name: 'Departments', link: '/departments' },
    { name: 'Labs', link: '/our-labs' },
    { name: 'Find Doctor', link: '/doctors' },
  ];

  // --- CONFIG: change these as needed ---
  const phoneNumberDisplay = '+91 9894352229';
  const phoneNumberDial = '919894352229'; // no plus, no spaces (for tel: and wa.me)
  const emailAddress = 'salemgopihosp@gmail.com';
  const fullAddress = '23, B, Gopi Hospital, Ramakrishna Rd, Hasthampatti, Salem, Tamil Nadu 636007';
  // WhatsApp
  const whatsappMessage = encodeURIComponent('Hello SGH, I would like to chat about an appointment.');
  const whatsappLink = `https://wa.me/${phoneNumberDial}?text=${whatsappMessage}`;
  // Google Maps link
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
  // --------------------------------------

  const toggleSideMenu = () => {
    setIsSideMenuOpen(prev => {
      const next = !prev;
      if (next) setIsContactOverlayOpen(false); // close contact overlay when opening side menu
      if (!next) setActiveDropdown(null);
      return next;
    });
  };

  const toggleContactOverlay = () => {
    setIsContactOverlayOpen(prev => {
      const next = !prev;
      if (next) setIsSideMenuOpen(false); // close side menu when opening contact overlay
      return next;
    });
  };

  const handleSideMenuDropdownClick = (index) => {
    setActiveDropdown(prev => (prev === index ? null : index));
  };

  const handleSideMenuLinkClick = () => {
    setIsSideMenuOpen(false);
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSideMenuOpen) {
        if (sideMenuRef.current && !sideMenuRef.current.contains(event.target) &&
            openSideMenuRef.current && !openSideMenuRef.current.contains(event.target)) {
          setIsSideMenuOpen(false);
          setActiveDropdown(null);
        }
      }
      if (isContactOverlayOpen) {
        if (contactOverlayRef.current && !contactOverlayRef.current.contains(event.target) &&
            openContactOverlayRef.current && !openContactOverlayRef.current.contains(event.target)) {
          setIsContactOverlayOpen(false);
        }
      }
    };

    const handleScroll = () => {
      if (!showScrolledVariant) return;
      if (window.scrollY > 10) setIsScrolled(true);
      else setIsScrolled(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSideMenuOpen, isContactOverlayOpen, showScrolledVariant]);

  return (
    <>
      <style>{`
        /* Underline animation for nav links */
        .nav-link-underline {
          position: relative;
          display: inline-block;
        }
        .nav-link-underline::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -3px;
          height: 2.5px;
          width: 0;
          background-color: #274760;
          transition: width .28s cubic-bezier(.2,.9,.2,1);
        }
        .nav-link-underline:hover::after {
          width: 70%;
        }
        /* rotate arrow for hovered dropdown on desktop */
        .dropdown-arrow {
          transition: transform .28s cubic-bezier(.2,.9,.2,1);
        }
        .group-hover\\:rotate-180-desktop:hover .dropdown-arrow {
          transform: rotate(180deg);
        }
      `}</style>

      <header className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${isScrolled && showScrolledVariant ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 text-[#274760] font-extrabold text-xl">
            <span>SGH</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            <ul className="flex items-center space-x-8">
              {menuItems.map((item, idx) => (
                <li key={idx} className={`relative ${item.dropdown ? 'group group-hover:relative' : ''}`}>
                  <Link
                    href={item.link}
                    className="nav-link-underline text-[#274760] font-semibold text-lg nav-link"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="nav-link-underline">{item.name}</span>
                      {item.dropdown && (
                        <span className="dropdown-arrow text-[#274760]">
                          <FontAwesomeIcon icon={faChevronDown} />
                        </span>
                      )}
                    </span>
                  </Link>

                  {item.dropdown && (
                    <ul className="absolute left-0 mt-3 w-56 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                      {item.dropdown.map((s, si) => (
                        <li key={si}>
                          <Link href={s.link} className="block px-4 py-2 text-[#274760] font-semibold text-base hover:bg-gray-50 hover:text-[#007bff]">
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Icons / Mobile toggles */}
          <div className="flex items-center gap-3">
            {/* Changed contact icon to address (map marker) as requested */}
            <button
              ref={openContactOverlayRef}
              onClick={toggleContactOverlay}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full text-[#274760] hover:text-[#007bff] transition-colors"
              aria-label="Address"
            >
              <FontAwesomeIcon icon={faPhone} />
            </button>

            {/* Menu toggle (mobile only) */}
            <button
              ref={openSideMenuRef}
              onClick={toggleSideMenu}
              className="inline-flex items-center justify-center w-10 h-10 rounded-md text-[#274760] hover:text-[#007bff] lg:hidden"
              aria-label="Open menu"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </header>

      {/* Side Menu (mobile) */}
      <aside
        ref={sideMenuRef}
        className={`fixed top-0 right-0 h-full z-[1100] transform transition-transform duration-400 ${
          isSideMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } w-[320px] max-w-full bg-white shadow-xl`}
        aria-hidden={!isSideMenuOpen}
      >
        <div className="pt-10 px-4 pb-8 flex flex-col h-full">
          <button
            onClick={toggleSideMenu}
            className="self-end text-3xl text-gray-600 hover:text-[#007bff] mb-4"
            aria-label="Close menu"
          >
            &times;
          </button>

          <ul className="flex-1 overflow-auto">
            {menuItems.map((item, idx) => (
              <li key={idx} className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <Link href={item.link} onClick={handleSideMenuLinkClick} className="block w-full px-5 py-4 text-lg font-semibold text-[#274760]">
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleSideMenuDropdownClick(idx);
                      }}
                      className="px-4 py-4 text-[#6b7280]"
                      aria-label="Toggle sub menu"
                    >
                      <FontAwesomeIcon icon={activeDropdown === idx ? faMinus : faPlus} />
                    </button>
                  )}
                </div>

                {item.dropdown && (
                  <div className={`overflow-hidden transition-[max-height] duration-300 ${activeDropdown === idx ? 'max-h-[500px]' : 'max-h-0'}`}>
                    <ul className="bg-gray-50">
                      {item.dropdown.map((s, si) => (
                        <li key={si}>
                          <Link href={s.link} onClick={handleSideMenuLinkClick} className="block px-8 py-3 text-base font-semibold text-[#274760] hover:bg-gray-100">
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Bottom area: shows quick contact actions */}
          <div className="mt-6 px-5">
            <button
              onClick={() => {
                setIsSideMenuOpen(false);
                setTimeout(() => setIsContactOverlayOpen(true), 60); // small delay for UX
              }}
              className="w-full flex items-center justify-center gap-3 bg-[#007bff] text-white py-3 rounded-md font-semibold"
            >
              <FontAwesomeIcon icon={faPhoneAlt} />
              Contact
            </button>
          </div>
        </div>
      </aside>

      {/* Contact Overlay (redesigned) - overlay container allows overflow scroll */}
      <div
        ref={contactOverlayRef}
        className={`fixed top-0 right-0 h-full z-[1200] bg-white shadow-xl transform transition-transform duration-400 overflow-auto ${
          isContactOverlayOpen ? 'translate-x-0' : 'translate-x-full'
        } w-[480px] max-w-full`}
        aria-hidden={!isContactOverlayOpen}
      >
        <div className="pt-1 px-6 pb-8 overflow-auto">
          <button onClick={toggleContactOverlay} className="self-end text-3xl text-[#274760] hover:text-[#007bff] mb-4">
            &times;
          </button>

          <div className="max-w-[420px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-center mb-6 border-b pb-6 gap-3">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#274760]">Contact SGH</h3>
                <p className="text-sm text-gray-500">We&apos;re here to help — phone, email or visit.</p>
              </div>
            </div>

            {/* Clickable contact rows */}
            <div className="space-y-4">
              <a
                href={`tel:+${phoneNumberDial}`}
                className="group block rounded-lg p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow bg-[#f8fafc] hover:bg-[#eef9ff]"
                aria-label={`Call ${phoneNumberDisplay}`}
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#007bff] border">
                  <FontAwesomeIcon icon={faPhoneAlt} />
                </div>
                <div className="flex-1">
                  <div className="text-[#274760] font-semibold">Phone</div>
                  <div className="text-gray-500 text-sm">{phoneNumberDisplay}</div>
                </div>
                <div className="text-[#007bff] opacity-0 group-hover:opacity-100 transition-opacity">Call</div>
              </a>

              <a
                href={`mailto:${emailAddress}`}
                className="group block rounded-lg p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow bg-[#fff8f0] hover:bg-[#fff2e6]"
                aria-label={`Email ${emailAddress}`}
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#ff7a00] border">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="flex-1">
                  <div className="text-[#274760] font-semibold">Email</div>
                  <div className="text-gray-500 text-sm">{emailAddress}</div>
                </div>
                <div className="text-[#ff7a00] opacity-0 group-hover:opacity-100 transition-opacity">Email</div>
              </a>

              <a
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow bg-[#f0fff4] hover:bg-[#e8fff0]"
                aria-label="Open address in Google Maps"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#07a55a] border">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <div className="flex-1">
                  <div className="text-[#274760] font-semibold">Address</div>
                  <div className="text-gray-500 text-sm">{fullAddress}</div>
                </div>
                <div className="text-[#07a55a] opacity-0 group-hover:opacity-100 transition-opacity">Open</div>
              </a>
            </div>

            {/* WhatsApp and Newsletter */}
            <div className="mt-6">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full px-4 py-3 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
                aria-label="Chat on WhatsApp"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
                <span>Chat on WhatsApp</span>
              </a>

              <div className="border-t pt-6 mt-4">
                <h4 className="text-[#274760] font-semibold mb-3">Subscribe to our Newsletter</h4>
                <div className="flex gap-2 border rounded-md overflow-hidden">
                  <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 outline-none text-[#274760]" />
                  <button className="bg-[#007bff] text-white px-4 py-2 font-semibold">Submit</button>
                </div>

                <div className="flex justify-center gap-4 mt-6 text-[#007bff]">
                  <a href="#" aria-label="Facebook" className="hover:text-[#0056b3]"><FontAwesomeIcon icon={faFacebookF} /></a>
                  <a href="#" aria-label="Twitter" className="hover:text-[#0056b3]"><FontAwesomeIcon icon={faTwitter} /></a>
                  <a href="#" aria-label="Instagram" className="hover:text-[#0056b3]"><FontAwesomeIcon icon={faInstagram} /></a>
                  <a href="#" aria-label="LinkedIn" className="hover:text-[#0056b3]"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderComponent;