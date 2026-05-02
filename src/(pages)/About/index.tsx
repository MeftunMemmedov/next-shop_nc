import { createFakeImage } from '@/data/image';
import Image from 'next/image';

const About = () => {
  return (
    <div className="about-us container">
      <div className="mw-930">
        <h1 className="page-title">About Us</h1>
      </div>
      <div className="about-us__content pb-5 mb-5">
        <figure className="mb-5">
          <Image
            loading="lazy"
            className="w-100 h-auto d-block img-1"
            src={createFakeImage(1410, 550)}
            width={1410}
            height={550}
            alt="about"
          />
        </figure>
        <section className="mw-930" aria-labelledby="our-story">
          <h2 id="our-story" className="mb-4">
            Our Story
          </h2>
          <p className="fs-6 fw-medium mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A deserunt,
            necessitatibus nemo officiis suscipit voluptates dolor, sequi atque
            repudiandae, earum molestias quasi provident dolore architecto eos
            eveniet praesentium molestiae doloribus!
          </p>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            vitae iste ad!
          </p>
          <div className="row mb-3">
            <div className="col-md-6">
              <h5 className="mb-3">Our Mission</h5>
              <p className="mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                odio tenetur obcaecati nemo sequi dolor saepe porro suscipit,
                fugiat, blanditiis, vel ullam! Saepe eveniet ut minima eligendi
                esse, iusto alias!
              </p>
            </div>
          </div>
        </section>
        <section className="mw-930 d-lg-flex align-items-lg-center">
          <figure className="image-wrapper col-lg-6">
            <Image
              className="h-auto img-2"
              loading="lazy"
              src={createFakeImage(450, 500)}
              width={450}
              height={500}
              alt="about"
            />
          </figure>
          <div className="content-wrapper col-lg-6 px-lg-4">
            <h2 className="my-3" id="company">
              SHOP
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia modi
              autem assumenda nisi possimus rem iste esse laborum voluptates
              incidunt.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
