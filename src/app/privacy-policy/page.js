import React from 'react';
import PrivacyPolicyHeroSection from './Components/PrivacyPolicyHerSec';
import Map from '../home/components/Map';
import CommonFooter from '../common-components/footer/page';

function PrivacyPolicyDetails() {
  const policyData = {
    websiteAddress: "https://salemgopihospital.in",
    sections: [
      {
        title: "Who we are",
        content: `Our website address is: <a href="https://salemgopihospital.in" target="_blank" rel="noopener noreferrer">https://salemgopihospital.in</a>.`
      },
      {
        title: "Comments",
        content: `When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.

An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: `,
        links: [
          { text: "https://automattic.com/privacy/", url: "https://automattic.com/privacy/" }
        ],
        afterLinkContent: ". After approval of your comment, your profile picture is visible to the public in the context of your comment."
      },
      {
        title: "Media",
        content: "If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website."
      },
      {
        title: "Cookies",
        content: `If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.

If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.

When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.

If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.`
      },
      {
        title: "Embedded content from other websites",
        content: `Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.

These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.`
      },
      {
        title: "Who we share your data with",
        content: "If you request a password reset, your IP address will be included in the reset email."
      },
      {
        title: "How long we retain your data",
        content: `If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.

For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.`
      },
      {
        title: "What rights you have over your data",
        content: "If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that you erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes."
      },
      {
        title: "Where we send your data",
        content: "Visitor comments may be checked through an automated spam detection service."
      }
    ]
  };

  return (
    <>
      <style>{`
        .privacy-policy-container {
          max-width: 1200px;
          margin: 40px auto;
          padding: 20px;
          line-height: 1.6;
          color: #333;
          font-family: 'Roboto', sans-serif; /* Added font family */
        }

        .privacy-policy-title {
              color: #212529;
    font-size: 40px;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 20px;
    text-align : center;
        }

        .privacy-policy-section {
          margin-bottom: 30px;
        }

        .privacy-policy-section h3 {
          font-size: 1.8em;
          color: #333;
          margin-bottom: 15px;
          border-bottom: 2px solid #eee;
          padding-bottom: 5px;
        }

        .privacy-policy-section p {
          margin-bottom: 15px;
          white-space: pre-wrap; /* Preserves whitespace and line breaks from JSON content */
        }

        .privacy-policy-section a {
          color: #007bff;
          text-decoration: none;
        }

        .privacy-policy-section a:hover {
          text-decoration: underline;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .privacy-policy-container {
            margin: 20px;
            padding: 15px;
          }
          .privacy-policy-title {
            font-size: 2em;
          }
          .privacy-policy-section h3 {
            font-size: 1.5em;
          }
        }
      `}</style>
      <PrivacyPolicyHeroSection/>
      <div className="privacy-policy-container">
        <h2 className="privacy-policy-title">Privacy Policy</h2>

        {policyData.sections.map((section, index) => (
          <div key={index} className="privacy-policy-section">
            <h3>{section.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: section.content }} />
            {section.links && section.links.map((link, linkIndex) => (
                <a key={linkIndex} href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.text}
                </a>
              ))}
              {section.afterLinkContent}
            
          </div>
        ))}
      </div>
      <Map/>
      <CommonFooter/>
    </>
   
  );
}

export default PrivacyPolicyDetails;