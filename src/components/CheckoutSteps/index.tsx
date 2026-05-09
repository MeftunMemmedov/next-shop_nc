interface Props {
  currentStep: 1 | 2 | 3;
}

type Step = {
  title: string;
  description: string;
};

const CheckoutSteps = ({ currentStep }: Props) => {
  const steps: Step[] = [
    {
      title: 'Cart',
      description: 'Review your cart items',
    },
    {
      title: 'Checkout',
      description: 'Enter your billing details',
    },
    {
      title: 'Confirmation',
      description: 'Review and confirm your order',
    },
  ];

  return (
    <ol className="checkout-steps list-unstyled">
      {steps.map((item, index) => (
        <li
          className={`checkout-steps__item ${index < currentStep ? 'active' : ''}`}
          key={`checkout-step-${index}`}>
          <span className="checkout-steps__item-number">
            {(index + 1).toString().padStart(2, '0')}
          </span>

          <span className="checkout-steps__item-title">
            <span>{item.title}</span>
            <em>{item.description}</em>
          </span>
        </li>
      ))}
    </ol>
  );
};

export default CheckoutSteps;
