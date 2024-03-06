import "./CSS/TinyPages.css";

const Success = () => {
  return (
    <div className="payment-sucess">
      <h1>
        Thank you for your purchase! Your order has been successfully placed.
        Please wait for an email confirmation. If you have any questions or
        concerns, feel free to contact our customer support.
      </h1>
    </div>
  );
};

const Cancel = () => {
  return (
    <h1>
      Your order has been cancelled. If you have any questions or concerns, feel
      free to contact our customer support.
    </h1>
  );
};

const PageNotFound = () => {
  return <h1>404 - Page Not Found</h1>;
};

export { Success, Cancel, PageNotFound };
