import { CONTACT_INFORMATION } from '@/data/contact';
import Image from 'next/image';
import ContactForm from './components/ContactForm';

const Contact = () => {
  return (
    <>
      <div className="mb-4 pb-4"></div>

      <section className="contact-us container">
        <div className="mw-930">
          <h1 className="page-title">Contact</h1>
        </div>
      </section>

      {CONTACT_INFORMATION?.map_url && (
        <section className="google-map mb-5">
          <div className="google-map__wrapper">
            <iframe
              src={CONTACT_INFORMATION?.map_url}
              width={'100%'}
              height={`100%`}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      )}
      <section className="contact-us container">
        <div className="mw-930">
          <div className="row mb-5">
            <div className="col-lg-6">
              <h3 className="mb-4">Contact Us</h3>
              <address className="contacts-container1">
                {CONTACT_INFORMATION?.phone && (
                  <p>
                    <span>Phone:</span> {CONTACT_INFORMATION?.phone}
                  </p>
                )}
                {CONTACT_INFORMATION?.email && (
                  <p>
                    <span>Email:</span> {CONTACT_INFORMATION?.email}
                  </p>
                )}
                {CONTACT_INFORMATION?.address && (
                  <p>
                    <span>Address:</span> {CONTACT_INFORMATION?.address}
                  </p>
                )}
              </address>
            </div>
            {CONTACT_INFORMATION && CONTACT_INFORMATION?.socials.length > 0 && (
              <nav className="socials d-flex gap-3">
                {CONTACT_INFORMATION?.socials.map((social, index) => (
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={`social-${social.title}-${index}`}>
                    <Image
                      src={social.icon}
                      width={32}
                      height={32}
                      alt={social.title}
                      className="social-img"
                    />
                  </a>
                ))}
              </nav>
            )}
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
};

export default Contact;
