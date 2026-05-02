const ContactForm = () => {
  return (
    <div className="contact-us__form">
      <form name="contact-us-form" className="needs-validation">
        <h3 className="mb-5">Contact Us</h3>
        {/* {errorMessages.non_field_errors && (
          <div className="border p-3 mb-4 bg-danger rounded text-light fw-bold">
            {errorMessages.non_field_errors}
          </div>
        )} */}
        <div className="form-floating mb-3">
          <input
            className={`form-control ${false ? 'border-danger' : ''}`}
            name="first_name"
            type="text"
          />
          <label>User name</label>
          {/* {errorMessages.first_name && (
            <p className="text-danger">{errorMessages.first_name}</p>
          )} */}
        </div>

        <div className="form-floating mb-3">
          <input
            className={`form-control ${false ? 'border-danger' : ''}`}
            name="email"
            type="email"
          />
          <label>Email</label>
          {/* {errorMessages.email && (
            <p className="text-danger">{errorMessages.email}</p>
          )} */}
        </div>

        {/* <div className="form-floating mb-3">
          <InputMask
            showMask
            mask="+994 (__) ___ __ __"
            type="text"
            id="phone"
            className={`form-control v-2 ${errorMessages.phone ? 'border-danger' : ''}`}
            name="phone"
            replacement={{ _: /\d/ }}
            // disabled={loading}
            onChange={(e) => {
              const rawValue = e.target.value;

              const digitsOnly = rawValue
                .replace('+994', '')
                .replace(/\D/g, '');

              setContactMessage((prevForm) => ({
                ...prevForm,
                phone: digitsOnly,
              }));
            }}
          />
          <label>{tCommon('phone')}</label>

          {errorMessages.phone && (
            <p className="text-danger">{errorMessages.phone}</p>
          )}
        </div> */}

        <div className="my-4">
          <textarea
            className={`form-control ${false ? 'border-danger' : ''}`}
            cols={30}
            name="message"
            rows={8}></textarea>
          {/* {errorMessages.first_name && (
            <p className="text-danger">{errorMessages.first_name}</p>
          )} */}
        </div>

        <div className="my-4">
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
