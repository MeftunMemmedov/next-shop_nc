import ContactForm from './components/ContactForm';
import { getData } from '@/api/fetch/helpers/get';
import { Config } from '@/types';

const Contact = async () => {
  const { contact_info } = await getData<Config>('shop_config', {
    select: 'contact_info',
  });
  return (
    <>
      <div className="mb-4 pb-4"></div>
      <div className="mb-4 pb-4"></div>

      <section className="contact-us container">
        <div className="mw-930">
          <h1 className="page-title">Contact</h1>
        </div>
      </section>

      {contact_info?.map_url && (
        <section className="google-map mb-5">
          <div className="google-map__wrapper">
            <iframe
              src={contact_info?.map_url}
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
                {contact_info?.phone && (
                  <p>
                    <span>Phone:</span> {contact_info?.phone}
                  </p>
                )}
                {contact_info?.email && (
                  <p>
                    <span>Email:</span> {contact_info?.email}
                  </p>
                )}
                {contact_info?.address && (
                  <p>
                    <span>Address:</span> {contact_info?.address}
                  </p>
                )}
              </address>
            </div>
            {/* {contact_info && contact_info?.socials.length > 0 && (
              <nav className="socials d-flex gap-3">
                {contact_info?.socials.map((social, index) => (
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
            )} */}
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
};

export default Contact;
